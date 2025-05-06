import { DashboardPage } from './pages/dashboard';
import { Auth } from './pages/auth';
import { Welcome } from './components/Welcome.jsx'
import { KardexPage } from './pages/kardex/kardexPage.jsx';
import {SuppliersPage} from './pages/supplier/suppliersPage.jsx';
import { VisualizarEstadisticas } from './pages/reports/reportsPage.jsx'
import { CategoriesPage } from './pages/categories/categoriesPage.jsx'
import { ProductsPage } from './pages/products/productsPage.jsx'
import { ClientPage } from './pages/client/clientPage.jsx'
import  UsersPage  from './pages/user/userPage.jsx'
import UnauthorizedPage from './pages/paginasError/UnauthorizedPage.jsx';
import Error404Page from './pages/paginasError/Error404Page.jsx';


const routes = [
    {path: '/', element: <Welcome/>},
    {path: '/auth', element: <Auth />},
    {path: '/dashboard', element: <DashboardPage />},
    {path: '/supplier', element: <SuppliersPage/>},
    {path: '/kardex', element: <KardexPage />},
    {path: '/categories', element: <CategoriesPage />},
    {path: '/product', element: <ProductsPage />},
    {path: '/clientes', element: <ClientPage />},
    {path: '/stats', element: < VisualizarEstadisticas/>},
    {path: '/users', element: < UsersPage/>},
    { path: '/unauthorized', element: <UnauthorizedPage /> },
    { path: '*', element: <Error404Page /> },
]

export default routes