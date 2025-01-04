import React, { useState } from 'react';
import './CSS/Menu.css';

export default function Menu({ onCategorySelect }) {
    const [selectedCategory, setSelectedCategory] = useState('All Items');

    const categories = [
        'All Items',
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
        'Seafood Delight',
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onCategorySelect(category); // Notify parent about the selected category
    };

    return (
        <div className="menu-section">
            <h2 className='filter-text'>Filter</h2>
            {categories.map((category) => (
                <button
                    key={category}
                    className={selectedCategory === category ? 'active-category' : ''}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
