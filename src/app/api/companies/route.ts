import { prisma } from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../utils";
import { TCreateCompany } from "@/interfaces/company.interfaces";
import { createcompanySchema } from "@/schemas/company.schema";
import { z } from "zod";

export const GET = async () => {
  const responseCompanies = await prisma.company.findMany();
  console.log("GET Companies", responseCompanies);
  return NextResponse.json(responseCompanies, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  let body: TCreateCompany;
  const authToken = req.headers.get("authorization");

  if (!authToken) {
    return NextResponse.json({ message: "Por favor informe o token de autorização" }, { status: 401 });
  }

  const { jwtErrorMessage, userEmail, userId, userIsAdmin } = validToken(authToken);

  if (jwtErrorMessage) {
    return NextResponse.json({ message: jwtErrorMessage }, { status: 401 });
  }

  if (!userIsAdmin) {
    return NextResponse.json(
      {
        message: "Apenas usuários adminstradores podem cadastrar empresas"
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
    const bodySerializer = createcompanySchema.parse(body);

    const category = await prisma.category.findUnique({
      where: {
        id: bodySerializer.categoryId
      }
    });

    if (!category) {
      return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
    }

    const newCompany = await prisma.company.create({
      data: bodySerializer
    });

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
