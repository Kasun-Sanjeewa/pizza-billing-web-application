import React, { useState, useEffect } from 'react';
import './CSS/Checkout.css';
import Invoice from './Receipt';
import ReactDOM from 'react-dom/client';

export default function Checkout({ selectedItems, onCheckoutComplete }) {
    const [paymentData, setPaymentData] = useState(null);
    const TAX_RATE = 0.1; // 10% tax

    // Fetch payment data when the component mounts or when needed
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await fetch("http://localhost:8080/payments");
                if (response.ok) {
                    const data = await response.json();
                    setPaymentData(data); // Store the payment data in state
                } else {
                    console.error("Failed to fetch payment data");
                    alert("Failed to fetch payment data");
                }
            } catch (err) {
                console.error("Error fetching payment data:", err);
                alert("Error fetching payment data");
            }
        };

        fetchPaymentData(); // Fetch payment data on component mount
    }, []); // Empty dependency array ensures this runs only once when the component mounts

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

        // Ensure payment data has been fetched
        if (!paymentData || paymentData.length === 0) {
            alert("No payment data found to generate invoice number.");
            return;
        }

        // Get the largest payment ID from the fetched data and create the invoice number
        const latestPaymentId = paymentData.reduce((max, payment) => {
            return payment.id > max ? payment.id : max;
        }, 0);

        // Create invoice number by incrementing the latest payment ID by 1
        const newInvoiceNumber = "ENV" + (latestPaymentId + 1);

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
            invoiceNumber: newInvoiceNumber, // Include the generated invoice number
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

                // Open the Invoice in a new tab
                handleCheckoutPrint(newInvoiceNumber); // Now call print with the generated invoice number
            } else {
                const error = await response.text();
                alert("Checkout failed: " + error);
            }
        } catch (err) {
            alert("Error during checkout: " + err.message);
        }
    };

    const handleCheckoutPrint = (invoiceNumber) => {
        if (selectedItems.length === 0) {
            alert("No items selected. Please add items to checkout.");
            return;
        }

        // Open the Invoice component in a new tab
        const newTab = window.open("", "_blank");

        // Use `createRoot` instead of `render`
        const root = ReactDOM.createRoot(newTab.document.body);  // Create root
        root.render(
            <Invoice
                invoiceNumber={invoiceNumber}
                customer="New Customer"
                date={new Date().toLocaleString()}
                cashier="Kasun Sanjeewa"
                items={selectedItems}
                total={parseFloat(totalAmount)}
                tax={parseFloat(taxAmount)}
                payable={parseFloat(payableAmount)}
            />
        );

        // Wait for the new tab to load, then trigger the print for the invoice
        newTab.onload = () => {
            // Now, in the new tab, we only print the invoice
            newTab.print();
            // Close the new tab after printing to avoid keeping an empty tab open
            newTab.close();
        };
    };

    return (
        <>
            <h2>Checkout</h2>
            <div className="selected-items">
                <h3>Selected Items:</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index} className="select-list">
                            <i className="fa-solid fa-check" /> {item.name} - LKR {item.price.toFixed(2)} x {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="checkout-details">
                <div className="checkout-text">Total: LKR {totalAmount}</div>
                <div className="checkout-text">Tax (10%): LKR {taxAmount}</div>
                <div className="checkout-text-payable"><i className="fa-solid fa-money-bill" />Payable: LKR {payableAmount}</div>
            </div>
            <button className="proceed-button" onClick={handleCheckout}>
                Checkout
            </button>
        </>
    );
}
