import React, { useEffect, useState } from 'react';
import { apiHoaDonIdUser } from "../services/hoadon.services"
import { Link } from 'react-router-dom';

export default function Hoadon() {
    const [userCart, setUserCart] = useState([]);
    const maTaiKhoan = JSON.parse(localStorage.getItem('maTaiKhoan'));

    useEffect(() => {
        async function fetchData() {
            try {
                const userCartData = await apiHoaDonIdUser(maTaiKhoan);
                setUserCart(userCartData);
            } catch (error) {
                console.error('Error fetching user cart:', error);
            }
        }

        fetchData();

    }, [maTaiKhoan]);

    const calculateTotalPrice = () => {
        return userCart.reduce((total, prod) => total + prod.tongGia * prod.soLuong, 0);
    };

    const calculateTotalQuantity = () => {
        return userCart.reduce((total, prod) => total + prod.soLuong, 0);
    };

    return (
        <main className="main-content" style={{ marginBottom: '15%' }}>
            <div className="container mt-5">
                <h2>Hóa đơn của bạn</h2>
                {userCart.length > 0 ? (
                    <>
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Tên khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Tổng giá (VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userCart.map((item, prod) => (
                                    <tr key={item.maHoaDon}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={'https://localhost:44375/' + item.anh}
                                                    alt="Product Image"
                                                    style={{ width: '50px', marginRight: '10px' }}
                                                />

                                            </div>
                                        </td>
                                        <td>{item.tenSanPham}</td>
                                        <td>{item.soLuong}</td>
                                        <td>{item.tenKhachHang}</td>
                                        <td>{item.sdt}</td>
                                        <td>{item.diaChi}</td>
                                        <td>{item.tongGia * item.soLuong}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="row mt-4">
                            <div className="col-md-8">
                                <h3>Tổng kết</h3>
                                <p><strong>Tổng số lượng:</strong> {calculateTotalQuantity()}</p>
                                <p><strong>Tổng tiền:</strong> {calculateTotalPrice()} VNĐ</p>
                            </div>
                            <div className="col-md-4">
                                <Link to="/store" className="btn btn-secondary btn-lg btn-block mt-2">Tiếp tục mua sắm</Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Hoá đơn của bạn trống.</p>
                )}
            </div>
        </main>

    );
};

