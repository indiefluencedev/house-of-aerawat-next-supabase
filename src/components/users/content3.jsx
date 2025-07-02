import '/src/app/css/content.css'

const Content3 = () => {
  return (
    <div className="relative w-full h-4/5 bg-white py-20 px-12 flex flex-col justify-center items-center">
      <p className="mb-8 name">Your Purchase Supports</p>

      <img
        src="/assets/right-mandala.svg"
        alt="Left Decoration"
        className="absolute left-1 top-[62.5%] transform -translate-y-1/2 w-[199px] h-[405px] z-0"
      />

      <img
        src="/assets/left-mandala.svg"
        alt="Right Decoration"
        className="absolute right-1 top-[62.5%] transform -translate-y-1/2 w-[199px] h-[405px] z-0"
      />

      <div className="flex gap-10 z-10">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="w-[400px] h-[200px] bg-[#FBFBFB] rounded-xl shadow-md p-6 flex items-center gap-5"
          >
            <img src="/assets/leaf-icon.svg" alt="Leaf Icon" className="w-11 h-11" />
            <div>
              <h3 className="text-gray-800 text-lg font-semibold">Lorem ipsum dolor</h3>
              <p className="text-gray-500 text-sm mt-1">
                Lorem ipsum dolor sit amet consectetur. Sagittis ipsum ante fusce malesuada
                condimentum at suscipit.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content3
