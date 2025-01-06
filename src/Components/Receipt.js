
const Invoice = ({ invoiceNumber, customer, date, cashier, items, total, tax, payable }) => {

    // Define styles as a JavaScript object for inline styling
    const styles = {
        pageWrapper: {
            display: 'flex',  // Center content horizontally and vertically
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            transform: 'scale(0.8)', // Scale the entire component to 80%
        },
        invoiceContainer: {
            width: '400px', // Set a fixed width for the invoice container
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            color: '#333',
            border: '1px solid #ccc',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            height: 'auto',
        },
        header: {
            textAlign: 'center',
        },
        logoImg: {
            marginBottom: '10px',
            width: '150px',
        },
        contactInfo: {
            textAlign: 'center',
            fontSize: '16px',
            marginBottom: '10px',
        },
        hr: {
            border: 'none', // Remove default border styling
            borderTop: '1px solid #ccc',
            margin: '15px 0',
        },
        receiptInfo: {
            marginBottom: '15px',
            fontSize: '18px',
        },
        paymentTable: {
            width: '100%',
            borderCollapse: 'collapse', // Remove space between borders
        },
        tableCell: {
            textAlign: 'left',
            borderBottom: '1px solid #ccc',
            padding: '5px',
        },
        footer: {
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '15px',
            fontWeight: 'bold',
        },
    };

    // Render the Invoice component
    return (
        <div style={styles.pageWrapper}>
            <div style={styles.invoiceContainer}>
                <div style={styles.header}>
                    <div className="logo">
                        <img
                            src="https://st2.depositphotos.com/16030310/43110/v/450/depositphotos_431105180-stock-illustration-initial-letter-logotype-company-name.jpg"
                            alt="Restaurant Logo"
                            style={styles.logoImg}
                        />
                    </div>
                    <h2>Restaurant</h2>
                </div>

                <div style={styles.contactInfo}>
                    <p>#Test, Test 2, Addalaichenai</p>
                    <p>Tel: 0770481363 / 0721185012</p>
                    <p>Email: info@transitaradhana.com</p>
                </div>

                <hr style={styles.hr} />

                <div style={styles.receiptInfo}>
                    <p><strong>Invoice #: </strong>{invoiceNumber}</p>
                    <p><strong>Customer: </strong>{customer}</p>
                    <p><strong>Date: </strong>{date}</p>
                    <p><strong>Cashier: </strong>{cashier}</p>
                </div>

                <hr style={styles.hr} />

                <div className="payment-info">
                    <table style={styles.paymentTable}>
                        <thead>
                            <tr>
                                <th style={styles.tableCell}>Type</th>
                                <th style={styles.tableCell}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td style={styles.tableCell}>{item.name}</td>
                                    <td style={styles.tableCell}>
                                        {item.quantity} x {item.price.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td style={styles.tableCell}><strong>Total</strong></td>
                                <td style={styles.tableCell}>{total.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={styles.tableCell}><strong>Tax (10%)</strong></td>
                                <td style={styles.tableCell}>{tax.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td style={styles.tableCell}><strong>Payable</strong></td>
                                <td style={styles.tableCell}><strong>{payable.toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr style={styles.hr} />

                <div style={styles.footer}>
                    <p>Thank You..! Come Again</p>
                    <p>Software by Kasun Sanjeewa</p>
                    <p>One Solution for Everything</p>
                    <p>0783099142 | www.ksgroup.com</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
