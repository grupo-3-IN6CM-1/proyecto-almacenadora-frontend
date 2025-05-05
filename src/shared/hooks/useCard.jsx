import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import jackImage from '../../assets/img/jack.jpg'; // Imagen predeterminada

const UserCard = ({ user }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img 
        variant="top" 
        src={user.profilePicture || jackImage}  // Usa la imagen del usuario o la predeterminada
        alt="Foto de perfil"
        className="user-card-img"
      />
      <Card.Body>
        <Card.Title>{user.name} {user.surname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
        <Card.Text>
          📧 {user.email}<br />
          🔐 Rol: {user.role}
        </Card.Text>
        <Button variant="outline-dark">Editar información</Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
