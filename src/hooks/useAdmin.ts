import { api } from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ICompany } from "@/app/page";
import { TDepartment } from "@/interfaces/department.interfaces";
import { TEmployeesList } from "@/interfaces/employee.interface";

const retrieveCompanies = async () => {
  try {
    const response = await api("companies");

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch companies");
  }
};

export const useAdmin = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [departaments, setDepartaments] = useState<TDepartment[]>([]);
  const [users, setUsers] = useState<TEmployeesList>([]);

  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies["@kenzie-empresas:token"];

  if (!token) {
    router.push("/login");
  }

  const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    try {
      const responseDepartments = await api(`companies/${event.target.value}/departaments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDepartaments(responseDepartments.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => setIsOpenModal(!isOpenModal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await retrieveCompanies();
        setCompanies(companies);

        const responseUsers = await api("users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(responseUsers.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return {
    isOpenModal,
    toggleModal,
    companies,
    departaments,
    users,
    setUsers,
    handleSelectChange
  };
};
