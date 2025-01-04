import React, { useState } from 'react';
import Menu from './Menu';
import Item from './Item';
import Checkout from './Checkout';
import './CSS/HeroPage.css';

const HeroPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Items');
    const [selectedItems, setSelectedItems] = useState([]); // State to track selected items

    const addItemToCheckout = (item) => {
        setSelectedItems((prevItems) => {
            const itemIndex = prevItems.findIndex((i) => i.barcode === item.barcode);
            if (itemIndex > -1) {
                // Item exists, update the quantity
                const updatedItems = [...prevItems];
                updatedItems[itemIndex].quantity += 1;
                return updatedItems;
            } else {
                // Item doesn't exist, add it to the list with quantity 1
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const clearCheckout = () => {
        setSelectedItems([]); // Clear the selected items
    };

    return (
        <div className="container">
            <Menu onCategorySelect={(category) => setSelectedCategory(category)} />
            <div className="items-section">
                <Item selectedCategory={selectedCategory} addItemToCheckout={addItemToCheckout} />
            </div>
            <div className="checkout-section">
                <Checkout selectedItems={selectedItems} onCheckoutComplete={clearCheckout} />
            </div>
        </div>
    );
};

export default HeroPage;
