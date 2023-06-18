"use client";
import { TCompany } from "@/interfaces/company.interfaces";
import { TEmployeeReturn } from "@/interfaces/employee.interface";
import { useState } from "react";
import { BsPencil, BsTrashFill } from "react-icons/bs";
import { ModalEditUser } from "../Modal/EditUser";


interface DeckProps {
  user: TEmployeeReturn;
  enterprises: TCompany[];
}

const DeckEmployee = ({ user, enterprises }: DeckProps) => {
  const [isOpenModalEditUser, setIsOpenModalEditUser] = useState<boolean>(false);
  const [isOpenModalDeleteUser, setIsOpenModalDeleteUser] = useState<boolean>(false);

  const handleOpenEditUser = () => setIsOpenModalEditUser(!isOpenModalEditUser);
  const handleOpenDeleteUser = () => setIsOpenModalDeleteUser(!isOpenModalDeleteUser);

  const enterprise = enterprises.find((enterprise) => enterprise.id === user.companyId);
  return (
    <li className="flex h-[196px] w-[489px] justify-between border border-color-brand-1 p-6">
      <div className="space-y-1">
        <h3 className="bold text-sm text-color-grey-1">{user.name}</h3>
        <p>{enterprise ? enterprise.name : "Usuario não contratado"}</p>
      </div>
      <div className="flex flex-col space-y-3">
        <button onClick={handleOpenEditUser}>
          <BsPencil size={32} className="text-color-warning" />
        </button>
        <button onClick={handleOpenDeleteUser}>
          <BsTrashFill size={32} className="text-color-error" />
        </button>
      </div>
      {isOpenModalEditUser && <ModalEditUser toggleModal={handleOpenEditUser} />}
      {/* {isOpenModalDeleteUser && <ModalDeletetUser toggleModal={handleOpenDeleteUser} />} */}
    </li>
  );
};

export default DeckEmployee;
