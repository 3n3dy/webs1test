import { memo, useState, useEffect, useRef } from 'react';

const Header = memo(() => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Самий верх — завжди показуємо
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Скролимо вниз — ховаємо
        setIsVisible(false);
      } else {
        // Скролимо вгору — показуємо
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-purple-500/30 backdrop-blur-md border-b border-purple-400/50
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-lg hover:scale-110 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer"
          title="Повернутися на початок"
        >
          <img
            alt="Лого ЗВИЧАЇКА"
            className="w-full h-full object-contain"
            src="/favicon.png"
          />
        </button>

        <div className="flex-1 text-center px-4">
          <div className="inline-block">
            <span className="block text-white font-bold text-xl drop-shadow-md">ПРОЄКТ ЗВИЧАЇКА</span>
            <span className="block text-purple-100 text-sm">Корпоративна екосистема управління знаннями та адаптацією</span>
          </div>
        </div>

        <div className="w-12"></div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';
export default Header;
