import { memo } from 'react';
import { motion } from 'framer-motion';
import { steps } from '../../data/process';

export const ProcessSection = memo(() => {
  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-semibold text-gray-900 mb-6">
            Прозорий процес від ідеї до результату
          </h2>
          <p className="text-xl text-gray-600">
            Замовте безкоштовну консультацію — ми проаналізуємо вашу ситуацію та запропонуємо рішення
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-purple-400 to-pink-400 -translate-y-12"></div>

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

ProcessSection.displayName = 'ProcessSection';
