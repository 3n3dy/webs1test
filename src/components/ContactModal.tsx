import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, FileText } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = memo(({ isOpen, onClose }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    phone: "",
    email: "",
    comment: "",
  });

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzVIp9HoUqL_Z1s3_J70BVqB4ieAQI81gFR_ql3UArRH5IrvEbLUlaVpBGZSgAB3kPc/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToPrivacy) {
      alert("Будь ласка, погодьтесь з Політикою конфіденційності");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        timestamp: new Date().toLocaleString("uk-UA"),
        type: "consultation", // ✅ ВАЖЛИВО: це ключове поле для розрізнення форм
        ...formData,
      };

      console.log("📤 Відправка даних:", payload);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      console.log("📥 Відповідь:", response.status);

      if (response.ok || response.redirected) {
        console.log("✅ Дані успішно відправлені!");
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setAgreedToPrivacy(false);
          setFormData({
            companyName: "",
            fullName: "",
            phone: "",
            email: "",
            comment: "",
          });
        }, 3000);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Помилка:", error);
      alert(
        "Помилка відправки. Спробуйте ще раз або зв'яжіться з нами: hanna.ws.g@gmail.com",
      );
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
            <div>
              <h2 className="text-3xl font-semibold mb-1">
                Замовити консультацію
              </h2>
              <p className="text-purple-100">
                Заповніть форму і ми зв'яжемося з вами
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Назва компанії */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Назва компанії *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="ТОВ 'ТОВЧИК'"
                  />
                </div>

                {/* 2. ПІБ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше прізвище та ім'я *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Українець Воля Соняшникович"
                  />
                </div>

                {/* 3. Телефон */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваш контактний номер телефону *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (!value.startsWith("380")) {
                        value = "380" + value;
                      }
                      setFormData({ ...formData, phone: value });
                    }}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="380950571649"
                    pattern="380[0-9]{9}"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Формат: 380XXXXXXXXX
                  </p>
                </div>

                {/* 4. Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Електронна адреса *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="individual@company.com"
                  />
                </div>

                {/* 5. Коментар */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Напишіть коментар чи запитання, якщо потрібно
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    rows={4}
                    placeholder="Ваше запитання або коментар..."
                  />
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToPrivacy}
                      onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                      className="w-5 h-5 text-purple-600 rounded mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700">
                      Відправляючи форму, я автоматично погоджуюсь із{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPrivacyPolicy(true);
                        }}
                        className="text-purple-600 hover:text-purple-700 underline font-medium"
                      >
                        Політикою конфіденційності
                      </button>{" "}
                      та надаю згоду на обробку моїх персональних даних
                      включаючи можливість отримання інформаційних повідомлень.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !agreedToPrivacy}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Відправка...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Відправити заявку
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Message */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 mb-3">
                  Дякуємо!
                </h3>
                <p className="text-gray-600 text-lg mb-2">
                  Ваша заявка відправлена успішно!
                </p>
                <p className="text-gray-500">
                  Ми зв'яжемося з вами найближчим часом.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Privacy Policy Popup */}
        {showPrivacyPolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowPrivacyPolicy(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
                <h2 className="text-3xl font-semibold flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  Політика конфіденційності
                </h2>
                <button
                  onClick={() => setShowPrivacyPolicy(false)}
                  className="hover:bg-white/20 rounded-full p-2 transition-all"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="p-8 space-y-6 text-gray-700 leading-relaxed">
                {/* Вступ */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-600">
                  <p className="text-lg text-gray-800">
                    Ми цінуємо вашу довіру та дбаємо про безпеку вашої
                    інформації. Поки ви занурюєтесь у культуру своєї компанії та
                    плануєте її розвиток за чашкою чаю, проект{" "}
                    <strong>«ЗВИЧАЇКА»</strong> забезпечує надійну роботу
                    систем, зокрема й захист ваших даних.
                  </p>
                </div>

                {/* Секція 1 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">1.</span> Загальні
                    положення
                  </h3>
                  <p className="mb-3">
                    Ця Політика визначає порядок збору, обробки та зберігання
                    персональних даних користувачів сайту. Ми розробили її
                    відповідно до:
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        <a
                          href="https://zakon.rada.gov.ua/laws/show/2297-17#Text"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline font-medium"
                        >
                          Закону України «Про захист персональних даних»
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        <a
                          href="https://gdpr-text.com/uk/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline font-medium"
                        >
                          Загального регламенту про захист даних (GDPR)
                          Європейського Союзу
                        </a>
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Секція 2 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">2.</span> Які дані ми
                    збираємо
                  </h3>
                  <p className="mb-4">
                    Ми збираємо дані лише у випадку, якщо ви вирішили
                    співпрацювати з нами та добровільно надали інформацію через
                    форми зворотного зв'язку або анкети.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-2">
                        Персональні дані:
                      </p>
                      <p>
                        Ім'я, прізвище, номер телефону, адреса електронної
                        пошти.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-2">
                        Технічні дані:
                      </p>
                      <p>
                        Сайт автоматично фіксує технічну інформацію (IP-адреса,
                        cookies, дані браузера). Ці дані зберігаються тимчасово
                        та використовуються для коректної роботи сайту,
                        аналітики відвідуваності та захисту від спаму.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Секція 3 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">3.</span> Мета обробки
                    даних
                  </h3>
                  <p className="mb-3">
                    Ваша інформація допомагає нам зробити співпрацю максимально
                    ефективною:
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        Надання консультацій та підготовка індивідуальних
                        пропозицій
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        Автоматизація процесів: після заповнення форми ваші дані
                        передаються до нашої внутрішньої системи обліку для
                        систематизації роботи
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        Інформування про послуги, новини проекту та спеціальні
                        пропозиції (у кожному листі ви знайдете кнопку
                        «Відписатися»)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>
                        Виконання договірних та переддоговірних зобов'язань
                      </span>
                    </li>
                  </ul>
                </section>

                {/* Секція 4 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">4.</span> Зберігання та
                    захист інформації
                  </h3>
                  <p className="mb-4">
                    Ми використовуємо сучасні стандарти захисту для вашого
                    спокою:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                      <p className="font-semibold text-gray-900 mb-2">
                        🔒 Захищене з'єднання:
                      </p>
                      <p>
                        Передача даних із сайту здійснюється через
                        SSL-шифрування.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                      <p className="font-semibold text-gray-900 mb-2">
                        💾 Внутрішня система обліку:
                      </p>
                      <p>
                        Після відправлення дані автоматично потрапляють до нашої
                        внутрішньої системи обліку клієнтів, побудованої на базі
                        захищених хмарних сервісів Google та CRM.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                      <p className="font-semibold text-gray-900 mb-2">
                        🛡️ Обмежений доступ:
                      </p>
                      <p>
                        Доступ до бази даних мають лише авторизовані спеціалісти
                        проекту «ЗВИЧАЇКА» із застосуванням двофакторної
                        автентифікації. Ми не зберігаємо персональні дані на
                        сервері сайту довше, ніж це необхідно для їх технічної
                        передачі в систему обліку.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Секція 5 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">5.</span> Передача третім
                    сторонам
                  </h3>
                  <p>
                    Ми <strong>не продаємо і не передаємо</strong> ваші дані
                    третім особам без вашої згоди, за винятком випадків,
                    передбачених законодавством України, або використання
                    технічних сервісів (CRM, Google Workspace), які забезпечують
                    процес зберігання та обробки даних на умовах
                    конфіденційності.
                  </p>
                </section>

                {/* Секція 6 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">6.</span> Ваші права
                  </h3>
                  <p className="mb-3">
                    Як суб'єкт персональних даних, ви маєте право:
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>
                        Знати, які дані ми обробляємо, та отримати до них доступ
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>
                        Вимагати виправлення або повного видалення ваших даних
                        із нашої системи
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>
                        Відкликати згоду на обробку даних у будь-який момент
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>Відмовитися від маркетингових повідомлень</span>
                    </li>
                  </ul>
                </section>

                {/* Секція 7 */}
                <section>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-purple-600">7.</span> Термін
                    зберігання
                  </h3>
                  <p>
                    Дані зберігаються протягом періоду, необхідного для
                    досягнення цілей обробки, або до моменту відкликання вашої
                    згоди.
                  </p>
                </section>

                {/* Секція 8 - Контакти */}
                <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <span>8.</span> Контактна інформація
                  </h3>
                  <p className="mb-3">
                    З питань конфіденційності та обробки даних звертайтесь:
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:hanna.ws.g@gmail.com"
                        className="underline hover:text-purple-200 transition-colors"
                      >
                        hanna.ws.g@gmail.com
                      </a>
                    </p>
                    <p>
                      <strong>Телефон:</strong>{" "}
                      <a
                        href="tel:+380950571649"
                        className="underline hover:text-purple-200 transition-colors"
                      >
                        +380 95 057 16 49
                      </a>
                    </p>
                  </div>
                </section>

                {/* Останнє оновлення */}
                <section className="bg-gray-100 p-5 rounded-xl border-t-4 border-gray-300">
                  <p className="text-sm text-gray-700">
                    <strong className="text-gray-900">
                      Останнє оновлення:
                    </strong>{" "}
                    01 лютого 2026 р.
                    <br />
                    <span className="text-gray-600">
                      Ми залишаємо за собою право оновлювати цю політику. Зміни
                      набувають чинності з моменту публікації на сайті.
                    </span>
                  </p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
});

ContactModal.displayName = "ContactModal";

export default ContactModal;