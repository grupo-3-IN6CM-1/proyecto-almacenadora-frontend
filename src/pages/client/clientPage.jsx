import React, { useEffect, useState } from "react";
import { useClients } from "../../shared/hooks";
import { Navbar } from '../../components/navbars/Navbar';
import toast from "react-hot-toast";
import {useProtectedPage} from '../../shared/hooks/UseProtectedPage';  
import './clientPage.css';

export const ClientPage = () => {
    useProtectedPage();  

    const { clients, isLoading, fetchClients, addNewClient, updateExistingClient, deleteExistingClient } = useClients();
    const [formState, setFormState] = useState({
        name: '',
        contact: '',
        products_acquired: [],
    });
    const [editingClientId, setEditingClientId] = useState(null);  

    useEffect(() => {
        fetchClients(); 
    }, [fetchClients]);

    const handleSave = async () => {
        if (!formState.name || !formState.contact) {
            toast.error('Nombre y contacto son requeridos.');
            return;
        }

        const payload = { ...formState };

        if (editingClientId) {
            await updateExistingClient(editingClientId, payload);
            setEditingClientId(null);
        } else {
            await addNewClient(payload);
        }

        setFormState({ name: '', contact: '', products_acquired: [] });
    };

    const handleEdit = (client) => {
        setFormState({
            name: client.name,
            contact: client.contact,
            products_acquired: client.products_acquired,
        });
        setEditingClientId(client._id);  
    };

    const handleDelete = async (clientId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
            await deleteExistingClient(clientId);
        }
    };

    return (
        <div className="clients-page">
            <Navbar />
            <h2>Clientes</h2>
            
            {/* Formulario de creación y edición de clientes */}
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Contacto"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Productos adquiridos (IDs separados por coma)"
                    value={formState.products_acquired.join(',')}
                    onChange={(e) => setFormState({ 
                        ...formState, 
                        products_acquired: e.target.value.split(',').map(id => id.trim())
                    })}
                />
                <button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Guardando...' : editingClientId ? 'Actualizar' : 'Agregar'}
                </button>
            </div>

            {/* Mostrar mensaje de carga */}
            {isLoading && <p>Cargando clientes...</p>}

            {/* Tabla de clientes */}
            <table className="clients-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Productos adquiridos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.length > 0 ? (
                        clients.map((client) => (
                            <tr key={client._id}>
                                <td>{client.name}</td>
                                <td>{client.contact}</td>
                                <td>{client.products_acquired.length}</td>
                                <td>
                                    <button onClick={() => handleEdit(client)}>Editar</button>
                                    <button onClick={() => handleDelete(client._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay clientes.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientPage;