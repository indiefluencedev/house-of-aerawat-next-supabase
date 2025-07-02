
import { FaShoppingCart, FaClock, FaArrowUp } from 'react-icons/fa'
import Frame from "../../../../public/assets/Frame.png"
import image from "../../../../public/assets/image.jpg"

const Content = () => {
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 bg-white/70"></div>

      <div
        className="relative z-10 max-w-2xl px-10"
        style={{
          position: 'absolute',
          bottom: '170px',
          left: '20px',
        }}
      >
        <h1 className="text-7xl font-bold text-gray-900 mb-4 con">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          Lorem ipsum dolor sit amet consectetur. Pellentesque tellus
          pellentesque volutpat eros sed magna. Malesuada sed lobortis orci
          leo leo at. At egestas purus dui mi.
        </p>
        <button className="bg-[#6a1b1a] text-white px-5 py-3 rounded-md font-semibold flex items-center gap-3 hover:bg-[#521413] transition">
          Explore Wooden Beads <img src={Frame.src} alt="Logo" />
        </button>
      </div>

      <div className="fixed right-0 top-1/3 flex flex-col bg-[#6a1b1a] text-white shadow-lg z-50">
        <div className="p-4 border-b border-white flex justify-center items-center cursor-pointer hover:bg-[#5a1615]">
          <FaShoppingCart size={20} />
        </div>
        <div className="p-4 border-b border-white flex justify-center items-center cursor-pointer hover:bg-[#5a1615]">
          <FaClock size={20} />
        </div>
        <div className="p-4 flex justify-center items-center cursor-pointer hover:bg-[#5a1615]">
          <FaArrowUp size={20} />
        </div>
      </div>
    </div>
  )
}

export default Content
