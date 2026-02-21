import { NextResponse } from "next/server";
import type { NextRequest, MiddlewareConfig } from "next/server";
import { Response } from "@/lib/api/Response";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("user_token")?.value

    if(!token) {
        return Response("User not authenticated!", 401)
    }
    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: ["/api/users/register"]
}