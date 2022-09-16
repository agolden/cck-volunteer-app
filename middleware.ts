import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getUserContext } from '@/components/api-helpers';

export async function middleware(request: NextRequest) {

  const allowedWithoutAuth = [
    /^\/log(in|outt?)$/,
    /^\/register$/,
    /^\/_next\//,
    /\.(png|ico|json)$/,
    /^\/api\/auth\//,
    /^\/api\/cck\/route\//
  ];

  const isAuthRequired = !allowedWithoutAuth.some(rx => rx.test(request.nextUrl.pathname));

  if (isAuthRequired) {
    try {
      await getUserContext(request);
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