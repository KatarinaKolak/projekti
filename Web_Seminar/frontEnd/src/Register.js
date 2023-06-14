import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Register = () =>{
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [message, setMessage] = useState("");

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangePassword2(e) {
        setPassword2(e.target.value);
    }
    
    function onChangeName(e) {
        setName(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
    
        if ((password === "") || (password2 === "") || (name == "") || (email === "")){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }
        if (password !== password2) {
            setIsCorrect(false);
            setMessage("Passwords do not match");
            return;
        }

        if (name.length < 6){
            setIsCorrect(false);
            setMessage("Name must contain minimum 6 characters");
            return;
        }

        if(!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(email))){
            setIsCorrect(false);
            setMessage("Incorrect email");
            return;
        }
        
        if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password))){
            setIsCorrect(false);
            setMessage("Password must have minimum 8 characters, at least one letter and one number");
            return;
        }

        fetch("http://localhost:5000/user/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                "role": "user"
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
                console.log("Success!");
                navigate("/login");
        })
        .catch((err)=>console.log(err));
    }

    return(
    <div className="container">
        <form onSubmit={(e) => {handleLogin(e);}}>
        <label htmlFor="name">Name</label>
            <input
                type="text"
                value={name} className="form-control"
                onChange={onChangeName}
                onBlur={onChangeName}
                required
            ></input><br/>

            <label htmlFor="email">Email</label>
            <input
                type="text"
                value={email} className="form-control"
                onChange={onChangeEmail}
                onBlur={onChangeEmail}
                required
            ></input><br/>

            <label htmlFor="password">Password</label>
            <input
                type="password"
                value={password}
                onChange={onChangePassword} className="form-control"
                onBlur={onChangePassword}
                required
            ></input><br/>

            <label htmlFor="repeat password">Repeat Password</label>
            <input
                type="password" className="form-control"
                value={password2}
                onChange={onChangePassword2}
                onBlur={onChangePassword2}
                required
            ></input><br/><br/>

            <button type="submit" className="btn btn-success btn-sm">Register</button><br/><br/>
            { !isCorrect ? (<div class="alert alert-danger" role="alert">Error: { message }!</div>) : null }
        
        </form>
    </div>
    )
};
export default Register;