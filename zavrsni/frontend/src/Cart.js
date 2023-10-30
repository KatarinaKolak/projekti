import React, {useState, useEffect, useContext } from "react";
import Context from './CartContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CLIENT_ID } from './Config/Config';
import { useParams } from "react-router-dom";

<script src="https://smtpjs.com/v3/smtp.js">
</script>

const Cart = () => {
    const params = useParams();
    const [cart, setCart] = useContext(Context);
    const [totalPrice, setTotalPrice] = useState(0);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [user, setUser] = useState("");
    const [discount, setDiscount] = useState("");
    const [activate, setActivate] = useState(false);
    const [newDiscount, setNewDiscount] = useState(0);
    const [extraDiscount, setExtraDiscount] = useState(0);
    const [currentCode, setCurrentCode] = useState([]);
    const [codeActivated, setCodeActivated] = useState(false);
    const [discountId, setDiscountId] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] =  useState("");
    const [userEmail, setUserEmail] = useState("");
    const [subject, setSubject] = useState("Order");
    const [password, setPassword] = useState("");


    async function getDiscounts(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        const discountsList = await fetch("http://127.0.0.1:3001/product/discounts");
        const discountsJson = await discountsList.json();

        setCurrentCode(discountsJson);
    }

    function addingPrice() {
        var acc = 0;

        Object.keys(cart).map((ele) => {
          acc += parseFloat(parseFloat(cart[ele].price)) * cart[ele].quantities;
        });

        if (activate === true){
          const p = acc;
          const d = (acc * (user.discount / 100));
          setTotalPrice(parseFloat(p) - parseFloat(d));
          setNewDiscount(0);
        } else if ((extraDiscount > 0)){
          const p = acc;
          const d = (acc * (extraDiscount / 100));
          setTotalPrice(parseFloat(p) - parseFloat(d));
          setCodeActivated(true);
        }else
          setTotalPrice(acc);
    }

    function removeFromCart(product, shade){
        setCart(cart.filter(function(element){
          return element._id !== product._id || element._id === product._id && element.shade._id !== product.shade._id;
        }))
    }

    function increaseQuantity(product, shade){
        if ((product.shade !== "") && ( product.quantities + 1 > product.shade.quantities))
            return false;
        if (product.quantities + 1 > product.on_stock)
            return false;
        
        Object.keys(cart).map(item => {
              if ((cart[item]._id === product._id) && (cart[item].shade !== "") && (cart[item].shade._id === shade._id)){
                  cart[item].quantities += 1;
                  setTotalPrice(totalPrice+cart[item].price+cart[item].quantities)
                  return true;
              } else if ((cart[item]._id === product._id) && (cart[item].shade === "") ){
                  cart[item].quantities += 1;
                  setTotalPrice(totalPrice+cart[item].price+cart[item].quantities)
                  return true;
            }
        })
    }

    function reduceQuantity(product, shade){
        if (product.quantities === 1){
          removeFromCart(product, shade);
          return;
        }

        Object.keys(cart).map(item => {
          if ((cart[item]._id === product._id) && (cart[item].shade !== "") && (cart[item].shade._id === shade._id)){
              if (cart[item].quantities > 1){
                cart[item].quantities -= 1;
                setTotalPrice(totalPrice+cart[item].price+cart[item].quantities)
              } 
            } else if ((cart[item]._id === product._id) && (cart[item].shade === "") ){
                cart[item].quantities -= 1;
                setTotalPrice(totalPrice+cart[item].price+cart[item].quantities);
            }
        })
    }

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

    function onChangeValue() {
        activate === true ? setActivate(false) : setActivate(true);
        if (activate === true){
          //setTotalPrice(Number(12));
          setNewDiscount(0);
        }
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                description: "Payment",
                amount: {
                  currency_code: "USD",
                  value: totalPrice,
                },
            },
          ],
          }).then((orderID) => {
                setOrderID(orderID);
                Object.keys(cart).map(item => {
                  const json = {
                    "name": cart[item].name, 
                    "image": cart[item].image,
                    "price": cart[item].price,
                    "details": cart[item].details,
                    "ingredients": cart[item].ingredients,
                    "usage": cart[item].usage,
                    "size": cart[item].size,
                    "on_stock": parseInt(cart[item].on_stock) - parseInt(cart[item].quantities),
                    "discount": cart[item].discount,
                    "brand_id": cart[item].brand_id,
                    "category_id": cart[item].category_id,
                    "shades": cart[item].shades
                }

                if (cart[item].shade !== ""){
                    const newJson = {
                      "hex": cart[item].shade.hex, 
                      "product_id": cart[item].shade.product_id,
                      "quantities": cart[item].shade.quantities - parseInt(cart[item].quantities),
                    }

                  const requestOptions2 = {
                      method: 'PUT',
                      headers:{ 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                      body: JSON.stringify(newJson)
                  };
    
                  fetch(`http://localhost:3001/product/updateShade/${cart[item].shade._id}`,requestOptions2)
                  .then((res) => res.json())
                  .then((data) => {
                      if (data.success){
                        console.log("SHADE UPDATED SUCCESSFULLY!")
                      } else {
                          console.log("Incorrect data!")
                      }
                  })
                }
    
                const requestOptions = {
                    method: 'PUT',
                    headers:{ 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(json)
                };
    
                fetch(`http://localhost:3001/product/updateProduct/${cart[item]._id}`,requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success){
                      console.log("PRODUCT QUANTITIES SUCCESSFULLY UPDATED!")
                    } else {
                        console.log("Incorrect data!")
                    }
                  })
                })
                return orderID;
            });
          };

        const onApprove = async (data, actions) => {
            setCart([]);
            const json = {
              "name": user.name, 
              "surname": user.surname,
              "username": user.username,
              "email": user.email,
              "role": user.userRole,
              "purchasesNum": user.purchasesNum + 1,
            }

            if (activate === true){
                json["discount"] = 0;
            } else{
                json["discount"] = (Number(String(user.purchasesNum).slice(-1)) === 0) && (user.purchasesNum > 0) ? user.discount + user.purchasesNum : user.discount
            }

            if (extraDiscount > 0){
                fetch("http://localhost:3001/product/addUserDiscount", {
                    method: "POST",
                    body: JSON.stringify({
                        user_id: params.id,
                        discount_id: discountId
                    }),
                    headers: {"Content-type": "application/json;charset=UTF-8"}
                })
                .then((resp)=>resp.json())
                .then((data)=>{
                        console.log("Success!");
                })
                .catch((err)=>console.log(err));
                }
                const requestOptions = {
                    method: 'PUT',
                    headers:{ 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(json)
                };

                fetch(`http://localhost:3001/user/updateUser/${params.id}`,requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success){
                      console.log("S")
                    } else {
                        console.log("Incorrect data!")
                    }
                });

                fetch("http://localhost:3001/product/addShipping", {
                    method: "POST",
                    body: JSON.stringify({
                        user_id: params.id,
                        date: new Date().toLocaleString(),
                        status: "Unconfirmed",
                        total_price: totalPrice,
                        items: cart,
                        shipp: false
                    }),
                    headers: {"Content-type": "application/json;charset=UTF-8"}
                })
                .then((resp)=>resp.json())
                .then((data)=>{
                        console.log("Success!");
                });

              fetch("http://localhost:3001/product/sendEmail", {
                    method: "POST",
                    body: JSON.stringify({
                        to: userEmail,
                        subject: subject,
                        message: "Dear " + user.surname + "\nThe order has been successfully paid.\nYou can track your order \nDate:" + new Date().toLocaleString() + "\nBest wishes,\n\nYour Beauty team!"
                    }),
                    headers: {"Content-type": "application/json;charset=UTF-8"}
                })
                .then((resp)=>resp.json())
                .then((data)=>{
                    console.log("Mail send successfully!");
                })

            return actions.order.capture().then(function (details) {
                  const { payer } = details;
                  setSuccess(true);
            });
        };

      const onError = (data, actions) => {
          setErrorMessage("An Error occured with your payment ");
      };

      function checkCode(){
        currentCode.length > 0 ? 
        currentCode.map(async (item) => {
          if (item.code === discount){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
        
              const discountsList = await fetch(`http://localhost:3001/product/userDiscounts/${params.id}/${item._id}`, options);
              const discountsJson = await discountsList.json();
              if (discountsJson.length === 0){
                setExtraDiscount(item.value);
                setDiscountId(item._id);
              }else {
                setIsCorrect(false);
                setMessage("You have already used this code!");
              }
          }
        }) : setExtraDiscount(0);
      }

    useEffect(() => {
      async function getUser(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const userList = await fetch(`http://localhost:3001/user/user/${params.id}`, options);
        
        const userJson = await userList.json();
        setUser(userJson);
        setNewDiscount(userJson.discount);
        setUserEmail(userJson.email);
        setPassword(userJson.password);
    }

      addingPrice();
      getUser();
      getDiscounts();
    }, [cart, totalPrice, activate, extraDiscount, discount]);

    useEffect(() => {
        if (success) {
            alert("Payment successful!");
            setCart([]);
            console.log('Order successful . Your order id is--', orderID);
        }
    },[success]);

    return (
      <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
        <div className ="container">
          <div className="row  justify-content-center">
          <p style={{fontSize:"16px"}}><b><span style={{color:"#ff4dff"}}>Total product number:</span></b> {cart.length}</p> 
          <br />
          <p style={{fontSize:"16px"}}><b><span style={{color:"#ff4dff"}}>Total price: </span></b>{ Number(totalPrice).toFixed(2) } €</p><br/>
          <p style={{fontSize:"16px"}}><b><span style={{color:"#ff4dff"}}>You can use only one type of discount!<br/><span style={{color:"#ff4dff", fontSize:"12px", padding:"10px"}}>*Different discounts do not count.</span></span></b></p>
          <p style={{fontSize:"16px"}}><b><span style={{color:"#ff4dff"}}> Dicount code: </span></b><input type="text" placeholder="Type your dicount code" onChange={(e) => {setDiscount(e.target.value); checkCode();}}/><button className = "checkBtn" onClick={checkCode}>Check</button></p>
          { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
                       
          {user.discount && activate !== true > 0 ? (
            <><p>You have {user.discount}% extra discount. Do you want use it?      
                  <span style={{position:"relative", right:"-10px"}}><input type="radio" value="true" name="activate" onClick={onChangeValue} />   Yes</span>  
              </p>
            </>
          ):(
            <span></span>
          )
          }
          
            {cart.map(item => (
              <div className="col-4 p-4">
                <div className="text-center"><img src={process.env.PUBLIC_URL + "/images/" + item.image} height={250} style={{width:"auto"}}/></div>
                <p className="text-center" style={{fontSize:"16px", lineHeight:"80px"}}><b>{item.name}</b></p>
                <p className="text-center" style={{fontSize:"15px"}}>Price: {item.price} €</p>
                <p className="text-center" style={{fontSize:"15px"}}>Quantities: {item.quantities}</p>
                {item.shade !== "" ? 
                <p className="text-center" style={{fontSize:"15px"}}>Shade:<div className = "shadeHex" style={{background: item.shade.hex, width: "20px", height: "20px"}}></div></p> : 
                <p className="text-center" style={{fontSize:"15px"}}>Shade: universal</p>}
                <div className="text-center">
                    <button type="submit" className="btn m-1" style={{background:"#ffe6ff", color:"#ff1aff", fontSize:"25px"}} onClick={()=>increaseQuantity(item, item.shade)}><b>+</b></button> 
                    <button type="submit" className="btn m-1" style={{background:"#ffe6ff", color:"#ff1aff", fontSize:"25px"}} onClick={()=>reduceQuantity(item, item.shade)}><b>-</b></button>
                    <button type="submit" className="btn" style={{background:"#ffe6ff", color:"#ff1aff", fontSize:"25px"}} onClick={()=>removeFromCart(item, item.shade)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                      </svg>
                    </button>
              </div>
              <br/>
              </div>
              ))}
              {cart.length > 0 ?(
                <div className="text-center">
                    <button type="submit" className="btn m-1" style={{background:"#ff33ff", color:"#ffffff", fontSize:"22px", fontFamily: "Gill Sans Extrabold, sans-serif"}} onClick={() => setShow(true)}> Pay</button> 
                </div>) : (<p></p>)
              }
          </div>
          {show ? (
                    <PayPalButtons className="paypalbtn"
                        style={{ layout: "vertical", alignItems:"center", position:"relative", right:"20%"}}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                ) : null}
        </div>
      </PayPalScriptProvider>
    );
};

export default Cart;