import axios from "axios";

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

export const getStats = async () => {
    // 1) Leer token igual que en KardexPage
    const { token = "" } = JSON.parse(localStorage.getItem('user') || '{}');
  
    try {
      // 2) Hacer GET a /stats enviando x-token
      return await apiClient.get(
        '/stats',
        { headers: { 'x-token': token } }
      );
    } catch (e) {
      return { error: true, e };
    }
  };

  export const getUsers = async () => {
    try {
      return await apiClient.get('/users');
    } catch (e) {
      return {
        error: true,
        e
      };
    }
  };