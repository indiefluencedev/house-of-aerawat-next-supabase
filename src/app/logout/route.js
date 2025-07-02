// app/logout/route.js
import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL))
  response.cookies.delete('user_id')
  response.cookies.delete('is_admin')
  return response
}
