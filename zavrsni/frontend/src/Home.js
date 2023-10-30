import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from "./CartContext";
import FavouriteContext from './FavouriteContext';
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useContext(Context);
    const [favs, setFavs] = useContext(FavouriteContext);
    const [cartItemNum, setCartItemNum] = useState(0);
    const [discounts, setDiscounts] = useState([]);
    const [newArray, setNewArray] = useState([]);

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

    function addToCart(product) {
        const array = Object.keys(cart);
        for(let item in array){
            console.log(cart[item])
            if (cart[item]._id === product._id){
                cart[item].quantities += 1;
                return cart;
            }
               
        }
        
        product.price = getFloat(product.price);
        product.quantities = 1;
        setCart([...cart, product]);
        setCartItemNum(cartItemNum++);
      }

    function addToFavs(product) {
        const array = Object.keys(favs);
        for(let item in array){
            console.log(favs[item])
            if (favs[item]._id === product._id){
                return favs;
            }
        }

        product.price = getFloat(product.price);
        setFavs([...favs, product]);
    }

    function remove(product){
        setFavs(favs.filter(function(element){
            return element._id != product._id;
          }));
      }

    function getDiscounts2(){
        if (products.length){
            products.sort((a, b) => b.discount - a.discount);
            setNewArray(products.slice(0,3))
        }
    }
  

    useEffect(() => {
        async function getProducts (){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }};
    
            const productList = await fetch("http://127.0.0.1:3001/product/products");
            const productJson = await productList.json();
            
            setProducts(productJson.products);
        }

        async function getCategories(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
    
            const categoriesList = await fetch("http://127.0.0.1:3001/product/categories");
            const categoriesJson = await categoriesList.json();
    
            setCategories(categoriesJson.categories);
        }

        async function getDiscounts(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
    
            const discountsList = await fetch("http://127.0.0.1:3001/product/discounts");
            const discountsJson = await discountsList.json();
    
            setDiscounts(discountsJson);
        }

        getProducts();
        getCategories();
        getDiscounts();
        getDiscounts2();
      }, [products]);

      return (
        <>
          { (discounts.length) && (JSON.parse(localStorage.getItem("user"))) && (JSON.parse(localStorage.getItem("user")).role === 'user') ? (
            <div className='codeDiv'>
                {discounts.map((item) =>{
                    return(
                        <div className='code-body'>
                            <p>We have prepared a discount code from {item.value}% for you &#128522;</p>
                            
                            <p><span>Code: </span> <span style={{color:"#ff66ff"}}><b>{item.code}</b></span></p>
                            <p><i><span>Valid until:</span> {(new Date(item.expire)).toLocaleString()}</i></p>
                        </div>
                    )
                })}
            </div>
          ) : (<span></span>)}
          <div className='imageContainer'>
                <img className="intro" src={process.env.PUBLIC_URL + "/images/intro1.jpg" } />
                <img className="intro" src={process.env.PUBLIC_URL + "/images/intro3.jfif" } />
                <img className="intro" src={process.env.PUBLIC_URL + "/images/intro5.jpg" } />
          </div>
          <div className='buttonContainer'>
                <button className="introBtn"><a href="/newArrivals" style={{textDecoration:'none', color:'white'}}>New arrivals</a></button>
                <button className="introBtn"><a href="/bestAttack" style={{textDecoration:'none', color:'white'}}>Best attack</a></button>
                <button className="introBtn"><a href="/products" style={{textDecoration:'none', color:'white'}}>Discover</a></button>
          </div>
          <div className='sale'>
          <h2 className="text-center" style={{margin:"50px", color:"#ff1aff"}}>Sale</h2>
          {
            (newArray.length > 0) ? newArray.map((it) =>{
                var counter = 0;
                if (it.discount > 0 ){
                    counter++;
                    return(
                        <div className='saleProducts'>
                            <div class="text-center">
                            <Link to={`/productDetails/${it._id}`} className="text-decoration-none"><img className="saleImg" src={process.env.PUBLIC_URL + "/images/" + it.image} /></Link>
                            </div>
                            <div className="text-dark text-center">
                                <b>{it.name}</b>
                                
                            </div>
                            <div className="saleDiscount">
                                <b><span className='discountText'>{it.discount}%</span></b>
                            </div>
                        </div>           
                    )
                }
            }):(<p></p>)
          }
          </div>
        </>
      )
}

export default Home;