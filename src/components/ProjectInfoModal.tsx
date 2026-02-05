import * as Dialog from '@radix-ui/react-dialog';
import { X, Zap, Rocket, CheckCircle, HeartHandshake, BookOpen, FileCog, Workflow, CloudUpload, Fingerprint, HeartMinus } from 'lucide-react';
import { AnimatedIcon } from './AnimatedIcon';
import { useState } from 'react';

interface ProjectInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function ProjectInfoModal({ isOpen, onOpenChange }: ProjectInfoModalProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const cards = [
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      animationType: "heartbeat" as const,
      title: "Прозорість та керованість",
      description: "Чітка оргструктура, зрозумілі ролі та KPI, що забезпечують прозорість процесів і звільняють власника від операційних дрібниць.",
      gradient: "from-purple-400 to-purple-500",
    },
    {
      icon: <FileCog className="w-8 h-8" />,
      animationType: "tada" as const,
      title: "Ефективність та стандартизація",
      description: "Єдині стандарти якості, автоматизація та регламентація завдань мінімізують помилки й гарантують прогнозований результат.",
      gradient: "from-pink-400 to-pink-500",
    },
    {
      icon: <CloudUpload className="w-8 h-8" />,
      animationType: "wiggle" as const,
      title: "Безпека та корпоративна пам'ять",
      description: "Знання зберігаються у цифровій базі, незалежні від персоналу, що забезпечує стійкість бізнесу та швидку адаптацію нових співробітників.",
      gradient: "from-violet-400 to-violet-500",
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      animationType: "swing" as const,
      title: "Об'єктивний контроль",
      description: "KPI та регулярна звітність дозволяють управляти бізнесом на основі цифр, бачити вузькі місця й приймати рішення без припущень.",
      gradient: "from-indigo-400 to-indigo-500",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      animationType: "float" as const,
      title: "Фундамент для масштабування",
      description: "Бізнес стає готовим до масштабування та відкриття нових точок. Порядок у справах робить компанію привабливим активом для капіталізації.",
      gradient: "from-purple-400 to-purple-500",
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      animationType: "rotate-slow" as const,
      title: "Автоматизація та швидка адаптація",
      description: "Інтеграції між системами, автоматичні workflow та «Книга Новачка» скорочують час онбордингу й підвищують продуктивність команди.",
      gradient: "from-violet-400 to-violet-500",
    }
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button className="button-shimmer group relative px-8 py-4 bg-white text-purple-600 backdrop-blur-md rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-purple-200">
          <span className="flex items-center gap-3 relative z-10">
            <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Про проєкт
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />

        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 md:p-6 rounded-t-3xl flex items-center justify-between z-20 shadow-2xl">
              <Dialog.Title className="text-base md:text-xl font-semibold flex items-center gap-3">
                <Zap className="w-6 h-6 md:w-8 md:h-8" />
                <span className="hidden sm:inline">«ЗВИЧАЇКА» — корпоративна екосистема управління знаннями</span>
                <span className="sm:hidden">«ЗВИЧАЇКА»</span>
              </Dialog.Title>
              <Dialog.Close className="hover:bg-white/20 rounded-full p-2 transition-all">
                <X size={24} className="md:hidden" />
                <X size={28} className="hidden md:block" />
              </Dialog.Close>
            </div>


            <Dialog.Description className="sr-only">
              Детальна інформація про проєкт управління знаннями
            </Dialog.Description>

            <div className="p-4 md:p-8 space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">💁🏼‍♀️ Про проєкт:</h3>
                <p className="text-sm md:text-base">
                  Звичаїка — системне рішення для малого та середнього бізнесу, що формує інфраструктуру знань і процесів та піднімає ефективність на новий рівень.
Проєкт поєднує ЗВИЧАЇ — глибоке дослідження та розуміння внутрішніх процесів компанії — та ЧАЙ - звільняє час власника для фокусу на стратегії й масштабуванні, забезпечуючи стабільну роботу бізнесу.
                </p>
                <div className="p-4 md:p-8 space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">👩‍💻 Як це працює:</h3>
                <p className="text-sm md:text-base">
                  Ми не ламаємо, а впорядковуємо: досліджуємо, як ваш бізнес уже функціонує, і трансформуємо це у зрозумілі алгоритми, перетворюємо розрізнені файли та знання співробітників на єдину цифрову систему.
                </p>
                <p>Cтворюємо «мозок» компанії: формуємо бази знань, Wiki-центри, інструкції та «Книги Новачка» для швидкої адаптації.
Автоматизуємо розумно: впроваджуємо CRM, ERP, LMS та таск-менеджери, які відповідають саме вашій культурі, а не просто модним трендам.</p>
                <p className="mt-2 text-sm md:text-base">
                  Це системне рішення, яке перетворює розрізнені файли та досвід у головах працівників на структурований цифровий актив компанії.
                </p>
                <p className="mt-3 text-sm md:text-base">
                  Проєкт забезпечує перехід від ручного управління до автономної системи. Ми впроваджуємо комплексну інфраструктуру: Wiki-центри для знань, LMS-платформи для навчання, таск-менеджери для контролю за процесами, а також чіткі оргсхеми та «Книги Новачка» для швидкої адаптації.
                </p>
              </section>

              <section>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">💡 Чому це важливо?</h3>
                <ul className="space-y-2">
                  {[
                    { text: "20-30% робочого часу витрачається на пошук інформації" },
                    { text: "Втрата знань при звільненні співробітників коштує $2,500-$5,000 на одного" },
                    { text: "Компанії з knowledge base продуктивніші на 30%" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">🚀 Що ми пропонуємо?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                  {cards.map((item, idx) => {
                    const isActive = activeCard === idx;

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setActiveCard(idx)}
                        onMouseLeave={() => setActiveCard(null)}
                        onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                        className={`relative bg-white rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer min-h-[120px] ${isActive
                            ? 'border-transparent shadow-2xl'
                            : 'border-gray-200 hover:shadow-lg'
                          }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'
                          }`} />

                        <div className="relative z-10 p-4 md:p-6">
                          <div className="flex justify-center mb-3">
                            <div className={`transition-all duration-300 ${isActive
                                ? 'text-white scale-110'
                                : 'text-purple-600'
                              }`}>
                              <AnimatedIcon type={item.animationType}>
                                {item.icon}
                              </AnimatedIcon>
                            </div>
                          </div>

                          <h4 className={`text-base md:text-lg font-semibold text-center mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-900'
                            }`}>
                            {item.title}
                          </h4>

                          <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <p className={`text-xs md:text-sm text-center pt-2 transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-gray-600'
                              }`}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 md:p-6 rounded-b-3xl text-center border-t border-purple-200">
              <p className="text-sm md:text-base text-gray-700 mb-4">Готові створити свою базу знань?</p>
              <Dialog.Close asChild>
                <button
                  onClick={() => window.open('https://forms.gle/uSNtM1HLngGEXucUA', '_blank')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 text-sm md:text-base"
                >
                  Замовити консультацію
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ProjectInfoModal;

