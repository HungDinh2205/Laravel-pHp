import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiGetLoaiById } from '../services/loai.sevices';

export default function Danhmuc() {
    const { maloai } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiGetLoaiById(maloai); 
                setProducts(res);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [maloai]);

    return (
        <div className="container" >
            <main className="main-content" style={{marginBottom: '10%'}}>
                <div className="container-fluid product-list">
                    <div className="row">
                        <div className="container">
                            <div className="row">
                                <h2>Danh mục sản phẩm{products.tenloai}</h2>
                                <div className="row">
                                    {products.map(product => (
                                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                            <div className="card h-100 shadow-sm rounded">
                                                <img
                                                    src={`https://localhost:44375/${product.anh}`}
                                                    className="card-img-top rounded-top"
                                                    alt="Ảnh sản phẩm"
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{product.tenSanPham}</h5>
                                                    <p className="card-text text-danger font-weight-bold">{product.gia} VNĐ</p>
                                                    <div className="mt-auto">
                                                        <Link
                                                            to={`/detail/${product.maSanPham}`}
                                                            className="btn btn-dark btn-block rounded"
                                                            style={{ backgroundColor: 'black' }}
                                                        >
                                                            Chi tiết
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
