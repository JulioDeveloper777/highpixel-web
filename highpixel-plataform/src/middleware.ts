import { NextResponse, type MiddlewareConfig, type NextRequest } from "next/server";
import { Routes } from "./config/constants/routes";

const publicRoutes = [
  { path: '/auth/register', whenAuthenticated: 'redirect' },
  { path: '/auth/login', whenAuthenticated: 'redirect' },
  { path: '/auth/login/:id', whenAuthenticated: 'redirect' },
  // { path: '/auth/reset-password', whenAuthenticated: 'redirect' },
  // { path: '/auth/reset-password/:token', whenAuthenticated: 'redirect' },
  { path: '/', whenAuthenticated: 'redirect' },
];

// const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = Routes.REGISTER;

function isPublicRoute(currentPath: string) {
  // return publicRoutes.some(route => {
  //   if (!route.path.includes(':')) {
  //     return route.path === currentPath;
  //   }

  //   const routeSegments = route.path.split('/');
  //   const currentPathSegments = currentPath.split('/');

  //   if (routeSegments.length !== currentPathSegments.length) {
  //     return false;
  //   }

  //   for (let i = 0; i < routeSegments.length; i++) {
  //     const routeSegment = routeSegments[i];
  //     const currentSegment = currentPathSegments[i];

  //     if (routeSegment.startsWith(':')) {
  //       continue;
  //     }

  //     if (routeSegment !== currentSegment) {
  //       return false;
  //     }
  //   }

  //   return true;
  // });
}

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;

  // const authToken = request.cookies.get('token');
  // const isPublic = isPublicRoute(path);

  // if (!authToken && !isPublic) {
  //   const redirectUrl = request.nextUrl.clone();
  //   redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
  //   return NextResponse.redirect(redirectUrl);
  // }

  // if (authToken && isPublic) {
  //   if (path.startsWith(Routes.LOGIN())) {
  //     const token = path.split('/')[3];

  //     const redirectUrl = request.nextUrl.clone();

  //     // redirectUrl.pathname = Routes.COUPLE_ACCEPT_INVITE(token);

  //     return NextResponse.redirect(redirectUrl);
  //   }

  //   const redirectUrl = request.nextUrl.clone();
  //   redirectUrl.pathname = Routes.TIMELINE;
  //   return NextResponse.redirect(redirectUrl);
  // }

  return NextResponse.next();
}


export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
