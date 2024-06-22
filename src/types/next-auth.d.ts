// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    address: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      name: string;
      address: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
    name: string;
    address: string;
  }
}
