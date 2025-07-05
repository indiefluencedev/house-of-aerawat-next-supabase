import RecentlyViewed from '@/components/Home/RecentlyViewed'
import ProductDetailPage from '@/components/Products/ProductDetailPage'
import React from 'react'

function page() {
  return (
    <div>
        <ProductDetailPage/>
        <RecentlyViewed/>
    </div>
  )
}

export default page
