// app/admin/dashboard/page.js
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const cookieStore = cookies()
  const isAdmin = cookieStore.get('is_admin')?.value

  if (isAdmin !== 'true') {
    redirect('/login')
  }

  return (
    <div className="p-10 text-2xl font-bold">
      Welcome Admin 👑
    </div>
  )
}
