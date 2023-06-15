"use client";
import { TCompany } from "@/interfaces/company.interfaces";
import { TDepartament } from "@/interfaces/departament.interfaces";
import { useState } from "react";
import { BsEye, BsPencil, BsTrashFill } from "react-icons/bs";
import { ModalDepartament } from "../Modal/DepartamentModal";
import { ModalEditDepartament } from "../Modal/EditDepartament";
import { ModalDeletetDepartament } from "../Modal/DeleteDepartament";
import { TEmployeesList } from "@/interfaces/employee.interface";

interface DeckProps {
  departament: TDepartament;
  enterprises: TCompany[];
  users: TEmployeesList
}

const DeckAdmin = ({ departament, enterprises, users }: DeckProps) => {
  const [isOpenModalDepartament, setIsOpenModalDepartament] = useState<boolean>(false);
  const [isOpenModalEditDepartament, setIsOpenModalEditDepartament] = useState<boolean>(false);
  const [isOpenModalDeleteDepartament, setIsOpenModalDeleteDepartament] = useState<boolean>(false);

  const handleOpenDepartament = () => setIsOpenModalDepartament(!isOpenModalDepartament);
  const handleOpenEditDepartament = () => setIsOpenModalEditDepartament(!isOpenModalEditDepartament);
  const handleOpenDeleteDepartament = () => setIsOpenModalDeleteDepartament(!isOpenModalDeleteDepartament);

  const enterprise = enterprises.find((enterprise) => enterprise.id === departament.company_id);
  const employees = departament.employees

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
      {isOpenModalDepartament && <ModalDepartament toggleModal={handleOpenDepartament} users={users} employees={employees}/>}
      {isOpenModalEditDepartament && <ModalEditDepartament toggleModal={handleOpenEditDepartament} />}
      {isOpenModalDeleteDepartament && <ModalDeletetDepartament toggleModal={handleOpenDeleteDepartament} />}
    </li>
  );
};

export default DeckAdmin;
