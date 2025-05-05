import { useState, useCallback } from "react";
import { getCategories as getCategoriesRequest, addCategory as addCategoryRequest, updateCategory as updateCategoryRequest, deleteCategory as deleteCategoryRequest } from "../../services/";
import toast from "react-hot-toast";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getCategoriesRequest(); // Aquí llamas a tu API
            if (response.error) {
                toast.error('Error al cargar categorías');
            } else {
                setCategories(response.data.categories); // Asegúrate de que este campo sea el correcto
            }
        } catch (error) {
            toast.error('Error al cargar categorías');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addCategory = async (category) => {
    setIsLoading(true);
    try {
        const response = await addCategoryRequest(category);
        if (response.error) {
            toast.error('Error al agregar categoría');
        } else {
            // Verifica que prev sea un array antes de usarlo
            setCategories((prev) => Array.isArray(prev) ? [...prev, response.data.category] : [response.data.category]);
            toast.success('Categoría agregada');
        }
    } catch (e) {
        toast.error('Error al agregar categoría');
    } finally {
        setIsLoading(false);
    }
};

    const updateCategory = async (id, category) => {
        setIsLoading(true);
        try {
            const response = await updateCategoryRequest(id, category);
            if (response.error) {
                toast.error('Error al actualizar categoría');
            } else {
                setCategories((prev) => prev.map((c) => (c._id === id ? response.data.category : c)));
                toast.success('Categoría actualizada');
            }
        } catch (e) {
            toast.error('Error al actualizar categoría');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        setIsLoading(true);
        try {
            const response = await deleteCategoryRequest(id);
            if (response.error) {
                toast.error('Error al eliminar categoría');
            } else {
                setCategories((prev) => prev.filter((c) => c._id !== id));
                toast.success('Categoría eliminada');
            }
        } catch (e) {
            toast.error('Error al eliminar categoría');
        } finally {
            setIsLoading(false);
        }
    };

    return { 
        categories,
        isLoading,
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory
    };
};
