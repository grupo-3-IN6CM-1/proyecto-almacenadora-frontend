import React, { useEffect, useState } from 'react';
import { useSuppliers } from '../../shared/hooks';
import { Navbar } from '../../components/navbars/Navbar';
import toast from 'react-hot-toast';
import './SuppliersPage.css';

export const SuppliersPage = () => {
  const {
    suppliers,
    isLoading,
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
  } = useSuppliers();

  const [formState, setFormState] = useState({ name: '', contact: '', products: '' });
  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;
  const userRole = user?.role;

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  const handleSave = async () => {
    const payload = {
      name: formState.name,
      contact: formState.contact,
      products_supplied: formState.products.split(',').map(id => id.trim())
    };

    if (editingId) {
      await updateSupplier(editingId, payload);
    } else {
      await addSupplier(payload);
    }

    setFormState({ name: '', contact: '', products: '' });
    setEditingId(null);
  };

  const handleEdit = (supplier) => {
    if (supplier.ownerId === userId || userRole === 'ADMIN') {
      setEditingId(supplier._id);
      setFormState({
        name: supplier.name,
        contact: supplier.contact,
        products: supplier.products_supplied.join(',')
      });
    } else {
      toast.error('No tienes permiso para editar este proveedor.');
    }
  };

  return (
    <div className="suppliers-page">
      <Navbar />
      <h2>Proveedores</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nombre"
          value={formState.name}
          onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Contacto"
          value={formState.contact}
          onChange={e => setFormState(prev => ({ ...prev, contact: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Productos (IDs separados por coma)"
          value={formState.products}
          onChange={e => setFormState(prev => ({ ...prev, products: e.target.value }))}
        />
        <button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Agregar')}
        </button>
      </div>

      {isLoading && <p>Cargando proveedores...</p>}

      {!isLoading && (
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th># Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? suppliers.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.contact}</td>
                <td>{s.products_supplied.length}</td>
                <td>
                  {(s.ownerId === userId || userRole === 'ADMIN') && (
                    <button onClick={() => handleEdit(s)}>Editar</button>
                  )}
                  <button onClick={() => deleteSupplier(s._id)}>Eliminar</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="4">No hay proveedores.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuppliersPage;
