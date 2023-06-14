import React, {useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Context from "./CartContext";
import FavContext from "./FavContext";
import Favicon from 'react-favicon'
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

const Detail = () => {
    const params = useParams();
    const [types, setTypes] = useState("");
    const [producers, setProducers] = useState("");
    const [product, setProduct] = useState("");
    const [cart, setCart] = useContext(Context);
    const [favs, setFavs] = useContext(FavContext);

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; // ako nema tokena vratit korisnika na prijavu
    }
    
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

    function remove(){
        setFavs(favs.filter(function(element){
          return element._id != product._id;
        }))
      }

    async function getProduct(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        
        const productList = await fetch(`http://localhost:5000/api/chocolates/${params.id}`, options);
        const productJson = await productList.json();
        product.quantities = 1;
        setProduct(productJson);

        const producerList = await fetch(`http://localhost:5000/api/producers/${productJson.producer_id}`, options);
        const producerJson = await producerList.json();

        setProducers(producerJson.name);

        const typeList = await fetch(`http://localhost:5000/api/types/${productJson.type}`, options);
        const typeJson = await typeList.json();

        setTypes(typeJson.name);
    }

    
    useEffect(() => {
        getProduct();
    }, [favs]);

    return(
        <div className="container justify-content-center">
            <div className="row border rounded rounded">
            <div className="col-5 m-6 p-4">
            <p><b>Product: </b>{product.name}</p>
            <p><b>Price: </b>{product.price}kn</p>
            <p><b>Cacao percentige: </b>{product.cacao}</p>
            <p><b>Color: </b>{product.color}</p>
            <p><b>Producer: </b>{producers}</p>
            <p><b>Type: </b>{types}</p>

            <Link to={`/producerDetails/${product.producer_id}`}>
                <button type="submit" className="btn btn-info btn-sm m-1">Producer Details</button></Link><br/><br/>

            {favs.includes(product) ? (
                <>
                <button type="submit" className="btn btn-info btn-danger" onClick={remove}><i class="fa fa-heart"></i></button>
            
                </>
                ) : (
                    <button type="submit" className="btn btn-info btn-danger m-1" onClick={addToFavs}><i class="fa fa-heart"></i></button>
            
                )}
                <button type="submit" className="btn btn-success m-1" onClick={addToCart}><i class="fa fa-shopping-cart"></i></button>
            
            
            </div>
            <div className="col-6">
            <img src={product.image} class="mw-100 mh-100"/><br/>
            </div>
            </div>
        </div>
    )
}

export default Detail;
