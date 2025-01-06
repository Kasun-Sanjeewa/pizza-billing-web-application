import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import './CSS/Item.css';

const Item = ({ selectedCategory, addItemToCheckout }) => {

    // State to manage all items and filtered items based on category
    const [items, setItems] = useState([]); // Stores all fetched items
    const [filteredItems, setFilteredItems] = useState([]); // Stores items filtered by category
    const [errorMessage, setErrorMessage] = useState(''); // Stores any error message
    const barcodeRefs = useRef([]); // Holds references to barcode SVG elements

    // Fetch all items when the component loads
    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }

                const data = await response.json();
                setItems(data); // Store all items in state
                setFilteredItems(data); // Display all items by default
                setErrorMessage(''); // Clear any error messages
            } catch (error) {
                console.error('Error fetching items:', error);
                setErrorMessage('Failed to fetch items. Please try again later.');
            }
        };

        fetchAllItems();
    }, []); // Run only once on component load

    // Filter items based on the selected category
    useEffect(() => {

        // If 'All Items' category is selected, show all items
        if (selectedCategory === 'All Items') {
            setFilteredItems(items); // Show all items
            setErrorMessage(''); // Clear error message
        } else {
            const categoryItems = items.filter(
                (item) => item.category === selectedCategory
            );

            // Check if any items were found for the selected category
            if (categoryItems.length > 0) {
                setFilteredItems(categoryItems); // Show filtered items
                setErrorMessage(''); // Clear error message
            } else {
                setFilteredItems([]); // No items to display
                setErrorMessage(
                    `No items found in the "${selectedCategory}" category.` // Display a message if no items found
                );
            }
        }
    }, [selectedCategory, items]); // Run whenever the selectedCategory or items change

    // Generate barcodes for displayed items
    useEffect(() => {

        // Iterate over filtered items and generate barcodes using JsBarcode
        filteredItems.forEach((item, index) => {
            if (barcodeRefs.current[index]) {
                JsBarcode(barcodeRefs.current[index], item.barcode, {
                    format: 'CODE128',  // Barcode format
                    width: 2,  // Barcode width
                    height: 50, // Barcode height
                    displayValue: false, // Hide barcode value text
                });
            }
        });
    }, [filteredItems]);

    // Handle the event when an item is clicked to add it to the checkout
    const handleItemClick = (item) => {
        addItemToCheckout(item); // Add the item to checkout when clicked
    };

    return (
        <div className="items-section">
            {errorMessage ? (
                <p className="error-message">{errorMessage}</p>
            ) : (
                filteredItems.map((item, index) => (
                    <div
                        className="item-card"
                        key={item.barcode}
                        onClick={() => handleItemClick(item)} // Handle item click
                    >
                        <img src={item.img} alt={item.name} className="item-image" />
                        <div className="item-name">{item.name}</div>
                        <svg
                            ref={(el) => (barcodeRefs.current[index] = el)}
                            className="barcode-image"
                        ></svg>
                        <div className="item-barcode-number">Barcode: {item.barcode}</div>
                        <div className="item-price">LKR {item.price.toFixed(2)}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Item;
