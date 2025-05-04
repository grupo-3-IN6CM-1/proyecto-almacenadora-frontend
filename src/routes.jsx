import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { Welcome } from './components/Welcome.jsx'
import { KardexPage } from './pages/kardex/kardexPage.jsx';
import { VisualizarEstadisticas } from './pages/reports/reportsPage.jsx'

const routes = [
    {path: '/', element: <Welcome/>},
    {path: '/auth', element: <Auth />},
    {path: '/dashboard', element: <DashboardPage />},
    {path: '/kardex', element: <KardexPage />},
    {path: '/stats', element: < VisualizarEstadisticas/>},
]

export default routes