import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from "./CartContext";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiOutlinePlusCircle, AiOutlineComment } from 'react-icons/ai';
import StarsRating from 'react-star-rate';

const ProductDetail = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useContext(Context);
    const [favs, setFavs] = useState([]);
    const [cartItemNum, setCartItemNum] = useState(0);
    const [price, setPrice] = useState(0);
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);
    const [shades, setShades] = useState([]);
    const [currentShade, setCurrentShade] = useState("");
    const [shipping, setShipping] = useState([]);
    const [detail, setDetail] = useState("");
    const [detail2, setDetail2] = useState("");
    const [vote, setVote] = useState(0);
    const [vote2, setVote2] = useState(-1);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(false);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const params = useParams();

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

    function countPrice(value, discount){
        const p = parseFloat(getFloat(value));
        const d = (parseFloat(getFloat(value)) * parseFloat(discount) / 100);
        return (parseFloat(p) - parseFloat(d));
    }

    function addFormData(e){
        e.preventDefault();
        
        fetch("http://localhost:3001/product/addComment", {
            method: "POST",
            body: JSON.stringify({
                date:new Date(),
                vote:vote,
                detail:detail,
                user_id:user.id,
                product_id:params.id
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

    function handleShow() {
        show === false ? setShow(true) : setShow(false);
    }

    async function updateComment(commentId, mark, text){
        const json = {
            "date":new Date(),
            "vote":vote2 > -1 ? vote2 : mark,
            "detail":detail2 != "" ? detail2 : text,
            "user_id":user.id,
            "product_id":params.id
        }

        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        
  
        fetch(`http://localhost:3001/product/updateComment/${commentId}`,requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                //window.location.href = '/productDetails/' + params.id;
            } else {
                console.log("Incorrect data!")
            }
        })
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

    async function deleteComment(commentId){
        const requestOptions = {
            method: 'DELETE'
          }
  
      fetch(`http://localhost:3001/product/deleteComment/${commentId}`,requestOptions)
      .then((res) => res.json())
              .then((data) => {
                  if (data.success){
                    window.location.href = '/productDetails/' + params.id
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

      function addToFavs(product, shade="") {
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

    function checkFavs(product){
        const array = Object.keys(favs);
        for(let item in favs){
            console.log("ITEMM F ", favs[item])
            if (favs[item].product_id === product._id){
                return true;
            }
        }
        return false;

    }

    function remove(product){
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

    useEffect(() => {
        async function getProduct (){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }};
    
            const productList = await fetch(`http://localhost:3001/product/product/${params.id}`, options);
            const productJson = await productList.json();
            
            const p = parseFloat(getFloat(productJson.price));
            const d = (parseFloat(getFloat(productJson.price)) * parseFloat(productJson.discount) / 100);
            
            setProduct(productJson);
            setPrice(countPrice(productJson.price, productJson.discount));
        }

        async function getCategoryProducts(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }};
    
            const productsList = await fetch(`http://localhost:3001/product/productsByCategory/${product.category_id}`, options);
            const productsJson = await productsList.json();
            
            setCategoryProducts(productsJson.slice(0, 4));
        }

        async function getCategories(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
    
            const categoriesList = await fetch("http://127.0.0.1:3001/product/categories", options);
            const categoriesJson = await categoriesList.json();
    
            setCategories(categoriesJson.categories);
        }

        async function getComments(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
    
            const commentsList = await fetch("http://127.0.0.1:3001/product/comments", options);
            const commentsJson = await commentsList.json();
    
            setComments(commentsJson.comments);
            commentsJson.comments.map((item) => {
                    if ((product._id === item.product_id) && (item.user_id === user.id)){
                        setFlag2(true);
                    }
            })
        }

        async function getShades(){
            const option = {
                headers: {Authorization: "Bearer " + localStorage.getItem("token")  }
            };

            const shadesList = await fetch("http://127.0.0.1:3001/product/shades", option);
            const shadesJson = await shadesList.json();

            setShades(shadesJson.shades);
        }

        async function getUsers(){
            const option = {
                headers: {Authorization: "Bearer " + localStorage.getItem("token")  }
            };

            const userList = await fetch("http://127.0.0.1:3001/user/users", option);
            const userJson = await userList.json();

            setUsers(userJson.users);
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

        async function getShippings(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            const shippingList = await fetch(`http://localhost:3001/product/shippings`, options);
            
            const shippingJson = await shippingList.json();
            setShipping(shippingJson.shippings);

            const myuser = JSON.parse(localStorage.getItem("user"));

            shippingJson.shippings.map((item) => {
                if (item.user_id === myuser.id){
                    item.items.map((it) => {
                        if (it === params.id){
                            setFlag(true);
                        }
                    })
                   
                }
            })
        }

        function getCurrent(){
            const myuser = JSON.parse(localStorage.getItem("user"));
            if (myuser){
                setUser(myuser);
            }
        }

        getProduct();
        getCategories();
        getCurrent();
        getFavs();
        getShippings();
        getShades();
        getComments();
        getUsers();
        getCategoryProducts();
    }, [product, favs]);

    return (
        <div className="container justify-content-center">
            <div className="mainContainer">
                <div className="col-5 m-6 p-4">
                <div class="text-center">
                    <img className="detailImg" src={process.env.PUBLIC_URL + "/images/" + product.image} />
                </div>
                <div className="detailContent">
                    <p><span className="spanTitle"><b>Product: </b></span>{product.name}</p>
                    {product.discount > 0 ? (
                    <p><span className="spanTitle"><b>Price: </b></span><span className="price">{getFloat(product.price)} €</span>  <span className="newPrice">{price}€</span></p>
                    ) : (
                        <p><span className="spanTitle"><b>Price: </b></span><span>{getFloat(product.price)} €</span> </p>
                    )}
                    <p><span className="spanTitle"><b>Size: </b></span>{getFloat(product.size)} mL</p>
                    <p><span className="spanTitle"><b>Details: </b></span>{product.details}</p>
                    <p><span className="spanTitle"><b>Usage: </b></span>{product.usage}</p>
                    <p><span className="spanTitle"><b>Ingredients: </b></span>{product.ingredients}</p>
                </div>
                {product.discount > 0 ? (
                <div className="detailDiscont">
                    <span className="detailDiscontTxt">{product.discount}%</span>
                </div>) : (<span></span>)
                }

                 { product.on_stock > 0 ?  shades.map((shade, index) => {
                            
                            if ((shade.product_id === product._id) && (shade.quantities > 0)){
                                return(
                                    <><div className='shadesDiv2'>
                                        <div className="shade2" style={{ background: shade.hex }} onClick={() => { addToCart(product, shade); } }></div>
                                    </div></>
                                )
                            }
                }):(<p></p>)}<br/><br/>

                <div className="text-dark text-center">
                    {user.role === "admin" ? 
                        (<>
                            <div  class="text-center">
                            <Link to={`/addShade/${product._id}`}>
                                <button className="crudBtn2D" style={{color:"#03563d"}} text="Add">
                                    <AiOutlinePlusCircle/></button></Link>
                                <Link to={`/updateProduct/${product._id}`}>
                                <button className="crudBtn2D" style={{color:"#03563d"}} text="Edit">
                                    <AiFillEdit/></button></Link>
                                <button className="crudBtn2D" style={{color:"#fc4c4c"}} onClick={() => deleteProduct(product._id)}><AiFillDelete/></button>
                                <br/>

                                
                            </div>
                        </>
                        ) : user.role === "user" ? 
                        (
                            product.on_stock > 0 ? (
                            <><button id="crudBtn3" type="submit" style={{ background: "#ffffff", color: "#ff1aff" }} className="btn btn-light" onClick={() => addToCart(product)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                            </button>
                            {checkFavs(product) === true? (
                                                     <button id="crudBtn3" type="submit" style={{background:"#ffffff", color:"red"}} className="btn btn-light" onClick={() => remove(product)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                                        </svg>
                                                    </button>) : (
                                                    
                                                    <button id="crudBtn3" type="submit" style={{background:"#ffffff", color:"#ff1aff"}} className="btn btn-light" onClick={() => addToFavs(product)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                        </svg>
                                                    </button>)}
                                        
                                    </>):(
                                        <div className='unavailable2'><span className='unavailableText2'>Out of stock</span></div>
                                    )
                                )
                                : (<></>)
                            }
                        </div>
                        
                    
                        <div className="allComments">
                        <button onClick={handleShow} className="showCom" type='submit'>Comments <AiOutlineComment /></button>
                        {show === true ? comments.map((com) => {
                            return users.map((u) => {
                                if ((com.product_id === product._id) && (com.user_id === u._id) && (com.user_id !== user.id)){
                                    return (
                                        <div >
                                            <div className="allComments2">
                                                <p style={{fontSize:14}}>{com.detail}</p>
                                            </div>
                                            <StarsRating classNamePrefix="react-star-rate" value={com.vote} size="small" disabled />
                                            <p className="username">{u.name + " " + u.surname} <span className="dateCom">{(new Date(com.date)).toLocaleString()}</span></p>
                                            
                                        </div>
                                    )
                                } else if ((com.product_id === product._id) && (com.user_id === u._id) && (com.user_id === user.id)){
                                    return(<div>
                                        
                                        <textarea rows="1" cols="40" type="text" defaultValue={com.detail} className="form-control" id="detail" placeholder="Comment" onChange={(e) => setDetail2(e.target.value)} /><br />
                                        <StarsRating  defaultValue={com.vote} onChange={vote2 => { setVote2(vote2); }}  />
                                        <p className="username">{u.name + " " + u.surname} <span className="dateCom">{new Date(com.date).toLocaleString()}</span></p>
                                        <input type="submit" className="commentBtn" value="Edit" onClick={() => updateComment(com._id, com.vote, com.detail)} />
                                        <input type="submit" className="commentBtn" value="Delete" onClick={() => deleteComment(com._id)} />
                                <br /><br />
                                    </div>)
                                } 
                            })
                        }) : (<></>)
                            
                        }
                        
                        {flag === true && flag2 === false? 
                        (
                            <div>
                                <StarsRating  value={vote} onChange={vote => { setVote(vote); }}  />
                                 <textarea rows="1" cols="40" type="text" value={detail} className="form-control" id="detail" placeholder="Comment" onChange={(e) => setDetail(e.target.value)} /><br />
                                 <input type="submit" className="commentBtn" value="Comment" onClick={(e) => { addFormData(e) } } /><br /><br />
                            </div>
                           
                        )
                        : (<p></p>)
                        }
                        </div>
                    <div id="interested">
                    <p className="spanTitle2" style={{fontSize:"14"}}>Might be interested: </p>
                    
                        <div className="row container justify-content-center" style={{lineHeight:"50px"}}>
                            {categoryProducts.map((cproduct, index) => {
                                if (cproduct._id !== product._id){
                                    return (
                                        <div className="col-4 p-3">
                                            <div className="text-dark text-center">
                                                <b>{cproduct.name}</b>
                                            </div>
                                            <div class="text-center">
                                                <Link to={`/productDetails/${cproduct._id}`} className="text-decoration-none"><img className="productImg" src={process.env.PUBLIC_URL + "/images/" + cproduct.image} /></Link>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            }
                        </div>
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;