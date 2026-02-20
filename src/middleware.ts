import { NextResponse } from "next/server";
import type { NextRequest, MiddlewareConfig } from "next/server";
import { cookies } from "next/headers";
import { Response } from "./lib/api/Response";

export async function middleware(request: Request) {
    const cookiesStore = cookies()
    const token = cookiesStore.get("token")

    if(!token) {
        return Response("User not authenticated!", 401)
    }
    NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: ["/api/users/login"]
}