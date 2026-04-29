import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MultiStepFormModal from "./components/MultiStepFormModal";

export const SurveyPage = () => {
  const handleClose = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10" />
      <MultiStepFormModal isOpen={true} onClose={handleClose} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SurveyPage />
  </React.StrictMode>,
);
