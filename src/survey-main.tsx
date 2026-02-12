import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MultiStepFormModal from './components/MultiStepFormModal'

const SurveyPage = () => {
  const handleClose = () => {
    window.location.href = '/'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10" />
      <MultiStepFormModal 
        isOpen={true} 
        onClose={handleClose}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurveyPage />
  </React.StrictMode>
)
