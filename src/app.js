import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './login-page';
import HomePage from './home-page';
import { useSelector, useDispatch } from "react-redux";
import decode from 'jwt-decode';
import axios from 'axios';
import React, { useEffect } from 'react';

const App = () => {
    const dispatch = useDispatch();

    const userState = useSelector(state => state.isLogged);

    useEffect(() => 
    {
        if(localStorage.getItem('ACCESS_TOKEN') == null || localStorage.getItem('REFRESH_TOKEN') == null){
            console.log("test")
            dispatch({type : 'SIGN_OUT'});
        }
    
        else{
            const decodedToken = decode(localStorage.getItem('ACCESS_TOKEN'));
            let currentDate = new Date();
    
            console.log("time", decodedToken.exp * 1000 < currentDate.getTime())
            if(decodedToken.exp * 1000 < currentDate.getTime()){
                const API_KEY = process.env.REACT_APP_API_KEY;
                
                const refreshToken = {
                    token : localStorage.getItem('REFRESH_TOKEN')
                };
    
                const header = {
                    headers:{
                        'x-api-key': API_KEY
                    }
                };
    
                axios.post(process.env.REACT_APP_REFRESH_TOKEN_API_URL, refreshToken, header)
                    .then(res => {
                        localStorage.setItem('ACCESS_TOKEN', res.data.accessToken);
                        console.log(res.data);
                        dispatch({type : 'SIGN_IN'});
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch({type : 'SIGN_OUT'});
                    });
            }

            
            else{
                dispatch({type : "SIGN_IN"});
            }
        }
    }, [dispatch]); 

    return(
        <Router>
            <Routes>
                <Route exact path = "/login" element={userState ? <Navigate to="/home"/> : <LoginPage/>}/>
                <Route exact path = "/home" element={userState ? <HomePage/> : <Navigate to="/login"/>}/>
                <Route exact path="/" element={userState ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
}

export default App;