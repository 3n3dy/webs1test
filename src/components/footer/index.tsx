import { memo, useState } from 'react';
import { FileText, HelpCircle } from 'lucide-react';
import { FAQModal } from './FAQModal';
import { PrivacyModal } from './PrivacyModal';
import { faqData } from '../../data/faq';

export const Footer = memo(() => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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

          <p className="text-center">© 2026 drgnvlnc@gmail.com</p>

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

      <FAQModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} faqData={faqData} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
});

Footer.displayName = 'Footer';
