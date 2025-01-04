import React from 'react'
import { useState } from 'react';
import './CSS/Menu.css'

export default function Menu() {
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
        'Flatbread & Thin Crust Pizzas',
        'Dessert Pizzas',
        'Seafood Delight',
    ];
    return (
        <div className="menu-section">
            <h2 className='filter-text'>Filter</h2>
            {categories.map((category) => (
                <button
                    key={category}
                    className={selectedCategory === category ? 'active-category' : ''}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
