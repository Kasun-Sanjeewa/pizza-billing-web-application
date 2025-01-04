import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import './CSS/Item.css';

const Item = () => {
    // State to hold items
    const [items, setItems] = useState([]);
    const barcodeRefs = useRef([]);

    // Fetch data from the backend API
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data); // Update state with the fetched items
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Generate barcodes
    useEffect(() => {
        items.forEach((item, index) => {
            if (barcodeRefs.current[index]) {
                JsBarcode(barcodeRefs.current[index], item.barcode, {
                    format: 'CODE128',
                    width: 2,
                    height: 50,
                    displayValue: false,
                });
            }
        });
    }, [items]); // Run this effect whenever `items` changes

    return (
        <div className="items-section">
            {items.map((item, index) => (
                <div className="item-card" key={item.barcode}>
                    <img src={item.img} alt={item.name} className="item-image" />
                    <div className="item-name">{item.name}</div>
                    <svg
                        ref={(el) => (barcodeRefs.current[index] = el)}
                        className="barcode-image"
                    ></svg>
                    <div className="item-barcode-number">Barcode: {item.barcode}</div>
                    <div className="item-price">LKR {item.price.toFixed(2)}</div>
                </div>
            ))}
        </div>
    );
};

export default Item;
