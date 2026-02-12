import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { pains } from '../../data/pains';

export const PainSolutionSection = memo(() => {
  const [activePain, setActivePain] = useState<number | null>(null);

  return (
    <div className="py-14 bg-gradient-to-r from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Наш підхід — для виправлення цих помилок:
          </h2>
          <div className="flex items-center max-w-3xl mx-auto my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            <div className="px-4 text-2xl">⚡</div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-400 to-transparent"></div>
          </div>
          <p className="text-xl font-semibold text-gray-600 max-w-3xl mx-auto">
            Від хаосу до структурованого навчання.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {pains.map((pain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              animate={{ height: 'auto' }}
              className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer min-h-[150px]"
              onMouseEnter={() => setActivePain(index)}
              onMouseLeave={() => setActivePain(null)}
              onClick={() => setActivePain(activePain === index ? null : index)}
            >
              {/* FLEX LAYOUT */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`text-5xl flex-shrink-0 transition-all duration-300 ${activePain === index ? 'scale-110' : ''}`}>
                  {pain.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 flex-1">{pain.title}</h3>
              </div>

              <div className="flex justify-center mb-2">
                <ChevronDown className={`w-6 h-6 text-purple-400 transition-all duration-300 ${activePain === index ? 'rotate-180 text-purple-600 animate-bounce' : ''}`} />
              </div>

              <div className={`overflow-hidden transition-all duration-500 ${activePain === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-red-600 mb-2">Проблема:</p>
                    <p className="text-gray-700">{pain.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 mb-2">Рішення:</p>
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

PainSolutionSection.displayName = 'PainSolutionSection';

