function JS_page_trangcanhan(){
	JS_HienThiTrangCaNhan_TaiKhoan();
	JS_HienThiTrangCaNhan_DanhSachTin(5);
	JS_HienThiTinBanSachThanhCong();
	$(document).ready(function(){
		JS_XemThemTrangCaNhan_DanhSachTin(2);
		JS_NutSuaThongTinTrangCaNhan();
		JS_HienThiDanhSachDanhGia();
		JS_Rating();
	});
}
function JS_page_trangcanhan_suathongtin() {
	JS_HienThiThongTinCaNhanSua();
	$(document).ready(function(){
		JS_SuaThongTinCaNhan();
	});
}

function JS_HienThiDanhSachDanhGia(){
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachDanhGia",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			res = JSON.parse(res);
			$.each(res, function(index, value){
				JS_HienThiDanhGia(value);
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiDanhGia(value){
	$("#tcn-dsdg").append( `
		<div class="tcn-mdg">
			<div class="tcn-ndg">
				<img src="${BASE_URL+"public/hinhanh/anhdaidien/"+value['anhDaiDien']}">
				<div class="dfc w100">
					<div class="dfr">
						<div class="indam tcn-tndg">${value['tenTaiKhoan']}</div>
						<div class="tcn-dsr my-rating${value['idTaiKhoan']}"></div>
					</div>
					<div class="tcn-tgdg">${moment(value['thoiGianDanhGia']).locale('vi').format('HH:mm DD-MM-YYYY')}</div>
				</div>
			</div>
			<div class="tcn-nddg">
				<span>
					${value['noiDungDanhGia']}
				</span>
			</div>
			<div class="tcn-xnmh">Xác nhận đã mua hàng</div>
		</div>
	` );
	JS_HienThi_Rating(value['idTaiKhoan'],value['diemDanhGia']);
}
function JS_Rating(){
	$(".tcn-danhgia").starRating({
		starSize: 20,
		strokeColor: '#894A00',
		strokeWidth: 10,
		initialRating: 5,
		callback: function(currentRating, $el){
        	// alert(currentRating);
        	$.ajax({
        		url: BASE_URL+"Ajax/AJ_KiemTraDangNhap",
        		success: function(res){
        			res = JSON.parse(res);
        			if(res == true){
        				$("#tcn-k-dg-nd").css("display","block");
        				$("#tcn-dg-nd").keyup(function(){
        					if($("#tcn-dg-nd").val() != ''){
        						$("#tcn-tb-dgt").html('');
        					}
        				});
        				$("#tcn-btn-dg").click(function(){
        					var nd = $("#tcn-dg-nd").val();
        					if(nd == ''){
        						$("#tcn-tb-dgt").html("Không được để trống!");
        					}else{
        						JS_LuuDanhGia(currentRating,nd);
        					}
        				});
        			}else{
        				if(confirm("Cần đăng nhập. Bạn có muốn đăng nhập không?")){
        					window.location = BASE_URL+"dangnhap";
        				}else{
        					location.reload();
        				}
        			}
        		},
        		error: function(res){
        			console.log(res);
        		}
        	});
        }
    });
}
function JS_LuuDanhGia(diem,noidung){
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_LuuDanhGia",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan,
			diem: diem,
			noidung: noidung
		},
		success: function(res){
			location.reload();
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThi_Rating(idtk,diem){
	$(".my-rating"+idtk).starRating({
		initialRating: diem,
		strokeColor: '#894A00',
		strokeWidth: 10,
		starSize: 14,
		readOnly: true
	});
}
function JS_SuaThongTinCaNhan(){
	$("#tcn-tentaikhoan").keyup(function(){
		var dem = $("#tcn-tentaikhoan").val().length;
		$("#tcn-kytuttk").html(dem);
		if(dem == 0){$("#tcn-thongbaottk").html('*');}
		else{$("#tcn-thongbaottk").html('');}
	});
	$("#tcn-email").keyup(function(){
		var dem = $("#tcn-email").val().length;
		$("#tcn-kytue").html(dem);
		if(dem == 0){$("#tcn-thongbaoemail").html('*');}
		else{$("#tcn-thongbaoemail").html('');}
	});
	$("#tcn-diachi").keyup(function(){
		var dem = $("#tcn-diachi").val().length;
		$("#tcn-kytudc").html(dem);
		if(dem == 0){$("#tcn-thongbaodc").html('*');}
		else{$("#tcn-thongbaodc").html('');}
	});
	$("#tcn-btn-luusua").click(function(){
		var dsid = ["#tcn-thongbaottk","#tcn-thongbaoemail","#tcn-thongbaodc"];
		if(JS_KiemTraDuLieuTrangCaNhanSuaThongTin(dsid)){
			if(JS_KiemTraCodeTrangCaNhanSuaThongTin()){
				$("#tcn-tb-xacnhansua").modal('show');
			}
			else{ JS_TaoCode(); alert('Code sai, mời nhập lại!'); }
		}else{ alert('Không được để trống!'); }
	});
	$("#tcn-btn-xns").click(function(){
		$("#form-suatcn").submit();
	});
	$("#tcn-btn-huysua").click(function(){
		window.history.back();
	});
}

function JS_NutSuaThongTinTrangCaNhan(){
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];

	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KiemTraIDTaiKhoan",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			if(res == true){
				$("#tcn-btn-sua").html(`<a href="${BASE_URL}trangcanhan/suathongtin">Sửa thông tin</a>`);
			}else{
				JS_KiemTraTheoDoiTaiKhoan(idtaikhoan,'');
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_KiemTraTheoDoiTaiKhoan(idtaikhoan,key){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_TheoDoiTaiKhoan",
		data: {
			idtaikhoan: idtaikhoan,
			key: key
		},
		dataType: "JSON",
		success: function(res){
			switch(res) {
				case "cdn":
					$("#tcn-btn-sua").html(`<span class="cspt" onclick="JS_HoiDangNhap()">Theo dõi</span>`);
					break;
				case "datd":
					$("#tcn-btn-sua").html(`<span class="cspt" onclick="JS_KiemTraTheoDoiTaiKhoan(${idtaikhoan},'huy')">Đã theo dõi</span>`);
					break;
				case "dahuy":
					$("#tcn-btn-sua").html(`<span class="cspt" onclick="JS_KiemTraTheoDoiTaiKhoan(${idtaikhoan},'')">Theo dõi</span>`);
					break;
				default:
					break;
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HoiDangNhap(){
	if(confirm('Bạn chưa đăng nhập! Bạn muốn đăng nhập không?')){
		window.location = BASE_URL + 'dangnhap';
	}
}
function JS_KiemTraCodeTrangCaNhanSuaThongTin(){
	var cn = $("#tcn-codenhap").val();
	var ct = $("#codetao").text();
	if(cn == ct){ return true; }
	else{return false;}
}
function JS_KiemTraDuLieuTrangCaNhanSuaThongTin(dsid){
	for(var i = 0; i < dsid.length; i++){
		if($(dsid[i]).text() != ''){ return false; }
	}
	return true;
}
function JS_HienThiThongTinCaNhanSua() {
	$.ajax({
		url: BASE_URL+"Ajax/AJ_GetThongTinCaNhan",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res)[0];
			$("#tcn-tentaikhoan").val(res.tenTaiKhoan);
			$("#tcn-kytuttk").html(res.tenTaiKhoan.length);
			$("#tcn-email").val(res.email);
			$("#tcn-kytue").html(res.email.length);
			$("#tcn-diachi").val(res.diaChi);
			$("#tcn-kytudc").html(res.diaChi.length);
			$("#blah").attr('src',BASE_URL+"public/hinhanh/anhdaidien/"+res.anhDaiDien);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiTinBanSachThanhCong() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetTinBanSachThanhCong",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			res = JSON.parse(res);
			$("#tcn-banthanhcong").html(res.length);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<div>
						<span>Bán thành công</span>
						<span class="indam">"${value['tenSach']}"</span>
					</div>
					<div class="tcn-banduoc-tg">${moment(value['ngayDang']).locale('vi').fromNow()}</div>
				`;
			});
			$("#tcn-ds-banthanhcong").html(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiTrangCaNhan_DanhGia(){
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachDanhGia",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length > 0){
				var diem = 0;
				$.each(res, function(index, value){
					diem += parseInt(value['diemDanhGia']);
				});
				$("#tcn-tbdg").html((diem/res.length).toFixed(1));
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiTrangCaNhan_TaiKhoan() {
	JS_HienThiTrangCaNhan_DanhGia();
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetTaiKhoan",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			res = JSON.parse(res)[0];
			$("#tcn-avt").attr("src", BASE_URL + 'public/hinhanh/anhdaidien/' + res.anhDaiDien);
			$("#tcn-ten").html(res.tenTaiKhoan);
			$("#tcn-ntg").html(moment(res.ngayThamGia).locale('vi').format('D/MM/YYYY'));
			$("#tcn-diachi").html(res.diaChi);
			$("#tcn-sdt").html(res.soDienThoai);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiTrangCaNhan_DanhSachTin(soluong) {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtaikhoan = url[3];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinBanSachTheoTaiKhoan",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan,
			soluong: soluong
		},
		success: function(res){
			res = JSON.parse(res);
			if(soluong > res.length){
				$("#tcn-ds-xemthem").html('');
			}
			$("#tcn-sotin").html(res.length);
			JS_KiemTraTrangThai(res);
		},
		error: function(res){
			console.log(res);
		}
	});
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinBanSachTheoTaiKhoan",
		dataType: 'JSON',
		data: {
			idtaikhoan: idtaikhoan,
			soluong: 'all'
		},
		success: function(res){
			res = JSON.parse(res);
			$("#tcn-tongtin").html(res.length);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_XemThemTrangCaNhan_DanhSachTin(them) {
	$("#tcn-ds-xemthem").click(function(){
		var sotin = parseInt($("#tcn-sotin").text());
		sotin += them;
		JS_HienThiTrangCaNhan_DanhSachTin(sotin);
	});
}
function JS_BanSachThanhCong(idsach){
	if(window.confirm("Bạn muốn thay đổi điều này?")) {
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_BanSachThanhCong",
			dataType: 'JSON',
			data: {
				idsach: idsach
			},
			success: function(res){
				location.reload();
			},
			error: function(res){
				console.log(res);
			}
		});
	}
}
function JS_HuyBanSach(idsach){
	if(window.confirm("Bạn muốn thay đổi điều này?")) {
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_HuyBanSach",
			dataType: 'JSON',
			data: {
				idsach: idsach
			},
			success: function(res){
				location.reload();
			},
			error: function(res){
				console.log(res);
			}
		});
	}
}
function JS_KiemTraTrangThai(data) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KiemTraIDTaiKhoan",
		dataType: 'JSON',
		data: {
			idtaikhoan: data[0].idTaiKhoan
		},
		success: function(res){
			var html = '';
			$.each(data, function(index,values){
				// console.log(values['trangThaiTinBanSach']);
				var trangthai;
				if(res == true){
					if(values['trangThaiTinBanSach'] == 0){
						trangthai = `
							<div class="dropdown">
								<span class=" dropdown-toggle" type="button" data-toggle="dropdown">
									Tùy chọn
									<span class="caret"></span>
								</span>
								<ul class="dropdown-menu user-menu tcn-k-tc">
									<li class="dropdown-item"><span onclick="JS_BanSachThanhCong(${values['idSach']})">Bán thành công</span></li>
									<li class="dropdown-item"><span onclick="JS_HuyBanSach(${values['idSach']})">Hủy bán</span></li>
								</ul>
							</div>
						`;
					}else if(values['trangThaiTinBanSach'] == 1){
						trangthai = '<div class="tcn-tin-ddh">Đang đặt hàng</div>';
					}else if(values['trangThaiTinBanSach'] == 2){
						trangthai = '<div class="tcn-tin-dgh">Đang giao hàng</div>';
					}else if(values['trangThaiTinBanSach'] == 3){
						trangthai = '<div class="tcn-tin-duyet">Đang duyệt</div>';
					}else if(values['trangThaiTinBanSach'] == 4){
						trangthai = `<div class="tcn-tin-huyban">Hủy bán</div>`;
					}else if(values['trangThaiTinBanSach'] == 5){
						trangthai = `<div class="tcn-tin-thanhcong">Bán thành công</div>`;
					}
				}else{
					trangthai = `<a href="${BASE_URL}dathang/${values['idSach']}">Đặt hàng</a>`;
				}
				html += JS_TinBanSach_TrangCaNhan(index, values, trangthai);
			});
			$("#tcn-ds-tbs").html(html);
			
		},
		error: function(res){
			console.log(res);
		}
	});
}

function JS_TinBanSach_TrangCaNhan(index, values, trangthai) {
	return `
		<div id="khung-baidang" class="khung-baidang">
			<a href="${BASE_URL}danhsach/chitietsach/${values['idSach']}" target="_blank">
				<img class="baidangimg" src="${BASE_URL + 'public/hinhanh/sach/' + values['linkHinhAnhSach']}">
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
					${values['giaSach']} đ
				</span>
				<div class="nguoidang">
					<img class="nguoidangavt" src="${BASE_URL + 'public/hinhanh/anhdaidien/' + values['anhDaiDien']}">
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
				<div id="tcn-tbs-mua" class="mua">
					${trangthai}
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