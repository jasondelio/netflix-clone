import React, { useState } from "react";
import "./login-page.css"
import logo from './logo.svg';
import axios from 'axios';

const LoginPage = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handlerClicked = () => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const user = {
            username: userName,
            email: userName,
            password: password
        };
        const header = {
            headers:{
                'x-api-key': API_KEY
            }
        };

        axios.post(process.env.REACT_APP_USER_API_URL, user, header)
            .then(res => console.log("Login Success!"))
            .catch(err => console.log("Login Failed!"));
    }

    return (
        <div className="login-wrapper">
            <div className="login-background-wrapper">
                <div className="background-overlay"></div>
            </div>
            <img className="logo" src={logo} alt="logo"></img>
            <div className="sign-in-wrapper">
                <h1 className="sign-in-text">Sign in</h1>
                <ul className="no-bullets">
                    <li>
                        <input className="username-input" placeholder="Username or Email" onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li>
                        <input className="password-input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button className="sign-in-button" onClick={handlerClicked}>Sign in</button>
                    </li>
                    <li>
                        <p className="sign-up-paragraph">New to netflix? <span className="sign-up-text">Sign up Now</span></p>
                        
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LoginPage;