"use client";
import { Modal } from ".";

interface ModalDeleteUserProps {
  toggleModal: () => void;
}

export const ModalDeletetDepartament = ({ toggleModal }: ModalDeleteUserProps) => {
  return (
    <Modal toggleModal={toggleModal}>
      <div className="flex h-[292px] w-[733px] items-center justify-center bg-color-grey-6 p-8">
        <div className="flex w-[157px] flex-col gap-6 text-center">
          <h1 className="text-4xl font-bold text-color-grey-1">{`Realmente deseja deletar o departamento? `}</h1>
          <button className="h-12 w-full bg-color-error text-center text-lg font-bold text-color-grey-5">Remover</button>
        </div>
      </div>
    </Modal>
  );
};