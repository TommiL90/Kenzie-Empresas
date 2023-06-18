import { hireUser } from "@/schemas/company.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validToken } from "../../utils";
import { prisma } from "@/database/prisma";

type TBody = z.infer<typeof hireUser>;

export const PATCH = async (req: NextRequest) => {
  const authToken = req.headers.get("authorization");
  let body: Pick<TBody, "userId">;

  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 400 });
  }

  const { jwtErrorMessage, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem dimitir usuários."
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
    const bodySerializer = hireUser.omit({ departmentId: true }).parse(body);

    const checkUser = await prisma.employee.findUnique({
      where: {
        id: bodySerializer.userId
      }
    });

    if (!checkUser) {
      return NextResponse.json({ message: "Usuário não encontrado, por favor verifique o id informado" }, { status: 404 });
    }

    if (checkUser.departamentId === null) {
      return NextResponse.json(
        {
          message:
            'Funcionário não esta vinculado a um departamento, para alterar o departamento deste funcionário utilize a rota "atualizar dados do Funcionário"'
        },
        { status: 401 }
      );
    }

    const dismissEmployee = await prisma.employee.update({
      where: {
        id: bodySerializer.userId
      },
      data: {
        companyId: null,
        departamentId: null
      }
    });

    const { password, ...rest } = dismissEmployee;

    return NextResponse.json(
      {
        message: `Funcionário demitido`,
        employee: rest
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
