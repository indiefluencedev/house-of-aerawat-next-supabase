"use client";
import "../../css/FloatingActionBar.css";

const icons = [
  { src: "/assets/svgs/cart.svg", alt: "Cart", onClick: () => {/* Add cart logic if needed */} },
  { src: "/assets/svgs/refresh.svg", alt: "Refresh", onClick: () => window.location.reload() },
  { src: "/assets/svgs/scrolltotop.svg", alt: "Scroll to Top", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
];

function FloatingActionBar() {
  return (
    <div className="fab-fixed-center">
      {icons.map((icon, idx) => (
        <button
          key={icon.alt}
          onClick={icon.onClick}
          className="fab-btn"
          type="button"
        >
          <img
            src={icon.src}
            alt={icon.alt}
            className="fab-icon"
          />
        </button>
      ))}
    </div>
  );
}

export default FloatingActionBar;
