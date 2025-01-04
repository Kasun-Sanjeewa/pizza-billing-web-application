import React, { useState } from 'react';
import './CSS/Receipt.css'
// Helper function to calculate totals
const calculateTotal = (items) => {
    let subtotal = 0;
    let tax = 0;
    items.forEach(item => {
        const itemTotal = item.quantity * item.price;
        subtotal += itemTotal;
        tax += itemTotal * (item.taxRate / 100);
    });
    const totalAmount = subtotal + tax;
    return { subtotal, tax, totalAmount };
};

const Invoice = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: 0, taxRate: 0 });

    const handleAddItem = () => {
        setItems([...items, newItem]);
        setNewItem({ name: '', quantity: 1, price: 0, taxRate: 0 });
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, idx) => idx !== index);
        setItems(updatedItems);
    };

    const handlePrintInvoice = () => {
        window.print();
    };

    const { subtotal, tax, totalAmount } = calculateTotal(items);

    return (
        <div className="invoice-container">
            <h1>Customer Invoice</h1>

            <div className="invoice-form">
                <h2>Invoice Details</h2>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Tax Rate (%)"
                    value={newItem.taxRate}
                    onChange={(e) => setNewItem({ ...newItem, taxRate: parseFloat(e.target.value) })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            <table className="invoice-items">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Tax Rate</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        const itemTotal = item.quantity * item.price;
                        const itemTax = itemTotal * (item.taxRate / 100);
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.taxRate}%</td>
                                <td>${(itemTotal + itemTax).toFixed(2)}</td>
                                <td>
                                    <a><button onClick={() => handleDeleteItem(index)}>Delete</button></a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="invoice-summary">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Total: ${totalAmount.toFixed(2)}</p>
            </div>

            <button onClick={handlePrintInvoice} className="print-button">
                Print Invoice
            </button>
        </div>
    );
};

export default Invoice;
