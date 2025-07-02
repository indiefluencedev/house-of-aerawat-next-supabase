import { NextResponse } from 'next/server'

export async function POST(req) {
  const response = NextResponse.redirect(new URL('/login', req.url))

  response.cookies.set('user_id', '', {
    maxAge: 0,
    path: '/',
  })
  response.cookies.set('is_admin', '', {
    maxAge: 0,
    path: '/',
  })

  return response
}
