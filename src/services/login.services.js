import apiClient from '../api/api';
import axios from "axios";
const apiLogin = async (data) => {
  const res = await apiClient.post('/api/User/login', data);
  console.log(res.data)
  return res.data;

};

export default apiLogin;
