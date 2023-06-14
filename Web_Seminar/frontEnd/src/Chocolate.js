import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FavContext from "./FavContext";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import Context from "./CartContext";
import { useNavigate } from "react-router-dom";


const Chocolate = (props) => {
  let navigate = useNavigate();
  const [cart, setCart] = useContext(Context);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [product, setProduct] = useState("");
  const [userId, setUserId] = useState();
  const [favs, setFavs] = useContext(FavContext);

  if (localStorage.getItem("token") === null){
    window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
  }

  async function getProduct(){
    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};
    const productList = await fetch(`http://localhost:5000/api/chocolates/${props.id}`, options);
    const productJson = await productList.json();
    product.quantities = 1;
    setProduct(productJson);
  }

  useEffect(() => {
    getProduct();
}, [favs]);

  function addToCart() {
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

function addToFavs() {
    const array = Object.keys(favs);
    for(item in array){
        console.log(favs[item])
        if (favs[item]._id === product._id){
            return ;
        }
       
    }
    setFavs([...favs, product]);
}


  function getCurrent(){
        const myuser = JSON.parse(localStorage.getItem("user"));
        if (myuser){
            setUserName(myuser.name);
            setRole(myuser.role);
            setUserId(myuser.id);
        }
  }

  async function deleteChocolate(e){
      e.preventDefault();

      const requestOptions = {
          method: 'DELETE'
        }

    fetch(`http://localhost:5000/api/deleteChocolate/${props.id}`,requestOptions)
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
    getCurrent();
  }, []);

  return(
    <div className="col-4 p-5">
        <Link to={`/details/${product._id}`} className="text-decoration-none"><div class="text-dark text-center"><b>{product.name}</b></div></Link>
        <Link to={`/details/${product._id}`}><div class="text-center"><img className="w-75 p-3" src={product.image}/></div></Link>
        <p class="text-center">Price: {product.price}kn</p><br/>
        
        { role === "admin" ? (
        <div  class="text-center">
            <Link to={`/editChocolate/${product._id}`}>
            <button className="btn btn-primary btn-sm m-1"><i class="fa fa-edit"></i></button></Link>
            <button className="btn btn-danger btn-sm m-1" onClick={deleteChocolate}><i class="fa fa-trash"></i></button><br/><br/><br/>
         </div>
        ) : role === "user" ? (
          <div class="text-center">
                <button type="submit" className="btn btn-info btn-danger m-1" onClick={addToFavs}><i class="fa fa-heart"></i></button>
                <button type="submit" className="btn btn-success btn-success m-1"  onClick={addToCart}><i class="fa fa-shopping-cart"></i></button>
                 </div>
        ) : (
          <div>
                <Link to={`/details/${product._id}`}><button className="btn btn-info btn-sm m-1">Details</button></Link>
          </div>
        )}
    <br/><br/><br/>
    </div>
)
}
export default Chocolate;
