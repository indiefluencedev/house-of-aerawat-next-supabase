// src/components/Content2.jsx
import '../../css/content.css'

const cards = [
  { image: '/assets/img.jpg', title: 'Fine Jewellery' },
  { image: '/assets/img2.jpg', title: 'Shringaar' },
  { image: '/assets/img3.jpg', title: 'Kalapatt' },
  { image: '/assets/img4.jpg', title: 'Crystals' },
  { image: '/assets/img2.jpg', title: 'Crystals' },
  { image: '/assets/img.jpg', title: 'Treasured Gifts' },
]

const Content2 = () => {
  return (
    <div className="w-full h-[750px] flex items-center justify-center bg-white third">
      <div className="flex flex-col gap-[10px] h-full max-w-[1440px] px-[50px] py-[70px]">

        {/* Top Row */}
        <div className="flex gap-[10px]">
          {cards.slice(0, 3).map((card, index) => (
            <div
              key={index}
              className={`${index === 0 ? 'w-[658px]' : 'w-[431px]'} h-[300px] rounded-[8px] border border-gray-300 overflow-hidden relative card`}
            >
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 w-full bg-gradient-to-b via-white to-white text-center py-3">
                <h3 className="text-[#6a1b1a] font-semibold">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex gap-[10px]">
          {cards.slice(3).map((card, index) => (
            <div
              key={index + 3}
              className={`${index === 2 ? 'w-[658px]' : 'w-[431px]'} h-[300px] rounded-[8px] border border-gray-300 overflow-hidden relative card`}
            >
              <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 w-full bg-gradient-to-b via-white to-white text-center py-3">
                <h3 className="text-[#6a1b1a] font-semibold">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Content2
