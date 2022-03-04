import React, { useState } from "react";
import "./login-page.css";
import logo from './logo.svg';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

const LoginPage = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidUser, setIsValidUser] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlerSubmit = () => {
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

        axios.post(process.env.REACT_APP_USER_LOGIN_API_URL, user, header)
            .then(res => {
                localStorage.setItem('ACCESS_TOKEN', res.data.accessToken);
                localStorage.setItem('REFRESH_TOKEN', res.data.refreshToken);
                setIsValidUser(true);
                dispatch({type : 'SIGN_IN'});
                console.log("test");
                navigate('/home');
            })
            .catch(err => setIsValidUser(false));
    }

    return (
        <div className="login-wrapper">
            <div className="login-background-wrapper">
                <div className="background-overlay"></div>
            </div>
            <img className="logo" src={logo} alt="logo"></img>
            <div className="sign-in-wrapper">
                <h1 className="sign-in-text">Sign in</h1>
                {!isValidUser && <div className="error-message">Sorry, but your credentials do not match <br></br>our records. Please try again or <Link to="/" className="new-account-text" >create <br></br>a new account.</Link></div>}
                <ul className="no-bullets">
                    <li>
                        <input className="username-input" placeholder="Username or Email" onChange={(e) => setUsername(e.target.value)}></input>
                    </li>
                    <li>
                        <input className="password-input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button className="sign-in-button" onClick={handlerSubmit}>Sign in</button>
                    </li>
                    <li>
                        <p className="sign-up-paragraph">New to netflix? <Link to="/" className="sign-up-text">Sign up Now</Link></p>
                        
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default LoginPage;