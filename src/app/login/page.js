import Image from 'next/image'
import { FaGoogle, FaEnvelope } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error
  const success = searchParams?.success

  return (
    <>
   
      <form action="/login/submit" method="POST">
        <div className="min-h-screen flex items-center justify-center bg-white border-t-1">
          <div className="w-full max-w-5xl flex">
            {/* Left Image */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-white p-10">
              <img
                src="/assets/aera.svg"
                alt="House Of Aerawat"
                className="w-[400px] h-[398px]"
              />
            </div>

            {/* Right Form */}
            <div className="w-1/2 p-10 border-l-2 border-gray-300">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Login via Email
              </h2>

              <button
                type="button"
                className="w-full flex items-center justify-center border border-black py-3 mb-6 text-black font-semibold hover:bg-gray-100 transition"
              >
                <FaGoogle className="mr-3" />
                Login with Google
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-sm text-gray-500">or continue with</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>

              <div className="flex items-center bg-gray-100 p-3 mb-4">
                <FaEnvelope className="text-gray-500 mr-3" />
                <input
                  name="email"
                  type="email"
                  placeholder="joesmith1234@gmail.com"
                  className="w-full bg-transparent outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6e1a1a] text-white py-3 font-semibold hover:bg-[#5c1616] transition"
              >
                Send Login Link
              </button>

              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-2 text-center">{success}</p>
              )}
            </div>
          </div>
        </div>
      </form>
  
    </>
  )
}
