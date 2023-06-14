import React, {useState, useEffect, useContext } from "react";
import Context from './CartContext';
import Chocolate from "./Chocolate";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useContext(Context);
    const [totalPrice, setTotalPrice] = useState(0);
    console.log(cart);

    function addingPrice() {
      var acc = 0;

      Object.keys(cart).map((ele) => {
        acc += parseFloat(cart[ele].price) * cart[ele].quantities;
      });

      setTotalPrice(acc);
    }

    function removeFromCart(product){
      setCart(cart.filter(function(element){
        return element._id != product._id;
      }))
    }

    function increaseQuantity(product){
      Object.keys(cart).map(item => {
        if (cart[item]._id === product._id){
          cart[item].quantities += 1;
          setTotalPrice(totalPrice+cart[item].price+cart[item].quantities)
        }
      })
    }

    function reduceQuantity(product){
      Object.keys(cart).map(item => {
        if ((cart[item]._id === product._id)){
          if (cart[item].quantities > 1){
            cart[item].quantities -= 1;

            setTotalPrice(totalPrice+cart[item].price+cart[item].quantities)
          }else{
            removeFromCart(product)
          }
        }
      })
    }

    useEffect(() => {
      addingPrice();
    }, [cart, totalPrice]);

    return (
      <div className ="container">
        <div className="row  justify-content-center">
        <p>Total product number: {cart.length}</p> 
        <br />
        <p>Total price: { Number(totalPrice).toFixed(2) }kn</p><br/><br/>
        
        
          {Object.keys(cart).map(item => (
            <div className="col-4 p-4">
              <div className="text-center"><img src={cart[item].image} width={200} height={250} /></div>
              <p className="text-center"><b>{cart[item].name}</b></p>
              <p className="text-center">Price: {cart[item].price}kn</p>
              <p className="text-center">Quantities: {cart[item].quantities}</p>
              <div className="text-center">
              <button type="submit" className="btn btn-success m-1" onClick={()=>increaseQuantity(cart[item])}><b>+</b></button> 
              <button type="submit" className="btn btn-info m-1" onClick={()=>reduceQuantity(cart[item])}><b>-</b></button>
              <button type="submit" className="btn btn-danger" onClick={()=>removeFromCart(cart[item])}><i class="fa fa-trash"></i></button>
            </div>
            </div>
             ))}
            
        </div>
      </div>
    );
};

export default Cart;