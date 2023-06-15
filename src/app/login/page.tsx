"use client"
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { setCookie } from "nookies";
import jwt_decode from "jwt-decode";
import { api } from "@/services/api";

import Header from "@/components/Header";

import { loginSchema, TLoginFormValues } from "./schema";

export interface IDecodedToken {
  email: string;
  isAdmin: boolean;
  sub: string;
}

export type TInfosToken = IDecodedToken | undefined;

export interface ILoginUser {
  accessToken: string;
}

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
    path: "/register",
    label: "Cadastro"
  }
];

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    // Restablecer el estado cuando el componente se monta
    setLoading(false);
  }, []);

  const submit: SubmitHandler<TLoginFormValues> = async (formData) => {
    const toaster = toast.loading("Realizando login, aguarde!");

    setLoading(true);
    try {
      const response = await api.post<ILoginUser>("/auth/login", formData);
      console.log(response.data);
      const { accessToken } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;

      const decoded: TInfosToken = jwt_decode(accessToken!);

      console.log(decoded!.isAdmin);
      setCookie(null, "@kenzie-empresas:token", accessToken, {
        maxAge: 60 * 60 * 1
      });

      toast.dismiss(toaster);
      toast.success("Login realizado!");

      if (decoded!.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toaster);
      toast.error("Email o senha errada, tente novamente!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header routes={routes} />
      <div className="flex h-screen w-screen items-center justify-center bg-[url('../../public/assets/Rectangle_home.svg')]">
        <div className="flex items-center justify-center">
          <div className="flex h-[489px] max-w-[506px] flex-col justify-center gap-8 bg-color-grey-4 p-10 opacity-95">
            <h1 className="text-4xl font-bold text-color-grey-1">Login</h1>
            <p className="text-lg text-color-grey-1">Preencha os campos para realizar o login</p>
            <form className="space-y-6" onSubmit={handleSubmit(submit)}>
              <Input type="email" {...register("email")} disabled={loading} error={errors.email} />
              <Input type="password" {...register("password")} disabled={loading} error={errors.password} />
              <div className="flex flex-col gap-4 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center border border-color-brand-1 bg-color-brand-1 text-base font-semibold text-color-grey-5 hover:border-color-brand-2 hover:bg-color-brand-2"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <p>ou</p>
                <Link
                  className="flex h-12 w-full items-center justify-center  border border-color-brand-1 bg-color-grey-4 text-base font-semibold text-color-brand-1"
                  href={routes[1].path}
                >
                  Cadastrese
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

