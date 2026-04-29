import "./App.css";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
  lazy,
  Suspense,
} from "react";
import {
  CANVAS_ICONS,
  CANVAS_OBJECT_COUNT,
  MOUSE_REPEL_DISTANCE,
  MOUSE_REPEL_FORCE,
} from "./constants/canvas";
import { throttle } from "./utils/throttle";
import { drawIcon } from "./utils/drawIcons";
import { pains } from "./data/pains";
import { reasons } from "./data/reasons";
import { steps } from "./data/process";
import { PainSolutionSection } from "./components/sections/PainSolutionSection";
import { ReasonsSection } from "./components/sections/ReasonSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { PersonalCalculationSection } from "./components/sections/PersonalCalculationSection";
import { CTASection } from "./components/sections/CTASection";
import { Footer } from "./components/footer";
import YiEgg from './components/YiEgg';

import {
  AlertCircle,
  CheckCircle,
  Zap,
  BookOpen,
  ChevronRight,
  Users,
  TrendingUp,
  HelpCircle,
  X,
  Laptop,
  Smartphone,
  PenTool,
  FileText,
  Folder,
  Brain,
  Coffee,
  Book,
  Calendar,
  Lightbulb,
  Paperclip,
  Mail,
  MessageCircle,
  ChevronDown,
  Phone,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/header";
import MultiStepFormModal from "./components/MultiStepFormModal";
import ContactModal from "./components/ContactModal";
import ProjectInfoModal from "./components/ProjectInfoModal";


// Lazy loading для важких компонентів
const AboutAuthorModal = lazy(() => import("./components/AboutAuthorModal"));

// Винесені компоненти для кращої оптимізації
const HeroSection = memo(() => {
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isProjectInfoOpen || isContactModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isProjectInfoOpen, isContactModalOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Встановлення розміру
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ініціалізація об'єктів
    const objects: any[] = [];
    for (let i = 0; i < 20; i++) {
      objects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 30 + Math.random() * 20,
        icon: CANVAS_ICONS[Math.floor(Math.random() * CANVAS_ICONS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // ПРОСТИЙ Mouse handler БЕЗ THROTTLE
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // АНІМАЦІЯ
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      objects.forEach((obj, index) => {
        // 1. ВІДШТОВХУВАННЯ ВІД МИШІ
        const dx = obj.x - mouseRef.current.x;
        const dy = obj.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          obj.vx += (dx / dist) * force * 3;
          obj.vy += (dy / dist) * force * 3;
        }

        // 2. НЕВАГОМІСТЬ
        obj.vx += (Math.random() - 0.5) * 0.1;
        obj.vy += (Math.random() - 0.5) * 0.1;

        // 3. ТЕРТЯ
        obj.vx *= 0.98;
        obj.vy *= 0.98;

        // 4. ОБМЕЖЕННЯ ШВИДКОСТІ
        const speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);
        if (speed > 6) {
          obj.vx = (obj.vx / speed) * 6;
          obj.vy = (obj.vy / speed) * 6;
        }

        // 5. ОНОВЛЕННЯ ПОЗИЦІЇ
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.rotationSpeed;

        // 6. ВІДБИВАННЯ ВІД СТІН
        const margin = obj.size * 1.5;
        if (obj.x < margin) {
          obj.x = margin;
          obj.vx = Math.abs(obj.vx) * 0.8;
        }
        if (obj.x > canvas.width - margin) {
          obj.x = canvas.width - margin;
          obj.vx = -Math.abs(obj.vx) * 0.8;
        }
        if (obj.y < margin) {
          obj.y = margin;
          obj.vy = Math.abs(obj.vy) * 0.8;
        }
        if (obj.y > canvas.height - margin) {
          obj.y = canvas.height - margin;
          obj.vy = -Math.abs(obj.vy) * 0.8;
        }

        // 7. КОЛІЗІЇ
        for (let i = index + 1; i < objects.length; i++) {
          const other = objects[i];
          const dx2 = other.x - obj.x;
          const dy2 = other.y - obj.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const minDist = (obj.size + other.size) * 0.9;

          if (dist2 < minDist && dist2 > 0) {
            const angle = Math.atan2(dy2, dx2);
            const targetX = obj.x + Math.cos(angle) * minDist;
            const targetY = obj.y + Math.sin(angle) * minDist;

            const ax = (targetX - other.x) * 0.15;
            const ay = (targetY - other.y) * 0.15;

            obj.vx -= ax;
            obj.vy -= ay;
            other.vx += ax;
            other.vy += ay;

            const overlap = minDist - dist2;
            const moveX = (dx2 / dist2) * (overlap / 2);
            const moveY = (dy2 / dist2) * (overlap / 2);
            obj.x -= moveX;
            obj.y -= moveY;
            other.x += moveX;
            other.y += moveY;
          }
        }

        // 8. МАЛЮВАННЯ
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rotation);

        drawIcon(ctx, obj.icon, obj.size);

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const handleResize = () => {
      const oldW = canvas.width;
      const oldH = canvas.height;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      objects.forEach((obj) => {
        obj.x = (obj.x / oldW) * canvas.width;
        obj.y = (obj.y / oldH) * canvas.height;
      });
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleOpenContactFromProject = () => {
    setIsProjectInfoOpen(false);

    setTimeout(() => {
      setIsContactModalOpen(true);
    }, 150);
  };
  return (
    <div className="-mt-8 relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-800 to-pink-800 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "auto", touchAction: "pan-y" }}
      />

      <div
        className="relative z-10 flex items-center justify-center min-h-screen px-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="text-center max-w-5xl mx-auto space-y-8"
          style={{ pointerEvents: "auto" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.03, delayChildren: 0.2 },
                },
              }}
              className="text-center w-full overflow-visible"
            >
              <h1 className="text-[5vw] sm:text-[6vw] md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-4 md:mb-6 leading-tight flex justify-center items-center whitespace-nowrap overflow-visible">
                {"ПЕРЕТВОРІТЬ ХАОС НА СИСТЕМУ".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        x:
                          typeof window !== "undefined" &&
                            window.innerWidth < 768
                            ? Math.random() * 400 - 200
                            : Math.random() * 800 - 400,
                        y:
                          typeof window !== "undefined" &&
                            window.innerWidth < 768
                            ? Math.random() * 400 - 200
                            : Math.random() * 800 - 400,
                        rotate: Math.random() * 360,
                        scale: 2,
                      },
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          damping: 15,
                          stiffness: 100,
                        },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="max-w-5xl mx-auto px-4"
              >
                <p className="text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-4xl font-medium md:font-semibold text-purple-200 tracking-normal whitespace-normal md:whitespace-nowrap">
                  Системність для малого та середнього бізнесу.
                </p>
                <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-2xl lg:text-3xl xl:text-3xl font-medium md:font-semibold text-purple-200 tracking-normal whitespace-normal md:whitespace-nowrap">
                  Від безладдя до структурованого навчання.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Кнопка "Про проєкт" */}
            <Suspense fallback={<div className="h-[72px] w-[200px]" />}>
<ProjectInfoModal
  open={isProjectInfoOpen}
  onOpenChange={setIsProjectInfoOpen}
  onOpenContact={handleOpenContactFromProject}
/>
            </Suspense>
          </motion.div>

          {/* Модалка ContactModal */}
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Suspense fallback={<div className="h-[148px]" />}>
              <AboutAuthorModal />
            </Suspense>
          </motion.div>
        </div>
      </div>



    </div>
  );
});

HeroSection.displayName = "HeroSection";

// Секція Pain/Solution (memo для оптимізації)

PainSolutionSection.displayName = "PainSolutionSection";

// Секція пакетів
const PackagesSection = memo(() => {
  const [activePackage, setActivePackage] = useState<number | null>(null);

  const packages = useMemo(
    () => [
      {
        name: "«Порядок на вчора»",
        price: "від $500",
        badge: "Для малого бізнесу",
        color: "from-gray-900 via-purple-900 to-purple-800",
        features: [
          "Команди до 6 осіб",
          "Поверхневий аудит основ",
          "Базова структура даних",
          "Обробка до 20 файлів",
          "Інтеграція до 3х безкоштовних сервісів",
          "Супровід після - 5 годин",
          "Впровадження 1-2 тижні",
        ],
      },
      {
        name: "«Корпоративна культура та ШІ»",
        price: "від $1200",
        badge: "Для зростаючих команд",
        color: "from-purple-700 via-purple-800 to-purple-800",
        popular: true,
        features: [
          "Команди до 12 осіб",
          "Поглиблений аудит процесів",
          "Розширена структура даних",
          "Обробка до 35 файлів",
          "Інтеграція до 5 інструментів + ШІ",
          "Супровід після - 8 годин",
          "Впровадження 3-5 тижнів",
        ],
      },
      {
        name: "Цифровий мозок компанії",
        price: "від $2500",
        badge: "Перезапуск або з нуля",
        color: "from-purple-800 to-gray-950",
        features: [
          "Старт з нуля, рестарт або вихід з хаосу",
          "Аудит Full Immersion + Відео-бібліотека",
          "Створення Wiki-систем та LMS",
          "Автоматизація та ШІ-асистенти",
          "Необмежений стек інструментів",
          "Супровід після - 15 годин",
          "Впровадження 2-3 місяці",
        ],
      },
    ],
    [],
  );

  const allColumns = useMemo(
    () => [
      // Колонка 1 - для Картки 1, Ліва позиція
      {
        items: [
          {
            label: (
              <>
                <span className="text-purple-600 inline-block animate-glow">
                  ✦{" "}
                </span>
                <span> Адаптація / Результат</span>
              </>
            ),

            value: (
              <>
                Цифровий порядок: Створення логічної та інтуїтивно зрозумілої
                архітектури папок (структура, де кожен файл має своє місце).
                Швидкий старт: Готовий чек-лист для адаптації нового
                співробітника, що дозволяє власнику не пояснювати базові речі
                «на пальцях». Розробка до 5 ключових інструкцій або регламентів
                (наприклад, «Як ми зберігаємо файли», «Правила комунікації»).
              </>
            ),
          },
          {
            label: <>Терміни впровадження:</>,
            value: (
              <>1–2 тижні після завершення аудиту та погодження плану дій.</>
            ),
          },
          {
            label: <>Супровідні години:</>,
            value: (
              <>
                5 годин підтримки та консультацій після впровадження системи для
                корекції процесів та відповідей на запитання команди.
              </>
            ),
          },
        ],
      },
      // Колонка 2 - для Картки 1, Середня позиція
      {
        items: [
          {
            label: <>Фішка пакету:</>,
            value: (
              <>
                Чек-листи адаптації. Це не просто список справ, а перший крок до
                вашої майбутньої корпоративної «Вікіпедії». Він знімає з
                власника головний біль при наймі перших асистентів або дає
                чіткий план дій для помічника.
              </>
            ),
          },
          {
            label: <>Орієнтовна вартість:</>,
            value: (
              <>
                $500 (21,000 – 25,000 грн). Фінальна пропозиція щодо бюджету
                буде підготовлена після завершення аудиту та погодження плану
                дій.
              </>
            ),
          },
          {
            label: <>Ідеально підходить</>,
            value: (
              <>
                Для мікробізнесу, малих команд, та соло підприємців які
                відчувають «інформаційну задуху»: документи розкидані по поштах
                та месенджерах, а кожен новий файл створює ще більше хаосу в
                Google Drive.
              </>
            ),
          },
        ],
      },
      // Колонка 3 - для Картки 1, Права позиція
      {
        items: [
          {
            label: <>Обсяг роботи / Глибина занурення </>,
            value: (
              <>
                Глибина: Поверхнева систематизація існуючих активів
                (документів). Ми не змінюємо вашу стратегію, ми наводимо лад у
                тому, що вже є. Фокус: Архітектура хмарного сховища та критично
                важливі документів. Створення базової структури бази даних
                (папки, теги, рівні доступу). Обсяг: Опрацювання до 20 ключових
                файлів/документів компанії.{" "}
              </>
            ),
          },
          {
            label: <>Інновації / Інструменти</>,
            value: (
              <>
                Використання перевіреного безкоштовного софту під специфіку
                бізнесу, що не створює додаткового фінансового навантаження на
                бюджет: Google Workspace (систематизація Drive). Інтеграція з
                Notion, xTiles або OneNote (базове структурування даних).
                Впровадження до 3 нових інструментів на вибір (таск-менеджери,
                календарі тощо).
              </>
            ),
          },
        ],
      },
      // Колонка 4 - для Картки 2, Ліва позиція
      {
        items: [
          {
            label: <>Ідеально підходить:</>,
            value: (
              <>
                Для вже зростаючих компаній та команд 7-12 чоловік. Коли власник
                вже не може контролювати кожного особисто і потребує, щоб
                система сама «навчала» та «спрямовувала» працівників.
              </>
            ),
          },
          {
            label: <>Супровідні години</>,
            value: (
              <>
                8 годин підтримки після впровадження. Цього достатньо для
                «тонкого налаштування» системи під реальні відгуки команди.
              </>
            ),
          },
          {
            label: <>Інновації / Інструменти</>,
            value: (
              <>
                Smart-система: Впровадження Таск-менеджера на вибір як основного
                робочого простору. ШІ-помічники: Базова інтеграція Gemini або
                ChatGPT у робочі процеси для генерації контенту, відповідей
                клієнтам або аналізу текстів. Впровадження до 5 нових
                інструментів для автоматизації рутини.
              </>
            ),
          },
        ],
      },
      // Колонка 5 - для Картки 2, Середня позиція
      {
        items: [
          {
            label: (
              <>
                <span className="text-purple-600 inline-block animate-glow">
                  ✦{" "}
                </span>
                <span> Адаптація / Результат</span>
              </>
            ),

            value: (
              <>
                Корпоративна Вікіпедія: Створення повноцінної бази знань, де
                зібрані всі правила та стандарти компанії. Автоматизована
                адаптація: Розробка персональних баз знань під конкретні посади
                (Продажі, Склад, Адмін) та система тестів для перевірки знань
                стажерів. Розробка до 5 ключових інструкцій або регламентів
                (наприклад, «Як ми зберігаємо файли», «Правила комунікації»,
                «Інструкція посади»).
              </>
            ),
          },
          {
            label: <>Масштабування</>,
            value: (
              <>
                Система розроблена з можливістю масштабування до 100+
                користувачів без зміни архітектури.
              </>
            ),
          },
          {
            label: <>Орієнтовна вартість</>,
            value: (
              <>
                $1,200 (51,800 – 65,000 грн). Фінальна пропозиція щодо бюджету
                буде підготовлена після завершення аудиту та погодження плану
                дій.
              </>
            ),
          },
        ],
      },
      // Колонка 6 - для Картки 2, Права позиція
      {
        items: [
          {
            label: <>Термін впровадження</>,
            value: (
              <>3–5 тижнів після завершення аудиту та погодження плану дій. </>
            ),
          },
          {
            label: <>Фішка пакету</>,
            value: (
              <>
                Діалог зі «Звичаями»: Через особисті інтерв'ю з кожною посадою я
                виявляю приховані проблеми, які не видно в звітах. Це дозволяє
                впровадити ШІ саме туди, де він звільнить найбільше часу.
              </>
            ),
          },
          {
            label: <>Обсяг роботи / Глибина занурення</>,
            value: (
              <>
                Глибина: Середня. Ми занурюємося в людський фактор через
                інтерв'ю та досліджуємо наявну базу знань, процеси CRM чи інших
                програм що використовуються. Фокус: Створення «командного
                розуму» та усунення дублювання функцій. Обсяг: Обробка до 35
                ключових документів та аналіз існуючої ERP/CRM-системи.
              </>
            ),
          },
        ],
      },
      // Колонка 7 - для Картки 3, Ліва позиція
      {
        items: [
          {
            label: <>Інновації / Інструменти </>,
            value: (
              <>
                Універсальний стек (All-in-one). Працюємо з будь-якими
                інструментами, що потрібні саме вам: CRM + Task Managers (Asana,
                ClickUp, Notion тощо). Глибока AI-інтеграція: ШІ не просто як
                чат, а як незамінний помічник для команди (звіти, аналіз
                запитів, генерація довідок).
              </>
            ),
          },
          {
            label: <>Фішка пакету</>,
            value: (
              <>
                Універсальність «любе-голубе»: Цей пакет не обмежений кількістю
                людей чи галуззю. Це повна архітектурна розробка: ми беремо те,
                що є (навіть якщо це хаос), і перетворюємо на впорядковану
                систему, що працює, або створюємо її.
              </>
            ),
          },
          {
            label: <>Супровідні години </>,
            value: (
              <>
                15 годин підтримки для шліфування процесів, навчання керівної
                ланки та фіксації «звичаїв» компанії.{" "}
              </>
            ),
          },
        ],
      },
      // Колонка 8 - для Картки 3, Середня позиція
      {
        items: [
          {
            label: <>Обсяг роботи / Глибина занурення</>,
            value: (
              <>
                Глибина: Максимальна. Повний аналіз бізнес-процесів, культури та
                операційної моделі компанії. Фокус: Побудова або повна
                реконструкція системи управління знаннями та процесами. Обсяг:
                Необмежена кількість документів, повна інтеграція всіх систем
                компанії.
              </>
            ),
          },
          {
            label: <>Термін впровадження</>,
            value: (
              <>
                2–3 місяці (залежно від складності «воскресіння» або
                масштабування процесів).{" "}
              </>
            ),
          },
          {
            label: <>Орієнтовна вартість </>,
            value: (
              <>
                Від $2,500 (107,500 грн) Фінальна пропозиція щодо бюджету буде
                підготовлена після завершення аудиту та погодження плану
                дій.{" "}
              </>
            ),
          },
        ],
      },
      // Колонка 9 - для Картки 3, Права позиція
      {
        items: [
          {
            label: (
              <>
                <span className="text-purple-600 inline-block animate-glow">
                  ✦{" "}
                </span>
                <span> Адаптація / Результат</span>
              </>
            ),

            value: (
              <>
                Компанія стає «прозорою» та керованою. Автоматизований
                onboarding: Нові люди навчаються самі через базу знань.
                Підготовка асистента: навчаємо вашого співробітника бути
                «охоронем системи», щоб вона не розвалилася після мого виходу.
                Корпоративна Вікіпедія: Створення повноцінної бази знань, де
                зібрані всі правила та стандарти компанії.{" "}
              </>
            ),
          },
          {
            label: <>Ідеально підходить</>,
            value: (
              <>
                Для будь-якого масштабу та стадії бізнесу. Стартапи: Побудова
                фундаменту з нуля, щоб не «гасити пожежі» пізніше.
                Трансформація: Коли компанія змінює стратегію або напрямок.
                Реанімація: «Воскресіння» процесів, які перестали працювати або
                застаріли. Вихід з операційки: Для власників, що прагнуть
                передати управління системі.
              </>
            ),
          },
        ],
      },
    ],
    [],
  );

  const toggleCard = useCallback((index: number) => {
    setActivePackage((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div
      id="packages"
      className="py-4 bg-gradient-to-b from-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-semibold text-gray-900 mb-5">
            Оберіть свій <span className="text-stone-600">шлях</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Від базової структури до повної автоматизації
          </p>
        </motion.div>

        <div
          className={`${activePackage !== null ? "rounded-3xl overflow-hidden shadow-2xl" : ""} relative`}
        >
          {activePackage !== null && (
            <div
              className={`absolute inset-0 bg-gradient-to-r ${activePackage === 0
                  ? "from-gray-900 via-purple-900 to-purple-800"
                  : activePackage === 1
                    ? "from-purple-900 via-purple-800 to-purple-900"
                    : "from-purple-800 to-gray-950"
                } z-0 rounded-3xl`}
            ></div>
          )}

          {activePackage !== null && (
            <div className="relative z-10 pt-10 pb-8 px-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-0.5 bg-white/30"></div>
                <span className="text-white/60 text-sm uppercase tracking-wider">
                  Пакет послуг
                </span>
                <div className="w-16 h-0.5 bg-white/30"></div>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center mb-6">
                {packages[activePackage].name}
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto rounded-full"></div>
            </div>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-3 transition-all duration-500 ${activePackage !== null ? "gap-0" : "gap-8"
              } ${activePackage !== null ? "relative z-10" : ""}`}
          >
            {packages.map((pkg, pkgIndex) => {
              const isFlipped = activePackage !== null;

              return (
                <motion.div
                  key={pkgIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pkgIndex * 0.1 }}
                  className="flip-card-container"
                >
                  <div
                    className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
                    style={{ minHeight: isFlipped ? "650px" : "auto" }}
                    onClick={() => toggleCard(pkgIndex)}
                  >
                    {/* FRONT */}
                    <div
                      className={`flip-card-front w-full bg-white rounded-3xl shadow-xl cursor-pointer flex flex-col ${pkg.popular ? "ring-4 ring-purple-500" : ""
                        } ${isFlipped ? "absolute inset-0" : "relative"}`}
                    >
                      <div className="p-6 lg:p-8 flex flex-col h-full">
                        {pkg.badge && (
                          <div
                            className={`inline-block px-4 py-2 bg-gradient-to-r ${pkg.color} text-white rounded-xl text-sm font-semibold mb-4 w-fit`}
                          >
                            {pkg.badge}
                          </div>
                        )}

                        <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {pkg.name}
                        </h3>

                        <p className="text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                          {pkg.price}
                        </p>

                        <ul className="space-y-3 mb-8 flex-1">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm lg:text-base text-gray-700">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <button
                          className={`w-full py-4 bg-gradient-to-r ${pkg.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all mt-auto`}
                        >
                          Натисніть для деталей
                        </button>
                      </div>
                    </div>

                    {/* BACK - ✅ УМОВНА ВИСОТА */}
                    <div
                      className={`flip-card-back absolute w-full p-6 lg:p-8 text-white relative z-10 transition-all duration-500 overflow-y-auto ${activePackage !== null
                          ? pkgIndex === 0
                            ? "rounded-l-3xl"
                            : pkgIndex === 2
                              ? "rounded-r-3xl"
                              : ""
                          : "rounded-3xl"
                        }`}
                      style={{
                        boxShadow: "0 0 25px rgba(255, 255, 255, 0.12)",
                        minHeight: isFlipped ? "650px" : "0", // ✅ ТІЛЬКИ КОЛИ ПЕРЕВЕРНУТА
                        height: isFlipped ? "auto" : "0", // ✅ ПРИХОВАНА ДО ФЛИПУ
                        opacity: isFlipped ? 1 : 0, // ✅ НЕВИДИМА ДО ФЛИПУ
                      }}
                    >
                      {activePackage !== null && (
                        <div className="w-full h-full flex flex-col">
                          <div className="space-y-5 overflow-y-auto flex-1">
                            {(() => {
                              const columnIndex = activePackage * 3 + pkgIndex;
                              const column = allColumns[columnIndex];
                              return column?.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 lg:p-6 bg-white/10 rounded-xl hover:bg-white/15 transition-all"
                                >
                                  <p className="font-semibold text-lg lg:text-xl mb-3">
                                    {item.label}
                                  </p>
                                  <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                                    {item.value}
                                  </p>
                                </div>
                              ));
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

PackagesSection.displayName = "PackagesSection";

PersonalCalculationSection.displayName = "PersonalCalculationSection";

ReasonsSection.displayName = "ReasonsSection";

ProcessSection.displayName = "ProcessSection";

CTASection.displayName = "CTASection";

Footer.displayName = "Footer";

// Головний компонент
const KnowledgeBaseLanding = () => {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-40">
        <YiEgg 
        />
      </div>
      <PainSolutionSection />
      <PackagesSection />
      <PersonalCalculationSection />
      <ReasonsSection />
      <ProcessSection />

      <CTASection />
      <Footer />
    </div>
  );
};

export default KnowledgeBaseLanding;
