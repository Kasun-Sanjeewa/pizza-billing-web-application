
import Checkout from './Checkout';
import Menu from './Menu';
import Item from './Item'
import './CSS/HeroPage.css'

const HeroPage = ({ items }) => {




    return (
        <div className="container">
            <Menu className="abc" />

            <div className="items-section">
                <Item items={items} />

            </div>
            <div className="checkout-section">
                <Checkout />
            </div>
        </div>
    );
};

export default HeroPage;
