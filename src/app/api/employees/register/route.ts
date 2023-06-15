import { TEmployeeCreateRequest, TEmployeeReturn } from "@/interfaces/employee.interface";
import { prisma } from "@/database/prisma";
import { employeeRegisterSchema, employeeReturnSchema } from "@/schemas/employee.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  let body: TEmployeeCreateRequest;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "invalid body" }, { status: 400 });
  }

  try {
    const bodySerializer = employeeRegisterSchema.parse(body);

    const findUser = await prisma.employee.findUnique({
      where: {
        email: bodySerializer.email
      }
    });

    if (findUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 });
    }
    body.password = await hash(body.password, 10);
    const newEmployee = await prisma.employee.create({
      data: {
        ...body
      }
    });

    try {
      const responseEmployee = employeeReturnSchema.parse(newEmployee);
      return NextResponse.json(responseEmployee, { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ message: error.flatten().fieldErrors }, { status: 400 });
  }
};
