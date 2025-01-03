import React from 'react'
import './Checkout.css'

export default function Checkout() {
    return (
        <>
            <h2>Checkout</h2>
            <div className="checkout-details">
                <div className='chechout-text'>Customer: Walking Customer</div>
                <div className='chechout-text'>Table: Delivery</div>
                <div className='chechout-text'>Total: LKR 0.00</div>
                <div className='chechout-text'>Payable: LKR 0.00</div>
            </div>
            <button className="proceed-button">Checkout</button>
        </>
    )
}
