import React, {useState, useEffect, useContext } from "react";
import FavContext from './FavContext';
import Product from "./Product";
import Chocolate from "./Chocolate";
import { Link } from "react-router-dom";
import Context from "./CartContext";

const Favs = () => {
    const [favs, setFavs] = useContext(FavContext);
    const [cart, setCart] = useContext(Context);

    function removeFromFavs(product){
      setFavs(favs.filter(function(element){
        return element._id != product._id;
      }))
    }

    function addToCart(product) {
      const array = Object.keys(cart);
      for(item in array){
          console.log(cart[item])
          if (cart[item]._id === product._id){
              cart[item].quantities += 1;
              return cart;
          }
         
      }
      
      product.quantities = 1;
      setCart([...cart, product]);
    }


    useEffect(() => {
      
    }, [favs]);

    return (
      <div className="container">
        <div className="row  justify-content-center">
        <p>Total product number: {favs.length}</p> 
        <p></p> 
        
          {Object.keys(favs).map(item => (
            <div className="col-4 p-4">
              <div className="text-center"><img src={favs[item].image} width={200} height={250} /></div>
              <p className="text-center"><b>{favs[item].name}</b></p>
              <p className="text-center">Price: {favs[item].price}kn</p>
              <div className="text-center">
                <button type="submit" className="btn btn-success" onClick={()=>addToCart(favs[item])}><i class="fa fa-shopping-cart"></i></button>
                <button type="submit" className="btn btn-danger m-1" onClick={()=>removeFromFavs(favs[item])}><i class="fa fa-trash"></i></button>
                </div>
            </div>
             ))}
            
        </div>
      </div>
    );
};

export default Favs;