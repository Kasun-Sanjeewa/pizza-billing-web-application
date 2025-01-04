
import Checkout from './Checkout';
import Menu from './Menu';
import Item from './Item'
import './CSS/HeroPage.css'

const HeroPage = () => {




    return (
        <div className="container">
            <Menu className="abc" />

            <div className="items-section">
                <Item />

            </div>
            <div className="checkout-section">
                <Checkout />
            </div>
        </div>
    );
};

export default HeroPage;
