
import Checkout from './Checkout';
import './Item.css';
import Menu from './Menu';

const Item = () => {


    const items = [
        { name: 'Burger Bun', barcode: '465123', price: 650 },
        { name: 'FTC Feast Pizza', barcode: '8745135', price: 4000 },
        { name: 'Vanilla Bean Latte', barcode: '846519864512', price: 650 },
        { name: 'Hazelnut Cappuccino', barcode: '54545221', price: 850 },
        { name: 'Caramel Macchiato', barcode: '4154861454', price: 750 },
        { name: 'Creamy Alfredo Fettuccine', barcode: '78514521', price: 950 },
        { name: 'Spaghetti Bolognese', barcode: '547854845', price: 1100 },
        { name: 'Pineapple Coconut Mojito', barcode: '651255478', price: 750 },
        { name: 'Watermelon Mint Mojito', barcode: '155465312', price: 650 },
        { name: 'Berry Bliss Mojito', barcode: '78514521', price: 650 },
        { name: 'Classic Lime Mojito', barcode: '78514521', price: 650 },
        { name: 'Veggie Delight Sandwich', barcode: '78514521', price: 850 },
        { name: 'Burger Bun', barcode: '465123', price: 650 },
        { name: 'FTC Feast Pizza', barcode: '8745135', price: 4000 },
        { name: 'Vanilla Bean Latte', barcode: '846519864512', price: 650 },
        { name: 'Hazelnut Cappuccino', barcode: '54545221', price: 850 },
        { name: 'Caramel Macchiato', barcode: '4154861454', price: 750 },
        { name: 'Creamy Alfredo Fettuccine', barcode: '78514521', price: 950 },
        { name: 'Spaghetti Bolognese', barcode: '547854845', price: 1100 },
        { name: 'Pineapple Coconut Mojito', barcode: '651255478', price: 750 },
        { name: 'Watermelon Mint Mojito', barcode: '155465312', price: 650 },
        { name: 'Berry Bliss Mojito', barcode: '78514521', price: 650 },
        { name: 'Classic Lime Mojito', barcode: '78514521', price: 650 },
        { name: 'Veggie Delight Sandwich', barcode: '78514521', price: 850 },
    ];

    return (
        <div className="container">
            <Menu />

            <div className="items-section">
                {items.map((item) => (
                    <div className="item-card" key={item.barcode}>
                        <div className="item-name">{item.name}</div>
                        <div className="item-barcode">{item.barcode}</div>
                        <div className="item-price">LKR {item.price.toFixed(2)}</div>
                    </div>
                ))}

            </div>
            <div className="checkout-section">
                <Checkout />
            </div>
        </div>
    );
};

export default Item;
