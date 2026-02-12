import { X, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <FileText className="w-8 h-8" />
            Політика конфіденційності
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 text-gray-700 leading-relaxed">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-600">
            <p className="text-lg text-gray-800">
              Ми цінуємо вашу довіру та дбаємо про безпеку вашої інформації. 
              Поки ви занурюєтесь у культуру своєї компанії та плануєте її розвиток за чашкою чаю, 
              проект <strong>«ЗВИЧАЇКА»</strong>{' '}
              забезпечує надійну роботу систем, зокрема й захист ваших даних.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">1.</span> Загальні положення
            </h3>
            <p className="mb-3">
              Ця Політика визначає порядок збору, обробки та зберігання персональних даних користувачів сайту. 
              Ми розробили її відповідно до:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">▸</span>
                <span>
                  Закону України{' '}
                  <a
                    href="https://zakon.rada.gov.ua/laws/show/2297-17#Text"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 underline font-medium"
                  >
                    «Про захист персональних даних»
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">▸</span>
                <span>
                  <a
                    href="https://gdpr-text.com/uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 underline font-medium"
                  >
                    GDPR (General Data Protection Regulation)
                  </a>
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">2.</span> Які дані ми збираємо
            </h3>
            <p className="mb-3">
              Ми збираємо дані лише у випадку, якщо ви вирішили співпрацювати з нами 
              та добровільно надали інформацію через форми зворотного зв'язку або анкети.
            </p>
            <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
              <p className="font-semibold text-gray-900 mb-2">Персональні дані:</p>
              <p>Ім'я, прізвище, номер телефону, адреса електронної пошти.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl mt-3">
              <p className="font-semibold text-gray-900 mb-2">Технічні дані:</p>
              <p>
                Сайт автоматично фіксує технічну інформацію (IP-адреса, cookies, дані браузера). 
                Ці дані зберігаються тимчасово та використовуються для коректної роботи сайту, 
                аналітики відвідуваності та захисту від спаму.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">3.</span> Навіщо ми використовуємо ваші дані
            </h3>
            <p className="mb-3">Ваша інформація допомагає нам зробити співпрацю максимально ефективною:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">▸</span>
                <span>Зв'язок з вами для консультацій та обговорення проектів</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">▸</span>
                <span>Підготовка пропозицій та комерційних пропозицій</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">▸</span>
                <span>Інформування про послуги та оновлення</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">4.</span> Як ми захищаємо дані
            </h3>
            <p className="mb-4">Ми використовуємо сучасні стандарти захисту для вашого спокою:</p>
            <div className="space-y-3">
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">🔒 Захищене з'єднання:</p>
                <p>Передача даних із сайту здійснюється через SSL-шифрування.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">💾 Внутрішня система обліку:</p>
                <p>
                  Після відправлення дані автоматично потрапляють до нашої внутрішньої системи обліку клієнтів, 
                  побудованої на базі захищених хмарних сервісів Google та CRM.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                <p className="font-semibold text-gray-900 mb-2">🛡️ Обмежений доступ:</p>
                <p>
                  Доступ до бази даних мають лише авторизовані спеціалісти проекту «ЗВИЧАЇКА» 
                  із застосуванням двофакторної автентифікації. Ми не зберігаємо персональні дані 
                  на сервері сайту довше, ніж це необхідно для їх технічної передачі в систему обліку.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">5.</span> Передача даних третім особам
            </h3>
            <p>
              Ми <strong>не продаємо і не передаємо</strong> ваші дані третім особам без вашої згоди, 
              за винятком випадків, передбачених законодавством України, або використання технічних сервісів 
              (CRM, Google Workspace), які забезпечують процес зберігання та обробки даних на умовах конфіденційності.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">6.</span> Ваші права
            </h3>
            <p className="mb-3">Як суб'єкт персональних даних, ви маєте право:</p>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">▸</span>
                <span>Отримати інформацію про те, які дані ми зберігаємо</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">▸</span>
                <span>Внести зміни або видалити свої дані</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1">▸</span>
                <span>Відкликати згоду на обробку даних у будь-який момент</span>
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">7.</span> Термін зберігання даних
            </h3>
            <p>
              Дані зберігаються протягом періоду, необхідного для досягнення цілей обробки, 
              або до моменту відкликання вашої згоди.
            </p>
          </section>

          {/* Section 8 - Contact */}
          <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span>8.</span> Контакти
            </h3>
            <p className="mb-3">З питань конфіденційності та обробки даних звертайтесь:</p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:hanna.ws.g@gmail.com"
                  className="underline hover:text-purple-200 transition-colors"
                >
                  hanna.ws.g@gmail.com
                </a>
              </p>
              <p>
                <strong>Телефон:</strong>{' '}
                <a
                  href="tel:+380950571649"
                  className="underline hover:text-purple-200 transition-colors"
                >
                  +380 95 057 16 49
                </a>
              </p>
            </div>
          </section>

          <section className="bg-gray-100 p-5 rounded-xl border-t-4 border-gray-300">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Останнє оновлення:</strong> 01 лютого 2026 р.
              <br />
              <span className="text-gray-600">
                Ми залишаємо за собою право оновлювати цю політику. 
                Зміни набувають чинності з моменту публікації на сайті.
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
