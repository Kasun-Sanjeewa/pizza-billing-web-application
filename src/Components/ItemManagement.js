import React, { useEffect, useState } from 'react';
import './CSS/ItemManagement.css';

const ItemManagement = ({ isTrueHandler, handleNewItem }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        barcode: '',
        price: '', // Start with an empty string, not 0
        img: '',
    });
    const [editingItem, setEditingItem] = useState(null);

    // Fetch items from the backend on component mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Handle adding a new item
    const handleAddItem = async () => {
        // Ensure price is not an empty string when adding a new item
        const itemToAdd = {
            ...newItem,
            price: newItem.price === '' ? 0 : Number(newItem.price), // Set price to 0 if empty
        };

        if (itemToAdd.name && itemToAdd.barcode && itemToAdd.price && itemToAdd.img) {
            try {
                const response = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemToAdd),
                });

                const addedItem = await response.json();
                setItems([...items, addedItem]);
                setNewItem({ name: '', barcode: '', price: '', img: '' });
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    // Handle deleting an item by ID
    const handleDeleteItem = async (id) => {
        try {
            await fetch(`http://localhost:8080/products/${id}`, {
                method: 'DELETE',
            });

            setItems(items.filter((item) => item.id !== id)); // Use id for filtering
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Handle editing an item
    const handleEditItem = (item) => {
        setEditingItem({ ...item }); // Ensure that you're copying the item state, not modifying it directly
    };

    // Handle saving an edited item
    const handleSaveItem = async () => {
        const updatedItem = {
            ...editingItem,
            price: Number(editingItem.price), // Ensure price is a number
        };

        try {
            const response = await fetch(`http://localhost:8080/products/${editingItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            const savedItem = await response.json();
            setItems(items.map((item) => (item.id === savedItem.id ? savedItem : item)));
            setEditingItem(null);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    // Navigate back to the home page
    const goBackToNavBar = () => {
        isTrueHandler(true);
    };

    return (
        <div className="item-management-container">
            <h2>Item Management</h2>
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
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newItem.img}
                    onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            <div className="items-section">
                {items.map((item) => (
                    <div className="item-card" key={item.id}> {/* Use id for the key */}
                        {editingItem?.id === item.id ? ( // Use id for comparison
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
                                <input
                                    type="text"
                                    value={editingItem.img}
                                    onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
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
                                <button onClick={() => handleEditItem(item)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">Delete</button> {/* Use id for deletion */}
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="center-button-container">
                <button className="center-button" onClick={goBackToNavBar}>Back to Home</button>
            </div>
        </div>
    );
};

export default ItemManagement;
