"use client";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./styles.module.scss";
import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TRegisterFormValues, registerSchema } from "./schema";
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
    path: "/login",
    label: "Login",
  },
];

function Login() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <Header routes={routes} />
      <main className={styles.main}>
        <Container>
          <div className={styles.content}>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
              <h1>Cadastre-se</h1>
              <Input
                placeholder="Seu Nome"
                type="text"
                {...register("name")}
                disabled={false}
                error={errors.name}
              />
              <Input
                placeholder="Seu e-mail"
                type="email"
                {...register("email")}
                disabled={false}
                error={errors.email}
              />
              <Input
                placeholder="Seu password"
                type="password"
                {...register("password")}
                disabled={false}
                error={errors.password}
              />
              <Input
                placeholder="Repita seu password"
                type="password"
                {...register("repeatPassword")}
                disabled={false}
                error={errors.repeatPassword}
              />
              <div className={styles.buttonContainer}>
                <Button>Login</Button>
                <p>ou</p>
                <Link className={styles.link} href={routes[1].path}>
                  Retornar
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </main>
    </>
  );
}

export default Login;
