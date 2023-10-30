import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const AddShade = () => {
    const params = useParams();
    let navigate = useNavigate();
    const [quantities, setQuantities] = useState(0);
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] =  useState("");
    const [color, setColor] = useColor();
    
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

        fetch("http://localhost:3001/product/addShade", {
            method: "POST",
            body: JSON.stringify({
                hex: color["hex"],
                product_id: params.id,
                quantities: quantities
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
                    <header>New shade</header><br/>
                    <form >
                        <div>
                            <ColorPicker width={456} height={228} color={color} onChange={setColor} value={color}/>
                        </div>
                        <div>
                            <input type="number"  className="form-control" id="quantities" placeholder="Enter Product Quantities" onChange={(e) => setQuantities(e.target.value)} /><br />
                        </div>
                        <div className="add-btn">
                            <input type="submit" value="Save" onClick={(e) => { addFormData(e); } } /><br /><br />
                                {!isCorrect ? (<div class="alert alert-danger" role="alert">Error: {message}!</div>) : null}
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddShade;