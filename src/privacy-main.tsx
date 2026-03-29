// src/privacy-main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PrivacyModal } from './components/footer/PrivacyModal';

const PrivacyPage = () => {
  const handleClose = () => {
    window.location.href = '/';
  };

  // Модалка сама малює фон + центрований контейнер
  return <PrivacyModal isOpen={true} onClose={handleClose} />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>
);
