import apiClient from "../api/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const apiGetAll = async () => {
    try {
        const res = await apiClient.get(`/api/SanPham/get_all`);
        return res.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
        throw error;
    }
};

export const apiCreateFormData = async (formData) => {
    try {
        const res = await apiClient.post(`/api/SanPham/Create`, formData, {
            // headers: {
            //     'Content-Type': 'multipart/form-data' 
            // }
        });

        return res.data;
    } catch (error) {
        console.error('Error creating item:', error);
        toast.error('Error creating item');
        throw error;
    }
};

export const apiUpdateFormData = async (formData) => {
    try {
        const res = await apiClient.post(`/api/SanPham/Update`, formData,{});
        return res.data;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error updating item:', error);
        toast.error('Error updating item');
        throw error;
    }
};

export const apiDelete = async (maSanPham) => {
    try {
        await apiClient.delete(`/api/SanPham/Delete?masp=${maSanPham}`);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error deleting item:', error);
        toast.error('Error deleting item');
        throw error;
    }
};
