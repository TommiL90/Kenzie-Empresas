import { verify, VerifyErrors } from "jsonwebtoken";
export const validToken = (authToken: string) => {
  const token: string = authToken.split(" ")[1];

  let userId: string = "";
  let userEmail: string = "";
  let userIsAdmin: boolean = false;
  let jwtErrorMessage: string | null = null;

  verify(
    token,
    String(process.env.NEXT_PUBLIC_SECRET_KEY),
    (error: VerifyErrors | null, decoded: any) => {
      if (error) {
        jwtErrorMessage = error.message;
      } else {
        userId = decoded.sub;
        userEmail = decoded.email;
        userIsAdmin = decoded.isAdmin;
      }

      return;
    }
  );

  return { jwtErrorMessage, userId, userEmail, userIsAdmin };
};
