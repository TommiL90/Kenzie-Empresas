"use client";
import { Modal } from ".";
import { Input } from "../Input";

interface ModalEditDepartamentProps {
  toggleModal: () => void;
}

export const ModalEditDepartment = ({ toggleModal }: ModalEditDepartamentProps) => {
  return (
    <Modal toggleModal={toggleModal}>
      <div className="flex w-[506px] flex-col gap-4 bg-color-grey-6 p-8">
        <h1 className="text-4xl font-bold text-color-grey-1">Editar Departamento</h1>
        <form className="space-y-4">
          <textarea className="form-textarea h-[113px] w-full bg-color-grey-6 p-4 text-color-grey-5" />
          <button className="h-12 w-full bg-color-success text-center text-lg font-bold text-color-grey-5">Salvar</button>
        </form>
      </div>
    </Modal>
  );
};
