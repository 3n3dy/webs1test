import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PrivacyModal } from "./components/footer/PrivacyModal";

export const PrivacyPage = () => {
  const handleClose = () => {
    window.location.href = "/";
  };

  return <PrivacyModal isOpen={true} onClose={handleClose} />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>,
);
