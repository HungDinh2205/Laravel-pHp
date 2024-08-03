import axios from "axios";

const apiClient = axios.create({ 
  baseURL: 'https://localhost:44375',
  // headers: {
  //   'Content-Type': 'application/json',
    
// },
//   timeout: 1000 * 60 * 30 * 3, // 90 minutes
});


export default apiClient;
