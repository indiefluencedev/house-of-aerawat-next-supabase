import '/src/app/css/content.css'

const Content4 = ({ products }) => {


  return (
    <div className="py-16 px-12 max-w-screen-xl mx-auto mt-14">
      <div className="mb-4 text-gray-400 text-sm">
        Lorem ipsum dolor sit amet consectetur.
      </div>
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Featured Products</h2>

      

      <div className="mt-12 flex justify-center">
        <a href="#">
          <button className="bg-[#7C1D1D] text-white text-sm font-medium h-14 w-56 rounded-md gap-2 hover:bg-[#5d1515] transition flex items-center justify-center">
            View All Products
            <img src="/assets/Frame.png" alt="Frame logo" className="ml-2" />
          </button>
        </a>
      </div>
    </div>
  )
}

export default Content4