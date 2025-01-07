import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import './CSS/Item.css';

const Item = ({ selectedCategory, addItemToCheckout }) => {
    const [items, setItems] = useState([]); // All items
    const [filteredItems, setFilteredItems] = useState([]); // Filtered items
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [errorMessage, setErrorMessage] = useState(''); // Error message
    const barcodeRefs = useRef([]); // Barcode references

    // Fetch all items when the component loads
    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }

                const data = await response.json();
                setItems(data); // Store all items
                setFilteredItems(data); // Display all items by default
                setErrorMessage('');
            } catch (error) {
                console.error('Error fetching items:', error);
                setErrorMessage('Failed to fetch items. Please try again later.');
            }
        };

        fetchAllItems();
    }, []);

    // Filter items based on selected category and search query
    useEffect(() => {
        let categoryFilteredItems = items;

        // Filter by category
        if (selectedCategory !== 'All Items') {
            categoryFilteredItems = items.filter(
                (item) => item.category === selectedCategory
            );
        }

        // Filter by search query
        const searchFilteredItems = categoryFilteredItems.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (searchFilteredItems.length > 0) {
            setFilteredItems(searchFilteredItems);
            setErrorMessage('');
        } else {
            setFilteredItems([]);
            setErrorMessage(
                `No items found${selectedCategory !== 'All Items' ? ` in the "${selectedCategory}" category` : ''} for "${searchQuery}".`
            );
        }
    }, [selectedCategory, searchQuery, items]);

    // Generate barcodes for filtered items
    useEffect(() => {
        filteredItems.forEach((item, index) => {
            if (barcodeRefs.current[index]) {
                JsBarcode(barcodeRefs.current[index], item.barcode, {
                    format: 'CODE128',
                    width: 2,
                    height: 50,
                    displayValue: false,
                });
            }
        });
    }, [filteredItems]);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle item click
    const handleItemClick = (item) => {
        addItemToCheckout(item);
    };

    return (
        <div className="items-section">
            {/* Search bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {errorMessage ? (
                <p className="error-message">{errorMessage}</p>
            ) : (
                filteredItems.map((item, index) => (
                    <div
                        className="item-card"
                        key={item.barcode}
                        onClick={() => handleItemClick(item)}
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
