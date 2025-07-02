import { NextResponse } from 'next/server'

export async function GET(req) {
  const cookies = req.cookies
  const userId = cookies.get('user_id')?.value

  if (userId) {
    return NextResponse.redirect(new URL('/profile', req.url))
  } else {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
