import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { Welcome } from './components/Welcome.jsx'

const routes = [
    {path: '/', element: <Welcome/>},
    {path: '/auth', element: <Auth />},
    {path: '/dashboard', element: <DashboardPage />}
]

export default routes