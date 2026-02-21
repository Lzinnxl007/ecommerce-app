import { Response } from "@/lib/api/Response";
import { prisma } from "@/lib/prisma";
import { UserRegister } from "@/types/user/user.register";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof users>;

const UserRepository = {
  async CreateUser(user: UserRegister) {
    try {
      await db.insert(users).values(user);
      return Response("User created successfully!", 200);
    } catch (error) {
      if (error instanceof Error) {
        return Response(error.message, 500);
      }
    }
  },

  async GetUsers(email?: UserRegister["email"]): Promise<User[] | []> {
    try {
      const query = db.select().from(users);

      if (email) {
        return (await query.where(eq(users.email, email))) as User[];
      }
      return (await query) as User[];
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return [];
    }
  },

  async UpdateUserStatus(
    email: UserRegister["email"],
    data: Record<string, any>,
  ) {
    try {
      await db.update(users).set(data).where(eq(users.email, email));
      return Response("User status updated!", 200);
    } catch (error) {
      if (error instanceof Error) {
        return Response(error.message, 500);
      }
    }
  },
};

export { UserRepository };
