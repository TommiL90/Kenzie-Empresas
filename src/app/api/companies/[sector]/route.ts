import { prisma } from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { sector: string };
  }
) => {

  if(!params.sector){
    return NextResponse.json(
      {
        message:
          "Por favor indique un id do setor",
      },
      { status: 400 }
    );
  }

  const categoryName = await prisma.category.findUnique({
    where: {
      name: params.sector,
    },
  });


  if (!categoryName) {
    return NextResponse.json(
      {
        message:
          "Categoria não encontrada, por favor verifique as categorias disponíveis e tente novamente",
      },
      { status: 400 }
    );
  }

  const companies = await prisma.company.findMany({
    where: {
      category_id: categoryName.id,
    },
  });

  if (!companies) {
    return NextResponse.json(
      {
        message:
          "Categoria inválida, por favor verifique o id da categoria informada e tente novamente",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(companies, { status: 200 });
};
