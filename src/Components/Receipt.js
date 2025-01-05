import React from 'react';
import './CSS/Receipt.css'; // Add CSS for styling

const Invoice = () => {
    return (
        <div className="page-wrapper">
            <div className="invoice-container">
                <div className="header">
                    <div className="logo">
                        <img src="https://st2.depositphotos.com/16030310/43110/v/450/depositphotos_431105180-stock-illustration-initial-letter-logotype-company-name.jpg" alt="Restaurant Logo" className="logo-img" />
                    </div>
                    <h2>Restaurant</h2>
                    <p>Slogan Here</p>
                </div>

                <div className="contact-info">
                    <p>#Test, Test 2, Addalaichenai</p>
                    <p>Tel: 0770481363 / 0721185012</p>
                    <p>Email: info@transitaradhana.com</p>
                </div>

                <hr />

                <div className="receipt-info">
                    <p><strong>Receipt #: </strong>REC0203</p>
                    <p><strong>Invoice #: </strong>INV0189</p>
                    <p><strong>Customer: </strong>Walking Customer</p>
                    <p><strong>Date: </strong>2025-01-05 20:06:20</p>
                    <p><strong>Cashier: </strong>Thilina Ruwan</p>
                </div>

                <hr />

                <div className="payment-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cash</td>
                                <td>750.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <div className="footer">
                    <p>Thank You..! Come Again</p>
                    <p>Software by UniERP</p>
                    <p>One Solution for Everything</p>
                    <p>0770481363 | www.unierp.com</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
