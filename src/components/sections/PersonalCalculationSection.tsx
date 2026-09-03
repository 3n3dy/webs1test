import { memo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MultiStepFormModal from "../MultiStepFormModal";

export const PersonalCalculationSection = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const pointerStartX = useRef(0);
  const pointerCurrentX = useRef(0);
  const isPointerDragging = useRef(false);
  const isSwipeGesture = useRef(false);

  const services = [
    [
      {
        title: "Wiki-бази, Notion, ClickUp",
        desc: "Створення та налаштування систем управління",
        price: "350 грн/год",
      },
      {
        title: "Бізнес-процеси та SOPs",
        desc: "Опис та формування інструкцій і процедур",
        price: "350 грн/год",
      },
      {
        title: "Супровід, автоматизація та AI",
        desc: "Інтеграція з CRM та AI-рішеннями",
        price: "400 грн/год",
      },
    ],
    [
      {
        title: 'Операційний менеджер "на день"',
        desc: "Аналіз та виконання операційних задач",
        price: "2200 грн/день (8 год)",
      },
      {
        title: "Онбординг співробітників",
        desc: "Супровід бізнесу в адаптації персоналу",
        price: "400 грн/год",
      },
      {
        title: "Міграція між системами",
        desc: "Trello → Asana, Notion без втрати даних",
        price: "350 грн/год",
      },
    ],
    [
      {
        title: "Систематизація Google Drive",
        desc: "Структурована база з хаосу файлів",
        price: "350 грн/год",
      },
      {
        title: "Документування процесу",
        desc: "Найм персоналу, обробка замовлень тощо",
        price: "350 грн/год",
      },
    ],
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, services.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest("[data-nav], [data-close], a, button")
    ) {
      return;
    }

    pointerStartX.current = e.clientX;
    pointerCurrentX.current = e.clientX;
    isPointerDragging.current = true;
    isSwipeGesture.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDragging.current) {
      return;
    }

    pointerCurrentX.current = e.clientX;

    if (Math.abs(pointerCurrentX.current - pointerStartX.current) > 8) {
      isSwipeGesture.current = true;
    }
  };

  const handlePointerEnd = () => {
    if (!isPointerDragging.current) {
      return;
    }

    const diff = pointerStartX.current - pointerCurrentX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isPointerDragging.current = false;
    window.setTimeout(() => {
      isSwipeGesture.current = false;
    }, 0);
  };

  const handleClosePanel = () => {
    if (isSwipeGesture.current) {
      return;
    }

    setIsFlipped(false);
  };

  return (
    <div className="py-16 bg-white pb-14">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Кнопка прорахунку */}
          {!isFlipped && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl font-semibold text-xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl"
            >
              <div className="text-center">
                <div className="text-3xl font-semibold mb-3">
                  Замовити безкоштовний прорахунок
                </div>
                <div className="text-base font-normal opacity-90">
                  Натисніть, щоб заповнити форму та дізнайтесь приблизну
                  вартість та терміни
                </div>
              </div>
            </button>
          )}

          {/* Flip Card */}
          <div
            className="flip-card-container relative"
            style={{
              perspective: "2000px",
              minHeight: isFlipped ? "360px" : "auto",
            }}
          >
            <div
              className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
              style={{
                minHeight: "auto",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* FRONT */}
              <div
                className="flip-card-front"
                onClick={() => setIsFlipped(true)}
              >
                <button className="w-full py-4 px-6 bg-white border-4 border-purple-600 text-purple-600 rounded-3xl font-semibold hover:shadow-2xl hover:scale-105 transition-all shadow-lg cursor-pointer">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                      Окремі послуги
                    </div>
                    {/* Галочка */}
                    <div className="flex justify-center">
                      <ChevronDown className="w-6 h-6 text-purple-400 animate-bounce" />
                    </div>
                  </div>
                </button>
              </div>

              {/* BACK */}
              {isFlipped && (
                <div
                  className="flip-card-back"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 10,
                    pointerEvents: "auto",
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  onPointerLeave={handlePointerEnd}
                >
                  <div
                    className="w-full bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-5 relative select-none cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                  >
                    {/* Заголовок - МОЖНА КЛІКАТИ ДЛЯ ЗАКРИТТЯ */}
                    <h3
                      className="text-lg font-bold text-center mb-3 cursor-pointer"
                      data-close
                      onClick={handleClosePanel}
                    >
                      Окремі послуги ({currentSlide + 1}/{services.length})
                    </h3>

                    {/* Слайди з навігацією */}
                    <div className="relative">
                      {/* Стрілка ліворуч */}
                      <button
                        data-nav
                        onClick={(e) => {
                          e.stopPropagation();
                          prevSlide();
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        disabled={currentSlide === 0}
                      >
                        <ChevronDown className="w-5 h-5 rotate-90" />
                      </button>

                      {/* Контент - НЕ МОЖНА КЛІКАТИ */}
                      <div className="px-8">
                        <div className="space-y-2">
                          {services[currentSlide].map((service, idx) => (
                            <div
                              key={idx}
                              className="bg-white/10 rounded-lg p-2.5 hover:bg-white/20 transition-all"
                            >
                              <p className="font-semibold text-sm">
                                {service.title}
                              </p>
                              <p className="text-white/90 text-xs mt-0.5">
                                {service.desc}
                              </p>
                              <p className="text-yellow-300 font-bold text-xs mt-1">
                                → {service.price}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Стрілка праворуч */}
                      <button
                        data-nav
                        onClick={(e) => {
                          e.stopPropagation();
                          nextSlide();
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        disabled={currentSlide === services.length - 1}
                      >
                        <ChevronDown className="w-5 h-5 -rotate-90" />
                      </button>
                    </div>

                    {/* Dots індикатор - МОЖНА КЛІКАТИ ДЛЯ ЗАКРИТТЯ */}
                    <div
                      className="flex justify-center gap-1.5 mt-3 cursor-pointer"
                      data-close
                      onClick={handleClosePanel}
                    >
                      {services.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentSlide
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Контакти */}
          {!isFlipped && (
            <>
              <div className="flex items-center gap-3 text-sm text-gray-500 justify-center">
                <div className="h-px bg-gray-300 w-16"></div>
                <span>або зв'яжіться з нами</span>
                <div className="h-px bg-gray-300 w-16"></div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://t.me/bonnie_benay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all shadow-md"
                >
                  <img
                    alt="Telegram"
                    className="w-8 h-8"
                    src="https://img.icons8.com/color/48/telegram-app.png"
                  />
                </a>
                <a
                  href="viber://chat?number=380950571649"
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all shadow-md"
                >
                  <img
                    alt="Viber"
                    className="w-8 h-8"
                    src="https://img.icons8.com/color/48/viber.png"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61571510310773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all shadow-md"
                >
                  <img
                    alt="Facebook"
                    className="w-8 h-8"
                    src="https://img.icons8.com/color/48/facebook-new.png"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/hanna-marchak-90b642344/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all shadow-md"
                >
                  <img
                    alt="LinkedIn"
                    className="w-8 h-8"
                    src="https://img.icons8.com/color/48/linkedin.png"
                  />
                </a>
                <a
                  href="tel:+380950571649"
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all shadow-md"
                >
                  <svg className="w-6 h-6 fill-purple" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <MultiStepFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

PersonalCalculationSection.displayName = "PersonalCalculationSection";
