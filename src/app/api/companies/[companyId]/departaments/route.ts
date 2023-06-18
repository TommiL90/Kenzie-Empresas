import { prisma } from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validToken } from "../../../utils";

export const GET = async (
  req: NextRequest,
  {
    params
  }: {
    params: { companyId: string };
  }
) => {
  const authToken = req.headers.get("authorization");
  const { companyId } = params;

  if (!companyId) {
    return NextResponse.json({ message: "Por favor informe o id da compania" }, { status: 400 });
  }

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
    const departaments = await prisma.department.findMany({
      where: { companyId: companyId },
      include: { employees: true }
    });

    return NextResponse.json(departaments);
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
