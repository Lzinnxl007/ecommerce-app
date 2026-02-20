import { redis } from "@/db/redis/redis";
import { Response } from "@/lib/api/Response";
import { UserService } from "@/service/user/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const userEmail = await redis.get(`email-verify:${token}`);

  if (!userEmail) {
    return NextResponse.redirect(
      new URL("/email-verified?success=false", request.url),
    );
  }
  const response = await UserService.UpdateUserStatus(userEmail, {
    status: "ACTIVE",
  });

  if (response?.status !== 200) {
    return NextResponse.redirect(
      new URL("/email-verified?success=false", request.url)
    )
  }

  return NextResponse.redirect(
    new URL("/email-verified?success=true", request.url),
  );
}
