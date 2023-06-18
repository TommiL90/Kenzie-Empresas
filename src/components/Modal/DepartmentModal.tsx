"use client";
import { TEmployeeReturn, TEmployeesList } from "@/interfaces/employee.interface";
import { Modal } from ".";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "@/services/api";
import { parseCookies } from "nookies";
import { z } from "zod";
import { hireUser } from "@/schemas/company.schema";
import { toast } from "react-hot-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AxiosError } from "axios";

type TBody = z.infer<typeof hireUser>;

type TResponseHireUser = {
  message: string;
  employee: TEmployeeReturn;
};

interface ModalModalDepartamentProps {
  toggleModal: () => void;
  users: TEmployeesList;
  employees?: TEmployeesList;
  departamentId: string;
}

export const ModalDepartament = ({ toggleModal, users, employees, departamentId }: ModalModalDepartamentProps) => {
  const { setUsers } = useAdmin();
  const [employeesList, setEmployeesList] = useState<TEmployeesList | []>(employees as TEmployeesList);
  const [filteredUsers, setFilteredUsers] = useState<TEmployeesList | []>(users.filter((user) => user.departamentId === null));
  const cookies = parseCookies();
  const token = cookies["@kenzie-empresas:token"];
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };

  const handleHireUser = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const toaster = toast.loading("Contratando funcionário, aguarde!");
    setLoading(true);

    const body: TBody = {
      departmentId: departamentId,
      userId: selectedOption
    };

    try {
      const responseDepartments = await api.patch<TResponseHireUser>(`departments/hire`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const hiredUser: TEmployeeReturn = responseDepartments.data.employee;

      setEmployeesList((prevState) => [...prevState, hiredUser]);
      setFilteredUsers((prevState) => prevState.filter((user) => user.id !== hiredUser.id));
      setUsers((prevState) => {
        const filteredUsers = prevState.filter((user) => user.id !== hiredUser.id);
        const newList = [...filteredUsers, hiredUser];
        return newList;
      });
      console.log(body);
      toast.dismiss(toaster);
      toast.success("Funcionário contratado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Erro ao contratar funcionário!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDismissUser = async (idUser: string): Promise<void> => {
    const toaster = toast.loading("Demitindo funcionário, aguarde!");
    setLoading(true);
   
    const body: Pick<TBody, "userId"> = {
      userId: idUser
    };
    console.log('Employee ID:', body);
    try {
      const responseDepartments = await api.patch<TResponseHireUser>("departments/dismiss", body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const dismissedUser: TEmployeeReturn = responseDepartments.data.employee;

      setFilteredUsers((prevState) => [...prevState, dismissedUser]);
      setEmployeesList;
      setEmployeesList((prevState) => prevState.filter((user) => user.id !== dismissedUser.id));
      setUsers((prevState) => {
        const filteredUsers = prevState.filter((user) => user.id !== dismissedUser.id);
        const newList = [...filteredUsers, dismissedUser];
        return newList;
      });
      console.log(body);
      toast.dismiss(toaster);
      toast.success("Funcionário contratado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Erro ao contratar funcionário!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal toggleModal={toggleModal}>
      <div className="flex h-[621px] w-[857px] flex-col gap-4 bg-color-grey-6 p-8">
        <h1 className="mt-2 text-4xl font-bold text-color-grey-1">Nome do departamento</h1>
        <h3 className="mt-2 text-xl font-bold text-color-grey-1">Descrição do departamento</h3>
        <p className="text-base font-normal text-color-grey-1">Empresa pertencente</p>
        <form className="flex w-full justify-between" onSubmit={handleHireUser}>
          <select className="form-select w-[565px]" name="selectUser" id="selectUser" onChange={handleSelectChange} disabled={loading}>
            <option value="">Seleccione usuário</option>
            {filteredUsers.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <button className="h-12 w-[190px] bg-color-success text-center text-lg font-bold text-color-grey-5" disabled={loading}>
            {loading ? "Contratando..." : "Contratar"}
          </button>
        </form>
        <ul className="flex h-[278px] w-full items-center gap-6 overflow-x-auto p-6">
          {employeesList && employeesList.length > 0 ? (
            employeesList.map((employee) => (
              <li className="flex h-[196px] min-w-[306px] flex-col justify-between border-b border-color-brand-1 p-4" key={employee.id}>
                <div>
                  <h3 className="mb-4 text-xl font-bold text-color-grey-1">{employee.name}</h3>
                  <p className="text-base font-normal text-color-grey-1">Nombre de Empresa</p>
                </div>
                <button
                  className="h-12 w-full border border-color-error bg-color-grey-6 text-center text-lg font-bold text-color-error"
                  onClick={() => handleDismissUser(employee.id)}>
                  Desligar
                </button>
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
