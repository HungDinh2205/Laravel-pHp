import apiClient from "../api/api";

const apiTaiKhoan = async (maTaiKhoan)=>{
    const res = await apiClient.get('/api/User/TaiKhoan_get_by_id/'+ maTaiKhoan)
    console.log(res);
    return res?.data;
};

export default apiTaiKhoan
