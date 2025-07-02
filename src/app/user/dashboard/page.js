// src/app/user/dashboard/page.js
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Content from '@/components/users/content'
import Content2 from '@/components/users/content2'
import Content3 from '@/components/users/content3'
import Content4 from '@/components/users/content4'
import RecentlyViewed from '@/components/users/content5'
export const dynamic = 'force-dynamic'

export default async function UserDashboard() {
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('is_admin')?.value

  if (isAdmin === 'true') {
    redirect('/admin/dashboard')
  }

  return (
    <div className="bg-white">
   
      <Content/>
      <Content2/>
      <Content3/>
      <Content4/>
      <RecentlyViewed/>
    </div>
  )
}
