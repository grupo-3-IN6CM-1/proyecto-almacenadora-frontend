import React, { useState, useEffect } from "react";
import { useProducts, useCategories } from "../../shared/hooks";
import { Navbar } from '../../components/navbars/Navbar';
import toast from "react-hot-toast";
import './ProductsPage.css';

export const ProductsPage = () => {
    const { products, isLoading, getProducts, searchProducts, addProduct, updateProduct, deleteProduct } = useProducts();
    const { categories, getCategories } = useCategories();
    const [searchFilters, setSearchFilters] = useState({ category: '', name: '', entry_date: '' });
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        supplier: '',  
        entry_date: '',
        expiration_date: ''
    });

    const [editingProductId, setEditingProductId] = useState(null);  // Guardar el id del producto que se está editando

    useEffect(() => {
        getProducts(); // Al inicio carga todos los productos
        getCategories(); // Cargar categorías
    }, [getProducts, getCategories]);

    const handleSearch = async () => {
        if (searchFilters.category || searchFilters.name || searchFilters.entry_date) {
            await searchProducts(searchFilters);  // Llama a la función de búsqueda
        } else {
            toast.error('Debe completar al menos un campo de búsqueda.');
        }
    };

    const handleSave = async () => {
        if (!formState.name || !formState.price || !formState.stock || !formState.category || !formState.supplier || !formState.entry_date || !formState.expiration_date) {
            toast.error('Todos los campos son requeridos.');
            return;
        }
        const payload = { ...formState };

        if (editingProductId) {
            // Si estamos editando un producto, se actualiza
            await updateProduct(editingProductId, payload);
            setEditingProductId(null);  // Limpiar el id de edición después de actualizar
        } else {
            // Si no estamos editando, se agrega un producto nuevo
            await addProduct(payload);
        }

        // Limpiar el formulario después de guardar
        setFormState({ name: '', description: '', price: '', stock: '', category: '', supplier: '', entry_date: '', expiration_date: '' });
    };

    const handleEdit = (product) => {
        // Cargar los valores del producto en el formulario para editar
        setFormState({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category._id,  // Asegúrate de que se pase el ID de la categoría
            supplier: product.supplier,
            entry_date: product.entry_date,
            expiration_date: product.expiration_date
        });
        setEditingProductId(product._id);  // Guardar el ID del producto que se está editando
    };

    return (
        <div className="products-page">
            <h2>Productos</h2>

            {/* Formulario de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchFilters.name}
                    onChange={(e) => setSearchFilters({ ...searchFilters, name: e.target.value })}
                />
                <select
                    value={searchFilters.category}
                    onChange={(e) => setSearchFilters({ ...searchFilters, category: e.target.value })}
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={searchFilters.entry_date}
                    onChange={(e) => setSearchFilters({ ...searchFilters, entry_date: e.target.value })}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            {/* Formulario de creación y edición de productos */}
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={formState.stock}
                    onChange={(e) => setFormState({ ...formState, stock: e.target.value })}
                />
                <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Proveedor"
                    value={formState.supplier}
                    onChange={(e) => setFormState({ ...formState, supplier: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Fecha de entrada"
                    value={formState.entry_date}
                    onChange={(e) => setFormState({ ...formState, entry_date: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Fecha de expiración"
                    value={formState.expiration_date}
                    onChange={(e) => setFormState({ ...formState, expiration_date: e.target.value })}
                />
                <button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Guardando...' : editingProductId ? 'Actualizar' : 'Agregar'}
                </button>
            </div>

            {isLoading && <p>Cargando productos...</p>}

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((p) => (
                            <tr key={p._id}>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>{p.price}</td>
                                <td>{p.stock}</td>
                                <td>{p.category ? p.category.name : 'Categoría no disponible'}</td> {/* Verifica si category existe */}
                                <td>
                                    <button onClick={() => handleEdit(p)}>Editar</button>
                                    <button onClick={() => deleteProduct(p._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay productos.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
