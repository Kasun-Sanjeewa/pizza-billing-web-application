import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import './CSS/Item.css';

const Item = () => {
    const items = [
        { name: 'Burger Bun', barcode: '465123', price: 650, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1200px-Pizza-3007395.jpg' },
        { name: 'FTC Feast Pizza', barcode: '8745135', price: 4000, img: 'https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2.jpg' },
        { name: 'Vanilla Bean Latte', barcode: '846519864512', price: 650, img: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/d6c392a84e4f665424d710649452e7f9/Derivates/a6bdb196bee23faef1d8020319c7c64750ef7686.jpg' },
        { name: 'Hazelnut Cappuccino', barcode: '54545221', price: 850, img: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/ecaeb2cc-a950-4645-a648-9137305b3287/Derivates/df977b90-193d-49d4-a59d-8dd922bcbf65.jpg' },
        { name: 'Caramel Macchiato', barcode: '4154861454', price: 750, img: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/52febac4-322b-4546-97d0-fd46ad082925/Derivates/805ed5c2-e058-4c1b-8eba-91400238ae2c.jpg' },
        { name: 'Creamy Alfredo Fettuccine', barcode: '78514521', price: 950, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRIKyuBmtVmOXTpYXn7P8NfiY8PNp8FpTkjKWvkJ9_JbvQI_kqxMAY1jmUXo6sU59S84&usqp=CAUg' },
        { name: 'Spaghetti Bolognese', barcode: '547854845', price: 1100, img: 'https://facefoodmag.com/fotos/blog/mejores-pizzerias-palma-mallorca.jpg' },
        { name: 'Pineapple Coconut Mojito', barcode: '651255478', price: 750, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9c4T8ahaLDklv9SRpAWhrYIyRZYuphaLPg&sg' },
        { name: 'Creamy Alfredo Fettuccine', barcode: '78514521', price: 950, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRIKyuBmtVmOXTpYXn7P8NfiY8PNp8FpTkjKWvkJ9_JbvQI_kqxMAY1jmUXo6sU59S84&usqp=CAUg' },
    ];

    const barcodeRefs = useRef([]);

    useEffect(() => {
        items.forEach((item, index) => {
            if (barcodeRefs.current[index]) {
                JsBarcode(barcodeRefs.current[index], item.barcode, {
                    format: 'CODE128',
                    width: 2,
                    height: 50,
                    displayValue: false,
                });
            }
        });
    }, [items]);

    return (
        <div className="items-section">
            {items.map((item, index) => (
                <div className="item-card" key={item.barcode}>
                    <img src={item.img} alt={item.name} className="item-image" />
                    <div className="item-name">{item.name}</div>
                    <svg
                        ref={(el) => (barcodeRefs.current[index] = el)}
                        className="barcode-image"
                    ></svg>
                    <div className="item-barcode-number">Barcode: {item.barcode}</div>
                    <div className="item-price">LKR {item.price.toFixed(2)}</div>
                </div>
            ))}
        </div>
    );
};

export default Item;