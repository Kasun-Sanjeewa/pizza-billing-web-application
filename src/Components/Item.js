import React, { useState } from 'react';
import './Item.css';

const Item = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Items');

    const categories = [
        'All Items',
        'My Cat 1',
        'Cappuccino',
        'Sandwich',
        'Chocolate',
        'Mojito',
        'Toasties',
        'Pasta',
        'Pizza',
        'Zone One',
        'Hot Drinks',
        'Cool Drinks',
        'Lunch',
        'Breakfast',
        'Mains',
        'Quiet Zone',
    ];

    const items = [
        { name: 'Burger Bun', barcode: '465123', price: 650 },
        { name: 'FTC Feast Pizza', barcode: '8745135', price: 4000 },
        { name: 'Vanilla Bean Latte', barcode: '846519864512', price: 650 },
        { name: 'Hazelnut Cappuccino', barcode: '54545221', price: 850 },
        { name: 'Caramel Macchiato', barcode: '4154861454', price: 750 },
        { name: 'Creamy Alfredo Fettuccine', barcode: '78514521', price: 950 },
        { name: 'Spaghetti Bolognese', barcode: '547854845', price: 1100 },
        { name: 'Pineapple Coconut Mojito', barcode: '651255478', price: 750 },
        { name: 'Watermelon Mint Mojito', barcode: '155465312', price: 650 },
        { name: 'Berry Bliss Mojito', barcode: '78514521', price: 650 },
        { name: 'Classic Lime Mojito', barcode: '78514521', price: 650 },
        { name: 'Veggie Delight Sandwich', barcode: '78514521', price: 850 },
    ];

    return (
        <div className="container">
            <div className="menu-section">
                <h2>Filter</h2>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={selectedCategory === category ? 'active-category' : ''}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="items-section">
                {items.map((item) => (
                    <div className="item-card" key={item.barcode}>
                        <div className="item-name">{item.name}</div>
                        <div className="item-barcode">{item.barcode}</div>
                        <div className="item-price">LKR {item.price.toFixed(2)}</div>
                    </div>
                ))}

            </div>
            <div className="checkout-section">
                <h2>Checkout</h2>
                <div className="checkout-details">
                    <div className='chechout-text'>Customer: Walking Customer</div>
                    <div className='chechout-text'>Table: Delivery</div>
                    <div className='chechout-text'>Total: LKR 0.00</div>
                    <div className='chechout-text'>Payable: LKR 0.00</div>
                </div>
                <button className="proceed-button">Checkout</button>
            </div>
        </div>
    );
};

export default Item;
