import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/welcome.css";

export const Welcome = () => {
  const navigate = useNavigate();
  const fullText = "¡Hola, parece ser que eres Nuevo"; 

  const handleLoginRedirect = () => {
    navigate("/auth");
  };
  
  return (
    <div className="welcome-page-wrapper">
      <div className="welcome-card">
        <h1 className="welcome-heading">{fullText}</h1>

        <div className="welcome-buttons">
          <button className="btn btn-login" onClick={handleLoginRedirect}>
            <h2>Comencemos</h2>
          </button>
        </div>
      </div>
    </div>
  );
};

