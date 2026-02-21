import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Response } from "@/lib/api/Response";
import { UserService } from "@/service/user/user.service";
import crypto from "node:crypto";
import { User } from "@/types/user/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const user = await request.json();

  const { email, password } = user;

  if (!email || !password) {
    return Response("User data not provided!", 401);
  }

  const findedUsers = (await UserService.GetUsers(email));

  const [ first ] = findedUsers

  if (!first) {
    return Response("User not finded!", 400);
  }

  if (first.status !== "ACTIVE") {
    return Response("User is not active!", 401);
  }

  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");

  if (hashedPassword !== first.password) {
    return Response("User credentials are invalid!", 401);
  }

  const token = jwt.sign(
    {
      id: first.id,
      name: first.name,
      email: first.email,
      status: first.status,
      role: first.role
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  const cookiesStore = cookies();

  cookiesStore.set({
    name: "user_token",
    value: token,
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  return Response("User login successfully", 200)
}
