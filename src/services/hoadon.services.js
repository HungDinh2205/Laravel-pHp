import apiClient from "../api/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const apiHoaDon = async (data) => {
    const maTaiKhoan = localStorage.getItem('maTaiKhoan');
    if (!maTaiKhoan) {
        throw new Error('Không tìm thấy keyid trong local storage');
    }
    const requestData = { ...data, maTaiKhoan };
    const res = await apiClient.post('/api/HoaDon/create-hoadon', requestData);
    return res?.data;
}

export const apiHoaDonIdUser = async(maTaiKhoan)=>{
    
    // const resquestData = {...data,maTaiKhoan};
    try {
        const res = await apiClient.get('/api/HoaDon/get_HoaDon_by_id_user/' + maTaiKhoan);
        console.log(res)
        return res?.data;
    } catch (error) {
        console.error('Error fetching user cart:', error);
        toast.error('Lỗi khi lấy dữ liệu giỏ hàng. Vui lòng thử lại sau.');
        throw error;
    }
}

export const apiHoaDonGetAll = async()=>{
    const res = await apiClient.get('/api/HoaDon/get_HoaDon_Details');
    console.log(res);
    return res?.data;
}

// export default {apiHoaDon,apiHoaDonIdUser};