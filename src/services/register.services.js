import apiClient from '../api/api'; // Giả sử apiClient là một instance của axios đã được cấu hình trước

const apiRegister = async (data) => {
  const res = await apiClient.post('/api/User/DangKy', data);
  console.log(res.data);
  return res.data;
};

export default apiRegister;
