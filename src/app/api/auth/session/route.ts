import { Response } from "@/lib/api/Response";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("user_token")?.value

  if (!token) {
    return Response("User not authenticated!", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  return Response(decoded, 200);
}
