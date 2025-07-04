import '../../css/content.css';

const PurchaseSupport = () => {
  const cardData = [
    {
      title: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet consectetur. Sagittis ipsum ante fusce malesuada condimentum at suscipit."
    },
    {
      title: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet consectetur. Sagittis ipsum ante fusce malesuada condimentum at suscipit."
    },
    {
      title: "Lorem ipsum dolor",
      description: "Lorem ipsum dolor sit amet consectetur. Sagittis ipsum ante fusce malesuada condimentum at suscipit."
    }
  ];

  const CardComponent = ({ data, className = "" }) => (
    <div
      className={` w-[380px] md:w-[317.33px] h-[155px] xl:w-[500px] xl:h-[186px] bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-4 xl:p-6 flex items-center gap-5 glass-card ${className}`}
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
    >
      <img src="/assets/leaf-icon.svg" alt="Leaf Icon" className="w-11 h-11" />
      <div>
        <h3 className="text-gray-800 text-lg font-semibold">{data.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{data.description}</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-4/5 bg-white py-20 px-2 flex flex-col justify-center items-center">
      <p className="mb-8 font-bold tracking-wdie text-[28px] md:text-[38px]">Your Purchase Supports</p>

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

      {/* Glassmorphism Cards Container */}
      <div className="max-w-[1340px] w-full z-10 justify-center mx-auto">

        {/* Desktop and Large Tablet (1024px+) - 3 cards in one row */}
        <div className="hidden lg:flex gap-3 xl:gap-10 justify-center">
          {cardData.map((card, index) => (
            <CardComponent key={`desktop-${index}`} data={card} />
          ))}
        </div>

        {/* Tablet (768px - 1023px) - 2 cards first row, 1 card second row centered */}
        <div className="hidden sm:flex lg:hidden flex-col gap-3 items-center">
          {/* First row - 2 cards */}
          <div className="flex gap-3 justify-center">
            {cardData.slice(0, 2).map((card, index) => (
              <CardComponent key={`tablet-top-${index}`} data={card} />
            ))}
          </div>
          {/* Second row - 1 card centered */}
          <div className="flex justify-center">
            <CardComponent data={cardData[2]} />
          </div>
        </div>

        {/* Mobile (480px and below) - 1 card per row, stacked vertically */}
        <div className="sm:hidden flex flex-col gap-3 items-center">
          {cardData.map((card, index) => (
            <CardComponent key={`mobile-${index}`} data={card} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default PurchaseSupport
