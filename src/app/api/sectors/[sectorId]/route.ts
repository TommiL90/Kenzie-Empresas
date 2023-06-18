import { prisma } from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params
  }: {
    params: { sectorId: string };
  }
) => {
  if (!params.sectorId) {
    return NextResponse.json(
      {
        message: "Por favor indique un id do setor"
      },
      { status: 400 }
    );
  }
  
  const category = await prisma.category.findUnique({
    where: {
      id: params.sectorId
    },
    include: { companies: true }
  });

  if (!category) {
    return NextResponse.json(
      {
        message: "Categoria não encontrada, por favor verifique as categorias disponíveis e tente novamente"
      },
      { status: 400 }
    );
  }

  return NextResponse.json(category, { status: 200 });
};
