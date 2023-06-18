"use client"
import { Modal } from "."
import { Input } from "../Input"

interface ModalCreateDepartamentProps {
    toggleModal: () => void
  }
  
  export const ModalCreateDepartment = ({ toggleModal }: ModalCreateDepartamentProps) => {


    return (
      <Modal toggleModal={toggleModal}>
        <div className="w-[506px] bg-color-grey-6 p-8 flex flex-col gap-4">
        <h1 className="font-bold text-color-grey-1 text-4xl">Criar Departamento</h1>
        <form className="space-y-4">
            <Input placeholder="Nome do departamento"/>
            <Input placeholder="Descrição"/>
            <select className="form-select w-full h-12 border-color-grey-3" name="selectDepartament" id="selectDepartament"></select>
            <button className="w-full bg-color-success text-center h-12 font-bold text-lg text-color-grey-5">Criar</button>
        </form>
        </div>
      </Modal>
    )
  }