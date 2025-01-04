import React, { useEffect, useState } from 'react';
import './CSS/ItemManagement.css';

const ItemManagement = ({ isTrueHandler, handleNewItem }) => {
    const [items, setItems] = useState([
        { name: 'Burger Bun', barcode: '465123', price: 650, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg' },
        { name: 'FTC Feast Pizza', barcode: '8745135', price: 4000, img: 'https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2.jpg' },
        { name: 'Vanilla Bean Latte', barcode: '846519864512', price: 650, img: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/d6c392a84e4f665424d710649452e7f9/Derivates/a6bdb196bee23faef1d8020319c7c64750ef7686.jpg' },
        { name: 'Hazelnut Cappuccino', barcode: '54545221', price: 850, img: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg' },
        { name: 'Caramel Macchiato', barcode: '4154861454', price: 750, img: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/52febac4-322b-4546-97d0-fd46ad082925/Derivates/805ed5c2-e058-4c1b-8eba-91400238ae2c.jpg' },
        { name: 'Creamy Alfredo Fettuccine', barcode: '78514521', price: 950, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRIKyuBmtVmOXTpYXn7P8NfiY8PNp8FpTkjKWvkJ9_JbvQI_kqxMAY1jmUXo6sU59S84&usqp=CAUg' },
        { name: 'Spaghetti Bolognese', barcode: '547854845', price: 1100, img: 'https://facefoodmag.com/fotos/blog/mejores-pizzerias-palma-mallorca.jpg' },
        { name: 'Pineapple Coconut Mojito', barcode: '651255478', price: 750, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9c4T8ahaLDklv9SRpAWhrYIyRZYuphaLPg&sg' },
    ]);

    const [newItem, setNewItem] = useState({
        name: '',
        barcode: '',
        price: '',
        img: '',
    });

    const [editingItem, setEditingItem] = useState(null);

    // Synchronize items with parent
    useEffect(() => {
        handleNewItem(items);
    }, [handleNewItem, items]);

    const handleAddItem = () => {
        if (newItem.name && newItem.barcode && newItem.price && newItem.img) {
            setItems([
                ...items,
                { id: Date.now(), ...newItem },
            ]);
            setNewItem({ name: '', barcode: '', price: '', img: '' });
        }
    };

    const handleDeleteItem = (barcode) => {
        setItems(items.filter((item) => item.barcode !== barcode));
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
    };

    const handleSaveItem = () => {
        setItems(items.map((item) => (item.barcode === editingItem.barcode ? editingItem : item)));
        setEditingItem(null);
    };

    const goBackToNavBar = () => {
        isTrueHandler(true);
    };

    return (
        <div className="item-management-container">
            <h2>Item Management</h2>
            <div className="add-item-form">
                <input type="text" placeholder="Item Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                <input type="text" placeholder="Barcode" value={newItem.barcode} onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })} />
                <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                <input type="text" placeholder="Image URL" value={newItem.img} onChange={(e) => setNewItem({ ...newItem, img: e.target.value })} />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            <div className="items-section">
                {items.map((item) => (
                    <div className="item-card" key={item.barcode}>
                        {editingItem?.barcode === item.barcode ? (
                            <div className="edit-item-form">
                                <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
                                <input type="text" value={editingItem.barcode} onChange={(e) => setEditingItem({ ...editingItem, barcode: e.target.value })} />
                                <input type="number" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })} />
                                <input type="text" value={editingItem.img} onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })} />
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
                                <button onClick={() => handleEditItem(item)} className='edit-btn'>Edit</button>
                                <button onClick={() => handleDeleteItem(item.barcode)} className='delete-btn'>Delete</button>
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
