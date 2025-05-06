import { useState, useCallback } from 'react';
import {
  getSuppliers as getSuppliersRequest,
  addSupplier as addSupplierRequest,
  updateSupplier as updateSupplierRequest,
  deleteSupplier as deleteSupplierRequest
} from '../../services/api.jsx';
import toast from 'react-hot-toast';

export const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSuppliers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getSuppliersRequest();
      const { success, suppliers: data } = response.data;
      if (success) {
        setSuppliers(data);
      } else {
        toast.error('Error al cargar proveedores');
      }
    } catch (e) {
      toast.error('Error al cargar proveedores');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addSupplier = async (supplier) => {
    setIsLoading(true);
    try {
      const response = await addSupplierRequest(supplier);
      const { success, supplier: newSup } = response.data;
      if (success) {
        setSuppliers(prev => [...prev, newSup]);
        toast.success('Proveedor agregado');
      } else {
        toast.error('Error al agregar proveedor');
      }
    } catch {
      toast.error('Error al agregar proveedor');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSupplier = async (id, supplier) => {
    setIsLoading(true);
    try {
      const response = await updateSupplierRequest(id, supplier);
      const { success, supplier: updated } = response.data;
      if (success) {
        setSuppliers(prev => prev.map(s => s._id === id ? updated : s));
        toast.success('Proveedor actualizado');
      } else {
        toast.error('Error al actualizar proveedor');
      }
    } catch {
      toast.error('Error al actualizar proveedor');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSupplier = async (id) => {
    setIsLoading(true);
    try {
      const response = await deleteSupplierRequest(id);
      const { success } = response.data;
      if (success) {
        setSuppliers(prev => prev.filter(s => s._id !== id));
        toast.success('Proveedor desactivado');
      } else {
        toast.error('Error al eliminar proveedor');
      }
    } catch {
      toast.error('Error al eliminar proveedor');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suppliers,
    isLoading,
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
  };
};
