import { useNavigate } from "react-router-dom";
import './UnauthorizedPage.css'; 

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page-body"> {}
      <div className="unauthorized-container">
        <h1>Acceso no autorizado</h1>
        <p>No tienes permisos para ver esta página.</p>
        <button onClick={() => navigate('/auth')}>Ir al Login</button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
