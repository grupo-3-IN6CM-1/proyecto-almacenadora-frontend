import { useUserDetails } from "../../shared/hooks";
import { Navbar } from "../../components/navbars/Navbar";
import '../dashboard/dashboardPage.css'

export const DashboardPage = () => {
  const { username } = useUserDetails();

  return (
    <div>
      <div className="dashboard-body">
        <div className="dashboard-content-container">
          <div className="welcome-card">
            <h1 className="welcome-heading">Bienvenido de vuelta, {username}, ¿qué quieres hacer hoy?</h1>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
