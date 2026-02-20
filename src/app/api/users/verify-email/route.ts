import { redis } from "@/db/redis/redis";
import { Response } from "@/lib/api/Response";
import { UserService } from "@/service/user/user.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")
    const userEmail = await redis.get(`email-verify:${token}`)

    if(!userEmail) {
        return Response("Active link expired!", 401)
    }
    const response = await UserService.UpdateUserStatus(userEmail, { status: "ACTIVE" })

    if(response?.status !== 200) {
        return Response("Error to active user!", 500)
    }

    return Response("User actived successfully!", 200)

}