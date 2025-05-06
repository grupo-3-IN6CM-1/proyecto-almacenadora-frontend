import { useState, useCallback } from "react";
import { getClients, addClient, updateClient, deleteClient } from "../../services/"; // Usamos las funciones desde services
import toast from "react-hot-toast";

export const useClients = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchClients = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getClients(); 
            if (response.error) {
                toast.error("Error al cargar clientes");
            } else {
                setClients(response.data.clients);
            }
        } catch (error) {
            toast.error("Error al cargar clientes");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addNewClient = async (client) => {
        setIsLoading(true);
        try {
            const response = await addClient(client); 
            if (response.error) {
                toast.error("Error al agregar cliente");
            } else {
                setClients((prev) => Array.isArray(prev) ? [...prev, response.data.client] : [response.data.client]);
                toast.success("Cliente agregado");
            }
        } catch (e) {
            toast.error("Error al agregar cliente");
        } finally {
            setIsLoading(false);
        }
    };

    const updateExistingClient = async (id, client) => {
        setIsLoading(true);
        try {
            const response = await updateClient(id, client);  
            if (response.error) {
                toast.error("Error al actualizar cliente");
            } else {
                setClients((prev) => prev.map((c) => (c._id === id ? response.data.client : c)));
                toast.success("Cliente actualizado");
            }
        } catch (e) {
            toast.error("Error al actualizar cliente");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteExistingClient = async (id) => {
        setIsLoading(true);
        try {
            const response = await deleteClient(id);  
            if (response.error) {
                toast.error("Error al eliminar cliente");
            } else {
                setClients((prev) => prev.filter((c) => c._id !== id));
                toast.success("Cliente eliminado");
            }
        } catch (e) {
            toast.error("Error al eliminar cliente");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        clients,
        isLoading,
        fetchClients,
        addNewClient,
        updateExistingClient,
        deleteExistingClient,
    };
};
