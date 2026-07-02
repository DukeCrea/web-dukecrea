import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const jar = await cookies();
  jar.delete('dc_panel');
  return NextResponse.redirect(new URL('/panel/login', req.url));
}
