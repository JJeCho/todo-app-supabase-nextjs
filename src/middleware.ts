import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/todo/:path*', '/profile/:path*'],
};
