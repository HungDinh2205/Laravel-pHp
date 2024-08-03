import React,{ useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./Header.module.css";
import { apiGetLoaiById } from "../services/loai.sevices";
import apiTaiKhoan from "../services/taikhoan.services";

export default function HeaderApple({ soluong }) {
    const { maloai } = useParams(); // Lấy giá trị từ URL
    const [prod, setProd] = useState({});
    const [userCart, setUserCart] = useState([]);
    const [cart, setCart] = useState([]);
    const [Info,setInfo] = useState([]);
    const maTaiKhoan = JSON.parse(localStorage.getItem('maTaiKhoan'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prod = await apiGetLoaiById(maloai);
                setProd(prod); 
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchData();
    }, [maloai]);

    useEffect(() => {
        const fetchUserInfo = async (maTaiKhoan) => {
            try {
                const Info = await apiTaiKhoan(maTaiKhoan);
                setInfo(Info); 
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        fetchUserInfo(maTaiKhoan); 
    }, [maTaiKhoan]);

    return (
        <header className="hero-header">
            <div className="container">
                <nav>
                    <ul className={classes.navbar}>
                        <li className="logo" ><ion-icon name="logo-apple"></ion-icon></li>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/danhmuc/10">Mac</Link></li>
                        <li><Link to="/danhmuc/9">iPad</Link></li>
                        <li><Link to="/danhmuc/1">Watch</Link></li>
                        <li><Link to="/danhmuc/8">iPhone</Link></li>
                        <li><Link to="/danhmuc/2">TV</Link></li>
                        <li><Link to="/danhmuc/3">Card</Link></li>
                        <li><Link to="/danhmuc/4">Vision</Link></li>
                        <li><Link to="/danhmuc/5">Loa</Link></li>
                        <li><Link to="/danhmuc/6">MagSafe</Link></li>
                        <li><Link to="/danhmuc/7">AirPod</Link></li>
                        <li><Link to="/store">Store</Link></li>
                        <li><Link to={'/hoadon/' + userCart.maTaiKhoan}>Bill</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li>
                            <Link to={'/giohang/' + cart.maTaiKhoan}>
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                <sup>{soluong}</sup>
                            </Link>
                        </li>
                        {Info && (
                            <li><Link to={Info.maTaiKhoan}>My: {Info.username}</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
