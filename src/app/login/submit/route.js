import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req) {
  const form = await req.formData()
  const email = form.get('email')
  const password = form.get('password')

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login?error=Missing fields', req.url))
  }

  const supabase = createSupabaseServerClient()

  const { data: user, error } = await supabase
    .from('auth_users')
    .select('id, is_admin, password')
    .eq('email', email)
    .single()

  if (error || !user) {
    return NextResponse.redirect(new URL('/login?error=Invalid email', req.url))
  }

  // Compare password (in real-world apps, hash it)
  if (user.password !== password) {
    return NextResponse.redirect(new URL('/login?error=Incorrect password', req.url))
  }

  // Login success
  const response = NextResponse.redirect(
    new URL(user.is_admin ? '/admin/dashboard' : '/user/dashboard', req.url)
  )

  // Save to cookies
  response.cookies.set('user_id', user.id, { httpOnly: true })
  response.cookies.set('is_admin', String(user.is_admin), { httpOnly: true })

  return response
}
