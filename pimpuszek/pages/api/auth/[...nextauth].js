/*
https://www.youtube.com/watch?v=k_x6kGHhEns
https://www.youtube.com/watch?v=EL8eXM1sGaU
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // https://next-auth.js.org/adapters/dgraph#working-with-jwt-session-and-auth-directive
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "myCredetials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //credentials dane z frony, req to co w exptress Node
        // logika - walidacja usera, znajdowanie usera w bazie etc
        const dbUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (dbUser) {
          console.log(dbUser);
          if (dbUser.password == credentials.password) {
            return dbUser;
          }

          return null;
        }
      },
    }),
  ],

  // nadpisanie żeby zrobić dwój komponent do logowania https://youtu.be/EFucgPdjeNg?t=468
  // WARNING - problemy z foldererm app
  // pages: {
  //   signIn: "SignIn",
  // error: "/auth/error"
  // signOut: "/auth/error"
  // },
};
export default NextAuth(authOptions);
