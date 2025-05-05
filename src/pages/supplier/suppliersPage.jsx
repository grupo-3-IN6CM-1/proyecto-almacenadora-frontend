import React, { useEffect, useState } from 'react';
import { useSuppliers } from '../../shared/hooks';
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
    setEditingId(supplier._id);
    setFormState({
      name: supplier.name,
      contact: supplier.contact,
      products: supplier.products_supplied.join(',')
    });
  };

  return (
    <div className="suppliers-page">
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
                  <button onClick={() => handleEdit(s)}>Editar</button>
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