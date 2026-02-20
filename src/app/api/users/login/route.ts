import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { Response } from "@/lib/api/Response"

export async function POST(request: NextRequest) {
    console.log("oi")
    return Response("ok", 200)
}