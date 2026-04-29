import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASTER_EGG_THRESHOLD = 5;

const messages = [
  "Час іде...",
  "Вже скоро...",
  "Терпіння!",
  "Ще трошки...",
  "О, наполегливий!",
];

const easterEggLines = [
  "🎉 Ти знайшов мене!",
  "Я — Ї, літера пісочного годинника.",
  "Існую з часів, коли ще часу не було.",
  "Тепер час - найцінніший. Збережи свій ! 🫶🏻",
];

type SandParticle = {
  id: number;
  x: number;
  delay: number;
};

interface YiHourglassEasterEggProps {
  disabled?: boolean;
}

export default function YiHourglassEasterEgg({
  disabled = false,
}: YiHourglassEasterEggProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState("");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [blinkLeft, setBlinkLeft] = useState(false);
  const [blinkRight, setBlinkRight] = useState(false);
  const [sandParticles, setSandParticles] = useState<SandParticle[]>([]);

  const blinkTimer = useRef<number | null>(null);
  const blinkResetTimer = useRef<number | null>(null);
  const tooltipTimer = useRef<number | null>(null);
  const eggTimer = useRef<number | null>(null);
  const particleId = useRef(0);

  const isInteractive = !disabled;
  const isHoverActive = isInteractive && isHovered;
  const shouldShowTooltip = isInteractive && showTooltip;
  const shouldShowEasterEgg = isInteractive && showEasterEgg;

  useEffect(() => {
    if (!isHoverActive) {
      return () => {
        if (blinkTimer.current !== null) {
          window.clearInterval(blinkTimer.current);
        }
        if (blinkResetTimer.current !== null) {
          window.clearTimeout(blinkResetTimer.current);
        }
      };
    }

    const blink = () => {
      const eye = Math.random() > 0.5 ? "left" : "both";
      if (eye === "left" || eye === "both") setBlinkLeft(true);
      if (eye === "both") setBlinkRight(true);

      if (blinkResetTimer.current !== null) {
        window.clearTimeout(blinkResetTimer.current);
      }

      blinkResetTimer.current = window.setTimeout(() => {
        setBlinkLeft(false);
        setBlinkRight(false);
      }, 120);
    };

    blink();
    blinkTimer.current = window.setInterval(blink, 1800);

    return () => {
      if (blinkTimer.current !== null) {
        window.clearInterval(blinkTimer.current);
      }
      if (blinkResetTimer.current !== null) {
        window.clearTimeout(blinkResetTimer.current);
      }
    };
  }, [isHoverActive]);

  useEffect(() => {
    if (!disabled) {
      return;
    }

    const resetTimer = window.setTimeout(() => {
      setIsHovered(false);
      setShowTooltip(false);
      setShowEasterEgg(false);
      setClickCount(0);
      setBlinkLeft(false);
      setBlinkRight(false);
    }, 0);

    return () => window.clearTimeout(resetTimer);
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (tooltipTimer.current !== null) {
        window.clearTimeout(tooltipTimer.current);
      }
      if (eggTimer.current !== null) {
        window.clearTimeout(eggTimer.current);
      }
    };
  }, []);

  const clearInteractionState = () => {
    setIsHovered(false);
    setBlinkLeft(false);
    setBlinkRight(false);
  };

  const spawnParticles = () => {
    const newParticles: SandParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: particleId.current++,
      x: Math.random() * 30 - 15,
      delay: i * 0.05,
    }));

    setSandParticles((prev) => [...prev, ...newParticles]);

    window.setTimeout(() => {
      setSandParticles((prev) =>
        prev.filter((particle) =>
          newParticles.every((newParticle) => newParticle.id !== particle.id),
        ),
      );
    }, 1000);
  };

  const handleClick = () => {
    if (!isInteractive) return;

    const nextClickCount = clickCount + 1;
    setClickCount(nextClickCount);
    setIsFlipped((prev) => !prev);
    spawnParticles();

    if (nextClickCount >= EASTER_EGG_THRESHOLD) {
      if (eggTimer.current !== null) {
        window.clearTimeout(eggTimer.current);
      }
      eggTimer.current = window.setTimeout(() => setShowEasterEgg(true), 400);
      setClickCount(0);
      return;
    }

    setTooltipMsg(messages[nextClickCount - 1] || "...");
    setShowTooltip(true);

    if (tooltipTimer.current !== null) {
      window.clearTimeout(tooltipTimer.current);
    }
    tooltipTimer.current = window.setTimeout(() => setShowTooltip(false), 1500);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {shouldShowTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg"
          >
            {tooltipMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHoverActive && !shouldShowTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gray-200 bg-white/90 px-3 py-1.5 text-xs text-gray-700 shadow"
          >
            👆 Клікни на мене!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <AnimatePresence>
          {sandParticles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 1, y: 42, x: 25 + particle.x, scale: 1 }}
              animate={{
                opacity: 0,
                y: 90,
                x: 25 + particle.x * 2,
                scale: 0.3,
              }}
              exit={{}}
              transition={{
                duration: 0.8,
                delay: particle.delay,
                ease: "easeIn",
              }}
              className="absolute h-1.5 w-1.5 rounded-full bg-yellow-300"
              style={{ top: 0, left: 0 }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        animate={
          !isInteractive
            ? { scale: 1, y: 0 }
            : isHoverActive
              ? { scale: 1.08 }
              : {
                  y: [0, -8, 0],
                  transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
        }
        whileTap={isInteractive ? { scale: 0.9 } : undefined}
        onClick={handleClick}
        onHoverStart={() => {
          if (!isInteractive) return;
          setIsHovered(true);
        }}
        onHoverEnd={clearInteractionState}
        className={`select-none ${isInteractive ? "cursor-pointer" : "cursor-default opacity-40"}`}
        style={{ display: "inline-block" }}
      >
        <motion.div
          animate={{ rotate: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <svg
            width="50"
            height="85"
            viewBox="0 0 50 85"
            className="drop-shadow-md"
          >
            <motion.ellipse
              cx="15"
              cy="8"
              rx="5.5"
              ry={blinkLeft ? 1 : 5.5}
              fill={isHoverActive ? "#fbbf24" : "#ffffff"}
              transition={{ duration: 0.05 }}
            />
            <motion.ellipse
              cx="35"
              cy="8"
              rx="5.5"
              ry={blinkRight ? 1 : 5.5}
              fill={isHoverActive ? "#fbbf24" : "#ffffff"}
              transition={{ duration: 0.05 }}
            />

            {isHoverActive && (
              <>
                <circle cx="15" cy="9" r="2" fill="#1f2937" />
                <circle cx="35" cy="9" r="2" fill="#1f2937" />
              </>
            )}

            <path d="M 8,18 L 42,18 L 28,42 L 22,42 Z" fill="transparent" />
            <path d="M 22,42 L 28,42 L 42,72 L 8,72 Z" fill="white" />
            <path
              d="M 8,18 L 42,18 L 28,42 L 22,42 L 8,18 M 22,42 L 28,42 L 42,72 L 8,72 L 22,42"
              fill="none"
              stroke={isHoverActive ? "#fbbf24" : "#9ca3af"}
              strokeWidth="3.5"
            />
            <line
              x1="25"
              y1="40"
              x2="25"
              y2="44"
              stroke="#1f2937"
              strokeWidth="2"
            />

            <polygon points="25,44 11,69 39,69" fill="#1f2937" opacity="0.9">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </polygon>

            {isHoverActive && (
              <circle cx="25" cy="46" r="1.5" fill="#f59e0b" opacity={0.8}>
                <animate
                  attributeName="cy"
                  values="44;60;44"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>
        </motion.div>
      </motion.div>

      {isInteractive && clickCount > 0 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: EASTER_EGG_THRESHOLD }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index < clickCount ? "scale-110 bg-yellow-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {shouldShowEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 max-w-sm overflow-hidden rounded-3xl bg-white p-10 text-center shadow-2xl"
            >
              <div className="absolute inset-0 pointer-events-none">
                {["🕐", "⏳", "⌛", "🕑", "🕒", "🕓"].map((emoji, index) => (
                  <div
                    key={index}
                    className="absolute text-3xl opacity-10"
                    style={{
                      top: `${10 + ((index * 15) % 80)}%`,
                      left: `${5 + ((index * 17) % 85)}%`,
                      transform: `rotate(${index * 30}deg)`,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="mb-4 inline-block text-6xl"
              >
                ⌛
              </motion.div>

              <div className="relative z-10 space-y-2">
                {easterEggLines.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.5 }}
                    className={
                      index === 0
                        ? "text-2xl font-bold text-gray-800"
                        : "text-base text-gray-600"
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setShowEasterEgg(false)}
                className="mt-8 rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
              >
                Зрозуміло, Ї 🫡
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
