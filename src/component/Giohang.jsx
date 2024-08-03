import React, { useState, useEffect } from 'react';
import apiGioHangIdUser from "../services/cartuser.services";
import { apiHoaDonIdUser } from '../services/hoadon.services';
import { apiHoaDon } from '../services/hoadon.services';
import { apiXoaGioHang } from "../services/giohang.services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


export default function Giohang() {
    const [prod, setProd] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const maTaiKhoan = JSON.parse(localStorage.getItem('maTaiKhoan'));
    const [tongtien, setTongTien] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        tenKhachHang: '',
        diaChi: '',
        soDienThoai: '',
    });

    const tinhtongtien = (userCart) => {
        const tongtien = userCart.reduce((tt, item) => tt + (item.tongGia * item.soLuong), 0);
        setTongTien(tongtien);
    };

    const thaydoisoluong = (item, sl) => {
        const idx = userCart.indexOf(item);
        const arr = [...userCart];
        arr[idx].soLuong += sl;
        if (arr[idx].soLuong < 1) arr[idx].soLuong = 1;
        setUserCart([...arr]);
        tinhtongtien(arr);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const userCartData = await apiGioHangIdUser(maTaiKhoan);
                setUserCart(userCartData);
                tinhtongtien(userCartData);
            } catch (error) {
                console.error('Error fetching user cart:', error);
            }
        }

        fetchData();
    }, [maTaiKhoan]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const onAddHoaDon = async () => {
        try {
            const HoaDonPresent = await apiHoaDonIdUser(maTaiKhoan);
            const IdProductsStill = new Set(HoaDonPresent.map(hoaDon => hoaDon.maSanPham));

            for (let i = 0; i < userCart.length; i++) {
                const item = userCart[i];

                if (IdProductsStill.has(item.maSanPham)) {
                    console.log(`Sản phẩm với mã ${item.maSanPham} đã tồn tại trong hóa đơn.`);
                    continue;
                }
                const HoaDontoAdd = {
                    tongGia: item.tongGia * item.soLuong,
                    soLuong: item.soLuong,
                    maTaiKhoan: maTaiKhoan,
                    maSanPham: item.maSanPham,
                    tenKhachHang: customerInfo.tenKhachHang,
                    diaChi: customerInfo.diaChi,
                    sdt: customerInfo.sdt,
                };
                try {
                    const res = await apiHoaDon(HoaDontoAdd);
                    console.log(res);
                    IdProductsStill.add(item.maSanPham);
                } catch (error) {
                    console.error(`Lỗi khi thêm sản phẩm với mã ${item.maSanPham}:`, error);
                }
            }
        } catch (error) {
            console.error('Error fetching existing hoa don:', error);
        }
    };


    const onDelete = async (maGioHang) => {
        try {
            const res = await apiXoaGioHang(maGioHang);
            console.log('Delete successful', res);
            toast.success('Đã xoá sản phẩm thành công')
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <main className="main-content" style={{ marginBottom: '5%' }}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        <h2>Giỏ hàng của bạn</h2>
                        {userCart.length > 0 ? (
                            userCart.map((prod, index) => (
                                <div className="card mb-3" key={index}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={'https://localhost:44375/' + prod.anh} className="card-img" alt="Product Image" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.tenSanPham}</h5>
                                                <p className="card-text"><small className="text-muted">{prod.tongGia} VNĐ</small></p>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <button
                                                            onClick={() => thaydoisoluong(prod, -1)}
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            style={{
                                                                backgroundColor: 'black',
                                                                color: '#fff',
                                                                fontSize: '10px',
                                                                padding: '10px 20px',
                                                                border: '1px solid black',
                                                                width: '30px'
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        aria-label="Quantity"
                                                        value={prod.soLuong}
                                                        readOnly
                                                        style={{
                                                            textAlign: 'center',
                                                            fontSize: '15px',
                                                            padding: '10px',
                                                            border: '1px solid black',
                                                            width: '30px'
                                                        }}
                                                    />
                                                    <div className="input-group-append">
                                                        <button
                                                            onClick={() => thaydoisoluong(prod, 1)}
                                                            className="btn btn-outline-secondary"
                                                            type="button"
                                                            style={{
                                                                backgroundColor: 'black',
                                                                color: '#fff',
                                                                fontSize: '10px',
                                                                padding: '10px 20px',
                                                                border: '1px solid black'
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="card-text">{prod.tongGia * prod.soLuong} VNĐ</p>
                                                <button onClick={() => onDelete(prod.maGioHang)} className="btn btn-danger" style={{backgroundColor: 'red'}}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Giỏ hàng của bạn trống</p>
                        )}
                    </div>
                    <div className="col-md-4">
                        <h2>Thông tin</h2>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="tenKhachHang">Tên khách hàng:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tenKhachHang"
                                        name="tenKhachHang"
                                        value={customerInfo.tenKhachHang}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="diaChi">Địa chỉ giao hàng:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="diaChi"
                                        name="diaChi"
                                        value={customerInfo.diaChi}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="soDienThoai">Số điện thoại:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="soDienThoai"
                                        name="sdt"
                                        value={customerInfo.sdt}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between">
                                <strong>Tổng tiền giỏ hàng: {tongtien} VNĐ</strong>
                            </li>
                        </ul>
                        <button onClick={onAddHoaDon} className="btn btn-primary btn-lg btn-block">Hoá đơn</button>
                        <button  className="btn btn-primary btn-lg btn-block">Đóng</button>
                    </div>
                </div>
            </div>
        </main>

    )
}
