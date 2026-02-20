import { Response } from "@/lib/api/Response";
import { prisma } from "@/lib/prisma";
import { UserRegister } from "@/types/user/user.register";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const UserRepository = {
  async CreateUser(user: UserRegister) {
    const { name, email, password } = user;
    try {
      await db.insert(users).values(user);
      return Response("User created successfully!", 200);
    } catch (error) {
      if (error instanceof Error) {
        return Response(error.message, 500);
      }
    }
  },

  async GetUser(email: UserRegister["email"]) {
    try {
      const user = await db.select().from(users).where(eq(users.email, email));

      return user[0];
    } catch (error) {
      if (error instanceof Error) {
        return Response(error.message, 500);
      }
    }
  },

  async UpdateUserStatus(email: UserRegister["email"], data: Record<string, any>) {
    try {
      await db.update(users).set(data).where(eq(users.email, email))
      return Response("User status updated!", 200);
    } catch (error) {
      if (error instanceof Error) {
        return Response(error.message, 500);
      }
    }
  }
};

export { UserRepository };
