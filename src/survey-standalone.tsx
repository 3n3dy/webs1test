import React from 'react';
import ReactDOM from 'react-dom/client';
import MultiStepFormModal from './components/MultiStepFormModal';
import './App.css';

const SurveyApp = () => {
  const [isOpen] = React.useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <MultiStepFormModal 
        isOpen={isOpen} 
        onClose={() => window.location.href = '/'}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurveyApp />
  </React.StrictMode>
);
