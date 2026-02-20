import { Response } from "@/lib/api/Response";
import { prisma } from "@/lib/prisma";
import { UserRegister } from "@/types/user/user.register";
import { db } from "@/db";
import { users } from "@/db/schema";

const UserRepository = {
    async CreateUser(user: UserRegister) {
        const { name, email, password } = user
        try {
            await db.insert(users).values(user)
            return Response("User created successfully!", 200)
        } catch (error) {
            if(error instanceof Error) {
                return Response(error.message, 500)
            }
        }
    }
}

export { UserRepository }