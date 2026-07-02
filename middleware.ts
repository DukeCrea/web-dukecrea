import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { readSession } from '@/lib/session';

const SECRET = process.env.SESSION_SECRET || '';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // La página de login siempre es accesible.
  if (pathname === '/panel/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get('dc_panel')?.value;
  const session = await readSession(token, SECRET);

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/panel/login';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/panel', '/panel/:path*'],
};
