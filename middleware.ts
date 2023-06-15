// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { jwtVerify } from "jose";

// export default async function middleware(request: NextRequest) {
//   let cookie = request.cookies.get("@kenzie-empresas:token");
//   let token = cookie?.value;
//   const secretKey = new TextEncoder().encode(String(process.env.NEXT_PUBLIC_SECRET_KEY)); 
 
//   if (!token) return NextResponse.redirect(new URL("/login", request.url));
//   console.log(secretKey);

//   // if (request.nextUrl.pathname.startsWith("/login")) {
//   //   if (cookieToken) return NextResponse.redirect(new URL("/", request.url));
//   // }

//   try {
//     const { payload } = await jwtVerify(
//       token,
//       secretKey
//     );
//     console.log({ payload });
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login"]
// };
