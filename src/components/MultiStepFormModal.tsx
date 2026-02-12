import { useState, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Send,
  Check,
  FileText,
} from "lucide-react";

interface MultiStepFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MultiStepFormModal = memo(
  ({ isOpen, onClose }: MultiStepFormModalProps) => {
    const [step, setStep] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

    const [formData, setFormData] = useState({
      // Блок 1: Ідентифікація
      companyName: "",
      fullName: "",
      position: "",
      contacts: "",
      phone: "", // ✅ НОВИЙ ПУНКТ
      industry: "",
      employeeCount: "",
      companyAge: "",

      // Блок 2: Корпоративна культура
      hasMissionValues: "",
      informalEventsFrequency: "",
      hasRituals: "",
      teamAtmosphere: "",
      hasOnboarding: "",
      onboardingEase: "5",
      knowsWhereToGoWithIdeas: "",

      // Блок 3: Комунікації
      mainCommunicationChannel: "",
      hasInfoGaps: "",
      usesTaskManagers: "",
      timeSpentExplaining: "",
      hasKnowledgeBase: "",
      hasOneOnOneMeetings: "",

      // Блок 4: Операційні процеси
      hasProcessDocumentation: "",
      whoControlsQuality: "",
      hasFirefighting: "",
      hasIrreplaceable: "",
      howHandleVacations: "", // ✅ ЗМІНЕНО НА SELECT
      howHandleVacationsOther: "", // ✅ ДЛЯ "ІНШЕ"
      hasClearResponsibilities: "",
      taskDuplicationFrequency: "",

      // Блок 5: Управління часом
      deadlineAdherence: "5",
      hasWorkSchedule: "",
      hasWorkScheduleOther: "",
      ownerOperationalPercent: "",
      ownerOperationalPercentOther: "",
      hasScheduledBreaks: "",
      hasScheduledBreaksOther: "",

      // Блок 6: Делегування та контроль
      trustsTeam: "",
      trustsTeamOther: "",
      hasReportingSystem: "",
      hasReportingSystemOther: "",
      hasKPIs: "",
      hasKPIsOther: "",
      howMeasureAdminSuccess: "",
      feedbackFrequency: "",
      feedbackFrequencyOther: "",

      // Блок 7: Проблемні зони
      mainStressSource: "",
      hasTurnover: "",
      hasTurnoverOther: "",
      decisionSpeed: "",
      decisionSpeedOther: "",
      tasksLostInChats: "",
      tasksLostInChatsOther: "",
      resistanceToNewRules: "",
      resistanceToNewRulesOther: "",
      hasDepartmentConflicts: "",

      // Блок 8: Очікування
      mainProblemToSolve: "",
      mainGoal: "",
      mainGoalOther: "",
      howHeardAbout: "",
      howHeardAboutOther: "",
      budget: "", // ✅ ЗМІНЕНО НАЗВУ ПОЛЯ
      budgetOther: "", // ✅ ДЛЯ "ІНШЕ"
      // preferredFormat: '', // ✅ ВИДАЛЕНО
      idealSystemDescription: "",
      readyForCall: "",
    });

    // ✅ ВСТАВТЕ ВАШ GOOGLE SCRIPT URL ТУТ:
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzVIp9HoUqL_Z1s3_J70BVqB4ieAQI81gFR_ql3UArRH5IrvEbLUlaVpBGZSgAB3kPc/exec";

    const handleSubmit = async () => {
      if (!agreedToPrivacy) {
        alert("Будь ласка, погодьтесь з Політикою конфіденційності");
        return;
      }

      setIsSubmitting(true);
      try {
        const payload = {
          timestamp: new Date().toLocaleString("uk-UA"),
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
            setStep(1);
            setIsSuccess(false);
            setAgreedToPrivacy(false);
            // Скидання форми
            setFormData({
              companyName: "",
              fullName: "",
              position: "",
              contacts: "",
              phone: "",
              industry: "",
              employeeCount: "",
              companyAge: "",
              hasMissionValues: "",
              informalEventsFrequency: "",
              hasRituals: "",
              teamAtmosphere: "",
              hasOnboarding: "",
              onboardingEase: "5",
              knowsWhereToGoWithIdeas: "",
              mainCommunicationChannel: "",
              hasInfoGaps: "",
              usesTaskManagers: "",
              timeSpentExplaining: "",
              hasKnowledgeBase: "",
              hasOneOnOneMeetings: "",
              hasProcessDocumentation: "",
              whoControlsQuality: "",
              hasFirefighting: "",
              hasIrreplaceable: "",
              howHandleVacations: "",
              howHandleVacationsOther: "",
              hasClearResponsibilities: "",
              taskDuplicationFrequency: "",
              deadlineAdherence: "5",
              hasWorkSchedule: "",
              hasWorkScheduleOther: "",
              ownerOperationalPercent: "",
              ownerOperationalPercentOther: "",
              hasScheduledBreaks: "",
              hasScheduledBreaksOther: "",
              trustsTeam: "",
              trustsTeamOther: "",
              hasReportingSystem: "",
              hasReportingSystemOther: "",
              hasKPIs: "",
              hasKPIsOther: "",
              howMeasureAdminSuccess: "",
              feedbackFrequency: "",
              feedbackFrequencyOther: "",
              mainStressSource: "",
              hasTurnover: "",
              hasTurnoverOther: "",
              decisionSpeed: "",
              decisionSpeedOther: "",
              tasksLostInChats: "",
              tasksLostInChatsOther: "",
              resistanceToNewRules: "",
              resistanceToNewRulesOther: "",
              hasDepartmentConflicts: "",
              mainProblemToSolve: "",
              mainGoal: "",
              mainGoalOther: "",
              howHeardAbout: "",
              howHeardAboutOther: "",
              budget: "",
              budgetOther: "",
              idealSystemDescription: "",
              readyForCall: "",
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

    const nextStep = () => {
      if (step < 8) {
        setStep(step + 1);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }
    };

    const prevStep = () => {
      if (step > 1) {
        setStep(step - 1);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }
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
                  Діагностика компанії
                </h2>
                <p className="text-purple-100">Крок {step} з 8</p>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 8) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              <div
                ref={scrollContainerRef}
                className="p-6 overflow-y-auto max-h-calc(90vh-220px)"
              ></div>
              <AnimatePresence mode="wait">
                {/* БЛОК 1: Ідентифікація */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      🏢 Ідентифікація (База)
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Назва вашої компанії *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="ТОВ 'ТОВЧИК'"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ПІБ особи, яка заповнює анкету *
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ваша роль/посада в компанії *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.position}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Директор / Власник / HR-менеджер"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Контакти для зв'язку (Email/Telegram) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contacts}
                        onChange={(e) =>
                          setFormData({ ...formData, contacts: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="individual@company.com або @username"
                      />
                    </div>

                    {/* ✅ НОВИЙ ПУНКТ: Номер телефону */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Номер мобільного телефону *
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Сфера діяльності (ніша) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="IT, Маркетинг, Виробництво, Послуги..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Кількість співробітників у штаті *
                      </label>
                      <select
                        required
                        value={formData.employeeCount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            employeeCount: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="1-5 осіб">1-5 осіб</option>
                        <option value="6-15 осіб">6-15 осіб</option>
                        <option value="16-30 осіб">16-30 осіб</option>
                        <option value="31-50 осіб">31-50 осіб</option>
                        <option value="Більше 50 осіб">Більше 50 осіб</option>
                      </select>
                    </div>

                    {/* ✅ ЗМІНЕНО: Вік компанії */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Вік компанії на ринку *
                      </label>
                      <select
                        required
                        value={formData.companyAge}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            companyAge: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="до року">до року</option>
                        <option value="1-4">1-4</option>
                        <option value="5 років">5 років</option>
                        <option value="понад 5 років">понад 5 років</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* БЛОК 2: Корпоративна культура */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      ☕ Корпоративна культура та «Звичаї»
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є у компанії прописана місія та цінності, які знають
                        усі працівники? *
                      </label>
                      <select
                        required
                        value={formData.hasMissionValues}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasMissionValues: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, є і всі знають">
                          Так, є і всі знають
                        </option>
                        <option value="Є, але не всі знають">
                          Є, але не всі знають
                        </option>
                        <option value="В процесі створення">
                          В процесі створення
                        </option>
                        <option value="Ні, немає">Ні, немає</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Як часто у вас відбуваються спільні неформальні заходи?
                        *
                      </label>
                      <select
                        required
                        value={formData.informalEventsFrequency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            informalEventsFrequency: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Щодня (чай/кава)">
                          Щодня (чай/кава)
                        </option>
                        <option value="Щотижня">Щотижня</option>
                        <option value="Щомісяця">Щомісяця</option>
                        <option value="Раз на кілька місяців">
                          Раз на кілька місяців
                        </option>
                        <option value="Практично ніколи">
                          Практично ніколи
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи існують у вас «ритуали»? (ранкові наради, підсумки
                        тижня) *
                      </label>
                      <select
                        required
                        value={formData.hasRituals}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasRituals: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, регулярно">Так, регулярно</option>
                        <option value="Іноді">Іноді</option>
                        <option value="Ні, немає">Ні, немає</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Як би ви описали атмосферу в колективі трьома словами? *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.teamAtmosphere}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            teamAtmosphere: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Дружня, динамічна, стресова..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є у вас «книга новачка» (Onboarding)? *
                      </label>
                      <select
                        required
                        value={formData.hasOnboarding}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasOnboarding: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, детальна">Так, детальна</option>
                        <option value="Є базова інформація">
                          Є базова інформація
                        </option>
                        <option value="Ні, все усно">Ні, все усно</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Наскільки легко новий співробітник адаптується? (від 1
                        до 10) *
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={formData.onboardingEase || 5}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              onboardingEase: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <span className="text-2xl font-semibold text-purple-600 w-12 text-center">
                          {formData.onboardingEase || 5}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Дуже складно</span>
                        <span>Дуже легко</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи знають працівники, до кого йти з ідеєю щодо
                        покращення роботи? *
                      </label>
                      <select
                        required
                        value={formData.knowsWhereToGoWithIdeas}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            knowsWhereToGoWithIdeas: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, це зрозуміло">
                          Так, це зрозуміло
                        </option>
                        <option value="Частково">Частково</option>
                        <option value="Ні, не знають">Ні, не знають</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* БЛОК 3: Комунікації */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      💬 Комунікації (Інформаційні потоки)
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Де відбувається основне робоче спілкування? *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.mainCommunicationChannel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mainCommunicationChannel: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Telegram, Email, Viber, Slack, CRM..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи часто виникають ситуації «я цього не чув» або «мені
                        не казали»? *
                      </label>
                      <select
                        required
                        value={formData.hasInfoGaps}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasInfoGaps: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Дуже часто">Дуже часто</option>
                        <option value="Іноді">Іноді</option>
                        <option value="Рідко">Рідко</option>
                        <option value="Практично ніколи">
                          Практично ніколи
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи використовуєте ви таск-менеджери? *
                      </label>
                      <select
                        required
                        value={formData.usesTaskManagers}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            usesTaskManagers: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, активно (Asana, Trello, Jira)">
                          Так, активно (Asana, Trello, Jira)
                        </option>
                        <option value="Використовуємо, але не всі">
                          Використовуємо, але не всі
                        </option>
                        <option value="Пробували, але не прижилося">
                          Пробували, але не прижилося
                        </option>
                        <option value="Ні, все в месенджерах">
                          Ні, все в месенджерах
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Скільки часу в день керівник витрачає на роз'яснення
                        завдань вручну? *
                      </label>
                      <select
                        required
                        value={formData.timeSpentExplaining}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            timeSpentExplaining: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Менше години">Менше години</option>
                        <option value="1-2 години">1-2 години</option>
                        <option value="3-4 години">3-4 години</option>
                        <option value="5+ годин (більшу частину дня)">
                          5+ годин (більшу частину дня)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є у вас єдина база знань/регламентів? *
                      </label>
                      <select
                        required
                        value={formData.hasKnowledgeBase}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasKnowledgeBase: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, систематизована (Wiki, Notion)">
                          Так, систематизована (Wiki, Notion)
                        </option>
                        <option value="Є файли на Google Drive">
                          Є файли на Google Drive
                        </option>
                        <option value="Частково, розкидано">
                          Частково, розкидано
                        </option>
                        <option value="Ні, все в головах">
                          Ні, все в головах
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи проводяться у вас регулярні зустрічі 1-на-1 з
                        персоналом? *
                      </label>
                      <select
                        required
                        value={formData.hasOneOnOneMeetings}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasOneOnOneMeetings: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, регулярно">Так, регулярно</option>
                        <option value="Іноді">Іноді</option>
                        <option value="Тільки при проблемах">
                          Тільки при проблемах
                        </option>
                        <option value="Ні, не проводяться">
                          Ні, не проводяться
                        </option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* БЛОК 4: Операційні процеси */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      ⚙️ Операційні процеси та стандарти
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи описані ключові бізнес-процеси у вигляді схем чи
                        інструкцій? *
                      </label>
                      <select
                        required
                        value={formData.hasProcessDocumentation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasProcessDocumentation: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, детально">Так, детально</option>
                        <option value="Частково">Частково</option>
                        <option value="Тільки основні">Тільки основні</option>
                        <option value="Ні, нічого не описано">
                          Ні, нічого не описано
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Хто контролює якість виконання завдань? *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.whoControlsQuality}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            whoControlsQuality: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                        placeholder="Власник, керівник відділу, кожен сам..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи часто виникають «пожежі», які доводиться гасити
                        власнику особисто? *
                      </label>
                      <select
                        required
                        value={formData.hasFirefighting}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasFirefighting: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Щодня">Щодня</option>
                        <option value="Кілька разів на тиждень">
                          Кілька разів на тиждень
                        </option>
                        <option value="Іноді">Іноді</option>
                        <option value="Рідко">Рідко</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи замінна кожна людина в команді? *
                      </label>
                      <select
                        required
                        value={formData.hasIrreplaceable}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasIrreplaceable: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, процеси дозволяють швидко замінити">
                          Так, процеси дозволяють швидко замінити
                        </option>
                        <option value="Частково, деякі замінні">
                          Частково, деякі замінні
                        </option>
                        <option value="Є 1-2 'зірки', без яких все зупиниться">
                          Є 1-2 'зірки', без яких все зупиниться
                        </option>
                        <option value="Кожен незамінний">
                          Кожен незамінний
                        </option>
                      </select>
                    </div>

                    {/* ✅ ЗМІНЕНО: SELECT замість textarea */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Як ви передаєте справи, якщо людина йде у відпустку? *
                      </label>
                      <select
                        required
                        value={formData.howHandleVacations}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            howHandleVacations: e.target.value,
                            howHandleVacationsOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Є система де все чітко видно, проблем немає">
                          Є система де все чітко видно, проблем немає
                        </option>
                        <option value="Працівник змушений описати все від А до Я перед відпусткою">
                          Працівник змушений описати все від А до Я перед
                          відпусткою
                        </option>
                        <option value="В останній день комусь швидко передаються справи">
                          В останній день комусь швидко передаються справи
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {/* ✅ ДОДАНО: Текстове поле для "Інше" */}
                      {formData.howHandleVacations === "Інше" && (
                        <textarea
                          value={formData.howHandleVacationsOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              howHandleVacationsOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є чіткий розподіл зон відповідальності? *
                      </label>
                      <select
                        required
                        value={formData.hasClearResponsibilities}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasClearResponsibilities: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, все чітко">Так, все чітко</option>
                        <option value="В цілому так">В цілому так</option>
                        <option value="Частково, є перетини">
                          Частково, є перетини
                        </option>
                        <option value="Ні, часто незрозуміло хто за що відповідає">
                          Ні, часто незрозуміло хто за що відповідає
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Наскільки часто робочі завдання дублюються різними
                        людьми? *
                      </label>
                      <select
                        required
                        value={formData.taskDuplicationFrequency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            taskDuplicationFrequency: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Часто">Часто</option>
                        <option value="Іноді">Іноді</option>
                        <option value="Рідко">Рідко</option>
                        <option value="Практично ніколи">
                          Практично ніколи
                        </option>
                      </select>
                    </div>
                  </motion.div>
                )}
                {/* БЛОК 5: Управління часом */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      ⏳ Управління часом (Пісочний годинник)
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи дотримуються в компанії дедлайнів? (від 1 до 10) *
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={formData.deadlineAdherence || 5}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              deadlineAdherence: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <span className="text-2xl font-semibold text-purple-600 w-12 text-center">
                          {formData.deadlineAdherence || 5}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Ніколи</span>
                        <span>Завжди</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є у працівників чіткий графік роботи? *
                      </label>
                      <select
                        required
                        value={formData.hasWorkSchedule}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasWorkSchedule: e.target.value,
                            hasWorkScheduleOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, чіткий графік">
                          Так, чіткий графік
                        </option>
                        <option value="Гнучкий графік">Гнучкий графік</option>
                        <option value="Умовний графік">Умовний графік</option>
                        <option value="Постійні овертайми">
                          Постійні овертайми
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.hasWorkSchedule === "Інше" && (
                        <textarea
                          value={formData.hasWorkScheduleOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasWorkScheduleOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Який відсоток часу власник займається операційкою, а не
                        стратегією? *
                      </label>
                      <select
                        required
                        value={formData.ownerOperationalPercent}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ownerOperationalPercent: e.target.value,
                            ownerOperationalPercentOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="0-20% (в основному стратегія)">
                          0-20% (в основному стратегія)
                        </option>
                        <option value="20-50% (збалансовано)">
                          20-50% (збалансовано)
                        </option>
                        <option value="50-80% (більше операційки)">
                          50-80% (більше операційки)
                        </option>
                        <option value="80-100% (постійно в операційці)">
                          80-100% (постійно в операційці)
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.ownerOperationalPercent === "Інше" && (
                        <textarea
                          value={formData.ownerOperationalPercentOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ownerOperationalPercentOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи існують у вас регламентовані перерви? *
                      </label>
                      <select
                        required
                        value={formData.hasScheduledBreaks}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasScheduledBreaks: e.target.value,
                            hasScheduledBreaksOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, є чіткі перерви">
                          Так, є чіткі перерви
                        </option>
                        <option value="Неформально, коли хто хоче">
                          Неформально, коли хто хоче
                        </option>
                        <option value="Рідко встигаємо">Рідко встигаємо</option>
                        <option value="Немає взагалі">Немає взагалі</option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.hasScheduledBreaks === "Інше" && (
                        <textarea
                          value={formData.hasScheduledBreaksOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasScheduledBreaksOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>
                  </motion.div>
                )}

                {/* БЛОК 6: Делегування та контроль */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      📊 Делегування та контроль
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи довіряє керівництво команді приймати рішення
                        самостійно? *
                      </label>
                      <select
                        required
                        value={formData.trustsTeam}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            trustsTeam: e.target.value,
                            trustsTeamOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, повністю">Так, повністю</option>
                        <option value="Частково, залежить від ситуації">
                          Частково, залежить від ситуації
                        </option>
                        <option value="Рідко">Рідко</option>
                        <option value="Ні, всі рішення через керівника">
                          Ні, всі рішення через керівника
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.trustsTeam === "Інше" && (
                        <textarea
                          value={formData.trustsTeamOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              trustsTeamOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є система звітності? *
                      </label>
                      <select
                        required
                        value={formData.hasReportingSystem}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasReportingSystem: e.target.value,
                            hasReportingSystemOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, щоденна">Так, щоденна</option>
                        <option value="Так, щотижнева">Так, щотижнева</option>
                        <option value="Періодично">Періодично</option>
                        <option value="Ні, немає системи">
                          Ні, немає системи
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.hasReportingSystem === "Інше" && (
                        <textarea
                          value={formData.hasReportingSystemOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasReportingSystemOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи зафіксовані KPI для кожної посади? *
                      </label>
                      <select
                        required
                        value={formData.hasKPIs}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasKPIs: e.target.value,
                            hasKPIsOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, для всіх">Так, для всіх</option>
                        <option value="Для частини посад">
                          Для частини посад
                        </option>
                        <option value="Тільки для продажів">
                          Тільки для продажів
                        </option>
                        <option value="Ні, немає">Ні, немає</option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.hasKPIs === "Інше" && (
                        <textarea
                          value={formData.hasKPIsOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasKPIsOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Як вимірюється успіх роботи адміністративного персоналу?
                        *
                      </label>
                      <textarea
                        required
                        value={formData.howMeasureAdminSuccess}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            howMeasureAdminSuccess: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        rows={2}
                        placeholder="Опишіть критерії оцінки..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи отримує персонал зворотний зв'язок щодо своєї роботи?
                        *
                      </label>
                      <select
                        required
                        value={formData.feedbackFrequency}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            feedbackFrequency: e.target.value,
                            feedbackFrequencyOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Регулярно (щотижня/щомісяця)">
                          Регулярно (щотижня/щомісяця)
                        </option>
                        <option value="Іноді">Іноді</option>
                        <option value="Тільки при проблемах">
                          Тільки при проблемах
                        </option>
                        <option value="Рідше ніж раз на рік">
                          Рідше ніж раз на рік
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.feedbackFrequency === "Інше" && (
                        <textarea
                          value={formData.feedbackFrequencyOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              feedbackFrequencyOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>
                  </motion.div>
                )}

                {/* БЛОК 7: Проблемні зони */}
                {step === 7 && (
                  <motion.div
                    key="step7"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      🔍 Проблемні зони (Діагностика)
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Що є головною причиною стресу в колективі? *
                      </label>
                      <textarea
                        required
                        value={formData.mainStressSource}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mainStressSource: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        rows={2}
                        placeholder="Дедлайни, невизначеність, перевантаження..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є у вас «текучка» кадрів? *
                      </label>
                      <select
                        required
                        value={formData.hasTurnover}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasTurnover: e.target.value,
                            hasTurnoverOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Висока (часто звільняються)">
                          Висока (часто звільняються)
                        </option>
                        <option value="Середня">Середня</option>
                        <option value="Низька">Низька</option>
                        <option value="Практично немає">Практично немає</option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.hasTurnover === "Інше" && (
                        <textarea
                          value={formData.hasTurnoverOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hasTurnoverOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Наскільки швидко приймаються рішення в компанії? *
                      </label>
                      <select
                        required
                        value={formData.decisionSpeed}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            decisionSpeed: e.target.value,
                            decisionSpeedOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Години">Години</option>
                        <option value="Дні">Дні</option>
                        <option value="Тижні">Тижні</option>
                        <option value="Місяці">Місяці</option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.decisionSpeed === "Інше" && (
                        <textarea
                          value={formData.decisionSpeedOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              decisionSpeedOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи часто завдання «губляться» у чатах? *
                      </label>
                      <select
                        required
                        value={formData.tasksLostInChats}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tasksLostInChats: e.target.value,
                            tasksLostInChatsOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Дуже часто">Дуже часто</option>
                        <option value="Іноді">Іноді</option>
                        <option value="Рідко">Рідко</option>
                        <option value="Ніколи">Ніколи</option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.tasksLostInChats === "Інше" && (
                        <textarea
                          value={formData.tasksLostInChatsOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tasksLostInChatsOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи відчуваєте ви опір команди при впровадженні нових
                        правил? *
                      </label>
                      <select
                        required
                        value={formData.resistanceToNewRules}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            resistanceToNewRules: e.target.value,
                            resistanceToNewRulesOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, сильний опір">
                          Так, сильний опір
                        </option>
                        <option value="Частково">Частково</option>
                        <option value="Мінімальний">Мінімальний</option>
                        <option value="Ні, команда відкрита до змін">
                          Ні, команда відкрита до змін
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.resistanceToNewRules === "Інше" && (
                        <textarea
                          value={formData.resistanceToNewRulesOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              resistanceToNewRulesOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу ситуацію..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи є у вас конфлікти між відділами? *
                      </label>
                      <select
                        required
                        value={formData.hasDepartmentConflicts}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasDepartmentConflicts: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, регулярно">Так, регулярно</option>
                        <option value="Іноді">Іноді</option>
                        <option value="Рідко">Рідко</option>
                        <option value="Немає">Немає</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* БЛОК 8: Очікування */}
                {step === 8 && !isSuccess && (
                  <motion.div
                    key="step8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      🎯 Очікування від ЗВИЧАЇКИ
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Яку одну проблему ви б хотіли вирішити в першу чергу? *
                      </label>
                      <textarea
                        required
                        value={formData.mainProblemToSolve}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mainProblemToSolve: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        rows={2}
                        placeholder="Опишіть головну проблему..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Яка ваша головна мета? *
                      </label>
                      <select
                        required
                        value={formData.mainGoal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mainGoal: e.target.value,
                            mainGoalOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Звільнити час власника">
                          Звільнити час власника
                        </option>
                        <option value="Збільшити швидкість роботи команди">
                          Збільшити швидкість роботи команди
                        </option>
                        <option value="Зменшити хаос і стрес">
                          Зменшити хаос і стрес
                        </option>
                        <option value="Підготуватися до масштабування">
                          Підготуватися до масштабування
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.mainGoal === "Інше" && (
                        <textarea
                          value={formData.mainGoalOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mainGoalOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть вашу мету..."
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Як ви дізналися про ЗВИЧАЇКУ? *
                      </label>
                      <select
                        required
                        value={formData.howHeardAbout}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            howHeardAbout: e.target.value,
                            howHeardAboutOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Пошук Google">Пошук Google</option>
                        <option value="Рекомендація">Рекомендація</option>
                        <option value="Соціальні мережі">
                          Соціальні мережі
                        </option>
                        <option value="Конференція/івент">
                          Конференція/івент
                        </option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.howHeardAbout === "Інше" && (
                        <textarea
                          value={formData.howHeardAboutOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              howHeardAboutOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Опишіть звідки дізнались..."
                        />
                      )}
                    </div>

                    {/* ✅ ЗМІНЕНО: Бюджет на реорганізацію */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Розрахунковий бюджет на реорганізацію процесів? *
                      </label>
                      <select
                        required
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            budget: e.target.value,
                            budgetOther: "",
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="10 000 грн">10 000 грн</option>
                        <option value="20 000 грн">20 000 грн</option>
                        <option value="50 000 грн">50 000 грн</option>
                        <option value="100 000 грн">100 000 грн</option>
                        <option value="Інше">Інше</option>
                      </select>
                      {formData.budget === "Інше" && (
                        <textarea
                          value={formData.budgetOther}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              budgetOther: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none mt-2"
                          rows={2}
                          placeholder="Вкажіть ваш бюджет..."
                        />
                      )}
                    </div>

                    {/* ✅ ВИДАЛЕНО: preferredFormat */}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Опишіть ідеальну систему роботи вашої компанії*
                      </label>
                      <textarea
                        required
                        value={formData.idealSystemDescription}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            idealSystemDescription: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                        rows={2}
                        placeholder="Ваше бачення ідеальної системи..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Чи готові ви на зустріч для детального обговорення
                        результатів? *
                      </label>
                      <select
                        required
                        value={formData.readyForCall}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            readyForCall: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                      >
                        <option value="">Оберіть...</option>
                        <option value="Так, готовий прямо зараз">
                          Так, готовий прямо зараз
                        </option>
                        <option value="Так, протягом тижня">
                          Так, протягом тижня
                        </option>
                        <option value="Поки хочу отримати аналіз письмово">
                          Поки хочу отримати аналіз письмово
                        </option>
                        <option value="Не готовий">Не готовий</option>
                      </select>
                    </div>

                    {/* ✅ НОВИЙ ПУНКТ: Згода з Privacy Policy */}
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
                          включаючи можливість отримання інформаційних
                          повідомлень.
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* SUCCESS MESSAGE */}
                {isSuccess && (
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
                      Ваша діагностика відправлена успішно!
                    </p>
                    <p className="text-gray-500">
                      Ми проаналізуємо відповіді та зв'яжемося з вами найближчим
                      часом.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Buttons */}
            {!isSuccess && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex gap-4">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft size={20} />
                    Назад
                  </button>
                )}

                {step < 8 ? (
                  <button
                    onClick={nextStep}
                    disabled={
                      step === 1 &&
                      (!formData.companyName ||
                        !formData.fullName ||
                        !formData.position ||
                        !formData.contacts ||
                        !formData.phone ||
                        !formData.industry ||
                        !formData.employeeCount ||
                        !formData.companyAge)
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Далі
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !agreedToPrivacy}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Відправка...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Відправити діагностику
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* ✅ PRIVACY POLICY POPUP */}
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
                      інформації. Поки ви занурюєтесь у культуру своєї компанії
                      та плануєте її розвиток за чашкою чаю, проект{" "}
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
                      співпрацювати з нами та добровільно надали інформацію
                      через форми зворотного зв'язку або анкети.
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
                          Сайт автоматично фіксує технічну інформацію
                          (IP-адреса, cookies, дані браузера). Ці дані
                          зберігаються тимчасово та використовуються для
                          коректної роботи сайту, аналітики відвідуваності та
                          захисту від спаму.
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
                      Ваша інформація допомагає нам зробити співпрацю
                      максимально ефективною:
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
                          Автоматизація процесів: після заповнення форми ваші
                          дані передаються до нашої внутрішньої системи обліку
                          для систематизації роботи
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
                          Після відправлення дані автоматично потрапляють до
                          нашої внутрішньої системи обліку клієнтів, побудованої
                          на базі захищених хмарних сервісів Google та CRM.
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                        <p className="font-semibold text-gray-900 mb-2">
                          🛡️ Обмежений доступ:
                        </p>
                        <p>
                          Доступ до бази даних мають лише авторизовані
                          спеціалісти проекту «ЗВИЧАЇКА» із застосуванням
                          двофакторної автентифікації. Ми не зберігаємо
                          персональні дані на сервері сайту довше, ніж це
                          необхідно для їх технічної передачі в систему обліку.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Секція 5 */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-purple-600">5.</span> Передача
                      третім сторонам
                    </h3>
                    <p>
                      Ми <strong>не продаємо і не передаємо</strong> ваші дані
                      третім особам без вашої згоди, за винятком випадків,
                      передбачених законодавством України, або використання
                      технічних сервісів (CRM, Google Workspace), які
                      забезпечують процес зберігання та обробки даних на умовах
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
                          Знати, які дані ми обробляємо, та отримати до них
                          доступ
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
                        Ми залишаємо за собою право оновлювати цю політику.
                        Зміни набувають чинності з моменту публікації на сайті.
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
  },
);

MultiStepFormModal.displayName = "MultiStepFormModal";

export default MultiStepFormModal;
