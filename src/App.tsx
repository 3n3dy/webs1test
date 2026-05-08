import "./App.css";
import {
  useCallback,
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CANVAS_ICONS,
  CANVAS_OBJECT_COUNT,
  MOUSE_REPEL_DISTANCE,
  MOUSE_REPEL_FORCE,
  type CanvasIcon,
} from "./constants/canvas";
import { drawIcon } from "./utils/drawIcons";
import { PainSolutionSection } from "./components/sections/PainSolutionSection";
import { ReasonsSection } from "./components/sections/ReasonSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { PersonalCalculationSection } from "./components/sections/PersonalCalculationSection";
import { CTASection } from "./components/sections/CTASection";
import { Footer } from "./components/footer";
import YiEgg from "./components/YiEgg";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "./components/header";
import ContactModal from "./components/ContactModal";
import ProjectInfoModal from "./components/ProjectInfoModal";
import {
  packageDetailColumns,
  servicePackages,
  type ServicePackage,
} from "./data/packages";

// Lazy loading для важких компонентів
const AboutAuthorModal = lazy(() => import("./components/AboutAuthorModal"));
const HERO_TITLE = "ПЕРЕТВОРІТЬ ХАОС НА СИСТЕМУ";
const HERO_SUBTITLES = [
  "Системність для малого та середнього бізнесу.",
  "Від безладдя до структурованого навчання.",
] as const;
const OFFSCREEN_POINTER_POSITION = { x: -1000, y: -1000 };
const CONTACT_MODAL_OPEN_DELAY_MS = 150;
const SPRING_LETTER_TRANSITION = {
  type: "spring",
  damping: 15,
  stiffness: 100,
} as const;
const HERO_LETTER_VARIANTS = {
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.2 },
  },
} as const;

type CanvasObject = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  icon: CanvasIcon;
  rotation: number;
  rotationSpeed: number;
};

type PackageGradientMap = Record<number, string>;

const getHeroLetterTransform = (index: number, isMobile: boolean) => {
  const spread = isMobile ? 220 : 440;
  const angle = ((index + 1) * 137.508) % 360;
  const radians = (angle * Math.PI) / 180;
  const radius = (0.45 + (index % 5) * 0.12) * spread;

  return {
    opacity: 0,
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
    rotate: ((index * 47) % 360) - 180,
    scale: 2,
  };
};

const ACTIVE_PACKAGE_GRADIENTS: PackageGradientMap = {
  0: "from-gray-900 via-purple-900 to-purple-800",
  1: "from-purple-900 via-purple-800 to-purple-900",
  2: "from-purple-800 to-gray-950",
};

const getActivePackageGradient = (activePackage: number | null) => {
  if (activePackage === null) {
    return "";
  }

  return ACTIVE_PACKAGE_GRADIENTS[activePackage] ?? ACTIVE_PACKAGE_GRADIENTS[2];
};

const getPackageDetailsByColumn = (activePackage: number, columnIndex: number) =>
  packageDetailColumns[activePackage * 3 + columnIndex]?.items ?? [];

interface HeroSectionProps {
  isProjectInfoOpen: boolean;
  setIsProjectInfoOpen: (value: boolean) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (value: boolean) => void;
}

// Винесені компоненти для кращої оптимізації
const HeroSection = memo(({
  isProjectInfoOpen,
  setIsProjectInfoOpen,
  isContactModalOpen,
  setIsContactModalOpen,
}: HeroSectionProps) => {
  const heroLetters = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return HERO_TITLE.split("").map((char, index) => ({
      char,
      hidden: getHeroLetterTransform(index, isMobile),
    }));
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(OFFSCREEN_POINTER_POSITION);
  const animationFrameRef = useRef<number | null>(null);
  const contactOpenTimeoutRef = useRef<number | null>(null);

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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobileViewport = window.innerWidth < 768;
    const objectCount = prefersReducedMotion
      ? Math.min(CANVAS_OBJECT_COUNT, 8)
      : isMobileViewport
        ? Math.min(CANVAS_OBJECT_COUNT, 12)
        : CANVAS_OBJECT_COUNT;

    // Встановлення розміру
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ініціалізація об'єктів
    const objects: CanvasObject[] = [];
    for (let i = 0; i < objectCount; i++) {
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
      mouseRef.current = OFFSCREEN_POINTER_POSITION;
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

        if (dist < MOUSE_REPEL_DISTANCE && dist > 0) {
          const force = (MOUSE_REPEL_DISTANCE - dist) / MOUSE_REPEL_DISTANCE;
          obj.vx += (dx / dist) * force * MOUSE_REPEL_FORCE;
          obj.vy += (dy / dist) * force * MOUSE_REPEL_FORCE;
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

  useEffect(() => {
    return () => {
      if (contactOpenTimeoutRef.current !== null) {
        window.clearTimeout(contactOpenTimeoutRef.current);
      }
    };
  }, []);

  const handleOpenContactFromProject = () => {
    setIsProjectInfoOpen(false);

    contactOpenTimeoutRef.current = window.setTimeout(() => {
      setIsContactModalOpen(true);
    }, CONTACT_MODAL_OPEN_DELAY_MS);
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
              variants={HERO_LETTER_VARIANTS}
              className="text-center w-full overflow-visible"
            >
              <h1 className="text-[5vw] sm:text-[6vw] md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-4 md:mb-6 leading-tight flex justify-center items-center whitespace-nowrap overflow-visible">
                {heroLetters.map(({ char, hidden }, index) => (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    variants={{
                      hidden,
                      visible: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        transition: SPRING_LETTER_TRANSITION,
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
                {HERO_SUBTITLES.map((line, index) => (
                  <p
                    key={line}
                    className={`text-sm sm:text-base md:text-2xl lg:text-3xl font-medium md:font-semibold text-purple-200 tracking-normal whitespace-normal md:whitespace-nowrap ${
                      index === 0
                        ? "xl:text-4xl"
                        : "mt-4 sm:mt-6 md:mt-8 xl:text-3xl"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Suspense fallback={<div className="h-[72px] w-[200px]" />}>
              <ProjectInfoModal
                open={isProjectInfoOpen}
                onOpenChange={setIsProjectInfoOpen}
                onOpenContact={handleOpenContactFromProject}
              />
            </Suspense>
          </motion.div>

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
  const activePackageGradient = useMemo(
    () => getActivePackageGradient(activePackage),
    [activePackage],
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
              className={`absolute inset-0 bg-gradient-to-r ${activePackageGradient} z-0 rounded-3xl`}
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
                {servicePackages[activePackage].name}
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto rounded-full"></div>
            </div>
          )}

          <div
            className={`grid grid-cols-1 md:grid-cols-3 transition-all duration-500 ${activePackage !== null ? "gap-0" : "gap-8"
              } ${activePackage !== null ? "relative z-10" : ""}`}
          >
            {servicePackages.map((pkg: ServicePackage, pkgIndex) => {
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
                            {getPackageDetailsByColumn(activePackage, pkgIndex).map(
                              (item, idx) => (
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
                              ),
                            )}
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
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const hasOpenModal = isProjectInfoOpen || isContactModalOpen;

  return (
    <div className="w-full">
      <Header />
      <HeroSection
        isProjectInfoOpen={isProjectInfoOpen}
        setIsProjectInfoOpen={setIsProjectInfoOpen}
        isContactModalOpen={isContactModalOpen}
        setIsContactModalOpen={setIsContactModalOpen}
      />
      <div
        className={`absolute bottom-10 left-0 right-0 flex justify-center transition-[z-index] ${
          hasOpenModal ? "z-0 pointer-events-none" : "z-40"
        }`}
      >
        <YiEgg />
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
