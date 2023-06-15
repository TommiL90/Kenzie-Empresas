import Image from "next/image";
import image from "../../public/assets/Rectangle_init.svg";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { Suspense } from "react";
import NavBar from "@/components/Header";

export interface IRoute {
  path: string;
  label: string;
}

 export interface ISector {
  id: string;
  name: string;
}

 export interface ICompany {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

const routes: IRoute[] = [
  {
    path: "/login",
    label: "Login"
  },
  {
    path: "/register",
    label: "Cadastro"
  }
];

const retrieveSectors = async () => {
  try {
    const response = await api("sectors");

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sectors");
  }
};

const retrieveCompanies = async () => {
  try {
    const response = await api("companies");

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sectors");
  }
};


export default async function Home() {
  const sectors: ISector[] = await retrieveSectors();
  const companies: ICompany[] = await retrieveCompanies();
  let sector: string;
  const filteredList: ICompany[] = companies.filter((company) => (sector ? company.category_id === sector : true));

  return (
    <>
      <NavBar routes={routes} />
      <main>
        <div className="container my-8 flex h-[854px] justify-between gap-4">
          <div className="h-full w-[48%]">
            <Image src={image} alt="Home" className="h-full w-full object-cover" />
          </div>
          <section className="h-full w-[48%]">
            <select
              name="sectorOptions"
              id="sectorsOptions"
              className="apy-3 form-select block h-[50px] w-full appearance-none border-none bg-color-brand-1 px-4 pr-8 text-lg font-normal leading-relaxed text-color-grey-6 focus:border-none focus:outline-none"
              // onChange={(e) => (sector = e.target.value)}
              required>
              <option value="" className="py-2">
                Selecione o setor
              </option>
              {sectors.map((sector: ISector) => (
                <option value={sector.id}>{sector.name}</option>
              ))}
            </select>
            <section className="flex h-[91.5%] flex-col gap-4 px-4 shadow-default">
              <h2 className="my-4 text-3xl font-bold text-color-grey-1">Lista de Empresas</h2>
              <ul className="flex h-full flex-col gap-4 overflow-auto">
                {companies &&
                  companies.map((company: ICompany) => {
                    const sector = sectors.find((e) => e.id === company.category_id);
                    company.category_id = sector!.name;
                    return (
                      <Suspense key={company.id}>
                        <Card data={company} />
                      </Suspense>
                    );
                  })}
              </ul>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}


