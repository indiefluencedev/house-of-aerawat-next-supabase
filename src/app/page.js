// src/app/page.jsx - Main homepage
export const dynamic = 'force-dynamic';

import HomeBanner from '@/components/home/HomeBanner';
import Gallery from '@/components/home/Gallery';
import PurchaseSupport from '@/components/home/PurchaseSupport';
import HomeFeaturedProducts from '@/components/home/HomeFeaturedProducts';
import RecentlyViewed from '@/components/home/RecentlyViewed';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className=''>
      <HomeBanner />
      <Gallery />
      <PurchaseSupport />
      <HomeFeaturedProducts />
      <RecentlyViewed />
    </main>
  );
}
