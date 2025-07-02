import '@/css/Footer.css'

const Footer = () => {
  return ( 
    <footer className="flex flex-col items-center text-center space-y-10 py-10 bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <img src="/assets/aerawat.svg" alt="House of Aerawat" className="w-full h-24" />
        <p className="max-w-3xl text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur. Felis sit lorem eleifend
          scelerisque odio tincidunt. Lorem ipsum dolor sit amet consectetur.
          Felis sit lorem eleifend scelerisque odio tincidunt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Shop by Category</h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <ul className="space-y-2">
              <li>Fine Jewelery</li>
              <li>Shringaar</li>
              <li>Kalapatt</li>
            </ul>
            <ul className="space-y-2">
              <li>Crystals</li>
              <li>Wooden Beads</li>
              <li>Treasured Gifts</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-center">
          <h3 className="text-lg font-semibold mb-4">Got A Query? Contact Us:</h3>
          <p className="text-gray-700">Tel: +91 12345 67890</p>
          <p className="text-gray-700">Mail: houseofaerawat@info.com</p>
          <div className="flex justify-start md:justify-end space-x-4 mt-4 text-xl">
            <img
              src="/assets/insta.png"
              alt="instagram"
              className="h-15 w-15 transform transition-transform duration-300 hover:scale-110"
            />
            <img
              src="/assets/face.png"
              alt="facebook"
              className="h-15 w-15 transform transition-transform duration-300 hover:scale-110"
            />
            <img
              src="/assets/what.svg"
              alt="whatsapp"
              className="h-15 w-15 transform transition-transform duration-300 hover:scale-110"
            />
            <img
              src="/assets/link.svg"
              alt="linkedin"
              className="h-15 w-15 transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer