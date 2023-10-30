import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from "./CartContext";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';


const ProductsByCategory = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useContext(Context);
    const [favs, setFavs] = useState([]);
    const [cartItemNum, setCartItemNum] = useState(0);
    const [user, setUser] = useState("");
    const [shades, setShades] = useState([]);
    const [currentShade, setCurrentShade] = useState("");
    const params = useParams();

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
      }

    function addToCart(product, shade = "") {
        setCurrentShade(shade);
        const array = Object.keys(cart);
        for(let item in array){
            console.log(cart[item])
            if ((cart[item]._id === product._id) && (cart[item].shade !== "") && (cart[item].shade._id === shade._id)){
                
                cart[item].quantities += 1;
                return cart;
            } else if ((cart[item]._id === product._id) && (cart[item].shade === "") ){
                cart[item].quantities += 1;
                return cart;
            }
               
        }
        product.price = getFloat(product.price);
        product.quantities = 1;
        product.shade = shade;
        setCart([...cart, product]);
        setCartItemNum(cartItemNum++);
      }

    function addToFavs(product) {
        fetch("http://localhost:3001/product/addFavourite", {
            method: "POST",
            body: JSON.stringify({
                product_id: product._id,
                user_id: user.id
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
                console.log("Success!");
                //navigate("/");
        })
        .catch((err)=>console.log(err));
    }

    function removeFromFavs(product){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3001/product/favouriteProduct/${user.id}/${product._id}`,requestOptions)
      .then((res) => res.json())
              .then((data) => {
                  if (data.success){
                    //window.location.href = '/';
                    console.log("Success");
                  } else {
                      alert("Cannot delete!")
                  }
              })
      }
  
    function checkFavs(product){
        const array = Object.keys(favs);
        for(let item in favs){
            if (favs[item].product_id === product._id){
                return true;
            }
        }
        return false;
    }

    async function deleteProduct(productId){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3001/product/deleteProduct/${productId}`,requestOptions)
      .then((res) => res.json())
              .then((data) => {
                  if (data.success){
                    window.location.href = '/';
                  } else {
                      alert("Cannot delete!")
                  }
              })
    }

    useEffect(() => {
        async function getProducts (){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }};
    
            const productList = await fetch(`http://localhost:3001/product/productsByCategory/${params.id}`, options);
            const productJson = await productList.json();
            
            setProducts(productJson);
        }

        async function getShades(){
            const option = {
                headers: {Authorization: "Bearer " + localStorage.getItem("token")  }
            };

            const shadesList = await fetch("http://127.0.0.1:3001/product/shades");
            const shadesJson = await shadesList.json();

            setShades(shadesJson.shades);
        }

        function getCurrent(){
            const myuser = JSON.parse(localStorage.getItem("user"));
            if (myuser){
                setUser(myuser);
            }
        }

        async function getFavs (){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }};
    
            const myUser = JSON.parse(localStorage.getItem("user"));
            if (myUser){
                const favsList = await fetch(`http://localhost:3001/product/favouriteByUser/${myUser.id}`, options);
                const favsJson = await favsList.json();
                
                setFavs(favsJson);
            }
            
        }

        getProducts();
        getCurrent();
        getShades();
        getFavs();
      }, [currentShade, favs]);


      return(
        <div className='container justify-content-center'>
            <div className="row" style={{lineHeight:"50px"}}>
               {
                    (products.length > 0) ? Object.keys(products).map((it) =>{
                        return(
                            <div className="col-3 p-4">
                                <div class="text-center">
                                    <Link to={`/productDetails/${products[it]._id}`} className="text-decoration-none"><img className="productImg" src={process.env.PUBLIC_URL + "/images/" + products[it].image} /></Link>
                                </div>
                                <div className="text-dark text-center">
                                    <b>{products[it].name}</b>
                                </div>
                                { products[it].on_stock > 0 ? shades.map((shade, index) => {
                                            if ((shade.product_id === products[it]._id) && (shade.quantities > 0)){
                                                return(
                                                    <div className='shadesDiv'>
                                                        <div className="shade" style={{background:shade.hex}} onClick={() => { addToCart(products[it], shade)}}></div>
                                                    </div>
                                                )
                                            }
                                        }):(<div className="shade" style={{background:"white"}} ></div>)}
                                <div className="text-dark text-center">
                                    {user.role === "admin" ? 
                                        (
                                            <>
                                                <div  class="text-center">
                                                    <Link to={`/updateProduct/${products[it]._id}`}>
                                                    <button className="crudBtn2" style={{color:"#03563d"}} text="Edit">
                                                    <AiFillEdit/></button></Link>
                                                    <button className="crudBtn2" style={{color:"#fc4c4c"}} onClick={() => deleteProduct(products[it]._id)}><AiFillDelete/></button><br/>
                                                </div>
                                            </>
                                        )
                                        : user.role === "user" ? 
                                        
                                        (
                                            
                                            products[it].on_stock > 0 ? (
                                                <><button type="submit" style={{ background: "#ffffff", color: "#ff1aff" }} className="btn btn-light" onClick={() => addToCart(products[it])}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                    </svg>
                                                    </button>
                                                    {checkFavs(products[it]) === true? (
                                                     <button type="submit" style={{background:"#ffffff", color:"red"}} className="btn btn-light" onClick={() => removeFromFavs(products[it])}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                                        </svg>
                                                    </button>) : (
                                                    <button type="submit" style={{background:"#ffffff", color:"#ff1aff"}} className="btn btn-light" onClick={() => addToFavs(products[it])}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                        </svg>
                                                    </button>)}
                                                    
                                                    </>):(
                                                        <div className='unavailable'><span className='unavailableText'>Out of stock</span></div>
                                            )
                                        )
                                        : (<></>)
                                    }
                                    
                                </div>
                            </div>
                        )
                                
                })
            : <p></p> }
                
            </div>
        </div>
    )
                            
    
}

export default ProductsByCategory;