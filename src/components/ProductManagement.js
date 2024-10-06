import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export function ProductManagement({ products = [], addProduct, editProduct, deleteProduct }) {
  const [name, setName] = useState('');
  const [fullPrice, setFullPrice] = useState('');
  const [halfPrice, setHalfPrice] = useState('');
  const [hasHalfPrice, setHasHalfPrice] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name,
      fullPrice: parseFloat(fullPrice),
      ...(hasHalfPrice && halfPrice ? { halfPrice: parseFloat(halfPrice) } : {})
    };
    if (editingProduct) {
      editProduct(newProduct);
      toast.success('Product updated successfully');
    } else {
      addProduct(newProduct);
      toast.success('Product added successfully');
    }
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setFullPrice('');
    setHalfPrice('');
    setHasHalfPrice(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setFullPrice(product.fullPrice.toString());
    setHalfPrice(product.halfPrice?.toString() || '');
    setHasHalfPrice(!!product.halfPrice);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
    toast.success('Product deleted successfully');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="fullPrice" className="block text-sm font-medium text-gray-700">Full Price</label>
          <input
            id="fullPrice"
            type="number"
            value={fullPrice}
            onChange={(e) => setFullPrice(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            id="hasHalfPrice"
            type="checkbox"
            checked={hasHalfPrice}
            onChange={(e) => setHasHalfPrice(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="hasHalfPrice" className="ml-2 block text-sm text-gray-900">Has Half Price</label>
        </div>
        {hasHalfPrice && (
          <div>
            <label htmlFor="halfPrice" className="block text-sm font-medium text-gray-700">Half Price</label>
            <input
              id="halfPrice"
              type="number"
              value={halfPrice}
              onChange={(e) => setHalfPrice(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium truncate">{product.name}</h3>
              <p className="text-gray-600">Full: ₹{product.fullPrice}</p>
              {product.halfPrice && <p className="text-gray-600">Half: ₹{product.halfPrice}</p>}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(product)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}