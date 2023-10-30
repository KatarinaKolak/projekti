import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DiscountCode = () => {
    const [code, setCode] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [value, setValue] = useState(0);
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    let navigate = useNavigate();
    
    if (localStorage.getItem("token") === null){
        window.location.href = '/login'; 
    } else {
        const role= JSON.parse(localStorage.getItem("user")).role;
        if (role !== "admin"){
            window.location.href = '/login'; 
        }
    }

    function setCodeLocal(e){
        e.preventDefault();

        if (code === ""){
            setIsCorrect(false);
            setMessage("Required input field name is empty!");
            return;
        }

        fetch("http://localhost:3001/product/addDiscount", {
            method: "POST",
            body: JSON.stringify({
                code: code,
                value: value,
                expire: startDate
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
                    <header>Discount code</header><br/>
                    <form onSubmit={(e) => {setCodeLocal(e);}}>
                    <div className="code">
                        <label style={{color: "#ff4dff"}}>Enter new discount code</label>
                        <input
                            type="text"
                            value={code} className="form-control"
                            onChange={(e) => setCode(e.target.value)}
                            required
                        ></input>
                    </div><br/>
                    <div className="value">
                        <label style={{color: "#ff4dff"}}>Enter discount value (%)</label>
                        <input
                            type="number" min="0"
                            value={value} className="form-control"
                            onChange={(e) => setValue(e.target.value)}
                            required
                        ></input>
                    </div><br/>
                    <div className="date">
                    <label style={{color: "#ff4dff"}}>Expiration date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
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

export default DiscountCode;
