// src/app/page.jsx - Main homepage
export const dynamic = 'force-dynamic';

import HomeBanner from '@/components/Home/HomeBanner';
import Gallery from '@/components/Home/Gallery';
import PurchaseSupport from '@/components/Home/PurchaseSupport';
import HomeFeaturedProducts from '@/components/Home/HomeFeaturedProducts';
import RecentlyViewed from '@/components/Home/RecentlyViewed';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className=''>
      <HomeBanner />
      <Gallery />
      <PurchaseSupport />
      <HomeFeaturedProducts/>
      <RecentlyViewed/>
    </main>
  );
}
