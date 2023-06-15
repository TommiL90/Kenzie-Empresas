import { validToken } from "@/app/api/utils";
import { prisma } from "@/database/prisma";
import { employeesListSchema } from "@/schemas/employee.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  const authToken = req.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json(
      "Categoria inválida, por favor verifique o id da categoria informada e tente novamente",
      { status: 401 }
    );
  }

  const { jwtErrorMessage, userEmail, userId, userIsAdmin } =
    validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json(jwtErrorMessage, { status: 401 });
  }

  const user = await prisma.employee.findUnique({
    where: { email: userEmail },
  });

  if (!user?.department_id) {
    return NextResponse.json(
      "usuario não se encontra registrado em nenhum departamento.",
      { status: 401 }
    );
  }
  const departament = await prisma.department.findUnique({
    where: { id: user.department_id },
    include: { company: true },
  });

  const departaments = await prisma.department.findMany({
    where: { company_id: departament?.company_id },
  });

  return NextResponse.json(departaments, { status: 200 });

  //   try {
  //     const resCoworkers = employeesListSchema.parse(coworkers);
  //     return NextResponse.json(resCoworkers, { status: 200 });
  //   } catch (error) {
  //     if (error instanceof z.ZodError)
  //       return NextResponse.json(
  //         { message: error.flatten().fieldErrors },
  //         { status: 400 }
  //       );
  //   }
};
