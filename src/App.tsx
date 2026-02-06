import "./App.css";
import React, {
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

// Lazy loading для важких компонентів
const AboutAuthorModal = lazy(() => import("./components/AboutAuthorModal"));
const ProjectInfoModal = lazy(() => import("./components/ProjectInfoModal"));
const CANVAS_ICONS = [
  FileText,
  Folder,
  Laptop,
  Brain,
  Smartphone,
  PenTool,
  Coffee,
  Book,
  Calendar,
  Lightbulb,
  Paperclip,
];
const CANVAS_OBJECT_COUNT = 20;
const MOUSE_INFLUENCE_DISTANCE = 180;
const ANIMATION_FRAME_THROTTLE = 16;

// Утиліта для throttle
const throttle = (func: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Винесені компоненти для кращої оптимізації
const HeroSection = memo(() => {
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objectsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Встановлення розміру canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Ініціалізація об'єктів
    interface CanvasObject {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      icon: (typeof CANVAS_ICONS)[number];
      rotation: number;
      rotationSpeed: number;
    }
    const objects: CanvasObject[] = [];
    for (let i = 0; i < CANVAS_OBJECT_COUNT; i++) {
      objects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 25 + Math.random() * 25,
        icon: CANVAS_ICONS[Math.floor(Math.random() * CANVAS_ICONS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      });
    }
    objectsRef.current = objects;

    // Throttled mouse handler
    const handleMouseMove = throttle((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }, ANIMATION_FRAME_THROTTLE);

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Створення шляхів іконок (мемоізовано)
    const createIconPath = (icon: any, size: number) => {
      const path = new Path2D();

      if (icon === FileText) {
        path.rect(-size * 0.4, -size * 0.5, size * 0.8, size);
        path.moveTo(-size * 0.2, -size * 0.2);
        path.lineTo(size * 0.2, -size * 0.2);
        path.moveTo(-size * 0.2, 0);
        path.lineTo(size * 0.2, 0);
        path.moveTo(-size * 0.2, size * 0.2);
        path.lineTo(size * 0.2, size * 0.2);
      } else if (icon === Folder) {
        path.rect(-size * 0.5, -size * 0.2, size, size * 0.6);
        path.rect(-size * 0.5, -size * 0.4, size * 0.4, size * 0.2);
      } else if (icon === Laptop) {
        path.rect(-size * 0.6, -size * 0.3, size * 1.2, size * 0.5);
        path.rect(-size * 0.7, size * 0.2, size * 1.4, size * 0.1);
      } else if (icon === Brain) {
        path.arc(-size * 0.2, 0, size * 0.3, 0, Math.PI * 2);
        path.arc(size * 0.2, 0, size * 0.3, 0, Math.PI * 2);
        path.arc(0, -size * 0.2, size * 0.25, 0, Math.PI * 2);
      } else if (icon === Smartphone) {
        path.roundRect(
          -size * 0.25,
          -size * 0.5,
          size * 0.5,
          size,
          size * 0.08,
        );
        path.arc(0, -size * 0.35, size * 0.05, 0, Math.PI * 2);
      } else if (icon === PenTool) {
        path.moveTo(0, -size * 0.5);
        path.lineTo(size * 0.12, size * 0.5);
        path.lineTo(-size * 0.12, size * 0.5);
        path.closePath();
      } else if (icon === Coffee) {
        path.moveTo(-size * 0.3, -size * 0.3);
        path.lineTo(-size * 0.35, size * 0.3);
        path.lineTo(size * 0.35, size * 0.3);
        path.lineTo(size * 0.3, -size * 0.3);
        path.closePath();
        path.arc(size * 0.5, 0, size * 0.15, -Math.PI / 2, Math.PI / 2);
      } else if (icon === Book) {
        path.rect(-size * 0.4, -size * 0.5, size * 0.8, size);
        path.moveTo(-size * 0.4, -size * 0.5);
        path.lineTo(0, -size * 0.4);
        path.lineTo(-size * 0.4, -size * 0.3);
      } else if (icon === Calendar) {
        path.rect(-size * 0.4, -size * 0.4, size * 0.8, size * 0.8);
        path.rect(-size * 0.3, -size * 0.5, size * 0.1, size * 0.2);
        path.rect(size * 0.2, -size * 0.5, size * 0.1, size * 0.2);
      } else if (icon === Lightbulb) {
        path.arc(0, -size * 0.2, size * 0.3, 0, Math.PI * 2);
        path.rect(-size * 0.15, size * 0.1, size * 0.3, size * 0.3);
      } else if (icon === Paperclip) {
        path.arc(0, -size * 0.2, size * 0.2, Math.PI, 0);
        path.lineTo(size * 0.2, size * 0.3);
        path.arc(0, size * 0.3, size * 0.2, 0, Math.PI);
      }

      return path;
    };

    // Анімаційний цикл
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      objects.forEach((obj, index) => {
        const dx = obj.x - mouseRef.current.x;
        const dy = obj.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_INFLUENCE_DISTANCE && distance > 0) {
          const force =
            (MOUSE_INFLUENCE_DISTANCE - distance) / MOUSE_INFLUENCE_DISTANCE;
          obj.vx += (dx / distance) * force * 0.8;
          obj.vy += (dy / distance) * force * 0.8;
        }

        obj.vx *= 0.99;
        obj.vy *= 0.99;

        const currentSpeed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy);
        if (currentSpeed < 0.3) {
          const angle = Math.random() * Math.PI * 2;
          obj.vx += Math.cos(angle) * 0.1;
          obj.vy += Math.sin(angle) * 0.1;
        }

        const maxSpeed = 4;
        if (currentSpeed > maxSpeed) {
          obj.vx = (obj.vx / currentSpeed) * maxSpeed;
          obj.vy = (obj.vy / currentSpeed) * maxSpeed;
        }

        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.rotationSpeed;

        const padding = obj.size * 2;
        if (obj.x < padding) {
          obj.x = padding;
          obj.vx = Math.abs(obj.vx) * 0.8;
        }
        if (obj.x > canvas.width - padding) {
          obj.x = canvas.width - padding;
          obj.vx = -Math.abs(obj.vx) * 0.8;
        }
        if (obj.y < padding) {
          obj.y = padding;
          obj.vy = Math.abs(obj.vy) * 0.8;
        }
        if (obj.y > canvas.height - padding) {
          obj.y = canvas.height - padding;
          obj.vy = -Math.abs(obj.vy) * 0.8;
        }

        // Collision detection (оптимізовано)
        for (let i = index + 1; i < objects.length; i++) {
          const other = objects[i];
          const dx2 = other.x - obj.x;
          const dy2 = other.y - obj.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          const minDist = (obj.size + other.size) * 1.2;

          if (distance2 < minDist && distance2 > 0) {
            const angle = Math.atan2(dy2, dx2);
            const targetX = obj.x + Math.cos(angle) * minDist;
            const targetY = obj.y + Math.sin(angle) * minDist;
            const ax = (targetX - other.x) * 0.15;
            const ay = (targetY - other.y) * 0.15;
            obj.vx -= ax;
            obj.vy -= ay;
            other.vx += ax;
            other.vy += ay;
          }
        }

        // Малювання
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.rotation);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 2.5;
        ctx.stroke(createIconPath(obj.icon, obj.size));
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Обробник зміни розміру вікна (throttled)
    const handleResize = throttle(() => {
      resizeCanvas();
    }, 250);

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
  const getChaosStyles = () => {
    const isMobile = window.innerWidth < 768;
    const range = isMobile ? 150 : 500;

    return {
      x: Math.random() * range * 2 - range,
      y: Math.random() * range * 2 - range,
      rotate: Math.random() * 360 - 180,
      scale: Math.random() * 1.5 + 0.3,
      opacity: 0,
    };
  };

  const getOrderStyles = () => ({
    x: 0,
    y: -50,
    rotate: 0,
    scale: 0.5,
    opacity: 0,
  });

  return (
    <div className="-mt-8 relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-800 to-pink-800 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto space-y-8">
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
            {/* Про проєкт - новий modal */}
            <Suspense fallback={<div className="h-[72px] w-[200px]" />}>
              <ProjectInfoModal 
  isOpen={isProjectInfoOpen} 
  onOpenChange={setIsProjectInfoOpen}
  onOpenContact={() => setIsContactModalOpen(true)} // ✅ ДОДАЙТЕ ЦЕЙ РЯДОК
/>
              <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
              />
            </Suspense>
          </motion.div>
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

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          width="50"
          height="85"
          viewBox="0 0 50 85"
          className="drop-shadow-md"
        >
          {/* Два кружечки */}
          <circle cx="15" cy="8" r="5.5" fill="#ffffff" />
          <circle cx="35" cy="8" r="5.5" fill="#ffffff" />

          {/* Фон для годинника - РОЗДІЛЕНО НА ДВІ ЧАСТИНИ */}
          {/* Верхня частина - ПРОЗОРА */}
          <path d="M 8,18 L 42,18 L 28,42 L 22,42 Z" fill="transparent" />

          {/* Нижня частина - БІЛА */}
          <path d="M 22,42 L 28,42 L 42,72 L 8,72 Z" fill="white" />

          {/* Сіра рамка у формі пісочного годинника */}
          <path
            d="M 8,18 L 42,18 L 28,42 L 22,42 L 8,18 M 22,42 L 28,42 L 42,72 L 8,72 L 22,42"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="3.5"
          />

          {/* Верхній трикутник (прозорий) */}
          <polygon points="11,21 39,21 25,40" fill="none" />

          {/* Центральна лінія */}
          <line
            x1="25"
            y1="40"
            x2="25"
            y2="44"
            stroke="#1f2937"
            strokeWidth="2"
          />

          {/* Нижній трикутник (чорний пісок знизу) - з пульсацією */}
          <polygon points="25,44 11,69 39,69" fill="#1f2937" opacity="0.9">
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="2s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

// Секція Pain/Solution (memo для оптимізації)
const PainSolutionSection = memo(() => {
  const [activePain, setActivePain] = useState<number | null>(null);

  const pains = useMemo(
    () => [
      {
        icon: "📚",
        title: "Хаос в документах ?",
        problem:
          "Структурні документи розкидані по різних місцях, немає єдиної системи",
        solution:
          "Повний аудит всіх бізнес-процесів, створення чіткої структури документів, єдина точка доступу до інформації",
      },
      {
        icon: "🤷",
        title: "Немає бази знань ?",
        problem:
          "Відсутня корпоративна база знань, кожен тримає інформацію в голові",
        solution:
          "Формування загальної бази знань та під кожну посаду, автоматичне оновлення та версіонування",
      },
      {
        icon: "❓",
        title: "Менеджери не знають до кого звертатися ?",
        problem: "Немає чіткої структури відповідальності за процеси",
        solution:
          "Встановлення ролей та зон відповідальності, матриця компетенцій, швидкий пошук експертів",
      },
      {
        icon: "😵",
        title: "Стажери тонуть в інформації ?",
        problem: "Новачки не розуміють з чого почати та що важливо",
        solution:
          "Вступні документи та стандарти, покрокові функціональні інструкції, контрольні точки адаптації",
      },
      {
        icon: "👨‍🏫",
        title: "Неякісне навчання ?",
        problem: "Немає системного підходу до навчання або немає кому навчати",
        solution:
          "Навчання на основі бази знань, відео-уроки та інтерактивні матеріали, ШІ-асистент для швидких відповідей",
      },
      {
        icon: "🎯",
        title: "Хто екзаменує ?",
        problem:
          "Відсутній HR/рекрутер, директор витрачає час на базові питання",
        solution:
          "Автоматичні тести знань, фіксація точок контролю, звітність по прогресу співробітників",
      },
    ],
    [],
  );

  return (
    <div className="py-24 bg-gradient-to-r from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Ваш час - для стратегій
          </h2>
          <div className="flex items-center max-w-3xl mx-auto my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-purple-400"></div>
            <div className="px-4 text-2xl">⚡</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400 to-purple-400"></div>
          </div>

          <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto">
            Наш - для виправлення цих помилок:
          </p>
        </motion.div>

        {/* Додано items-start, щоб картки не тягнулися по висоті сусіда */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {pains.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              animate={{
                height: "auto", // Автоматична висота без жорстких лімітів
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer min-h-[218px]"
              onMouseEnter={() => setActivePain(index)}
              onMouseLeave={() => setActivePain(null)}
              onClick={() => setActivePain(activePain === index ? null : index)}
            >
              <div
                className={`text-6xl mb-4 transition-all duration-300 ${activePain === index ? "scale-110" : ""}`}
              >
                {pain.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {pain.title}
              </h3>

              <div
                className={`overflow-hidden transition-all duration-500 ${activePain === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-red-600 mb-2">
                      ❌ Проблема:
                    </p>
                    <p className="text-gray-700">{pain.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 mb-2">
                      ✅ Рішення:
                    </p>
                    <p className="text-gray-700">{pain.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

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
      className="py-24 bg-gradient-to-b from-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
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
              className={`absolute inset-0 bg-gradient-to-r ${
                activePackage === 0
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
            className={`grid grid-cols-1 md:grid-cols-3 transition-all duration-500 ${
              activePackage !== null ? "gap-0" : "gap-8"
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
                      className={`flip-card-front w-full bg-white rounded-3xl shadow-xl cursor-pointer flex flex-col ${
                        pkg.popular ? "ring-4 ring-purple-500" : ""
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
                      className={`flip-card-back absolute w-full p-6 lg:p-8 text-white relative z-10 transition-all duration-500 overflow-y-auto ${
                        activePackage !== null
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

// Секція персонального розрахунку
const PersonalCalculationSection = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-14 bg-white pb-10">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                Натисніть, щоб заповнити форму та дізнайтеся приблизну вартість
                та терміни
              </div>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Модалка форми */}
      <MultiStepFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
});

// ✅ ДОДАЙТЕ ЦЕЙ РЯДОК:
PersonalCalculationSection.displayName = "PersonalCalculationSection";

const ReasonsSection = memo(() => {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  const reasons = useMemo(
    () => [
      {
        icon: "💰",
        title: "Математика вигоди: Opportunity Cost",
        subtitle: "Час власника — найдорожчий актив",
        details: [
          "Година власника коштує $50–100+",
          "50+ годин на самостійну розробку = $2,500–$5,000 збитків",
          "Інвестиція окупається ще до завершення проекту",
        ],
      },
      {
        icon: "🏗️",
        title: "Архітектура VS Сировина ШІ",
        subtitle: "Реальні процеси, а не теорія",
        details: [
          "ШІ не знає специфіки вашого бізнесу",
          "Аудит реальних процесів команди",
          "Система працює у вашій реальності, а не в уяві ШІ",
        ],
      },
      {
        icon: "✅",
        title: "Гарантований фініш: Дисципліна проєкту",
        subtitle: "Запуск вчасно, а не «колись»",
        details: [
          "80-90% внутрішніх баз даних залишаються порожніми або чернетками",
          "Чіткі дедлайни та етапи впровадження без 'стрибків' на інші задачі.",
        ],
      },
      {
        icon: "🔍",
        title: "Zero-Based: Свіжий погляд на «норму»",
        subtitle: "Бачимо те, що ви перестали помічати",
        details: [
          "Виявляємо «сліпі плями» процесів",
          "Знаходимо дублювання функцій",
          "Лікуємо системні хвороби бізнесу",
        ],
      },
      {
        icon: "💎",
        title: "Конвертація знань у цифровий актив",
        subtitle: "Живий інструмент замість PDF-цвинтаря",
        details: [
          "Інтерактивні програми з налаштованими доступами",
          "Автоматичні тести та інтуїтивна навігація",
          "Знання не зникають зі звільненням співробітників",
        ],
      },
      {
        icon: "📈",
        title: "Розумна економія на HR-функціях",
        subtitle: "Один раз налаштував — завжди користуєшся",
        details: [
          "Непотрібно утримувати HR-менеджера від 30,000 грн/міс якщо немає потоку кадрів",
          "З організованою базою знань впорається будь який менеджер, краще найняти асистента.",
        ],
      },
    ],
    [],
  );

  return (
    <div className="py-24 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 text-center leading-tight">
            6 причин чому варто впроваджувати проєкт{" "}
            <span className="text-purple-600 relative top-1 block sm:inline mt-2 sm:mt-0">
              ЗВИЧАЇКА
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              animate={{
                height: "auto",
              }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer min-h-[280px]"
              onMouseEnter={() => setActiveReason(index)}
              onMouseLeave={() => setActiveReason(null)}
              onClick={() =>
                setActiveReason(activeReason === index ? null : index)
              }
            >
              <div
                className={`text-6xl mb-6 transition-all duration-300 ${activeReason === index ? "scale-110" : ""}`}
              >
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {reason.title}
              </h3>
              <p className="text-purple-600 font-semibold mb-4">
                {reason.subtitle}
              </p>

              <div
                className={`overflow-hidden transition-all duration-500 ${activeReason === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <ul className="space-y-2 pt-4 border-t border-gray-200">
                  {reason.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-700 text-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

ReasonsSection.displayName = "ReasonsSection";

// Секція процесу
const ProcessSection = memo(() => {
  const steps = useMemo(
    () => [
      {
        number: "01",
        title: "Аналіз",
        description: "Вивчаємо ваші процеси, біль та цілі",
        duration: "1-5 днів",
      },
      {
        number: "02",
        title: "Проектування ",
        description: "Розробляємо архітектуру системи знань",
        duration: "1-5 днів",
      },
      {
        number: "03",
        title: "Налаштування",
        description: "Створюємо цифрове середовище (Workplace) ",
        duration: "1-5 тижнів",
      },
      {
        number: "04",
        title: "Впровадження",
        description: "Навчання, пояснення, інструктаж",
        duration: "1-2 тижні",
      },
      {
        number: "05",
        title: "Тестування",
        description: "Супроводжуємо перші кроки",
        duration: "1-3 дні",
      },
    ],
    [],
  );

  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Як ми працюємо
          </h2>
          <p className="text-xl text-gray-600">
            Прозорий процес від ідеї до результату
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-purple-400 to-pink-400 -translate-y-1/2" />

          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col w-full h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-4 mx-auto flex-shrink-0">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center flex-shrink-0">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-3 flex-grow">
                    {step.description}
                  </p>
                  <p className="text-purple-600 font-semibold text-sm text-center flex-shrink-0">
                    ⏱️ {step.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProcessSection.displayName = "ProcessSection";

// CTA секція
const CTASection = memo(() => {
  return (
    <div className="py-8 pb-3 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Заголовок секції */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
            Готові навести лад у знаннях?
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Замовте безкоштовну консультацію — ми проаналізуємо вашу ситуацію та
            запропонуємо рішення
          </p>

          {/* Контакти */}
          <div className="flex items-center max-w-3xl mx-auto my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-purple-400"></div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400 to-purple-400"></div>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-purple-200">
            Контакти
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Телефон */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/15">
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="tel:+380950571649"
                  className="hover:scale-110 transition-transform"
                  title="Телефон"
                >
                  <img
                    alt="Phone"
                    className="w-7 h-7"
                    src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
                  />
                </a>
                <a
                  href="https://t.me/bonnie_benay"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-110 transition-transform"
                  title="Telegram"
                >
                  <img
                    alt="Telegram"
                    className="w-8 h-8"
                    src="https://img.icons8.com/color/48/telegram-app.png"
                  />
                </a>
                <a
                  href="viber://chat?number=%2B380950571649"
                  className="hover:scale-110 transition-transform"
                  title="Viber"
                >
                  <img
                    alt="Viber"
                    className="w-8 h-8"
                    src="https://img.icons8.com/color/48/viber.png"
                  />
                </a>
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/20 mx-1"></div>

              <a
                href="tel:+380950571649"
                className="text-base sm:text-lg text-purple-100 hover:text-white transition-all duration-300 font-medium hover:scale-105"
              >
                +380 95 057 16 49
              </a>
            </div>

            {/* Email */}
            <a
              href="mailto:hanna.ws.g@gmail.com?subject=Консультація%20щодо%20структуризації&body=Привіт%2C%20Ганно%2C%0A%0A"
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Mail className="w-8 h-8 text-purple-300 flex-shrink-0" />
              <span className="text-base sm:text-lg text-purple-100 break-all">
                hanna.ws.g@gmail.com
              </span>
            </a>
          </div>
          <div className="flex items-center max-w-3xl mx-auto my-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-purple-400"></div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400 to-purple-400"></div>
          </div>

          {/* Переваги */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Швидко",
                desc: "На 80% швидша адаптація",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Впевнено",
                desc: "10.000+ опрацьованих документів",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "З підтримкою",
                desc: "Не залишимо наодинці",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left ${
                  index === 2 ? "md:ml-8" : ""
                }`}
              >
                <div className="text-purple-300 flex-shrink-0">{item.icon}</div>
                <div className="min-w-0">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-purple-200 text-sm whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});

CTASection.displayName = "CTASection";

// Footer з модалками
const Footer = memo(() => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const faqData = useMemo(
    () => [
      {
        q: "Яка ключова перевага вашого підходу?",
        a: (
          <>
            Гнучкість та фокус на результаті. Ми не підлаштовуємо ваш бізнес під
            можливості програми, а навпаки — адаптуємо інструменти під ваші{" "}
            <b>звичаї</b>. Це створення живої архітектури, яка працює на вас,
            поки ви фокусуєтесь на стратегії.
          </>
        ),
      },
      {
        q: "Що, якщо мій бізнес занадто специфічний і тримається на «особистій магії»?",
        a: (
          <>
            Саме тому проєкт називається <b>ЗВИЧАЇКА</b>. Ми не насаджуємо
            шаблонні процеси. Якщо ваш успіх базується на особистих зв'язках —
            ми опишемо систему підтримки цих зв'язків. Будь-яка «магія», що
            приносить гроші, має свій алгоритм. Ми знайдемо його і зафіксуємо,
            щоб результативність не залежала від настрою чи пам'яті окремих
            людей.
          </>
        ),
      },
      {
        q: "Навіщо мені ЗВИЧАЇКА, якщо я можу безкоштовно попросити ChatGPT написати ці інструкції?",
        a: "ШІ — чудовий копірайтер, але він дасть вам «стерильну» теорію. Він не знає нюансів вашої логістики чи того, чому менеджер Іван працює саме так. Ми дістаємо знання безпосередньо з «голів» вашої команди та впорядковуємо їх у систему. Ба більше, ми навчимо ваш ChatGPT працювати саме за вашими процесами, щоб він став реальним помічником, а не просто генератором тексту.",
      },
      {
        q: "Яке ваше ставлення до нашого софту, який ми вже використовуємо? ",
        a: "Для нас немає «незручного» софту. Будь-яку систему можна дослідити та змусити працювати на загальний результат. Наш рівень експертизи дозволяє швидко розібратися як у популярних CRM/ERP, так і у вузькоспеціалізованих архітектурах.",
      },
      {
        q: " Які інструменти ви зазвичай використовуєте для роботи?",
        a: "Ми працюємо з Notion, xTiles, OneNote, Confluence, Google Workspace, Asana, Trello, n8n, Clickup, Sendpulse, Notebook LM  та багатьма іншими. Ми обираємо не «наймодніший» інструмент, а той, що найкраще інтегрується у вашу корпоративну культуру.",
      },
      {
        q: "Чи потрібні моїй команді технічні навички для роботи з системою?",
        a: "Ні. Ми створюємо інтуїтивно зрозуміле середовище. Користуватися нашою системою так само просто, як Вікіпедією або навігатором у смартфоні.",
      },
      {
        q: "У мене немає часу навіть на чай, а аудит вимагатиме моєї участі. Чи не додасть це мені роботи?",
        a: "Якщо у вас немає часу на систему — ви і є головним «вузьким місцем» свого бізнесу. Нам знадобиться кілька сесій, щоб «відсканувати» процеси, а далі ми працюємо автономно. Це інвестиція 5 годин сьогодні, щоб отримати 10 годин свободи щотижня вже через місяць.",
      },
      {
        q: " Чому б мені просто не найняти асистента за $500, щоб він усе записував?",
        a: "Помічник зафіксує хаос, який є зараз, і ви отримаєте «стос паперів», якими ніхто не користується. ЗВИЧАЇКА — це архітектурне рішення. Ви інвестуєте один раз у фундамент, з яким потім впорається будь-який рядовий співробітник. Система окупається вже на другому наймі, оскільки стажер виходить на продуктивність удвічі швидше без вашої участі. ",
      },
      {
        q: " Що як через три місяці наші процеси зміняться? Система стане непотрібною? ",
        a: "Система — це живий організм. Ми не залишаємо «мертвих» PDF-файлів. Ми передаємо динамічну платформу і навчаємо вашу команду оновлювати її за 5 хвилин. Ви отримуєте не просто опис процесів, а культуру фіксації знань.",
      },
      {
        q: "Які терміни впровадження",
        a: (
          <>
            Все залежить від масштабу:
            <p>
              <b>Порядок на вчора:</b> 1-2 тижні.
            </p>
            <p>
              <b>Корпоративна культура та ШІ:</b> 3–5 тижнів.
            </p>
            <p>
              <b>Цифровий мозок компанії:</b> 2–3 місяці.
            </p>
          </>
        ),
      },
      {
        q: "Як оформлюється юридична частина та оплата?",
        a: "Оплата за рахунком на реквізити ФОП. Ми обов'язково підписуємо договір про нерозголошення (NDA) та основний договір про співпрацю, де чітко прописані етапи, терміни та результати. ",
      },
      {
        q: "Які гарантії ми отримуємо?",
        a: "Ви отримуєте систему, яка пройшла тестування на вашій команді. В усі пакети включено певну кількість годин безкоштовної підтримки після впровадження, щоб переконатися, що все працює як годинник. Ваші дані залишаються вашою власністю — ми лише наводимо в них лад. ",
      },
      {
        q: "Що буде з нашими даними?",
        a: "Всі ваші дані залишаються у вашій власності. Ми лише структуруємо та систематизуємо їх. Повна конфіденційність гарантована.",
      },
      {
        q: "Чи обов’язково купувати цілий пакет послуг, якщо мені потрібна лише одна конкретна функція?",
        a: (
          <>
            Зовсім ні. Хоча пакети сформовані для комплексного вирішення задач,{" "}
            <b>ЗВИЧАЇКА</b> — це передусім про доцільність. Ми можемо зайти в
            проєкт точково, щоб вирішити конкретний «біль»:
            <p>
              <strong>Міграція: </strong> Наприклад, якщо ви хочете переїхати з
              однієї таск-менеджмент системи в іншу (з Trello в Asana чи Notion)
              без втрати даних та нервів команди.
            </p>
            <p>
              <strong>Систематизація</strong> Якщо потрібно просто перетворити
              хаос із файлів на Google Диску на логічну, структуровану базу
              даних, де кожен документ має своє місце.
            </p>
            <p>
              <strong>Окремий процес:</strong> Описати лише один складний вузол
              (наприклад, найм або обробку замовлень).
            </p>
          </>
        ),
      },
    ],
    [],
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white py-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button
            onClick={() => setIsFaqOpen(true)}
            className="group relative px-6 py-2.5 bg-white/10 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              ЧаПи
            </span>
          </button>

          <p className="text-center">© 2026 Розробник drgnvlnc@gmail.com</p>

          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="group relative px-6 py-2.5 bg-white/10 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Privacy Policy
            </span>
          </button>
        </div>
      </div>

      {/* FAQ Modal */}
      {isFaqOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsFaqOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <h2 className="text-3xl font-semibold flex items-center gap-3">
                <HelpCircle className="w-8 h-8" />
                Часті Питання (FAQ)
              </h2>
              <button
                onClick={() => setIsFaqOpen(false)}
                className="hover:bg-white/20 rounded-2xl p-2 transition-all"
              >
                <X size={28} />
              </button>
            </div>

            {/* Content - ЦЕ ДОДАЙ! */}
            <div className="p-6 space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.q}
                  </h3>
                  <div className="text-gray-600 leading-relaxed">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <h2 className="text-3xl font-semibold flex items-center gap-3">
                <FileText className="w-8 h-8" />
                Політика конфіденційності
              </h2>
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-8 space-y-6 text-gray-700 leading-relaxed">
              {/* Вступ */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-600">
                <p className="text-lg text-gray-800">
                  Ми цінуємо вашу довіру та дбаємо про безпеку вашої інформації.
                  Поки ви занурюєтесь у культуру своєї компанії та плануєте її
                  розвиток за чашкою чаю, проект <strong>«ЗВИЧАЇКА»</strong>{" "}
                  забезпечує надійну роботу систем, зокрема й захист ваших
                  даних.
                </p>
              </div>

              {/* Секція 1 */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-purple-600">1.</span> Загальні положення
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
                      Ім'я, прізвище, номер телефону, адреса електронної пошти.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="font-semibold text-gray-900 mb-2">
                      Технічні дані:
                    </p>
                    <p>
                      Сайт автоматично фіксує технічну інформацію (IP-адреса,
                      cookies, дані браузера). Ці дані зберігаються тимчасово та
                      використовуються для коректної роботи сайту, аналітики
                      відвідуваності та захисту від спаму.
                    </p>
                  </div>
                </div>
              </section>

              {/* Секція 3 */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-purple-600">3.</span> Мета обробки даних
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
                  Ми використовуємо сучасні стандарти захисту для вашого спокою:
                </p>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-400">
                    <p className="font-semibold text-gray-900 mb-2">
                      🔒 Захищене з'єднання:
                    </p>
                    <p>
                      Передача даних із сайту здійснюється через SSL-шифрування.
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
                  процес зберігання та обробки даних на умовах конфіденційності.
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
                      Вимагати виправлення або повного видалення ваших даних із
                      нашої системи
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
                  <span className="text-purple-600">7.</span> Термін зберігання
                </h3>
                <p>
                  Дані зберігаються протягом періоду, необхідного для досягнення
                  цілей обробки, або до моменту відкликання вашої згоди.
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
                  <strong className="text-gray-900">Останнє оновлення:</strong>{" "}
                  01 лютого 2026 р.
                  <br />
                  <span className="text-gray-600">
                    Ми залишаємо за собою право оновлювати цю політику. Зміни
                    набувають чинності з моменту публікації на сайті.
                  </span>
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Footer.displayName = "Footer";

// Головний компонент
const KnowledgeBaseLanding = () => {
  return (
    <div className="w-full">
      <Header />
      <HeroSection />
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
