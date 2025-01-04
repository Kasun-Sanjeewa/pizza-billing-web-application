import React, { useState } from 'react';
import Menu from './Menu';
import Item from './Item';
import Checkout from './Checkout';
import './CSS/HeroPage.css';

const HeroPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Items');
    return (
        <div className="container">
            <Menu onCategorySelect={(category) => setSelectedCategory(category)} />
            <div className="items-section">
                <Item selectedCategory={selectedCategory} />
            </div>
            <div className="checkout-section">
                <Checkout />
            </div>
        </div>
    );
};

export default HeroPage;
