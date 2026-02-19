import { Response } from "@/lib/api/Response"
import { UserService } from "@/service/user/user.service"

export async function POST(request: Request) {
    const user = await request.json()

    const { name, email, password } = user

    if(!name || !email || !password) {
        return Response("User data not provided", 404)
    }

    return await UserService.CreateUser(user)
}