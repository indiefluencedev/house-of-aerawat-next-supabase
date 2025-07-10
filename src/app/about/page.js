import Aboutbanner from '@/components/about/Aboutbanner';
import AboutCaraousel from '@/components/about/AboutCaraousel';
import Defining from '@/components/about/Defining';
import OurMissionVision from '@/components/about/OurMissionVision';
import Tradition from '@/components/about/Tradition';
import PurchaseSupport from '@/components/home/PurchaseSupport';
import React from 'react';

function page() {
  return (
    <div>
      <Aboutbanner />
      <Tradition />
      <Defining />
      <OurMissionVision />
      <PurchaseSupport />
      <AboutCaraousel />
    </div>
  );
}

export default page;
