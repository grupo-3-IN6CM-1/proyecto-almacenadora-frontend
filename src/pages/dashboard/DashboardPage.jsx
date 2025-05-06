import { useUserDetails } from "../../shared/hooks";
import { Navbar } from "../../components/navbars/Navbar";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../dashboard/dashboardPage.css";

export const DashboardPage = () => {
  const { username } = useUserDetails();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
        <div className="container">
          <p className="welcome-heading">
            Bienvenido de vuelta, {username}, ¿qué quieres hacer hoy?
          </p>
        </div>
      <div className="dashboard-body">
        <div className="dashboard-content-container">
          <div className="card-container">
            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://cdn-icons-png.flaticon.com/512/10963/10963565.png"
              />
              <Card.Body>
                <Card.Title>Productos</Card.Title>
                <Card.Text>Información sobre productos</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate("/product")} // Redirige a la ruta de productos
                >
                  Ver Productos
                </Button>
              </Card.Body>
            </Card>

            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz3i7JH-GTVRk6PH8DhIxZnUzoOJZeZfJfXA&s"
              />
              <Card.Body>
                <Card.Title>Categorías</Card.Title>
                <Card.Text>Información sobre categorías</Card.Text>
                <Button variant="primary"
                onClick={() => navigate("/categories")}
                >
                  Ver Más 
                </Button>
              </Card.Body>
            </Card>

            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://cdn-icons-png.freepik.com/256/3321/3321752.png?semt=ais_hybrid"
              />
              <Card.Body>
                <Card.Title>Proveedores</Card.Title>
                <Card.Text>Información sobre proveedores</Card.Text>
                <Button variant="primary"
                onClick={() => navigate("/supplier")}
                >
                  Ver Proveedores 
                </Button>
              </Card.Body>
            </Card>

            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9XkgIX9nOChVQtNqpURmg1ONjm7eie5jd4Q&s"
              />
              <Card.Body>
                <Card.Title>Clientes</Card.Title>
                <Card.Text>Información sobre clientes</Card.Text>
                <Button variant="primary"
                onClick={() => navigate("/clientes")}
                >
                  Ver clientes 
                </Button>
              </Card.Body>
            </Card>

            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://png.pngtree.com/png-clipart/20230824/original/pngtree-employer-and-employee-vector-picture-image_8378379.png"
              />
              <Card.Body>
                <Card.Title>Usuarios</Card.Title>
                <Card.Text>Información sobre los usuarios del sistema</Card.Text>
                <Button variant="primary">Ver Usuarios</Button>
              </Card.Body>
            </Card>

            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://www.hotelogix.com/images/Tomardecisionesbasadasendatos.png"
              />
              <Card.Body>
                <Card.Title>Reportes y estadísticas</Card.Title>
                <Card.Text>Información sobre inventario de productos y estadísticas.</Card.Text>
                <Button variant="primary"
                onClick={() => navigate("/stats")}
                >
                  Ver Más 
                </Button>
              </Card.Body>
            </Card>

            <Card className="dashboard-card">
              <Card.Img
                variant="top"
                src="https://cdn.bfldr.com/EL3HU3A3/as/m5fbpj38nbfs2cpr6h5qjmj/KardexRemstar_LR35_front_open_Schematic_002-v2%26height=207"
              />
              <Card.Body>
                <Card.Title>Kardex</Card.Title>
                <Card.Text>Gestión del Kardex de inventarios</Card.Text>
                <Button variant="primary"
                onClick={() => navigate("/kardex")}
                >
                  Ver Kardex 
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
