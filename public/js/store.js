// var current_url = "https://localhost:44375";

// var app = angular.module('Appapple', []);

// app.controller("HomeCtrl", function ($scope, $http, $window) {
//     $scope.listsp = [];

//     $scope.Loadsp = function () {
//         $http({
//             method: 'GET',
//             url: current_url + '/api/SanPham/get_all',
//         }).then(function (response) {
//             $scope.listsp = response.data;
//         });
//     };

//     $scope.Loadsp();

//     // Hàm để chuyển hướng sang trang chi tiết sản phẩm
//     $scope.ViewDetail = function (productId) {
//         console.log("ID của sản phẩm:", productId);
//         $window.location.href = 'detail.html?id=' + productId;
//     };
// });
