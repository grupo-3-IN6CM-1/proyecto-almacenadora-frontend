import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardVerificacionRol = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/'); 
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (e) {
      console.error('Error al leer usuario:', e);
      navigate('/');
    }
  }, []);

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-4">
      <h1>Bienvenido, {user.name}</h1>
      {user.role === 'admin' ? <AdminPanel /> : <UserPanel />}
    </div>
  );
};

const AdminPanel = () => (
  <div>
    <h2>Panel de Administrador</h2>
    <ul>
      <li>Administrar usuarios</li>
      <li>Ver estadísticas</li>
      <li>Configuraciones avanzadas</li>
    </ul>
  </div>
);

const UserPanel = () => (
  <div>
    <h2>Panel de Usuario</h2>
    <ul>
      <li>Ver perfil</li>
      <li>Editar información</li>
    </ul>
  </div>
);

export default DashboardVerificacionRol;
