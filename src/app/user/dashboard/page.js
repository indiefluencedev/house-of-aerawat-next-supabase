// src/app/user/dashboard/page.js
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'

export default async function UserDashboard() {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('is_admin')?.value

  if (isAdmin === 'true') {
    redirect('/admin/dashboard')
  }

  return (
   <h1>hello</h1>
  )
}
