"use client";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TLoginFormValues, loginSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface IRoute {
  path: string;
  label: string;
}

const routes: IRoute[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/register",
    label: "Cadastro",
  },
];

function Login() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <Header routes={routes} />
      <main className={styles.main}>
        <Container>
          <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
              <h1>Login</h1>
              <p>Preencha os campos para realizar o login</p>
              <Input
                type="email"
                {...register("email")}
                disabled={false}
                error={errors.email}
              />
              <Input
                type="password"
                {...register("password")}
                disabled={false}
                error={errors.password}
              />
              <div className={styles.buttonContainer}>
                <Button>Login</Button>
                <p>ou</p>
                <Link className={styles.link} href={routes[1].path}>Cadastre-se</Link>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </>
  );
}

export default Login;
