import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import './CSS/Item.css';

const Item = ({ items }) => {

    const barcodeRefs = useRef([]);

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
    }, [items]);

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