import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DasboardPage.css';
import {
  ProductOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppleOutlined,
  CreditCardOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Row, Col, Avatar, Table, Popconfirm, Modal, message } from 'antd';
import { apiHoaDonGetAll } from '../services/hoadon.services';

const DashboardPage = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [hoaDon, setHoaDon] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiHoaDonGetAll();
        setHoaDon(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);

  const onCorrectHoaDon = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    saveHoaDonToLocalStorage(currentRecord);
    message.success('Hóa đơn đã được xác nhận và đã được lưu. Sẽ vận chuyển ngay !');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveHoaDonToLocalStorage = (hoaDon) => {
    const storedHoaDon = JSON.parse(localStorage.getItem('hoaDon')) || [];
    storedHoaDon.push(hoaDon);
    localStorage.setItem('hoaDon', JSON.stringify(storedHoaDon));
  };

  const columns = [
    {
      title: 'Sản phẩm mua',
      dataIndex: 'tenSanPham',
      key: 'tenSanPham',
    },
    {
      title: 'Tổng hoá đơn',
      dataIndex: 'tongGia',
      key: 'tongGia',
    },
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      key: 'soLuong',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Ảnh',
      dataIndex: 'anh',
      key: 'anh',
      render: (anh) => <img src={`https://localhost:44375/${anh}`} alt="Đây là ảnh" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'tenKhachHang',
      key: 'tenKhachHang',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (record) => (
        <Popconfirm
          title="Có muốn xác nhận đơn không?"
          onConfirm={() => {
            if (record.maTaiKhoan) {
              onCorrectHoaDon(record);
            } else {
              console.error('Mã tài khoản không tồn tại.');
            }
          }}
          okText="OK"
          cancelText="Hủy"
        >
          <Button type="primary">Xác nhận</Button>
        </Popconfirm>
      ),
    },
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
      <Layout className="layout">
        <Header
          className="layout-background"
          style={{
            padding: 0,
            background: '#fff',
          }}
        >
          <Row>
            <Col span={18}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                  marginRight: 1340,
                }}
              />
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: 10 }}>Nguyen Dinh Hung</span>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Table columns={columns} dataSource={hoaDon} rowKey="maHoaDon" />
        </Content>
      </Layout>
      <Modal title="Xác nhận hóa đơn" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc chắn muốn xác nhận hóa đơn này?</p>
      </Modal>
    </Layout>
  );
};

export default DashboardPage;
