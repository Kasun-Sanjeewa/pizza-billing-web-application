import React, { useEffect, useState } from 'react';
import './CSS/ItemManagement.css';

const ItemManagement = ({ isTrueHandler, handleNewItem }) => {

    // State variables to hold item data and form inputs
    const [items, setItems] = useState([]); // Store all items
    const [newItem, setNewItem] = useState({ // Track input fields for new item
        name: '',
        barcode: '',
        price: '',
        img: '',
        category: '',
    });
    const [editingItem, setEditingItem] = useState(null); // Store item being edited

    // Available categories for item selection
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

    // Fetch the items from the API when component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:8080/products');
                const data = await response.json();
                setItems(data); // Update the items state with fetched data
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []); // Empty dependency array means this runs only once after the first render


    // Handle adding a new item
    const handleAddItem = async () => {
        const itemToAdd = {
            ...newItem,
            price: newItem.price === '' ? 0 : Number(newItem.price), // Ensure price is a number
        };

        // Validate that all fields are filled before adding
        if (itemToAdd.name && itemToAdd.barcode && itemToAdd.price && itemToAdd.img && itemToAdd.category) {
            try {
                const response = await fetch('http://localhost:8080/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemToAdd),
                });

                const addedItem = await response.json(); // Parse the response from the server
                setItems([...items, addedItem]); // Add the newly added item to the items list
                setNewItem({ name: '', barcode: '', price: '', img: '', category: '' }); // Reset input fields after adding
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };


    // Handle deleting an item by its ID
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


    // Set the item to be edited
    const handleEditItem = (item) => {
        setEditingItem({ ...item }); // Copy item data into editingItem state
    };

    // Save the updated item
    const handleSaveItem = async () => {
        const updatedItem = {
            ...editingItem,
            price: Number(editingItem.price),
        };

        try {
            const response = await fetch(`http://localhost:8080/products/${editingItem.id}`, {
                method: 'PUT', // HTTP PUT request to update an existing item
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


    // Navigate back to the previous view (navbar)
    const goBackToNavBar = () => {
        isTrueHandler(true); // Invoke parent handler to reset view
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

            {/* Button to navigate back to the home screen */}
            <div className="center-button-container">
                <button className="center-button" onClick={goBackToNavBar}>Back to Home</button>
            </div>
        </div>
    );
};

export default ItemManagement;
