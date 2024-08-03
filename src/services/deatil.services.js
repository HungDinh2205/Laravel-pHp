// Import các thư viện cần thiết
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from "../api/api";

const apiDetail = async (maloai) => {
    const res = await apiClient.get('/api/SanPham/get-by-id/' + maloai);
    // console.log(res.id);
    return res?.data;
};

export default apiDetail;
