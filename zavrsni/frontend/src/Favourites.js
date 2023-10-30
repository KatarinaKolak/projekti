import React, {useState, useEffect, useContext } from "react";
import Context from "./CartContext";
import { useParams } from "react-router-dom";

const Favs = () => {
    const [favs, setFavs] = useState([]);
    const [cart, setCart] = useContext(Context);
    const [currentShade, setCurrentShade] = useState("");
    const [shades, setShades] = useState([]);
    const [cartItemNum, setCartItemNum] = useState(0);
    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const params = useParams();

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

      function removeFromFavs(product){
          const requestOptions = {
            method: 'DELETE'
          }

          fetch(`http://localhost:3001/product/favouriteProduct/${params.id}/${product._id}`,requestOptions)
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

      function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
      }

      useEffect(() => {
          async function getFavs (){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }};

            const favsList = await fetch(`http://127.0.0.1:3001/product/favouriteByUser/${params.id}`, options);
            const favsJson = await favsList.json();
                
            setFavs(favsJson);

            var array = [];
            favs.map((item) => {
              products.map((product) => {
                if (item.product_id === product._id){
                  array.push(product);
                }
              })
            })

            setFilterProducts(array);
          }  

          async function getProducts (){
              const options = {headers:{
                  Authorization: "Bearer " + localStorage.getItem("token"),
              }};

            const productList = await fetch("http://127.0.0.1:3001/product/products", options);
            const productJson = await productList.json();
            
            setProducts(productJson.products);
        }

          getProducts();
          getFavs();
        }, [favs]);

    return (
      <div className="container">
        <div className="row  justify-content-center">
        <p style={{fontSize:"16px"}}><b><span style={{color:"#ff4dff"}}>Total product number: </span></b>{favs.length}</p> 
        <p></p> 
        
          {filterProducts.map(item => (
            <div className="col-4 p-4" id="item._id" key={item._id}>
              <div className="text-center"><img src={process.env.PUBLIC_URL + "/images/" + item.image} height={250} style={{width:"auto"}} /></div>
              <p className="text-center"  style={{fontSize:"16px", lineHeight:"80px"}}><b>{item.name}</b></p>
              <p className="text-center" style={{fontSize:"15px"}}>Price: {getFloat(item.price)} €</p>
              <div className="text-center">
                <button type="submit" className="btn btn" style={{background:"#ffe6ff", color:"#ff1aff", fontSize:"25px"}} onClick={()=>addToCart(item)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                        </svg></button>
                <button type="submit" className="btn btn m-1" style={{background:"#ffe6ff", color:"#ff1aff", fontSize:"25px"}} onClick={()=>removeFromFavs(item)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg></button>
                </div>
            </div>
             ))}
            
        </div>
      </div>
    );
};

export default Favs;