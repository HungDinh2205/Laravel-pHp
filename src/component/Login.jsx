import apiLogin from "../services/login.services";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
    
        try {
            const userData = await apiLogin(user);
            
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('maTaiKhoan', userData.maTaiKhoan); 
            if (username === 'admin' && password === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            toast.error('Đăng nhập lỗi rùi nè! ' + error.message);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-4 login-container">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="Username" className="form-control" onChange={handleUsernameChange} id="Username" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="Password" className="form-control" onChange={handlePasswordChange} id="Password" placeholder="Password" />
                        </div>
                        <button className="btn btn-primary btn-block" style={{ backgroundColor: 'black' }} type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}