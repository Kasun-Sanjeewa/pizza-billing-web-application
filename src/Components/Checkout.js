import React from 'react';
import './CSS/Checkout.css';

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
                openInvoicePage();
            } else {
                const error = await response.text();
                alert("Checkout failed: " + error);
            }
        } catch (err) {
            alert("Error during checkout: " + err.message);
        }
    };

    const openInvoicePage = () => {
        // Generate the invoice content
        const invoiceContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invoice</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .invoice-container {
                        width: 300px;
                        margin: auto;
                        border: 1px solid #ccc;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        background-color: #fff;
                    }
                    .header {
                        text-align: center;
                    }
                    .logo-img {
                        height: 50px;
                        margin-bottom: 10px;
                    }
                    .contact-info, .footer {
                        text-align: center;
                        margin-top: 10px;
                    }
                    .receipt-info, .payment-info {
                        margin: 10px 0;
                    }
                    .payment-info table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    .payment-info th, .payment-info td {
                        text-align: left;
                        border-bottom: 1px solid #ccc;
                        padding: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <div class="header">
                        <h2>Restaurant</h2>
                        <p>Slogan Here</p>
                    </div>
                    <div class="contact-info">
                        <p>#Test, Test 2, Addalaichenai</p>
                        <p>Tel: 0770481363 / 0721185012</p>
                        <p>Email: info@transitaradhana.com</p>
                    </div>
                    <hr />
                    <div class="receipt-info">
                        <p><strong>Receipt #: </strong>REC0203</p>
                        <p><strong>Invoice #: </strong>INV0189</p>
                        <p><strong>Customer: </strong>Walking Customer</p>
                        <p><strong>Date: </strong>${new Date().toLocaleString()}</p>
                        <p><strong>Cashier: </strong>Thilina Ruwan</p>
                    </div>
                    <hr />
                    <div class="payment-info">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${selectedItems
                .map(
                    (item) => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>LKR ${item.price.toFixed(2)} x ${item.quantity}</td>
                                    </tr>
                                `
                )
                .join("")}
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td><strong>LKR ${totalAmount}</strong></td>
                                </tr>
                                <tr>
                                    <td>Tax (10%)</td>
                                    <td>LKR ${taxAmount}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payable</strong></td>
                                    <td><strong>LKR ${payableAmount}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div class="footer">
                        <p>Thank You..! Come Again</p>
                        <p>Software by UniERP</p>
                        <p>One Solution for Everything</p>
                        <p>0770481363 | www.unierp.com</p>
                    </div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        // Open the invoice content in a new tab
        const newWindow = window.open("", "_blank");
        newWindow.document.write(invoiceContent);
        newWindow.document.close();
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
