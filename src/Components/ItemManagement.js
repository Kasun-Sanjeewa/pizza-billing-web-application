import React, { useState } from 'react';
import './CSS/ItemManagement.css';

const ItemManagement = ({ isTrueHandler, items: propItems }) => {
    const [items, setItems] = useState(propItems);

    const [newItem, setNewItem] = useState({
        name: '',
        barcode: '',
        price: '',
    });

    const [editingItem, setEditingItem] = useState(null);

    const handleAddItem = () => {
        if (newItem.name && newItem.barcode && newItem.price) {
            setItems([
                ...items,
                { id: Date.now(), ...newItem },
            ]);
            setNewItem({ name: '', barcode: '', price: '' });
        }
    };

    const handleDeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
    };

    const handleSaveItem = () => {
        setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)));
        setEditingItem(null);
    };

    const goBackToNavBar = () => {
        isTrueHandler(true); // Go back to NavBar
    };

    return (
        <div className="item-management-container">
            <h2>Item Management</h2>

            {/* Add New Item Section */}
            <div className="add-item-form">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Barcode"
                    value={newItem.barcode}
                    onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            {/* Item List */}
            <div className="items-section">
                {items.map((item) => (
                    <div className="item-card" key={item.barcode}>
                        {editingItem?.barcode === item.barcode ? (
                            <div className="edit-item-form">
                                <input
                                    type="text"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingItem.barcode}
                                    onChange={(e) => setEditingItem({ ...editingItem, barcode: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editingItem.price}
                                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                />
                                <button onClick={handleSaveItem}>Save</button>
                            </div>
                        ) : (
                            <>
                                <div className="item-details">
                                    <img src={item.img} alt={item.name} className="item-image" />
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-barcode">Barcode: {item.barcode}</p>
                                    <p className="item-price">Price: LKR {item.price}</p>
                                </div>
                                <button onClick={() => handleEditItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteItem(item.barcode)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="center-button-container">
                <button className="center-button" onClick={goBackToNavBar}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ItemManagement;
