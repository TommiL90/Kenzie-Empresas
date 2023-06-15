import { prisma } from "@/database/prisma";
import { hireUser } from "@/schemas/company.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validToken } from "../../utils";

type TBody = z.infer<typeof hireUser>;

export const POST = async (req: NextRequest) => {
  const authToken = req.headers.get("authorization");
  let body: TBody;

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
        message: "Apenas usuários adminstradores podem contratar usuários."
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
    const bodySerializer = hireUser.parse(body);

    const checkUser = await prisma.employee.findUnique({
      where: {
        id: bodySerializer.user_uuid
      }
    });

    if (!checkUser) {
      return NextResponse.json({ message: "Usuário não encontrado, por favor verifique o id informado" }, { status: 404 });
    }

    if (checkUser.department_id !== null) {
      return NextResponse.json(
        {
          message:
            'Funcionário já vinculado a um departamento, para alterar o departamento deste funcionário utilize a rota "atualizar dados do Funcionário"'
        },
        { status: 401 }
      );
    }

    const checkDepartament = await prisma.department.findUnique({
      where: {
        id: bodySerializer.department_uuid
      },
      include: { company: true }
    });

    if (!checkDepartament) {
      return NextResponse.json({ message: "Departamento não encontrado, por favor verifique o id informado" }, { status: 404 });
    }

    const hireEmployee = await prisma.employee.update({
      where: {
        id: bodySerializer.user_uuid
      },
      data: {
        department_id: bodySerializer.department_uuid,
        company_id: checkDepartament.id
      }
    });

    const { password, ...rest } = hireEmployee
    return NextResponse.json({
        message: `Funcionário contratado para o departamento ${checkDepartament.name}`,
        employee: rest
      }, { status: 200 });
  
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
