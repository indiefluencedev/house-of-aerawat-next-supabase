// src/app/layout.js
import './globals.css';
import Navbar from '@/components/navigation/navbar'; // Your custom header component
import Footer from '@/components/navigation/Footer'; // Your custom footer component
import FloatingActionBar from '@/components/constants/FloatingActionBar';
import MobileHeader from '@/components/navigation/MobileHeader';

export const metadata = {
  title: 'House of Aerawat',
  description: 'Jewellery and Handcrafted Items – Powered by Supabase',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        {/* Google Fonts links */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* ✅ Custom Navbar (desktop only) */}
        <div className='hidden xl:block'>
          <Navbar />
        </div>
        {/* ✅ Mobile Header (mobile/tablet only) */}
        <div className='block xl:hidden'>
          <MobileHeader />
        </div>

        {/* ✅ Main content */}
        <main className=''>{children}</main>
        <Footer />
        <FloatingActionBar />
      </body>
    </html>
  );
}
