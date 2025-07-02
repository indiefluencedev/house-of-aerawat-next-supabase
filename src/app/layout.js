// src/app/layout.js
import './globals.css'
import Navbar from '@/app/components/users/Header' // Your custom header component
import Footer from '@/components/users/Footer' // Your custom footer component

export const metadata = {
  title: 'House of Aerawat',
  description: 'Jewellery and Handcrafted Items – Powered by Supabase',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen text-gray-900">
        {/* ✅ Custom Navbar */}
        <Navbar />

        {/* ✅ Main content */}
        <main className="max-w-screen-xl mx-auto">{children}</main>

        {/* ✅ Custom Footer */}
        <Footer />
      </body>
    </html>
  )
}
