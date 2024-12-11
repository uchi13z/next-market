import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN; // 環境変数から取得
  const origin = request.headers.get("Origin");

  if (origin && origin !== allowedOrigin) {
    return new NextResponse("CORS Error: Invalid Origin", { status: 403 });
  }

  const protectedRoutes = ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"];

  // OPTIONSリクエストの処理
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
    });
  }

  // 保護されたルートへのアクセス時のみJWT検証
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
      const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return new NextResponse("Invalid token", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
};
