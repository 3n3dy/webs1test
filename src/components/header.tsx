import { memo } from 'react';

const Header = memo(() => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-purple-500/30 backdrop-blur-md border-b border-purple-400/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Лого - клік повертає на верх */}
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
          className="w-12 h-12 rounded-lg hover:scale-110 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer"
          title="Повернутися на початок"
        >
          <img
            alt="Лого ЗВИЧАЇКА"
            className="w-full h-full object-contain"
            src="/public/favi1.png"
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
