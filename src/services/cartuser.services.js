import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from "../api/api";

const apiGioHangIdUser = async (maTaiKhoan) => {
    try {
        const res = await apiClient.get('/api/GioHang/get-by-id/' + maTaiKhoan);
        console.log(res)
        return res?.data;
    } catch (error) {
        console.error('Error fetching user cart:', error);
        toast.error('Lỗi khi lấy dữ liệu giỏ hàng. Vui lòng thử lại sau.');
        throw error;
    }
}

export default apiGioHangIdUser;