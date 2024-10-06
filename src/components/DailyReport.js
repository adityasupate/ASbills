import React from 'react';

export function DailyReport({ bills = [] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayBills = bills.filter(bill => new Date(bill.timestamp) >= today);

  const totalIncome = todayBills.reduce((sum, bill) => sum + bill.total, 0);
  const cashIncome = todayBills.filter(bill => bill.paymentMethod === 'cash').reduce((sum, bill) => sum + bill.total, 0);
  const onlineIncome = todayBills.filter(bill => bill.paymentMethod === 'online').reduce((sum, bill) => sum + bill.total, 0);

  const dishSales = {};
  todayBills.forEach(bill => {
    bill.items.forEach(item => {
      if (!dishSales[item.productId]) {
        dishSales[item.productId] = { quantity: 0, revenue: 0 };
      }
      dishSales[item.productId].quantity += item.quantity;
      dishSales[item.productId].revenue += item.price * item.quantity;
    });
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Daily Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-800">Total Income</h3>
          <p className="text-2xl font-bold text-indigo-900">₹{totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Cash Income</h3>
          <p className="text-2xl font-bold text-green-900">₹{cashIncome.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Online Income</h3>
          <p className="text-2xl font-bold text-blue-900">₹{onlineIncome.toFixed(2)}</p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-4">Dish Sales:</h3>
      {Object.keys(dishSales).length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(dishSales).map(([productId, { quantity, revenue }]) => (
                <tr key={productId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{productId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No sales data available for today.</p>
      )}
    </div>
  );
}