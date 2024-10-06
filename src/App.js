import React, { useState, useEffect } from 'react';
import { ProductManagement } from './components/ProductManagement';
import { Cart } from './components/Cart';
import { DailyReport } from './components/DailyReport';
import { Toaster } from 'react-hot-toast';

function App() {
  const [view, setView] = useState('products');
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    const storedBills = localStorage.getItem('bills');
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills));
  }, [bills]);

  const addProduct = (product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  const editProduct = (updatedProduct) => {
    setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  const addBill = (bill) => {
    setBills(prevBills => [...prevBills, bill]);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Toaster position="bottom-center" />
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  view === 'products' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setView('products')}
              >
                Products
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  view === 'cart' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setView('cart')}
              >
                Cart
              </button>
              <button
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  view === 'report' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setView('report')}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {view === 'products' && (
          <ProductManagement
            products={products}
            addProduct={addProduct}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />
        )}
        {view === 'cart' && <Cart products={products} addBill={addBill} />}
        {view === 'report' && <DailyReport bills={bills} />}
      </main>
    </div>
  );
}

export default App;
