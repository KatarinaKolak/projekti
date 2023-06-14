import React, {useContext, useState} from "react";
import Context from './CartContext';
import { Link } from "react-router-dom";
const Product = (props) => {
    const [ cart, setCart ] = useContext(Context);
    function addToCart() {
        for(let value of cart){
            if (value.name === p.name){
                value.quantities++;
                return;
            }
        }
        setCart([...cart, p]);
    }

    function removeFromCart() {
        setCart(cart.filter(c => c.name !== p.name));
    }

    return(
        <div>
            <div>
                <p><b>Product:</b>{p.name}</p>
                <p><b>Price:</b>{p.price}kn</p>
                <p><b>Cacao percentige:</b>{p.cacao}</p>
                <p><b>Color:</b>{p.color}</p>
                <p><b>Producer:</b>{p.producer_id}</p>
                <p><b>Type:</b>{p.type}</p><br/>
            </div>
            {cart.includes(p) ? (
                <>
                <button className = "rem" onClick={removeFromCart}>
                    Remove from cart
                </button>
                <button className = "plus" onClick={addToCart}>
                +
                </button>
                </>
                ) : (
                <button className = "add" onClick={addToCart}>
                    Add to Cart
                </button>
            )}
        </div>
    )
}

export default Product;