/*
https://www.youtube.com/watch?v=k_x6kGHhEns
https://www.youtube.com/watch?v=EL8eXM1sGaU
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        if (dbUser) {
          console.log(dbUser);
          if (dbUser.password == credentials.password) {
            return dbUser;
          }
        }
        return null;
      },
    }),
  ],
};
export default NextAuth(authOptions);
