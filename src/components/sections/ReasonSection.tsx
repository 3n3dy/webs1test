import { memo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, CheckCircle } from "lucide-react";
import { reasons } from "../../data/reasons";

export const ReasonsSection = memo(() => {
  const [activeReason, setActiveReason] = useState<number | null>(null);

  return (
    <div className="py-14 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 text-center leading-tight">
            6 причин чому варто впроваджувати проект{" "}
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
              animate={{ height: "auto" }}
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

              <div className="flex justify-center mb-2">
                <ChevronDown
                  className={`w-6 h-6 text-purple-400 transition-all duration-300 ${activeReason === index ? "rotate-180 text-purple-600 animate-bounce" : ""}`}
                />
              </div>

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
