// app/login/submit/route.js
import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req) {
  const form = await req.formData()
  const email = form.get('email')

  const supabase = createSupabaseServerClient()

  const { data: user, error } = await supabase
    .from('auth_users')
    .select('id, is_admin')
    .eq('email', email)
    .single()

  if (!user) {
    return NextResponse.redirect(new URL('/login?error=notfound', req.url))
  }

  const response = NextResponse.redirect(
    new URL(user.is_admin ? '/admin/dashboard' : '/user/dashboard', req.url)
  )

  // Save user session in cookie
  response.cookies.set('user_id', user.id, { httpOnly: true })
  response.cookies.set('is_admin', String(user.is_admin), { httpOnly: true })

  return response
}
