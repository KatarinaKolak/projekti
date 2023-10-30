import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserShipping = () => {
    let navigate = useNavigate();
    const params = useParams();

    const [shippings, setShippings] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState("");
    const [json, setJson] = useState({});
    const [shipping, setShipping] = useState("");

    async function setShippingDetails(id){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const shippingList = await fetch(`http://localhost:3001/product/shipping/${id}`, options);
        
        const shippingJson = await shippingList.json();
        setShipping(shippingJson);

        const json = {
            "user_id":shipping.user_id,
            "date":shipping.date,
            "status":shipping.status,
            "total_price":shipping.total_price,
            "items":shipping.items,
            "shipp": true
        }

        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:3001/product/updateShipping/${id}`,requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                navigate("/");
            } else {
                console.log("Incorrect data!")
            }
        })
    }

    function getFloat(value) {
        return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
    }

    function filterArray() {
        var array = []
        shippings.map((item) => {
                item.items.map((it) => {
                    products.map((prod) => {
                        if (prod._id === it){
                            array.push(prod);
                        }
                    })
                })
            json[item._id] = array;
            array = [];
        })
        return json;
    }

    useEffect(() => {
        async function getProducts (){
            const productList = await fetch("http://127.0.0.1:3001/product/products");
            const productJson = await productList.json();
            
            setProducts(productJson.products);   
        }

        async function getShipping(){
            const options = {headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
            }};
            const shippingList = await fetch(`http://localhost:3001/product/shippingByUser/${params.id}`, options);
            
            const shippingJson = await shippingList.json();
            setShippings(shippingJson);
        }

        
        getShipping();
        getProducts();
        filterArray();
    }, [shippings, shipping]);

    return (
        shippings.map((item, index) => {
            if (item.shipp === false){
                return(
                    <div key={index} className="shipp">
                        <div className="shippDetails">
                            <p><span style={{color:"#ff1aff"}}>Shipping status</span><br/> <span style={{margin:"10px"}}>{item.status}</span></p>
                            <p><span style={{color:"#ff1aff"}}>Ordered date</span><br/> <span style={{margin:"10px"}}>{(new Date(item.date)).toLocaleDateString()}</span></p>
                            <p><span style={{color:"#ff1aff"}}>Total order price:</span><br/>  <span style={{margin:"10px"}}>{item.total_price} €</span></p>
                                           
                        </div>
                        <div className="row justify-content-center">
                        {Object.entries(json).map(([key, value]) => {
                            var i = 0;
                            if (key === item._id){
                               return value.map((i) => {
                                return(
                                    
                                    <div className="col-3 p-4"><div className="text-center"><img src={process.env.PUBLIC_URL + "/images/" + i.image} height={100} style={{ width: "auto" }} /></div><p className="text-center" style={{ fontSize: "14px", lineHeight: "20px" }}><b>{i.name}</b></p><p className="text-center" style={{ fontSize: "14px" }}>Price: {getFloat(i.price)} €</p></div>
                                    
                                )
                               })
                            } else {
                                <span></span>
                            }
                        })
                        }
                        </div>
                        {item.status === "Shipped" ? (
                            <span>
                                <button className="shippBtn" onClick={() => setShippingDetails(item._id)}>Confirm receipt</button>
                            </span>
                        ):(<span></span>)
                        }
                      <br/>
                </div>)
            }
        })
    )
}

export default UserShipping;