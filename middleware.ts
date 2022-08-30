import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api') && request.method == 'POST') {
  	let contentType = request.headers.get('content-type')

  	if (!contentType || contentType.indexOf("application/json") == -1) {
  		console.log('TODO: Return 400 due to lack of JSON');
  	}
  }
}