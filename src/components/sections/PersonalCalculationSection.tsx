import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import MultiStepFormModal from '../MultiStepFormModal';

export const PersonalCalculationSection = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-16 bg-white pb-14">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl font-semibold text-xl hover:shadow-2xl hover:scale-105 transition-all shadow-xl"
          >
            <div className="text-center">
              <div className="text-3xl font-semibold mb-3">
                Замовити безкоштовний прорахунок
              </div>
              <div className="text-base font-normal opacity-90">
                Натисніть, щоб заповнити форму та дізнайтесь приблизну вартість та терміни
              </div>
            </div>
          </button>

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
              href="tel:+380950571649"
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:shadow-lg hover:scale-110 transition-all shadow-md"
            >
              <svg className="w-6 h-6 fill-purple" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      <MultiStepFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
});

PersonalCalculationSection.displayName = 'PersonalCalculationSection';
