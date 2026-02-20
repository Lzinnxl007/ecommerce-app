import { Response } from "@/lib/api/Response"
import { UserService } from "@/service/user/user.service"
import type { NextRequest } from "next/server"
import crypto from "node:crypto"

export async function POST(request: NextRequest) {
    const user = await request.json()

    const { name, email, password } = user

    if(!name || !email || !password) {
        return Response("User data not provided", 404)
    }

    const findedUser = await UserService.GetUser(email)

    if(findedUser) {
        return Response("User already exist!", 401)
    }

    const hash = crypto.createHash("sha256")
    hash.update(password)
    user.password = hash.digest("hex")

    return await UserService.CreateUser(user)
}