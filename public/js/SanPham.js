
function themSanPham() {
    // Lấy giá trị từ các trường input
    
    var maSP = document.getElementById("masp").value;
    var tenSP = document.getElementById("tensp").value;
    var soLuong = document.getElementById("sluong").value;
    var gia = document.getElementById("gia").value;

    // Kiểm tra xem các trường có giá trị không
    if ( maSP && tenSP && soLuong && gia) {
        // Tạo đối tượng sản phẩm
        
        var sanPham = {
            
            masp: maSP,
            tensp: tenSP,
            sluong: soLuong,
            gia: gia
        };

        // Lấy danh sách sản phẩm từ Local Storage (nếu có)
        var danhSachSanPham = JSON.parse(localStorage.getItem("danhSachSanPham")) || [];

        // Thêm sản phẩm mới vào danh sách
        danhSachSanPham.push(sanPham);

        // Lưu danh sách sản phẩm vào Local Storage
        localStorage.setItem("danhSachSanPham", JSON.stringify(danhSachSanPham));

        // Cập nhật hiển thị bảng sản phẩm trên trang
        hienThiDanhSachSanPham();
    } else {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    }
}

function hienThiDanhSachSanPham() {
    // Lấy danh sách sản phẩm từ Local Storage
    var danhSachSanPham = JSON.parse(localStorage.getItem("danhSachSanPham")) || [];

    // Lấy thẻ tbody của bảng
    var tbody = document.getElementById("sanpham-table-body");

    // Xóa nội dung cũ của tbody
    tbody.innerHTML = "";

    // Duyệt qua danh sách sản phẩm và thêm vào bảng
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var row = tbody.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        //var cell7 = row.insertCell(6);

        //cell1.innerHTML = '<img src="' + danhSachSanPham[i].anhInput + '" alt="Ảnh sản phẩm" style="width:50px;height:50px;">';
        cell1.innerHTML = danhSachSanPham[i].masp;
        cell2.innerHTML = danhSachSanPham[i].tensp;
        cell3.innerHTML = danhSachSanPham[i].gia;
        cell4.innerHTML = danhSachSanPham[i].sluong;
        cell5.innerHTML = '<button onclick="suaSanPham(' + i + ')">Sửa</button>';
        cell6.innerHTML = '<button onclick="xoaSanPham(' + i + ')">Xóa</button>';
    }
}

function xoaSanPham(index) {
    // Giả định: Lấy danh sách sản phẩm từ Local Storage
    var danhSachSanPham = JSON.parse(localStorage.getItem("danhSachSanPham")) || [];

    // Giả định: Xoá sản phẩm tại vị trí index
    danhSachSanPham.splice(index, 1);

    // Giả định: Lưu danh sách sản phẩm đã xoá vào Local Storage
    localStorage.setItem("danhSachSanPham", JSON.stringify(danhSachSanPham));

    // Cập nhật hiển thị bảng sản phẩm trên trang
    hienThiDanhSachSanPham();
}

// Hiển thị danh sách sản phẩm khi trang được tải
hienThiDanhSachSanPham();



