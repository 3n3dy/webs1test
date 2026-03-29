import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FAQModal } from './components/footer/FAQModal';
import { faqData } from './data/faq';

const FAQPage = () => {
  const handleClose = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10" />
      <FAQModal isOpen={true} onClose={handleClose} faqData={faqData} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FAQPage />
  </React.StrictMode>
);
