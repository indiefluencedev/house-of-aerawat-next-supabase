import '../../css/content.css';

const RecentlyViewed = () => {
  return (
    <div className="px-10 py-8 relative h-full mx-auto mt-14 mb-44">
      <h2 className="text-3xl font-bold mb-6 text-center">Recently Viewed Items</h2>

      <div className="flex justify-center flex-wrap gap-6 relative">
        {/* Left Arrow */}
        <div className="absolute left-40 top-1/2 transform -translate-y-1/2">
          <img
            src="/assets/left.png"
            alt="Previous"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
        </div>

        {/* Static Items */}
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="relative"
            style={{ width: '274px', height: '335px' }}
          >
            <img
              src="/assets/sample.jpg"
              alt="Product Name"
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute bottom-0 left-0 botton">
              <p className="text-sm font-semibold">Product Name</p>
              <p className="text-md font-bold">₹999</p>
            </div>
          </div>
        ))}

        {/* Right Arrow */}
        <div className="absolute right-40 top-1/2 transform -translate-y-1/2">
          <img
            src="/assets/right.png"
            alt="Next"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
        </div>
      </div>
    </div>
  )
}

export default RecentlyViewed
