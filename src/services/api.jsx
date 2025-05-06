import axios from "axios";
import { data } from "react-router-dom";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3001/Almacenadora/v1/',
    timeout: 5000
})

apiClient.interceptors.request.use(config => {
    const stored = localStorage.getItem("user");
    if (stored) {
        const { token } = JSON.parse(stored);
        if (token) {
            config.headers['x-token'] = token;
        }
    }
    return config;
});
  

export const login = async(data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const register = async(data) => {
    try {
        return await apiClient.post('/auth/register', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}

export const getSuppliers = async () => {
    try {
        return await apiClient.get('/supplier')
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const addSupplier = async (data) => {
    try {
        return await apiClient.post('/supplier', data)   
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const updateSupplier = async (id, data) => {
    try {
        return await apiClient.put(`/supplier/${id}`, data);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const deleteSupplier = async (id) => {
    try {
        return await apiClient.delete(`/supplier/${id}`);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const getCategories = async () => {
    try {
        return await apiClient.get('/categories');
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const addCategory = async (data) => {
    try {
        return await apiClient.post('/categories', data);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const updateCategory = async (id, data) => {
    try {
        return await apiClient.put(`/categories/${id}`, data);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const deleteCategory = async (id) => {
    try {
        return await apiClient.delete(`/categories/${id}`);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const getProducts = async () => {
    try {
        return await apiClient.get('/product'); 
    } catch (e) {
        return { 
            error: true,
            e
        };
    }
};

export const addProduct = async (data) => {
    try {
        return await apiClient.post('/product', data);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const updateProduct = async (id, data) => {
    try {
        return await apiClient.put(`/product/${id}`, data);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const deleteProduct = async (id) => {
    try {
        return await apiClient.delete(`/product/${id}`);
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const searchProducts = async (filters) => {
    try {
        return await apiClient.get('/product/buscar', { params: filters });
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const getClients = async () => {
    try {
        return await apiClient.get('/clientes');
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const addClient = async (data) => {
    try {
        return await apiClient.post('/clientes', data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const updateClient = async (id, data) => {
    try {
        return await apiClient.put(`/clientes/${id}`, data);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const deleteClient = async (id) => {
    try {
        return await apiClient.delete(`/clientes/${id}`);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const kardex = async (data) => {
    try {
        return await apiClient.get('/kardex', data)
    } catch (e) {
        return{
            error: true,
            e
        }
    }
}