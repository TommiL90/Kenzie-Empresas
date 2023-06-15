"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { Input } from "@/components/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TRegisterFormValues, registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface IRoute {
  path: string;
  label: string;
}

const routes: IRoute[] = [
  {
    path: "/",
    label: "Home"
  },
  {
    path: "/login",
    label: "Login"
  }
];

function Login() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <Header routes={routes} />
      <main className="flex h-screen w-screen items-center justify-center bg-[url('../../public/assets/Rectangle_home.svg')]">
        <div className="flex h-full w-full items-center justify-center">
          <form
            className="flex h-[max-content] max-w-[506px] flex-col justify-center gap-8 bg-color-grey-6 p-10 opacity-90"
            onSubmit={handleSubmit(submit)}>
            <h1>Login</h1>
            <p>Preencha os campos para realizar o cadastro</p>
            <Input placeholder="Seu e-mail" type="email" {...register("email")} disabled={false} error={errors.email} />
            <Input placeholder="Seu password" type="password" {...register("password")} disabled={false} error={errors.password} />
            <Input
              placeholder="Repita seu password"
              type="password"
              {...register("confirmPassword")}
              disabled={false}
              error={errors.confirmPassword}
            />
            <div className="flex flex-col gap-4 text-center">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center border border-color-brand-1 bg-color-brand-1 text-base font-semibold text-color-grey-5 hover:border-color-brand-2 hover:bg-color-brand-2">
                Cadastrar
              </button>
              <p>ou</p>
              <Link
                className="flex h-12 w-full items-center justify-center  border border-color-brand-1 bg-color-grey-6 text-base font-semibold text-color-brand-1"
                href={routes[1].path}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
