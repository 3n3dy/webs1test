import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import MultiStepFormModal from './components/MultiStepFormModal';

const SurveyApp = () => {
  const [isOpen] = React.useState(true);

  const handleClose = () => {
    // Після закриття перенаправити на головну
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-800 to-pink-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📋 Опитування для клієнтів
          </h1>
          <p className="text-purple-200 text-lg">
            Відповідайте на запитання, щоб ми краще зрозуміли ваші потреби
          </p>
        </div>
        
        <MultiStepFormModal 
          isOpen={isOpen} 
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurveyApp />
  </React.StrictMode>
);
