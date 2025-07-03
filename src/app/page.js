// src/app/page.js
export const dynamic = 'force-dynamic'

import Content from '@/components/Home/content'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="p-10 text-center space-y-6">
<Content/>
    </main>
  )
}
