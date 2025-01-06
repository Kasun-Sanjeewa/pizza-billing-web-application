import React, { useEffect, useState } from 'react';
import './CSS/ItemManagement.css';

const ItemManagement = ({ isTrueHandler, handleNewItem }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        barcode: '',
        price: '',
        img: '',
        category: '',
    });
    const [editingItem, setEditingItem] = useState(null);

    const categories = [
        'Classic Pizzas',
        'Meat Lovers',
        'Vegetarian Pizzas',
        'Gourmet Pizzas',
        'Seafood Pizzas',
        'White Pizzas',
        'Specialty Pizzas',
        'Calzone',
        'Thin Crust Pizzas',
        'Dessert Pizzas',
    ];

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

    const handleAddItem = async () => {
        const itemToAdd = {
            ...newItem,
            price: newItem.price === '' ? 0 : Number(newItem.price),
        };

        if (itemToAdd.name && itemToAdd.barcode && itemToAdd.price && itemToAdd.img && itemToAdd.category) {
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
                setNewItem({ name: '', barcode: '', price: '', img: '', category: '' });
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    const handleDeleteItem = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (confirmDelete) {
            try {
                await fetch(`http://localhost:8080/products/${id}`, {
                    method: 'DELETE',
                });

                setItems(items.filter((item) => item.id !== id));
                alert('Item deleted successfully.');
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleEditItem = (item) => {
        setEditingItem({ ...item });
    };

    const handleSaveItem = async () => {
        const updatedItem = {
            ...editingItem,
            price: Number(editingItem.price),
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
            alert('Item updated successfully.');
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

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
                <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            <div className="items-section">
                {items.map((item) => (
                    <div className="item-card-management" key={item.id}>
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
                                <input
                                    type="text"
                                    value={editingItem.img}
                                    onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                                />
                                <select
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <button onClick={handleSaveItem}>Save</button>
                            </div>
                        ) : (
                            <>
                                <div className="item-details">
                                    <img src={item.img} alt={item.name} className="item-image" />
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-barcode">Barcode: {item.barcode}</p>
                                    <p className="item-price">Price: LKR {item.price}</p>
                                    <p className="item-category">Category: {item.category}</p>
                                </div>
                                <button onClick={() => handleEditItem(item)} className="edit-btn"><i class="fa-solid fa-pen-to-square" /> Edit</button>
                                <button onClick={() => handleDeleteItem(item.id)} className="delete-btn"><i class="fa-solid fa-trash" />Delete</button>
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
