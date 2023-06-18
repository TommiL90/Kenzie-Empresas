import { TEditDepartment } from "@/interfaces/department.interfaces";
import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../../utils";
import { prisma } from "@/database/prisma";
import { editDepartmentSchema } from "@/schemas/department.schema";
import { z } from "zod";

export const PATCH = async (
  req: NextRequest,
  {
    params
  }: {
    params: { departamentId: string };
  }
) => {
  let body: TEditDepartment;
  const authToken = req.headers.get("authorization");
  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 401 });
  }
  const { jwtErrorMessage, userEmail, userId, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!params.departamentId) {
    return NextResponse.json({ message: "Departamento não encontrado, por favor verifique o id informado" }, { status: 404 });
  }

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem atualizar estas informações."
      },
      { status: 401 }
    );
  }

  const departament = await prisma.department.findUnique({
    where: { id: params.departamentId }
  });

  if (!departament) {
    return NextResponse.json({ message: "departament not found" }, { status: 404 });
  }

  try {
    const updatedDepartament = await prisma.department.update({
      where: {
        id: params.departamentId
      },
      data: editDepartmentSchema.parse(body)
    });

    return NextResponse.json(updatedDepartament, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params
  }: {
    params: { departamentId: string };
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

  if (!params.departamentId) {
    return NextResponse.json({ message: "Departamento não encontrado, por favor verifique o id informado" }, { status: 404 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem atualizar estas informações."
      },
      { status: 401 }
    );
  }

  const departament = await prisma.employee.findUnique({
    where: { id: params.departamentId }
  });

  if (!departament) {
    return NextResponse.json({ message: "Departament not found" }, { status: 404 });
  }

  await prisma.employee.updateMany({
    where: { departamentId: params.departamentId },
    data: {
      companyId: null,
      departamentId: null
    }
  });

  await prisma.employee.delete({
    where: {
      id: params.departamentId
    }
  });

  return NextResponse.json("", { status: 204 });
};
