export function validateStock(products, productId, quantity) {
    const selected = products.find(p => p._id === productId);
    if (!selected) {
      return 'Debe seleccionar un producto válido.';
    }
    if (quantity > selected.stock) {
      return `Stock insuficiente. Disponible: ${selected.stock} unidades.`;
    }
    return null;
  }
  