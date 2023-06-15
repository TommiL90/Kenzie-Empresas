"use client";
import { TEmployeesList } from "@/interfaces/employee.interface";
import { Modal } from ".";
import { Input } from "../Input";
import { useState } from "react";
import { ModalDeletetUser } from "./DeleteUser";

interface ModalModalDepartamentProps {
  toggleModal: () => void;
  users: TEmployeesList;
  employees?: TEmployeesList;
}

export const ModalDepartament = ({ toggleModal, users, employees }: ModalModalDepartamentProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
      setOpenModal(!openModal)
  }

  const filteredUsers = users.filter((user) => user.department_id === null);

  return (
    <Modal toggleModal={toggleModal}>
      <div className="flex h-[621px] w-[857px] flex-col gap-4 bg-color-grey-6 p-8">
        <h1 className="mt-2 text-4xl font-bold text-color-grey-1">Nome do departamento</h1>
        <h3 className="mt-2 text-xl font-bold text-color-grey-1">Descrição do departamento</h3>
        <p className="text-base font-normal text-color-grey-1">Empresa pertencente</p>
        <form className="flex w-full justify-between">
          <select className="form-select w-[565px]" name="selectUser" id="selectUser">
            <option value="">Seleccione usuário</option>
            {filteredUsers.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <button className="h-12 w-[190px] bg-color-success text-center text-lg font-bold text-color-grey-5">contratar</button>
        </form>
        <ul className="flex h-[278px] w-full items-center gap-6 overflow-x-auto p-6">
          {employees && employees.length > 0 ? (
            employees.map((item) => (
              <li className="flex h-[196px] min-w-[306px] flex-col justify-between border-b border-color-brand-1 p-4" key={item.id}>
                <div>
                  <h3 className="mb-4 text-xl font-bold text-color-grey-1">{item.name}</h3>
                  <p className="text-base font-normal text-color-grey-1">{item.company_id}</p>
                </div>
                <button className="h-12 w-full border border-color-error bg-color-grey-6 text-center text-lg font-bold text-color-error" onClick={handleOpenModal}>
                  Desligar
                </button>
                {
                  openModal && <ModalDeletetUser toggleModal={handleOpenModal}/>
                }
              </li>
            ))
          ) : (
            <p>Nenhum funcionário encontrado</p>
          )}
        </ul>
      </div>
    </Modal>
  );
};
