import { useState, useCallback } from "react";
import { getProducts as getProductsRequest, addProduct as addProductRequest, updateProduct as updateProductRequest, deleteProduct as deleteProductRequest, searchProducts as searchProductsRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getProductsRequest();
            if (response.error) {
                toast.error('Error al cargar productos');
            } else {
                setProducts(response.data.products);
            }
        } catch (e) {
            toast.error('Error al cargar productos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const searchProducts = async (filters) => {
        setIsLoading(true);
        try {
            const response = await searchProductsRequest(filters);
            if (response.error) {
                toast.error('Error al buscar productos');
            } else {
                setProducts(response.data.products);
            }
        } catch (e) {
            toast.error('Error al buscar productos');
        } finally {
            setIsLoading(false);
        }
    };

    const addProduct = async (product) => {
        setIsLoading(true);
        try {
            const response = await addProductRequest({
                ...product, 
                entry_date: product.entry_date, 
                expiration_date: product.expiration_date 
            });
            if (response.error) {
                toast.error('Error al agregar producto');
            } else {
                setProducts((prev) => [...prev, response.data.product]);
                toast.success('Producto agregado');
            }
        } catch (e) {
            toast.error('Error al agregar producto');
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async (id, product) => {
        setIsLoading(true);
        try {
            const response = await updateProductRequest(id, {
                ...product,
                entry_date: product.entry_date,
                expiration_date: product.expiration_date
            });
            if (response.error) {
                toast.error('Error al actualizar producto');
            } else {
                setProducts((prev) => prev.map((p) => (p._id === id ? response.data.product : p)));
                toast.success('Producto actualizado');
            }
        } catch (e) {
            toast.error('Error al actualizar producto');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setIsLoading(true);
        try {
            const response = await deleteProductRequest(id);
            if (response.error) {
                toast.error('Error al eliminar producto');
            } else {
                setProducts((prev) => prev.filter((p) => p._id !== id));
                toast.success('Producto eliminado');
            }
        } catch (e) {
            toast.error('Error al eliminar producto');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isLoading,
        getProducts,
        searchProducts,
        addProduct,
        updateProduct,
        deleteProduct
    };
};
