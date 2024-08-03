import React from 'react';
import { Routes, Route ,useLocation} from 'react-router-dom';
import HeaderApple from './component/HeaderApple';
import FooterApple from './component/FooterApple';
import Home from './component/Home';
import Store from './component/Store';
import Login from './component/Login';
import Register from './component/Register';
import Detail from './component/Detail';
import Danhmuc from './component/Danhmuc';
import DashboardPage from './page/DashboardPage';
import Giohang from './component/Giohang';
import Hoadon from './component/Hoadon';
import SanPham from './page/SanPham';
import HoaDonAdmin from './page/HoaDonAdmin'

function AppContent() {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const noHeaderFooterPaths = ['/login', '/register','/admin','/store','/sanpham','/hoadonAdmin','/']; // Các đường dẫn không cần Header và Footer

    // Kiểm tra xem đường dẫn hiện tại có nằm trong danh sách noHeaderFooterPaths hay không
    const shouldShowHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

    return (
        <div className="App">
            {shouldShowHeaderFooter && <HeaderApple />}

            <Routes>
                <Route path='/hoadonAdmin' element={<HoaDonAdmin/>}/>
                <Route path='/sanpham' element={<SanPham/>}/>
                <Route path='/admin' element={<DashboardPage/>}/>
                <Route path='/home' element={<Home />} />
                <Route path='/store' element={<Store />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />}/>
                <Route path='/detail/:maloai' element={<Detail/>}/>
                <Route path='/danhmuc/:maloai' element={<Danhmuc/>}/>
                <Route path='/giohang/:maTaiKhoan' element={<Giohang/>}/>
                <Route path='/hoadon/:maTaiKhoan' element={<Hoadon/>}/>
            </Routes>

            {shouldShowHeaderFooter && <FooterApple />}
        </div>
    );
}

export default AppContent;