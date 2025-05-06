import { useNavigate } from "react-router-dom";
import './Error404Page.css'; 

const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <div className="error404-page-body"> {}
      <div className="error404-container"> {}
        <h1>Error</h1>
        <p>La ruta que estás buscando no existe.</p>
        <button onClick={() => navigate('/auth')}>Ir al Login</button>
      </div>
    </div>
  );
};

export default Error404Page;
