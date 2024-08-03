import React, { useEffect, useState } from "react";
import apiStore from "../services/store.services";
import { apiGiohang } from "../services/giohang.services"; // Nhập hàm apiGiohang từ file dịch vụ
import { Link } from "react-router-dom";
import HeaderApple from "./HeaderApple";
import classes from "./Header.module.css"
import FooterApple from "./FooterApple";


export default function Store() {
    const [taikhoan, setTaikhoan] = useState(JSON.parse(localStorage.getItem('maTaiKhoan')));
    const [prod, setProd] = useState([]);
    const [cart, setCart] = useState([]);
    const [Mess, setMessage] = useState(null);


    const onAddtoCartHandler = async (prod) => {
        const idx = cart.findIndex(item => item.maSanPham === prod.maSanPham);
        if (idx !== -1) {
            setMessage('Sản phẩm này đã tồn tại trong giỏ hàng. Cảnh báo: ' + prod.maSanPham);
            return;
        }

        const productToAdd = {
            soLuong: 1,
            tenSanPham: prod.tenSanPham,
            maSanPham: prod.maSanPham,
            maTaiKhoan: taikhoan.maTaiKhoan,
            tongGia: prod.gia,
            anh: prod.anh
        };

        try {
            const res = await apiGiohang(productToAdd);
            console.log(res);
            if (res) {
                const updatedCart = [...cart, productToAdd];
                setCart(updatedCart);
                setMessage(null);
            } else {
                setMessage("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Lỗi thêm giỏ hàng:", error);
            setMessage("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.");
        }
    };

    useEffect(() => { console.log(cart) }, [cart]);

    useEffect(() => {
        async function fetchData() {
            try {
                const prod = await apiStore();
                setProd(prod);
            } catch (error) {
                console.error('Lỗi kết nối giỏ hàng:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className={classes.HeaderStore}>
                <HeaderApple soluong={cart.length} />
            </div>
            <div className="container-fluid product-list">
                <h2>Cửa hàng</h2>
                <div className="row">
                    <div className="container">
                        <div className="row">
                            {prod.map((prod, idx) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={idx}>
                                    <div className="card h-100 shadow-sm rounded">
                                        <img
                                            src={'https://localhost:44375/' + prod.anh}
                                            className="card-img-top rounded-top"
                                            style={{ width: '100%' }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{prod.tenSanPham}</h5>
                                            <p className="card-text text-danger font-weight-bold">{prod.gia} VNĐ</p>
                                            <div className="mt-auto">
                                                <Link to={'/detail/' + prod.maSanPham} className="btn btn-dark btn-block rounded" style={{ backgroundColor: 'black' }}>Chi tiết</Link>
                                                <button onClick={() => onAddtoCartHandler(prod)} className="btn btn-dark btn-block rounded" style={{ backgroundColor: 'black' }}>Thêm vào giỏ hàng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {Mess && <div className="alert alert-warning" role="alert">{Mess}</div>}
            </div>
            <FooterApple />
        </div>
    );

}
