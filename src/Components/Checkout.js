import React from 'react';
import './CSS/Checkout.css';
import Invoice from './Receipt';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client'

export default function Checkout({ selectedItems, onCheckoutComplete }) {
    const TAX_RATE = 0.1; // 10% tax

    // Calculate the total and tax
    const totalAmount = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const taxAmount = (totalAmount * TAX_RATE).toFixed(2);
    const payableAmount = (parseFloat(totalAmount) + parseFloat(taxAmount)).toFixed(2);

    const handleCheckout = async () => {
        // Check if no items are selected
        if (selectedItems.length === 0) {
            alert("No items selected. Please add items to checkout.");
            return; // Exit the function
        }

        // Prepare the data for the backend
        const checkoutData = {
            selected_items: JSON.stringify(
                selectedItems.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }))
            ),
            total: parseFloat(totalAmount),
            tax: parseFloat(taxAmount),
            payable: parseFloat(payableAmount),
        };

        try {
            // Send the data to the backend
            const response = await fetch("http://localhost:8080/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutData),
            });

            if (response.ok) {
                alert("Checkout successful!");
                onCheckoutComplete(); // Clear checkout data

                // Open invoice in a new tab
                handleCheckoutPrint();
            } else {
                const error = await response.text();
                alert("Checkout failed: " + error);
            }
        } catch (err) {
            alert("Error during checkout: " + err.message);
        }
    };

    const handleCheckoutPrint = async () => {
        if (selectedItems.length === 0) {
            alert("No items selected. Please add items to checkout.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    selected_items: JSON.stringify(selectedItems), // stringified here
                    total: parseFloat(totalAmount), // send as float
                    tax: parseFloat(taxAmount), // send as float
                    payable: parseFloat(payableAmount), // send as float
                }),
            });

            if (response.ok) {
                onCheckoutComplete();

                // Open the Invoice component in a new tab
                const newTab = window.open("", "_blank");


                // Use `createRoot` instead of `render`
                const root = ReactDOM.createRoot(newTab.document.body);  // Create root
                root.render(  // Mount the component
                    <Invoice
                        receiptNumber="REC0203"
                        invoiceNumber="INV0189"
                        customer="Walking Customer"
                        date={new Date().toLocaleString()}
                        cashier="Thilina Ruwan"
                        items={selectedItems}
                        total={parseFloat(totalAmount)}
                        tax={parseFloat(taxAmount)}
                        payable={parseFloat(payableAmount)}
                    />

                );
            } else {
                const error = await response.text();
                alert("Checkout failed: " + error);
            }
        } catch (err) {
            alert("Error during checkout: " + err.message);
        }
    };

    return (
        <>
            <h2>Checkout</h2>
            <div className="selected-items">
                <h3>Selected Items:</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index} className="select-list">
                            {item.name} - LKR {item.price.toFixed(2)} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="checkout-details">
                <div className="checkout-text">Total: LKR {totalAmount}</div>
                <div className="checkout-text">Tax (10%): LKR {taxAmount}</div>
                <div className="checkout-text-payable">Payable: LKR {payableAmount}</div>
            </div>
            <button className="proceed-button" onClick={handleCheckout}>
                Checkout
            </button>
        </>
    );
}
