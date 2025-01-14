import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Leer las cookies desde los headers
  const token = request.cookies.get("token")?.value; // Reemplaza "token" con el nombre de tu cookie
  console.log("Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL("/authentication/login", request.url)); // Redirigir al login si no hay token
  }

  return NextResponse.next(); // Continuar si hay token
}

export const config = {
  matcher: "/cartttt/payment",
};
