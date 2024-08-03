import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from "../api/api";

// Hàm gửi yêu cầu thêm vào giỏ hàng
export const apiGiohang = async (data) => {
    const maTaiKhoan = localStorage.getItem('maTaiKhoan');
    if (!maTaiKhoan) {
        throw new Error('Không tìm thấy keyid trong local storage');
    }
    const requestData = { ...data, maTaiKhoan };
    const res = await apiClient.post('/api/GioHang/create', requestData);
    return res?.data;
};

export const apiXoaGioHang = async (maGioHang) => {
    try {
        // debugger
        const res = await apiClient.delete('/api/GioHang/Delete/' + maGioHang);
        console.log(res);
        return res.data; // Trả về dữ liệu từ phản hồi (nếu cần thiết)
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi hàm này
    }
};



