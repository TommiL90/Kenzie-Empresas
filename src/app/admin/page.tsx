"use client";

import { ModalCreateDepartment } from "@/components/Modal/CreateDepartmentModal";
import React from "react";
import DeckAdmin from "@/components/DeckAdmin";
import DeckEmployee from "@/components/DeckEmployee";
import { useAdmin } from "@/hooks/useAdmin";


const AdminPage = async () => {
  const {isOpenModal, toggleModal, companies, departaments, users, handleSelectChange } = useAdmin()

  return (
    <>
      <div className="container h-max pb-10">
        <section className="mt-4 flex w-full justify-end">
          <select
            className="text-m mt-4 h-[52px] w-[288px] cursor-pointer bg-color-brand-1 text-center text-color-grey-6 hover:bg-color-brand-2"
            id="selectOptions"
            value=""
            onChange={handleSelectChange}>
            <option value="">Seleccionar empresa</option>
            {companies.map((company) => {
              return (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              );
            })}
          </select>
        </section>
        <section className="mt-6 flex w-full flex-wrap justify-between gap-4">
          <h2 className="text-2xl font-bold text-color-grey-1">Departamentos</h2>
          <button
            className="h-[50px] w-[150px] border-none bg-color-brand-1 text-color-grey-6 hover:bg-color-brand-2"
            onClick={toggleModal}>
            + Criar
          </button>
          <ul className="flex h-[385px] w-full flex-wrap justify-between gap-9 overflow-y-auto p-9">
            {departaments && departaments.length > 0 ? (
              departaments.map((item) => <DeckAdmin key={item.id} departament={item} enterprises={companies} users={users} />)
            ) : (
              <p>Nenhum departamento registrado</p>
            )}
          </ul>
        </section>
        <section className="mt-8 flex w-full flex-wrap justify-between gap-4">
          <h2 className="text-2xl font-bold text-color-grey-1">Usuários cadastrados</h2>
          <ul className="flex h-[385px] w-full flex-wrap justify-between gap-9 overflow-y-auto p-9">
            {users && users.length > 0 ? (
              users.map((user) => <DeckEmployee key={user.id} user={user} enterprises={companies} />)
            ) : (
              <p>Nenhum usuário registrado</p>
            )}
          </ul>
        </section>
      </div>
      {isOpenModal && <ModalCreateDepartment toggleModal={toggleModal} />}
    </>
  );
};

export default AdminPage;
