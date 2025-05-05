import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import UserCard from '../../shared/hooks/useCard';
import {Navbar} from '../../components/navbars/Navbar'
import './userPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/Almacenadora/v1/users');
        if (data.success) {
          setUsers(data.users);
        } else {
          setError("Error al cargar usuarios");
        }
      } catch (err) {
        console.error(err);
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
    <Navbar/>
    <Container className="mt-4">
      <h2 className="text-center mb-4">Usuarios Activos</h2>
      <Row>
        {users.map(user => (
          <Col key={user.uid} xs={12} md={6} lg={4}>
            {/* Pasar cada 'user' como propiedad al componente UserCard */}
            <UserCard user={user} />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default UsersPage;
