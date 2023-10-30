import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
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
            setMessage("Required input field category name is empty!");
            return;
        }

        const json = {
            "type": name
        }

        const requestOptions = {
            method: 'POST',
            headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(json)
        };

        fetch("http://localhost:3001/product/addCategory", {
            method: "POST",
            body: JSON.stringify({
                type: name
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
                    <header>New category</header><br/>
                    <form onSubmit={(e) => {addFormData(e);}}>
                        <div className="name">
                        <input type="text" value = {name} className="form-control" id="name" placeholder="Enter Category Name" onChange={(e) => setName(e.target.value)} required /><br/>
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

export default AddCategory;