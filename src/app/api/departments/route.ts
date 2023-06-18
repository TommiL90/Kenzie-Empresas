import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../utils";
import { prisma } from "@/database/prisma";

import { z } from "zod";
import { TCreateDepartment } from "@/interfaces/department.interfaces";
import { createDepartmentSchema } from "@/schemas/department.schema";

export const GET = async (req: NextRequest) => {
  const authToken = req.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 400 });
  }

  const { jwtErrorMessage, userEmail, userId, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem visualizar todos os departamentos"
      },
      { status: 401 }
    );
  }

  const departaments = await prisma.department.findMany();

  return NextResponse.json(departaments, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  let body: TCreateDepartment;
  const authToken = req.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 400 });
  }

  const { jwtErrorMessage, userEmail, userId, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem visualizar todos os departamentos"
      },
      { status: 401 }
    );
  }

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

  try {
    const bodySerializer = createDepartmentSchema.parse(body);

    const company = await prisma.company.findUnique({
      where: { id: bodySerializer.companyId }
    });

    if (!company) {
      return NextResponse.json({ message: "Empresa não encontrada" }, { status: 404 });
    }

    const newDepartament = await prisma.department.create({
      data: bodySerializer
    });

    return NextResponse.json(newDepartament, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
