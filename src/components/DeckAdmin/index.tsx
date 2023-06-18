"use client";
import { TCompany } from "@/interfaces/company.interfaces";
import { useState } from "react";
import { BsEye, BsPencil, BsTrashFill } from "react-icons/bs";
import { ModalDepartament } from "../Modal/DepartmentModal";
import { TEmployeesList } from "@/interfaces/employee.interface";
import { TDepartment } from "@/interfaces/department.interfaces";
import { ModalEditDepartment } from "../Modal/EditDepartment";
import { ModalDeletetDepartment } from "../Modal/DeleteDepartment";

interface DeckProps {
  departament: TDepartment;
  enterprises: TCompany[];
  users: TEmployeesList;
}

const DeckAdmin = ({ departament, enterprises, users }: DeckProps) => {
  const [isOpenModalDepartament, setIsOpenModalDepartament] = useState<boolean>(false);
  const [isOpenModalEditDepartament, setIsOpenModalEditDepartament] = useState<boolean>(false);
  const [isOpenModalDeleteDepartament, setIsOpenModalDeleteDepartament] = useState<boolean>(false);

  const handleOpenDepartament = () => setIsOpenModalDepartament(!isOpenModalDepartament);
  const handleOpenEditDepartament = () => setIsOpenModalEditDepartament(!isOpenModalEditDepartament);
  const handleOpenDeleteDepartament = () => setIsOpenModalDeleteDepartament(!isOpenModalDeleteDepartament);

  const enterprise = enterprises.find((enterprise) => enterprise.id === departament.companyId);
  const employees = departament.employees;

  return (
    <li className="flex h-[196px] w-[489px] justify-between border border-color-brand-1 p-6">
      <div className="space-y-1">
        <h3 className="bold text-sm text-color-grey-1">{departament.name}</h3>
        <p>{departament.description}</p>
        <p>{enterprise ? enterprise.name : ""}</p>
      </div>
      <div className="flex flex-col space-y-3">
        <button onClick={handleOpenDepartament}>
          <BsEye size={32} className="text-color-brand-1" />
        </button>
        <button onClick={handleOpenEditDepartament}>
          <BsPencil size={32} className="text-color-warning" />
        </button>
        <button onClick={handleOpenDeleteDepartament}>
          <BsTrashFill size={32} className="text-color-error" />
        </button>
      </div>
      {isOpenModalDepartament && (
        <ModalDepartament toggleModal={handleOpenDepartament} users={users} employees={employees} departamentId={departament.id} />
      )}
      {isOpenModalEditDepartament && <ModalEditDepartment toggleModal={handleOpenEditDepartament} />}
      {isOpenModalDeleteDepartament && <ModalDeletetDepartment toggleModal={handleOpenDeleteDepartament} />}
    </li>
  );
};

export default DeckAdmin;
