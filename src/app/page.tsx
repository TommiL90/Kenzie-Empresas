import Container from "@/components/Container";
import Header from "@/components/Header";
import Image from "next/image";
import image from "../../public/assets/Rectangle_init.svg";
import styles from "./styles.module.scss";
import { api } from "@/services/api";
import Card from "@/components/Card";
import { Suspense } from "react";

interface IRoute {
  path: string;
  label: string;
}

interface ISector {
  id: string;
  name: string;
}

interface ICompany {
  id: string;
  name: string;
  description: string;
  category_id: string;
}

const requestSectors = async () => {
  try {
    const response = await api("/categories/readAll");

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sectors");
  }
};

const requestCompanies = async () => {
  try {
    const response = await api("/companies/readAll");

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch sectors");
  }
};

export default async function Home() {
  const routes: IRoute[] = [
    {
      path: "/login",
      label: "Login",
    },
    {
      path: "/register",
      label: "Cadastro",
    },
  ];

  const sectors: ISector[] = await requestSectors();
  const companies: ICompany[] = await requestCompanies();

  return (
    <>
      <Header routes={routes} />
      <main>
        <Container>
          <div className={styles.div}>
            <Image className={styles.image} src={image} alt="Home" />
            <section className={styles.section}>
              <select name="sectorOptions" id="sectorsOptions">
                <option value="">Selecione o setor</option>
                {sectors.map((sector: ISector) => (
                  <option value={sector.id}>{sector.name}</option>
                ))}
              </select>
              <section className={styles.list}>
                <h1>Lista de Empresas</h1>
                <Suspense>
                  {companies &&
                    companies.map((company: ICompany) => (
                      <Card key={company.id} data={company} />
                    ))}
                </Suspense>
              </section>
            </section>
          </div>
        </Container>
      </main>
    </>
  );
}
