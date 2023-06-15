import { prisma } from "@/database/prisma";
import { employeeReturnSchema } from "@/schemas/employee.schema";
import { NextRequest, NextResponse } from "next/server";
import { validToken } from "../../utils";

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

  const user = await prisma.employee.findUnique({
    where: { email: userEmail },
  });

  if (user == null) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const responseUser = employeeReturnSchema.parse(user);
  return NextResponse.json(responseUser, { status: 200 });
};
