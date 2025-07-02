import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req) {
  const form = await req.formData()
  const email = form.get('email')
  const name = form.get('name')
  const phone = form.get('phone')
  const password = form.get('password')
  const confirmPassword = form.get('confirm_password')

  if (password !== confirmPassword) {
    return NextResponse.redirect(new URL('/signup?error=Passwords do not match', req.url))
  }

  const supabase = createSupabaseServerClient()

  const { data: existingUser } = await supabase
    .from('auth_users')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    return NextResponse.redirect(new URL('/signup?error=Email already exists', req.url))
  }

  const { error } = await supabase.from('auth_users').insert({
    email,
    name,
    phone_number: phone,
    password,
    is_admin: false,
  })

  if (error) {
    return NextResponse.redirect(new URL('/signup?error=Signup failed', req.url))
  }

  return NextResponse.redirect(new URL('/login?success=Account created', req.url))
}
