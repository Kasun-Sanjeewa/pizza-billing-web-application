import React, { useState } from 'react';
import './CSS/ItemManagement.css';

const ItemManagement = ({ isTrueHandler }) => {
    const [items, setItems] = useState([
        { id: 1, name: 'Burger Bun', barcode: '465123', price: 650 },
        { id: 2, name: 'FTC Feast Pizza', barcode: '8745135', price: 4000 },
    ]);

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

    // Go back to NavBar
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
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            {/* Item List */}
            <div className="item-list">
                {items.map((item) => (
                    <div className="item-card" key={item.id}>
                        {editingItem?.id === item.id ? (
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
                                    <h3>{item.name}</h3>
                                    <p>Barcode: {item.barcode}</p>
                                    <p>Price: LKR {item.price}</p>
                                </div>
                                <button onClick={() => handleEditItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="center-button-container">
                <button className="center-button" onClick={goBackToNavBar}>
                    Back to Navigation
                </button>
            </div>
        </div>
    );
};

export default ItemManagement;
