import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const UpdateShipping = () => {
    const params = useParams();
    let navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [shipping, setShipping] = useState("");
    const allStatus = ["Unconfirmed", "Confirmed", "Shipped", "Delivered"]
    
    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/login'; 
        }
    }

    async function getShipping(){
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const shippingList = await fetch(`http://localhost:3001/product/shipping/${params.id}`, options);
        
        const shippingJson = await shippingList.json();
        setShipping(shippingJson);
    }

    function setShippingDetails(e){
        e.preventDefault();

        const json = {
            "user_id":shipping.user_id,
            "date":shipping.date,
            "status":status,
            "total_price":shipping.total_price,
            "items":shipping.items,
            "shipp": false
        }

        const requestOptions = {
            method: 'PUT',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch(`http://localhost:3001/product/updateShipping/${params.id}`,requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                navigate("/");
            } else {
                console.log("Incorrect data!")
            }
        })
    }

    return (
        <div className="outer-add">
            <div className="add">
                <div className="add-body">
                    <header>Update shipping</header><br/>
                    <form onSubmit={(e) => {setShippingDetails(e);}}>
                    <div className='custom-select'>
                            <select className="m-2" value={status} onChange={(e) => {setStatus(e.target.value)}} required>
                            <option>All</option>
                            { allStatus.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        
                            </select>
                        </div>
                    <div className="add-btn">
                            <input type="submit" value="Add" /><br/><br/>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateShipping;
