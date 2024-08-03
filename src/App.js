// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HeaderApple from './component/HeaderApple';
// import FooterApple from './component/FooterApple';
// import Home from './component/Home';
// import Store from './component/Store';
// import Login from './component/Login';
// import Register from './component/Register';
// // Import other components if necessary

// function App() {


//   return (
//     <div className="App">
      
//         <HeaderApple />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/store' element={<Store />} />

//         </Routes>
//         <FooterApple />
      

//     </div>
//   );
// }

// export default App;

import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter từ react-router-dom
import AppContent from './AppContent'; // Import component AppContent
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import DashboardPage from './page/DashboardPage';
// import 'antd/dist/antd.css';

function App() {
  return (
    <div className='' style={{}}>
      <AppContent />
      <ToastContainer />
      
    </div>
  );
}

export default App;
 
