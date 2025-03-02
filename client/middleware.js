import { NextResponse } from "next/server";

export default function middleware(request) {
  console.log(request);
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;
  console.log(role);
  if (pathname.startsWith("/account") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*"],
};
