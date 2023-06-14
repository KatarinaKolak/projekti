import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentUser from "./CurrentUser";

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(CurrentUser);
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);

    let navigate = useNavigate();

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    
    async function handleLogin(e) {
        e.preventDefault();
    
        fetch("http://localhost:5000/user/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if (data.accessToken) {
                setIsCorrect(true);
                localStorage.setItem("token", data.accessToken);
                const myuser = JSON.stringify({
                    id: data.user_id,
                    name: data.user_name,
                    role: data.user_role
                });
                localStorage.setItem("user", myuser);
                let myuse = JSON.parse(localStorage.getItem("user"));
                setUser(myuse);
                navigate("/");
            } else {
                setIsCorrect(false);
                setMessage(data.message);
                console.log("RESPONSE", data.message);
            }
        })
        //.catch((err)=>console.log(err));
    }

    return(
    <div className="container">
        <form onSubmit={(e) => {handleLogin(e);}}>
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
                value={password} className="form-control"
                onChange={onChangePassword}
                onBlur={onChangePassword}
                required
            ></input><br/><br/>

            <button type="submit" className="btn btn-success btn-sm">Login</button><br/><br/>
            { !isCorrect ? (<div class="alert alert-danger" role="alert">User doesn't exist. Incorrect { message }.</div>) : null }
        </form>
    </div>
    )
};
export default Login;