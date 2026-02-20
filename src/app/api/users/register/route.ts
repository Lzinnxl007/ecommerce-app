import { redis } from "@/db/redis/redis"
import { Response } from "@/lib/api/Response"
import { UserService } from "@/service/user/user.service"
import type { NextRequest } from "next/server"
import crypto, { randomBytes } from "node:crypto"

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

    const response = await UserService.CreateUser(user)

    if(response?.status !== 200) {
        return Response("Error to create user!", 500)
    }

    const verifyEmailToken = randomBytes(32).toString("hex")

    await redis.set(`email-verify:${verifyEmailToken}`, email, { EX: 60 * 10 })

    const url = new URL("/api/users/verify-email", request.url)
    const params = url.searchParams
    params.set("token", verifyEmailToken)

    return Response(url, 200)
}