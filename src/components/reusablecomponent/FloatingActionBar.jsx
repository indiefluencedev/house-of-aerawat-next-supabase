"use client";

const icons = [
  { src: "/assets/svgs/cart.svg", alt: "Cart", onClick: () => {/* Add cart logic if needed */} },
  { src: "/assets/svgs/refresh.svg", alt: "Refresh", onClick: () => window.location.reload() },
  { src: "/assets/svgs/scrolltotop.svg", alt: "Scroll to Top", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
];

function FloatingActionBar() {
  return (
    <div className="fixed right-0 top-1/2 z-50 flex flex-col">
      {icons.map((icon, idx) => (
        <button
          key={icon.alt}
          onClick={icon.onClick}
          className={`bg-[#14397C]  transition p-4 border-b border-white flex justify-center items-center cursor-pointer focus:outline-none
            ${idx === 0 ? "rounded-tl-sm" : ""}
            ${idx === icons.length - 1 ? "rounded-bl-sm border-b-0" : ""}
          `}
          style={{ width: 54, height: 54 }}
          type="button"
        >
          <img src={icon.src} alt={icon.alt} className="w-[24px] h-[24px] hover:scale-105" />
        </button>
      ))}
    </div>
  );
}

export default FloatingActionBar;
