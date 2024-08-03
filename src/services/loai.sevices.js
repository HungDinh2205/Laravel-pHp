import apiClient from "../api/api";

export const apiGetLoai = async () => {
    try {
        
        const res = await apiClient.get(`/api/LoaiControllers/get_all`);
        return res.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const apiGetLoaiById = async(maloai) =>{
    try{
        const res = await apiClient.get('/api/LoaiControllers/Loai_get_by_id/'+ maloai)
        return res.data;
    }catch (error){
        console.error('Error fetching categories:', error);
        throw error;
    }
}