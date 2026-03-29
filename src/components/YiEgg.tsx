// YiEgg.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function YiHourglassEasterEgg() {
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
  const particleId = useRef(0);

  // Blinking eyes on hover
  useEffect(() => {
    if (isHovered) {
      const blink = () => {
        const eye = Math.random() > 0.5 ? "left" : "both";
        if (eye === "left" || eye === "both") setBlinkLeft(true);
        if (eye === "both") setBlinkRight(true);
        setTimeout(() => {
          setBlinkLeft(false);
          setBlinkRight(false);
        }, 120);
      };
      blink();
      blinkTimer.current = window.setInterval(blink, 1800);
    } else {
      if (blinkTimer.current !== null) {
        window.clearInterval(blinkTimer.current);
      }
      setBlinkLeft(false);
      setBlinkRight(false);
    }

    return () => {
      if (blinkTimer.current !== null) {
        window.clearInterval(blinkTimer.current);
      }
    };
  }, [isHovered]);

  const spawnParticles = () => {
    const newParticles: SandParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: particleId.current++,
      x: Math.random() * 30 - 15,
      delay: i * 0.05,
    }));
    setSandParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setSandParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
      );
    }, 1000);
  };

  const handleClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    setIsFlipped((f) => !f);
    spawnParticles();

    if (next >= EASTER_EGG_THRESHOLD) {
      setTimeout(() => setShowEasterEgg(true), 400);
      setClickCount(0);
      return;
    }

    setTooltipMsg(messages[next - 1] || "...");
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  return (
    <div className="relative">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                       bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg"
          >
            {tooltipMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover hint */}
      <AnimatePresence>
        {isHovered && !showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap
                       bg-white/90 text-gray-700 text-xs px-3 py-1.5 rounded-full shadow border border-gray-200"
          >
            👆 Клікни на мене!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sand particles */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        <AnimatePresence>
          {sandParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: 42, x: 25 + p.x, scale: 1 }}
              animate={{ opacity: 0, y: 90, x: 25 + p.x * 2, scale: 0.3 }}
              exit={{}}
              transition={{ duration: 0.8, delay: p.delay, ease: "easeIn" }}
              className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300"
              style={{ top: 0, left: 0 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* The Ї Hourglass */}
      <motion.div
        animate={
          isHovered
            ? { scale: 1.08 }
            : {
                y: [0, -8, 0], // менша амплітуда
                transition: {
                  duration: 1.2, // повільніший стрибок
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="cursor-pointer select-none"
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
            {/* Left eye */}
            <motion.ellipse
              cx="15"
              cy="8"
              rx="5.5"
              ry={blinkLeft ? 1 : 5.5}
              fill={isHovered ? "#fbbf24" : "#ffffff"}
              transition={{ duration: 0.05 }}
            />
            {/* Right eye */}
            <motion.ellipse
              cx="35"
              cy="8"
              rx="5.5"
              ry={blinkRight ? 1 : 5.5}
              fill={isHovered ? "#fbbf24" : "#ffffff"}
              transition={{ duration: 0.05 }}
            />

            {/* Pupils on hover */}
            {isHovered && (
              <>
                <circle cx="15" cy="9" r="2" fill="#1f2937" />
                <circle cx="35" cy="9" r="2" fill="#1f2937" />
              </>
            )}

            {/* Upper body (transparent glass) */}
            <path d="M 8,18 L 42,18 L 28,42 L 22,42 Z" fill="transparent" />
            {/* Lower body */}
            <path d="M 22,42 L 28,42 L 42,72 L 8,72 Z" fill="white" />
            {/* Outline */}
            <path
              d="M 8,18 L 42,18 L 28,42 L 22,42 L 8,18 M 22,42 L 28,42 L 42,72 L 8,72 L 22,42"
              fill="none"
              stroke={isHovered ? "#fbbf24" : "#9ca3af"}
              strokeWidth="3.5"
            />
            {/* Neck */}
            <line
              x1="25"
              y1="40"
              x2="25"
              y2="44"
              stroke="#1f2937"
              strokeWidth="2"
            />

            {/* Sand pile */}
            <polygon points="25,44 11,69 39,69" fill="#1f2937" opacity="0.9">
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </polygon>

            {/* Falling sand trickle on hover */}
            {isHovered && (
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

      {/* Click progress dots */}
      {clickCount > 0 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          {Array.from({ length: EASTER_EGG_THRESHOLD }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i < clickCount ? "bg-yellow-400 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      {/* Easter Egg Modal – трохи нижчий z-index за Radix-модалки */}
      <AnimatePresence>
        {showEasterEgg && (
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
              className="bg-white rounded-3xl p-10 max-w-sm mx-4 text-center shadow-2xl relative overflow-hidden"
            >
              {/* BG decoration */}
              <div className="absolute inset-0 pointer-events-none">
                {["🕐", "⏳", "⌛", "🕑", "🕒", "🕓"].map((emoji, i) => (
                  <div
                    key={i}
                    className="absolute text-3xl opacity-10"
                    style={{
                      top: `${10 + ((i * 15) % 80)}%`,
                      left: `${5 + ((i * 17) % 85)}%`,
                      transform: `rotate(${i * 30}deg)`,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="text-6xl mb-4 inline-block"
              >
                ⌛
              </motion.div>

              <div className="space-y-2 relative z-10">
                {easterEggLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.3 + 0.5 }}
                    className={`text-gray-800 ${
                      i === 0
                        ? "text-2xl font-bold"
                        : "text-base text-gray-600"
                    }`}
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
                className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
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
