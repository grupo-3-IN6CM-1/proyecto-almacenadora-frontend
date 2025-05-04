import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { Welcome } from './components/Welcome.jsx'
import { KardexPage } from './pages/kardex/kardexPage.jsx';

const routes = [
    {path: '/', element: <Welcome/>},
    {path: '/auth', element: <Auth />},
    {path: '/dashboard', element: <DashboardPage />},
    {path: '/kardex', element: <KardexPage />},

]

export default routes