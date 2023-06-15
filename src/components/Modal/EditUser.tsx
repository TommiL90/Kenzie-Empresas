"use client"
import { Modal } from "."
import { Input } from "../Input"

interface ModalEditUserProps {
    toggleModal: () => void
  }
  
  export const ModalEditUser = ({ toggleModal }: ModalEditUserProps) => {


    return (
      <Modal toggleModal={toggleModal}>
        <div className="w-[506px] bg-color-grey-6 p-8 flex flex-col gap-4">
        <h1 className="font-bold text-color-grey-1 text-4xl">Editar Usuario</h1>
        <form className="space-y-4">
            <Input placeholder="Nome"/>
            <Input placeholder="Email"/>
            <button className="w-full bg-color-success text-center h-12 font-bold text-lg text-color-grey-5">Salvar</button>
        </form>
        </div>
      </Modal>
    )
  }