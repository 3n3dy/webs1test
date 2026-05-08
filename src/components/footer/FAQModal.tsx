import type { ReactNode } from "react";
import { X, HelpCircle } from "lucide-react";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  faqData: Array<{ q: string; a: string | ReactNode }>;
}

export const FAQModal = ({ isOpen, onClose, faqData }: FAQModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* ✅ overflow-y-auto прибрано, додано flex flex-col */}
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ✅ sticky прибрано, flex-shrink-0 фіксує header через flex */}
        <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <HelpCircle className="w-8 h-8" />
            Часті Питання (FAQ)
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-2xl p-2 transition-all"
          >
            <X size={28} />
          </button>
        </div>

        {/* ✅ overflow-y-auto тут — скролиться тільки контент */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
              <div className="text-gray-600 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
