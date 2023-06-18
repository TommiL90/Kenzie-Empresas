import { prisma } from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../../utils";
import { TEmployee } from "@/interfaces/employee.interface";
import { updateEmployeeSchema, employeeReturnSchema, updateEmployeeByAdminSchema } from "@/schemas/employee.schema";
import { z } from "zod";

export const PATCH = async (
  req: NextRequest,
  {
    params
  }: {
    params: { userId: string };
  }
) => {
  let body: Partial<TEmployee>;
  const authToken = req.headers.get("authorization");
  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 401 });
  }
  const { jwtErrorMessage, userEmail, userId, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!params.userId) {
    return NextResponse.json({ message: "Usuário não encontrado, por favor verifique o id informado" }, { status: 404 });
  }

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

  if (!userIsAdmin && params.userId !== userId) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem atualizar estas informações ou o dono da conta"
      },
      { status: 401 }
    );
  }

  const user = await prisma.employee.findUnique({
    where: { id: params.userId }
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (userIsAdmin) {
    try {
      const updatedEmployee = await prisma.employee.update({
        where: {
          id: params.userId
        },
        data: updateEmployeeByAdminSchema.parse(body)
      });

      const responseUpdatedEmployee = employeeReturnSchema.parse(updatedEmployee);

      return NextResponse.json(responseUpdatedEmployee, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
    }
  }

  if (body.email === user.email) {
    delete body.email;
  }

  if (body.email) {
    const checkEmail = await prisma.employee.findUnique({
      where: {
        email: body.email
      }
    });

    if (checkEmail) {
      return NextResponse.json(
        {
          message: "Email já cadastrado, por favor verifique o email informado e tente novamente"
        },
        { status: 404 }
      );
    }
  }

  try {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: params.userId
      },
      data: updateEmployeeSchema.parse(body)
    });

    const responseUpdatedEmployee = employeeReturnSchema.parse(updatedEmployee);

    return NextResponse.json(responseUpdatedEmployee, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params
  }: {
    params: { userId: string };
  }
) => {
  const authToken = req.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 401 });
  }

  const { jwtErrorMessage, userEmail, userId, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!params.userId) {
    return NextResponse.json({ message: "Usuário não encontrado, por favor verifique o id informado" }, { status: 404 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem atualizar estas informações ou o dono da conta"
      },
      { status: 401 }
    );
  }
  console.log("aquiiii");
  const user = await prisma.employee.findUnique({
    where: { id: params.userId }
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  await prisma.employee.delete({
    where: { id: params.userId }
  });

  return new NextResponse(null, { status: 204 })
};
