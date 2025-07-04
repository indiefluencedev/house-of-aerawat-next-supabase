// src/app/page.jsx - Main homepage
export const dynamic = 'force-dynamic';

import Content from '@/components/Home/content';

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <Content />
    </main>
  );
}
