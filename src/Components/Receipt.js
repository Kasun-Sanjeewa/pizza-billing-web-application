import React from 'react';
import './CSS/Receipt.css'; // Add CSS for styling

const Invoice = ({ receiptNumber, invoiceNumber, customer, date, cashier, items, total, tax, payable }) => {
    return (
        <div className="page-wrapper">
            <div className="invoice-container">
                <div className="header">
                    <div className="logo">
                        <img src="https://st2.depositphotos.com/16030310/43110/v/450/depositphotos_431105180-stock-illustration-initial-letter-logotype-company-name.jpg" alt="Restaurant Logo" className="logo-img" />
                    </div>
                    <h2 className='hiiii'>Restaurant</h2>
                    <p>Slogan Here</p>
                </div>

                <div className="contact-info">
                    <p>#Test, Test 2, Addalaichenai</p>
                    <p>Tel: 0770481363 / 0721185012</p>
                    <p>Email: info@transitaradhana.com</p>
                </div>

                <hr />

                <div className="receipt-info">
                    <p><strong>Receipt #: </strong>{receiptNumber}</p>
                    <p><strong>Invoice #: </strong>{invoiceNumber}</p>
                    <p><strong>Customer: </strong>{customer}</p>
                    <p><strong>Date: </strong>{date}</p>
                    <p><strong>Cashier: </strong>{cashier}</p>
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
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity} x {item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td><strong>Total</strong></td>
                                <td>{total.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Tax (10%)</strong></td>
                                <td>{tax.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><strong>Payable</strong></td>
                                <td>{payable.toFixed(2)}</td>
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
