import { prisma } from "@/database/prisma";
import { TloginRequest, loginSchema } from "@/schemas/login.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const POST = async (req: NextRequest, res: NextResponse) => {
  let body: TloginRequest;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

  try {
    const bodySerializer = loginSchema.parse(body);

    const findUser = await prisma.employee.findUnique({
      where: {
        email: bodySerializer.email
      }
    });

    if (!findUser) {
      return NextResponse.json({ message: "Email ou senha inválidos" }, { status: 401 });
    }

    const passwordMatch: boolean = await compare(bodySerializer.password, findUser!.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Email ou senha inválidos" }, { status: 401 });
    }

    const accessToken: string = sign(
      {
        email: findUser!.email,
        isAdmin: findUser!.isAdmin,
        type: "access"
      },
      String(process.env.NEXT_PUBLIC_SECRET_KEY),
      {
        expiresIn: process.env.NEXT_PUBLIC_ACCESS_TOKEN_LIFE || "1h",
        subject: String(findUser!.id)
      }
    );

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
