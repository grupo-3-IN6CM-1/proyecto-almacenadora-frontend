import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import DashboardVerificacionRol from './pages/dashboard/DashboardVerificacionRol';  // Importa el nuevo componente

const routes = [
    { path: '/auth', element: <Auth /> },
    { path: '/dashboard', element: <DashboardVerificacionRol /> },  // Agrega esta línea para la ruta específica
    { path: '/*', element: <DashboardPage /> }
];

export default routes;
