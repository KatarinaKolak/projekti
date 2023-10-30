import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] =  useState("");

    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/'; 
        }
    }

    function addFormData(e){
        e.preventDefault();

        if ((name === "")){
            setIsCorrect(false);
            setMessage("Required input field brand name is empty!");
            return;
        }

        let formatted = image.split("\\");

        fetch("http://localhost:3001/product/addBrand", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                image: formatted[2],
                address: address,
                details: details
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
                console.log("Success!");
                navigate("/");
        })
        .catch((err)=>console.log(err));
    }
    
    return (
        <div className="outer-add">
            <div className="add">
                <div className="add-body">
                    <header>New brand</header><br/>
                    <form onSubmit={(e) => {addFormData(e);}}>
                        <div className="name">
                            <input type="text" value = {name} className="form-control" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} required /><br/>
                        </div>
                        <div className="address">
                            <input type="text" value = {address} className="form-control" id="address" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} /><br/>
                        </div>
                        <div className="name">
                            <textarea  rows="4" cols="50" type="text" value = {details} className="form-control" id="details" placeholder="Enter Details" onChange={(e) => setDetails(e.target.value)} /><br/>
                        </div>
                        <div className="image">
                            <label style={{color: "#ff4dff"}}>Choose image:</label><br/>
                            <input type="file" style={{border:"none", color: "#ff4dff"}} value = {image} className="form-control" id="image" placeholder="Enter Image" onChange={(e) => setImage(e.target.value)} /><br/>
                        </div>
                        <div className="add-btn">
                            <input type="submit" value="Add" /><br/><br/>
                            { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBrand;