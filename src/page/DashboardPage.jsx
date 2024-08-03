import "./DasboardPage.css";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
    ProductOutlined,
    CreditCardOutlined,
    ManOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AppleOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import axios from "axios";
import { Button, Layout, Menu, theme, Row, Col, Avatar, } from 'antd';

export default function DashboardPage() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    
                </Content>
            </Layout>
        </Layout>
    );
}