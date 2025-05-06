import React, { useEffect, useState } from "react";
import { useCategories } from "../../shared/hooks";
import { Navbar } from '../../components/navbars/Navbar';
import toast from "react-hot-toast";
import './CategoriesPage.css';

export const CategoriesPage = () => {
    const { categories, isLoading, getCategories, addCategory, updateCategory, deleteCategory } = useCategories();
    const [formState, setFormState] = useState({ name: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleSave = async () => {
        if (!formState.name) {
            toast.error('El nombre de la categoría es requerido');
            return;
        }

        const payload = {
            name: formState.name
        };

        if (editingId) {
            await updateCategory(editingId, payload);
        } else {
            await addCategory(payload);
        }

        setFormState({ name: '' });
        setEditingId(null);
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setFormState({
            name: category.name
        });
    };

    return (
        <div className="categories-page">
            <Navbar />
            <h2>Categorías</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formState.name}
                    onChange={(e) => setFormState({ name: e.target.value })}
                />
                <button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Guardando...' : (editingId ? 'Actualizar' : 'Agregar')}
                </button>
            </div>

            {isLoading && <p>Cargando categorías...</p>}

            {!isLoading && (
                <table className="categories-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>
                                        <button onClick={() => handleEdit(c)}>Editar</button>
                                        <button onClick={() => deleteCategory(c._id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No hay categorías.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CategoriesPage;
