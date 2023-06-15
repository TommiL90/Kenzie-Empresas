import { prisma } from "@/database/prisma";
import { employeesListSchema } from "@/schemas/employee.schema";
import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../utils";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const authToken = req.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json(
      { message: "Por favor informe o token de autorização" },
      { status: 401 }
    );
  }

  const { jwtErrorMessage, userEmail, userId, userIsAdmin } =
    validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message:
          "Apenas usuários adminstradores podem visualizar todos os funcionários",
      },
      { status: 401 }
    );
  }

  try {
    const employees = await prisma.employee.findMany();

    const responseEmployees = employeesListSchema.parse(employees);
    return NextResponse.json(responseEmployees);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 }
      );
  }
};
