import { apiGetAll, apiCreate, apiDelete, apiUpdate, apiCreateFormData, apiUpdateFormData } from "../services/admin.sevices";
import { apiGetLoai, apiGetLoaiById } from "../services/loai.sevices";
import "./DasboardPage.css";
import React, { useState, useEffect } from 'react';
import {Link, useParams } from "react-router-dom";
import {
    ProductOutlined,
    ManOutlined,
    MenuFoldOutlined,
    AppleOutlined,
    CreditCardOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import axios from "axios";
import {
    Button, Layout, Menu, Form, Input, Modal, theme, Select, Upload,
    Row, Col, Avatar, Popconfirm, Table
} from 'antd';
const { Option } = Select;

export default function DashboardPage() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();
    var { maloai } = useParams();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await apiGetAll();
                setData(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchData();
    });

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await apiGetLoai();
                console.log('API response:', res); // Log kết quả trả về từ API
                setCategories(res);
                console.log('Categories set:', res); // Log sau khi setCategories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, []);

    const getLoaiName = (maloai) => {
        const loai = categories.find(type => type.maloai === maloai);
        return loai ? loai.tenloai : 'Không xác định';
    };

    const onCreate = async (values) => {
        try {
            console.log(values);
            const formData = new FormData();
            formData.append("tenSanPham", values.tenSanPham);
            formData.append("gia", values.gia);
            formData.append("soLuong", values.soLuong);
            formData.append("maloai", values.maloai);
            formData.append("anh", "Đây là ảnh");
            formData.append("mota", values.mota);
            formData.append("mau", values.mau);
            formData.append("kichco", values.kichco);
            formData.append("anhFile", values.anhFile.file);
            const response = await apiCreateFormData(formData);
            setData([...data, response.data]);

            setIsAddModalVisible(false);

            addForm.resetFields();

        } catch (error) {
            console.error('Error creating product:', error.response ? error.response.data : error.message);
        }
    };

    const onUpdate = async (values) => {
        try {
            const formData = new FormData(); 
            formData.append("maSanPham", currentRecord.maSanPham);
            formData.append("tenSanPham", values.tenSanPham);
            formData.append("gia", values.gia);
            formData.append("soLuong", values.soLuong);
            formData.append("maloai", values.maloai);
            formData.append("anh", values.anh || "Đây là ảnh"); 
            formData.append("mota", values.mota);
            formData.append("mau", values.mau);
            formData.append("kichco", values.kichco);
            formData.append("anhFile", values.anhFile.file); 

            const response = await apiUpdateFormData(formData); 

            console.log(response);
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const onEditHandler = (record) => {
        setCurrentRecord(record);
        setIsModalVisible(true);
        editForm.setFieldsValue(record);
    };

    const onDeleteHandler = async (maSanPham) => {
        try {
            console.log(maSanPham);
            const res = await apiDelete(maSanPham);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        {
            title: 'Tên đồ apple',
            dataIndex: 'tenSanPham',
            key: 'tenSanPham',
        },
        {
            title: 'Giá bán',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
        },
        {
            title: 'Loại',
            dataIndex: 'maloai',
            key: 'maloai',
            render: (maloai) => getLoaiName(maloai),
        },
        ,
        {
            title: 'Ảnh',
            dataIndex: 'anh',
            key: 'anh',
            render: anh => <img src={`https://localhost:44375/${anh}`} alt="Đây là ảnh" style={{ width: 50, height: 50 }} />,
        }
        ,
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'Màu',
            dataIndex: 'mau',
            key: 'mau',
        }, {
            title: 'Kích cỡ',
            dataIndex: 'kichco',
            key: 'kichco',
        },
        {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <>
                    <Button type="primary" onClick={() => onEditHandler(record)}>Sửa</Button>

                    <Popconfirm
                        title="Có muốn xoá không?"
                        onConfirm={() => {
                            if (record.maSanPham) {
                                onDeleteHandler(record.maSanPham);
                            } else {
                                console.error('Mã sản phẩm không tồn tại.');
                            }
                        }}
                        okText="Xoá"
                        cancelText="Hủy"
                    >
                        <Button type="primary">Xoá</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<ProductOutlined />}>
                        <Link to="/sanpham">Sản Phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CreditCardOutlined />}>
                        <Link to="/hoadonAdmin">Hóa Đơn</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<AppleOutlined />}>
                        <Link to="/others">Khác</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Modal
                title="Thêm sản phẩm mới"
                open={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                onOk={() => addForm.submit()}
            >
                <Form form={addForm} onFinish={onCreate}>
                    <Form.Item name="tenSanPham" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="gia" label="Giá" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="soLuong" label="Số lượng" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="maloai" label="Loại sản phẩm" rules={[{ required: true }]}>
                        <Select>
                            {categories.map(category => (
                                <Option key={category.maloai} value={category.maloai}>{category.tenloai}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="anh"
                        label="Ảnh"
                        className="hidden"
                        initialValue="giá trị mặc định"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="anhFile" label="Ảnh" rules={[{ required: true }]}>
                        <Upload
                            name="anhFile"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={(info) => {
                                const { file } = info;
                                if (file.status === 'done') {
                                   
                                    const uploadedFile = file.originFileObj;
                                    addForm.setFieldsValue({ anhFile: uploadedFile });
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="mota" label="Mô tả" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="mau" label="Màu" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="kichco" label="Kích cỡ" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    
                </Form>
            </Modal>

            <Modal
                title="Chỉnh sửa sản phẩm"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => editForm.submit()}
            >
                <Form form={editForm} onFinish={onUpdate}>
                    <Form.Item name="tenSanPham" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="gia" label="Giá" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="soLuong" label="Số lượng" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="maloai" label="Loại" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item> */}
                    <Form.Item name="maloai" label="Loại sản phẩm" rules={[{ required: true }]}>
                        <Select>
                            {categories.map(category => (
                                <Option key={category.maloai} value={category.maloai}>{category.tenloai}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {/* <Form.Item name="anh" label="Ảnh" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item> */}
                    <Form.Item name="anhFile" label="Ảnh" rules={[{ required: true }]}>
                        <Upload
                            name="anhFile"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={(info) => {
                                const { file } = info;
                                if (file.status === 'done') {
                                    // Lấy giá trị của tệp sau khi tải lên thành công
                                    const uploadedFile = file.originFileObj;
                                    addForm.setFieldsValue({ anhFile: uploadedFile });
                                }
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="mota" label="Mô tả" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="mau" label="Màu" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="kichco" label="Kích cỡ" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Layout className="layout">
                <Header
                    className="layout-background"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Row>
                        <Col md={18}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                    marginRight: 1340
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                                <Avatar icon={<UserOutlined />} />
                                <span style={{ marginLeft: 10 }}>Nguyen Dinh Hung</span>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h2>Danh sách đồ apple</h2>
                    <Button type="primary" onClick={() => setIsAddModalVisible(true)} style={{ marginBottom: 16 }}>
                        Thêm sản phẩm
                    </Button>
                    <Table columns={columns} dataSource={data} rowKey={(record) => record && record.maSanPham ? record.maSanPham : Math.random().toString(36).substr(2, 9)} />
                </Content>
            </Layout>
        </Layout>
    );
}