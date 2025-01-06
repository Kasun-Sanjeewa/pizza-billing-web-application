import React, { useState } from 'react';
import Menu from './Menu';
import Item from './Item';
import Checkout from './Checkout';
import './CSS/HeroPage.css';

const HeroPage = () => {

    // State to track the currently selected category (default is 'All Items')
    const [selectedCategory, setSelectedCategory] = useState('All Items');

    // State to track selected items
    const [selectedItems, setSelectedItems] = useState([]);

    // Function to add items to the checkout
    const addItemToCheckout = (item) => {
        setSelectedItems((prevItems) => {

            // Check if the item already exists in the checkout
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


    // Function to clear the selected items (i.e., when checkout is completed)
    const clearCheckout = () => {
        setSelectedItems([]); // Clear the selected items
    };

    return (
        <div className="container">
            <Menu onCategorySelect={(category) => setSelectedCategory(category)} />

            <Item selectedCategory={selectedCategory} addItemToCheckout={addItemToCheckout} />

            <div className="checkout-section">
                <Checkout selectedItems={selectedItems} onCheckoutComplete={clearCheckout} />
            </div>
        </div>
    );
};

export default HeroPage;
