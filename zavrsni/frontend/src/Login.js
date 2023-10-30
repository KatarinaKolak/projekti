import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    
    async function handleLogin(e) {
        e.preventDefault();
    
        fetch("http://localhost:3001/user/login", {
            method: "POST",
            body: JSON.stringify({
                username: email,
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
                window.location.href = '/'; 
            } else {
                setIsCorrect(false);
                setMessage(data.message);
            }
        })
    }

    return(
    <div className="outer">
        <div className="form">
            <div className="form-body">
                <header>Sign in</header><br/>
                    <form onSubmit={(e) => {handleLogin(e);}}>
                        <div className="email">
                        <input
                            type="text"
                            value={email} className="form-control"
                            onChange={onChangeEmail}
                            onBlur={onChangeEmail}
                            placeholder="Username"
                            required
                        ></input>
                        </div><br/>
                        <div className="password">
                        <input
                            type="password"
                            value={password} className="form-control"
                            onChange={onChangePassword}
                            onBlur={onChangePassword}
                            placeholder="Password"
                            required
                        ></input>
                        </div><br/><br/>
                        <div className="login">
                        <input type="submit" value="Login" /><br/><br/>
                        { !isCorrect ? (<div class="alert alert-danger" role="alert">User doesn't exist. Incorrect { message }.</div>) : null }
                        </div>        
                    </form>
            </div>
        </div>
    </div>
    )
};
export default Login;