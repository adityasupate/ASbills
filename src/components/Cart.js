// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';

// export function Cart({ products = [], addBill }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [paymentMethod, setPaymentMethod] = useState('cash');

//   const addToCart = (product, isHalfPlate) => {
//     const price = isHalfPlate ? (product.halfPrice || product.fullPrice) : product.fullPrice;
//     const existingItem = cartItems.find(item => item.productId === product.id && item.isHalfPlate === isHalfPlate);

//     if (existingItem) {
//       setCartItems(cartItems.map(item =>
//         item.productId === product.id && item.isHalfPlate === isHalfPlate
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setCartItems([...cartItems, { productId: product.id, quantity: 1, price, isHalfPlate }]);
//     }
//     toast.success(`Added ${product.name} (${isHalfPlate ? 'Half' : 'Full'}) to cart`);
//   };

//   const removeFromCart = (index) => {
//     setCartItems(cartItems.filter((_, i) => i !== index));
//     toast.success('Item removed from cart');
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleCheckout = () => {
//     const bill = {
//       id: Date.now().toString(),
//       items: cartItems,
//       total,
//       paymentMethod,
//       timestamp: Date.now()
//     };
//     addBill(bill);
//     setCartItems([]);
//     toast.success('Bill generated successfully');
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-semibold mb-6">Cart</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
//             <div className="mb-4">
//               <h3 className="text-lg font-medium break-words">{product.name}</h3>
//             </div>
//             <div className="space-y-2">
//               <button
//                 onClick={() => addToCart(product, false)}
//                 className="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Add Full (₹{product.fullPrice})
//               </button>
//               {product.halfPrice && (
//                 <button
//                   onClick={() => addToCart(product, true)}
//                   className="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Add Half (₹{product.halfPrice})
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <h3 className="text-xl font-semibold mt-8 mb-4">Cart Items:</h3>
//       <ul className="divide-y divide-gray-200">
//         {cartItems.map((item, index) => {
//           const product = products.find(p => p.id === item.productId);
//           return (
//             <li key={index} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//               <span className="text-sm sm:text-base mb-2 sm:mb-0">
//                 {product?.name} ({item.isHalfPlate ? 'Half' : 'Full'}) x {item.quantity}
//               </span>
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm sm:text-base">₹{item.price * item.quantity}</span>
//                 <button
//                   onClick={() => removeFromCart(index)}
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
//         <div className="mt-4 space-x-4">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               value="cash"
//               checked={paymentMethod === 'cash'}
//               onChange={() => setPaymentMethod('cash')}
//               className="form-radio h-5 w-5 text-indigo-600"
//             />
//             <span className="ml-2">Cash</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               value="online"
//               checked={paymentMethod === 'online'}
//               onChange={() => setPaymentMethod('online')}
//               className="form-radio h-5 w-5 text-indigo-600"
//             />
//             <span className="ml-2">Online</span>
//           </label>
//         </div>
//         <button
//           onClick={handleCheckout}
//           disabled={cartItems.length === 0}
//           className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           Generate Bill
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export function Cart({ products = [], addBill }) {
  const [tableCarts, setTableCarts] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  const addToCart = (product, isHalfPlate) => {
    if (selectedTable === null) {
      toast.error('Please select a table first');
      return;
    }

    const price = isHalfPlate ? (product.halfPrice || product.fullPrice) : product.fullPrice;
    setTableCarts(prevCarts => {
      const tableCart = prevCarts[selectedTable] || [];
      const existingItem = tableCart.find(item => item.productId === product.id && item.isHalfPlate === isHalfPlate);

      if (existingItem) {
        return {
          ...prevCarts,
          [selectedTable]: tableCart.map(item =>
            item.productId === product.id && item.isHalfPlate === isHalfPlate
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...prevCarts,
          [selectedTable]: [...tableCart, { productId: product.id, quantity: 1, price, isHalfPlate }]
        };
      }
    });
    toast.success(`Added ${product.name} (${isHalfPlate ? 'Half' : 'Full'}) to T${selectedTable}`);
  };

  const removeFromCart = (tableNumber, index) => {
    setTableCarts(prevCarts => ({
      ...prevCarts,
      [tableNumber]: prevCarts[tableNumber].filter((_, i) => i !== index)
    }));
    toast.success(`Item removed from T${tableNumber}`);
  };

  const getTableTotal = (tableNumber) => {
    return (tableCarts[tableNumber] || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = (tableNumber) => {
    const bill = {
      id: Date.now().toString(),
      tableNumber,
      items: tableCarts[tableNumber],
      total: getTableTotal(tableNumber),
      paymentMethod,
      timestamp: Date.now()
    };
    addBill(bill);
    setTableCarts(prevCarts => {
      const newCarts = { ...prevCarts };
      delete newCarts[tableNumber];
      return newCarts;
    });
    toast.success(`Bill generated for T${tableNumber}`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Tables</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {tables.map(table => (
          <button
            key={table}
            onClick={() => setSelectedTable(table)}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              selectedTable === table
                ? 'bg-indigo-600 text-white'
                : tableCarts[table]?.length
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            } hover:bg-indigo-500 hover:text-white transition-colors`}
          >
            T{table}
          </button>
        ))}
      </div>

      {selectedTable !== null && (
        <>
          <h3 className="text-xl font-semibold mb-4">Add Items to T{selectedTable}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow rounded-lg p-2 flex flex-col justify-between">
                <div className="mb-2">
                  <h3 className="text-sm font-medium break-words">{product.name}</h3>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => addToCart(product, false)}
                    className="w-full px-2 py-1 text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Full ₹{product.fullPrice}
                  </button>
                  {product.halfPrice && (
                    <button
                      onClick={() => addToCart(product, true)}
                      className="w-full px-2 py-1 text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Half ₹{product.halfPrice}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className="text-xl font-semibold mt-6 mb-4">Table Orders:</h3>
      {Object.entries(tableCarts).map(([tableNumber, tableCart]) => (
        <div key={tableNumber} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">T{tableNumber}</h4>
          <ul className="divide-y divide-gray-200">
            {tableCart.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              return (
                <li key={index} className="py-2 flex justify-between items-center">
                  <span className="text-sm">
                    {product?.name} ({item.isHalfPlate ? 'H' : 'F'}) x {item.quantity}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromCart(tableNumber, index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Total: ₹{getTableTotal(tableNumber)}</h3>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm">Cash</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-sm">Online</span>
              </label>
            </div>
            <button
              onClick={() => handleCheckout(parseInt(tableNumber))}
              className="mt-2 w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Bill for T{tableNumber}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}