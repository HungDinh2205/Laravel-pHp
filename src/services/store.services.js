// Import các thư viện cần thiết
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from "../api/api";

// Cấu hình Toast
// toast.configure();

const apiStore = async () => {
    const res = await apiClient.get('/api/SanPham/get_all');
    console.log(res.data);
    return res.data;
};

export default apiStore;
