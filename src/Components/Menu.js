import React from 'react'
import { useState } from 'react';
import './Menu.css'

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState('All Items');

    const categories = [
        'All Items',
        'My Cat 1',
        'Cappuccino',
        'Sandwich',
        'Chocolate',
        'Mojito',
        'Toasties',
        'Pasta',
        'Pizza',
        'Zone One',
        'Hot Drinks',
        'Cool Drinks',
        'Lunch',
        'Breakfast',
        'Mains',
        'Quiet Zone',
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
