import React, { useEffect, useState } from "react";
import apiDetail from "../services/deatil.services";
import FooterApple from "./FooterApple";
import { useParams } from "react-router-dom";

export default function Detail() {
    const {maloai} = useParams();
    const [prod, setProd] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await apiDetail(maloai);
                console.log(data);
                if (data) {
                    setProd(data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
        if (maloai) {
            fetchData();
        }
    }, [maloai]);

    return (
        <div>
            
            <main className="main-content" style={{ marginBottom: '15%' }}>
                <div className="container-fluid product-list">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <h1 className="text-center mb-4">Chi tiết sản phẩm</h1>
                                <div className="col-md-6">
                                    <img src={'https://localhost:44375/' + prod.anh} alt="Product Image" className="img-fluid" style={{ width: '80%' }} />
                                </div>
                                <div className="col-md-6">
                                    <form>
                                        <div className="product-info">
                                            <h2>{prod.tenSanPham}</h2>
                                            <p><strong>Mô tả:</strong> {prod.mota}</p>
                                            <p><strong>Giá tiền:</strong>{prod.gia} VNĐ</p>
                                            <p><strong>Màu sắc:</strong>{prod.mau} </p>
                                            <p><strong>Kích cỡ:</strong> {prod.kichco}</p>
                                            <button className="btn btn-primary" style={{ backgroundColor: 'black', color: '#fff', fontWeight: 'bold', borderRadius: '5px' }} type="submit">Thêm vào giỏ hàng</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
