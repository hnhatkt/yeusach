function JS_page_tinbansach_trangchu() {
	var tc_sotinbansach = 7;
	JS_HienThiDanhSachTinBanSachTrangChu(tc_sotinbansach);
	$(document).ready(function(){
		JS_XoaGioHangKhiKhongDangNhap();
		$("#tc-xt").click(function(){
			tc_sotinbansach += 3;
			JS_HienThiDanhSachTinBanSachTrangChu(tc_sotinbansach);
		});
	});
}

function JS_HienThiDanhSachTinBanSachTrangChu(sotin) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_TinBanSachTrangChu",
		dataType: 'JSON',
		data:{
			data: sotin,
			idsach: 'all'
		},
		success: function(res){
			var html = '';
			if(sotin > res.length) {
				$("#tc-xt").html('');
				$("#tc-st").html(res.length); }
			else{ $("#tc-st").html(sotin); }

			$.each(res, function(index, values){
				html += JS_TinBanSach(index, values);
			});
			$("#dsbd").html(html);
		},
		error: function(res){
		}
	});
}
function JS_TinBanSach(index, values) {
	return `
		<div id="khung-baidang" class="khung-baidang">
			<a href="${BASE_URL}danhsach/chitietsach/${values['idSach']}">
				<img class="baidangimg" src="${BASE_URL+ 'public/hinhanh/sach/' + values['linkHinhAnhSach']}">
			</a>
			<div class="baidang-thongtin">
				<div class="tensach">
					<a href="${BASE_URL}danhsach/chitietsach/${values['idSach']}" target="_blank">
						${index + 1}. ${values['tenSach']}
					</a>
				</div>

				<span>
					<a class="ttchung">
						Tác giả: ${values['tacGia']}
					</a>
				</span>

				<span>
					<a class="ttchung" href="${BASE_URL}danhsach/danhmuc/${values["idDanhMuc"]}">
						Thể loại: ${values['tenDanhMuc']}
					</a>
				</span>

				<span class="gia">
					${numeral(values['giaSach']).format('0,0')} đ
				</span>
				<div class="nguoidang">
					<img class="nguoidangavt" src="${BASE_URL+'public/hinhanh/anhdaidien/'+values['anhDaiDien']}">
					<span class="nguoidangtt">
						<a href="${BASE_URL}trangcanhan/${values['idTaiKhoan']}">${values['tenTaiKhoan']}</a>
						<span>|</span>
						<span>${moment(values['ngayDang']).locale('vi').fromNow()}</span>
						<span>|</span>
						${values['tenQuanHuyenThiXa']}
						<span>|</span>
						<a href="${BASE_URL}danhsach/tinhthanhpho/${values["idTinhThanhPho"]}">
							${values['tenTinhThanhPho']}
						</a>
					</span>
				</div>
			</div>
			<div class="tuongtac">
				<div class="mua">
					${JS_TrangThaiDatHang(values['idTaiKhoan'],values['idTin'])}
				</div>

				<div class="icontt">
					<i class="material-icons" onclick="JS_TaoTinNhan(${values['idTin']})">message</i>
					<i class="material-icons like">favorite</i>
					<!-- <i class="material-icons like">favorite_border</i> -->
				</div>
			</div>
		</div>
		<hr class="tc-hr">
	`;
}
function JS_TrangThaiDatHang(idtaikhoan,idtin){
	for(var i = 1; i <= localStorage.tong; i++){
		if(localStorage.getItem(i) == idtin){
			return `<span class ="tc-btn-dh" onclick="JS_HuyDatHang(${idtin})" >Đang đặt hàng</span>`;
		}
	}
	return `<span class ="tc-btn-dh" onclick="JS_KiemTraDatHang(${idtaikhoan+','+idtin})" >Đặt hàng</span>`;
}
function JS_KiemTraDatHang(idtaikhoan,idtin){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_KiemTraDangNhap",
		success: function(res){
			res =JSON.parse(res);
			if(res == false){
				if(window.confirm("Bạn chưa đăng nhập, Bạn muốn đăng nhập không?")) {
					window.location = BASE_URL+"dangnhap";
				}
			}else{
				JS_KiemTraNguoiDangTin(idtaikhoan,idtin);
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_KiemTraNguoiDangTin(idtaikhoan,idtin){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KiemTraIDTaiKhoan",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			if(res == true){
				alert("Bạn không thể mua sách của bạn!");
				return;
			}
			JS_DatHang(idtin);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_DatHang(idtin){

	if(localStorage.tong == undefined){
		localStorage.tong = 0;
	}
	for(var i = 1; i <= localStorage.tong; i++){
		if(localStorage.getItem(i) == idtin){
			return;
		}
	}
	localStorage.tong++;
	localStorage.setItem(localStorage.tong,idtin);
	JS_TaiLaiDanhSachTinTrangChu();
	JS_HienThiSoLuongDatHang();
	$("#cts-btn-mua").load("#cts-btn-mua");
}
function JS_HuyDatHang(idtin){
	for(var i = 1; i <= localStorage.tong; i++){
		if(localStorage.getItem(i) == idtin){
			localStorage.removeItem(i);
			JS_TaiLaiDanhSachTinTrangChu();
		}
	}
	JS_HienThiSoLuongDatHang();
	$("#cts-btn-mua").load("#cts-btn-mua");
	for(var i = 1; i <= localStorage.tong; i++){
		if(localStorage.getItem(i) != undefined){
			return;
		}
	}
	localStorage.removeItem('tong');
}
function JS_TaiLaiDanhSachTinTrangChu(){
	var s = parseInt($("#tc-st").text());
	JS_HienThiDanhSachTinBanSachTrangChu(s);
}
function JS_HienThiSoLuongDatHang(){
	if(localStorage.tong != undefined){
		var dem = 0;
		for(var i = 1; i <= localStorage.tong; i++){
			if(localStorage.getItem(i) != undefined){
				dem++;
			}
		}
		$("#soluongdathang").html(dem);
	}else{
		$("#soluongdathang").html('');
	}
}