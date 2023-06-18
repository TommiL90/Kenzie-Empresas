"use client"
import { api } from "@/services/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

interface AxiosInterceptorProps {
  children: ReactNode;
}

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const router = useRouter();
  useEffect(() => {
    const errorInterceptor = (error: Error) => {
      if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
      }
      console.log(error);
      if (error.message === "Network Error") {
        toast.error("Erro no servidor, tente novamente.");
      }
      if (error.message.includes("timeout")) {
        toast.error("O servidor está sendo reiniciado, faça a solicitação novamente, desculpa o encômodo.");
      }

      return Promise.reject(error);
    };

    const interceptor = api.interceptors.response.use(null, errorInterceptor);

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return <>{children}</>;
};
