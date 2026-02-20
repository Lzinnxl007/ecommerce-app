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

  const findedUser = (await UserService.GetUser(email)) as User;

  if (!findedUser) {
    return Response("User not finded!", 400);
  }

  if (findedUser.status !== "ACTIVE") {
    return Response("User is not active!", 401);
  }

  const hash = crypto.createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");

  if (hashedPassword !== findedUser.password) {
    return Response("User credentials are invalid!", 401);
  }

  const token = jwt.sign(
    {
      id: findedUser.id,
      name: findedUser.name,
      email: findedUser.email,
      status: findedUser.status,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  const cookiesStore = cookies();

  cookiesStore.set({
    name: "user_token",
    value: token,
    httpOnly: true,
    secure: true,
  });
}
