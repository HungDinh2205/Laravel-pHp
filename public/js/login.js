// var current_url = "http://localhost:44375";

// var app = angular.module('Appapple', []);

// app.controller("HomeCtrl", function ($scope, $http) {
//     $scope.login = function () {
//         var item = {
//             UserName: $scope.Username,
//             Password: $scope.Password
//         };

//         $http({
//             method: "POST",
//             url: current_url + '/api/User/login',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//                 "charset": "utf-8"
//             },
//             data: JSON.stringify(item) // Convert item to JSON string
//         }).then(function (response) {
//             var data = response.data;
//             if (data != null && data.message != null && data.message !== 'undefined') {
//                 alert(data.message);
//             } else {
//                 if (data.userType === "admin") {
//                     localStorage.setItem("Admin-User", "true");
//                     localStorage.setItem("username", $scope.Username); // Use $scope.username
//                     alert('Đăng nhập thành công');
//                     window.location.href = "admin.html";
//                 } else if (data.userType === "user") {
//                     localStorage.setItem("Admin-User", "false");
//                     localStorage.setItem("username", $scope.Username); // Use $scope.username
//                     alert('Đăng nhập thành công');
//                     window.location.href = "user.html";
//                 } else {
//                     alert('Lỗi: Không xác định được loại người dùng');
//                 }
//             }
//         }).catch(function (error) {
//             console.error('Lỗi:', error); // Log the error to the console for debugging
//             alert('Thông tin tài khoản không hợp lệ hoặc bạn không phải là admin hoặc user');
//         });
//     };
// });
