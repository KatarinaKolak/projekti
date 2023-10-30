import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () =>{
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
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

    function onChangeSurname(e) {
        setSurname(e.target.value);
    }

    function onChangeUsername(e) {
        setUsername(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
    
        if ((password === "") || (password2 === "") || (name === "") || (email === "") || (username === "")){
            setIsCorrect(false);
            setMessage("Required input is empty!");
            return;
        }
        if (password !== password2) {
            setIsCorrect(false);
            setMessage("Passwords do not match");
            return;
        }

        if (name.length < 2){
            setIsCorrect(false);
            setMessage("Name must contain minimum 2 characters");
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

        fetch("http://localhost:3001/user/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                surname: surname,
                username: username,
                "role": "user",
                purchasesNum: 0,
                discount: 0
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
        <><br /><div className="outer">

            <div className="form">
                <div className="form-body">
                    <header>Signup</header><br />

                    <form onSubmit={(e) => { handleLogin(e); } }>
                        <div className="name">
                            <input
                                type="text"
                                className="form__input"
                                value={name}
                                onChange={onChangeName}
                                onBlur={onChangeName}
                                placeholder="Name"
                                required
                            ></input><br /><br />
                        </div>
                        <div className="surname">
                            <input
                                type="text"
                                className="form__input"
                                value={surname}
                                onChange={onChangeSurname}
                                onBlur={onChangeSurname}
                                placeholder="Surname"
                                required
                            ></input>
                        </div><br />
                        <div className="username">
                            <input
                                type="text"
                                value={username} className="form__input"
                                onChange={onChangeUsername}
                                onBlur={onChangeUsername}
                                placeholder="Username"
                                required
                            ></input>
                        </div><br />
                        <div className="email">
                            <input
                                type="text"
                                value={email} className="form__input"
                                onChange={onChangeEmail}
                                onBlur={onChangeEmail}
                                placeholder="Email"
                                required
                            ></input>
                        </div><br />
                        <div className="password">
                            <input
                                type="password"
                                value={password}
                                onChange={onChangePassword} className="form__input"
                                onBlur={onChangePassword}
                                placeholder="Password"
                                required
                            ></input>
                        </div><br />
                        <div className="rpassword">
                            <input
                                type="password" className="form__input"
                                value={password2}
                                onChange={onChangePassword2}
                                onBlur={onChangePassword2}
                                placeholder="Repeat password"
                                required
                            ></input>
                        </div><br /><br />

                        <div className="register">
                        <input type="submit" value="Register" /><br /><br />
                        {!isCorrect ? (<div class="alert alert-danger" role="alert">Error: {message}!</div>) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div></>
    )
};
export default Register;