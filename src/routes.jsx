import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { Welcome } from './components/Welcome.jsx'
import { KardexPage } from './pages/kardex/kardexPage.jsx';
import {SuppliersPage} from './pages/supplier/suppliersPage.jsx';

const routes = [
    {path: '/', element: <Welcome/>},
    {path: '/auth', element: <Auth />},
    {path: '/dashboard', element: <DashboardPage />},
    {path: '/supplier', element: <SuppliersPage/>},
    {path: '/kardex', element: <KardexPage />},

]

export default routes