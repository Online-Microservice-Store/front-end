import { NextRequest, NextResponse } from "next/server";

// Define los roles como una enumeración
enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  TRADER = "TRADER"
}

// Define las rutas restringidas para cada rol
const restrictedRoutes: Record<Role, string[]> = {
  [Role.ADMIN]: [ "/admin", "/admin/invoices", "/admin/orders", "/admin/payments", "/admin/stores", "/admin/suscriptions",
     "/admin/users", "/admin/users/admins", "/admin/users/clients", "/admin/users/traders"], // Rutas restringidas para ADMIN
  [Role.CLIENT]: [ "/products/cartttt","/products/cartttt/payment","/products", "/products/:id", "/products/invoices", "/products/orders", "/products/invoices", "/products/invoices/invoicesStore", "/products/orders" ],          // Rutas restringidas para USER
  [Role.TRADER]: ["/trader", "/trader/stores", "/trader/users", "/trader/stores", "/trader/stores/clientes/:storeId", "/trader/stores/invoices/:id", "/trader/stores/orders/:id",
    "/trader/stores/create", "/trader/stores/catalogs/:id", "/trader/stores/catalogs/products/:id", "/trader/stores/catalogs/products/stocks/:id", "/trader/stores/catalogs/product/create"
    ,"/trader/stores/catalogs/createProduct/:id", "/trader/stores/catalogs/products/stocks/createStock/:id", "/trader/suscriptions", "/trader/suscriptions/:id"
    ,"/trader/stores/catalogs/createCatalog/:id",
  ],
};

// Middleware
// Middleware
export function middleware(request: NextRequest) {
  // Obtener el token de las cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname == '/products'){
      console.log('dentro de products')
      return NextResponse.next();
    }
    if (/^\/products\/[0-9a-fA-F-]{36}$/.test(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  const rawRole = request.cookies.get("rols")?.value;
  let userRole: Role | undefined;
  if (rawRole) {
    try {
      const parsedRole = JSON.parse(rawRole);
      userRole = Array.isArray(parsedRole) ? (parsedRole[0] as Role) : (parsedRole as Role);
    } catch {
      userRole = rawRole.replace(/[\[\]"]/g, "") as Role;
    }
  }

  if(userRole == 'ADMIN' && request.nextUrl.pathname == '/products'){
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if(userRole == 'TRADER' && request.nextUrl.pathname == '/products'){
    return NextResponse.redirect(new URL("/trader", request.url));
  }

  if (!userRole || !Object.values(Role).includes(userRole)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const currentPath = request.nextUrl.pathname;
  const allowedRoutes = restrictedRoutes[userRole] || [];

  // Validar si el usuario tiene acceso a la ruta actual
  const hasAccess = allowedRoutes.some((routePattern) => {
    const regex = new RegExp(
      "^" +
        routePattern
          .replace(/:[^/]+/g, "[^/]+") // Maneja rutas como "/trader/stores/:id"
          .replace(/\*/g, ".*") + // Maneja rutas como "/admin/:path*"
        "$"
    );
    return regex.test(currentPath);
  });

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Continuar si todo es válido
  return NextResponse.next();
}

// Configuración del matcher
export const config = {
  matcher: ["/products/:path*",
     "/trader/:path*",
      "/admin/:path*"],
};
