// app/signup/submit/route.js
import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabaseServer'

export async function POST(req) {
  const form = await req.formData()
  const email = form.get('email')
  const name = form.get('name')
  const phone = form.get('phone')

  const supabase = createSupabaseServerClient()

  const { data: existingUser } = await supabase
    .from('auth_users')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    return NextResponse.redirect(new URL('/signup?error=exists', req.url))
  }

  const { data, error } = await supabase.from('auth_users').insert({
    email,
    name,
    phone_number: phone,
    is_admin: false,
  })

  return NextResponse.redirect(new URL('/login', req.url))
}
