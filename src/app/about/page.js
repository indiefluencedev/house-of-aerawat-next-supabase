import Aboutbanner from '@/components/About/aboutbanner'
import Defining from '@/components/About/Defining'
import OurMissionVision from '@/components/About/OurMissionVision'
import Tradition from '@/components/About/Tradition'
import PurchaseSupport from '@/components/Home/PurchaseSupport'
import React from 'react'

function page() {
  return (
    <div>
        <Aboutbanner/>
        <Tradition/>
        <Defining/>
        <OurMissionVision/>
        <PurchaseSupport/>
    </div>
  )
}

export default page
