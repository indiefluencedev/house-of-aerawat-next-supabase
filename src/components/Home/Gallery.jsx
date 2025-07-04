// src/components/Content2.jsx
// import '../../css/content.css'

const cards = [
  { image: '/assets/img4.jpg',title: 'Fine Jewellery' },
  { image: '/assets/img.jpg',title: 'Shringaar' },
  { image: '/assets/img2.jpg',title: 'Kalapatt' },
  { image: '/assets/img.jpg', title: 'Crystals' },
  { image: '/assets/img2.jpg', title: 'Crystals' },
  { image: '/assets/img4.jpg', title: 'Treasured Gifts' }
]

const Gallery = () => {
  return (
    <div className="w-full h-auto xl:h-[750px] flex items-center justify-center bg-white third">
      <div className="flex flex-col gap-[10px] h-full max-w-full xl:max-w-[1440px] px-[15px] xl:px-[50px] py-[30px] xl:py-[70px]">

        {/* Desktop Layout - Hidden on mobile/tablet */}
        <div className="hidden lg:block">
          {/* Top Row */}
          <div className="flex gap-[10px] mb-[10px]">
            {cards.slice(0, 3).map((card, index) => (
              <div
                key={index}
                className={`${index === 0 ?  'w-[466px] xl:w-[658px]' : 'w-[233px] xl:w-[431px]'} h-[213px] xl:h-[300px] rounded-[8px] border border-gray-300 overflow-hidden relative card`}
              >
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                {/* Gradient overlay that fades from transparent to white */}
                <div className="absolute bottom-0 w-full h-[265px] bg-gradient-to-t from-white/95 via-white/70 via-white/40 to-transparent"></div>
                {/* Text container */}
                <div className="absolute bottom-0 w-full text-center py-3">
                  <h3 className="text-[#14397C] font-semibold">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="flex gap-[10px]">
            {cards.slice(3).map((card, index) => (
              <div
                key={index + 3}
                className={`${index === 2 ? 'w-[466px] xl:w-[658px]' : 'w-[233px] xl:w-[431px]'} h-[213px] xl:h-[300px] rounded-[8px] border border-gray-300 overflow-hidden relative card`}
              >
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                {/* Gradient overlay that fades from transparent to white */}
                <div className="absolute bottom-0 w-full h-[265px] bg-gradient-to-t from-white/95 via-white/70 via-white/40 to-transparent"></div>
                {/* Text container */}
                <div className="absolute bottom-0 w-full text-center py-3">
                  <h3 className="text-[#14397C] font-semibold">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout - Stacked cards */}
        <div className="lg:hidden flex flex-col gap-[8px] w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-full h-[280px] sm:h-[320px] md:h-[350px] rounded-[8px] border border-gray-300 overflow-hidden relative card"
            >
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              {/* Gradient overlay that fades from transparent to white */}
              <div className="absolute bottom-0 w-full h-[180px] bg-gradient-to-t from-white/95 via-white/70 via-white/40 to-transparent"></div>
              {/* Text container */}
              <div className="absolute bottom-0 w-full text-center py-3">
                <h3 className="text-[#14397C] font-semibold text-sm sm:text-base">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Gallery;
