import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// Gets JWT from auth or cookie headers
export function getJWTFromRequest(request: NextRequest) {

  // TODO: Accept as cookie -OR- as authorization header
  return request.cookies.get("AuthJWT");
}

export async function middleware(request: NextRequest) {

  const allowedWithoutAuth = [
    /^\/log(in|outt?)$/,
    /^\/register$/,
    /^\/_next\//,
    /\.(png|ico|json)$/,
    /^\/api\/auth\//
  ];

  const isAuthRequired = !allowedWithoutAuth.some(rx => rx.test(request.nextUrl.pathname));

  if (isAuthRequired) {
    try {
      var jwt = getJWTFromRequest(request);
      const verified = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SS)
      )
      return NextResponse.next();
    } catch (err) {
      if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.rewrite(new URL('/api/auth/unauthorized', request.url))
      } else {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
  	
    if (request.method == 'POST') {
      let contentType = request.headers.get('content-type')

      if (!contentType || contentType.indexOf("application/json") == -1) {
        console.log('TODO: Return 400 due to lack of JSON');
      }
    }
  }
}