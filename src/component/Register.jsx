import apiRegister from '../services/register.services';
import React, { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
            email
        };

        try {
            const result = await apiRegister(user);
            toast.success('Đăng ký thành công rồi nè');
        } catch (error) {
            toast.error('Úi! không đăng ký được rồi, thử lại nhé ' + error.message);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: 'black', color: 'white', textAlign: 'center'}}>Đăng ký</div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label htmlFor="username">Tài khoản:</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        name="username"
                                        className="form-control"
                                        id="username"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mật khẩu:</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}