function JS_page_giohang(){
	JS_HienThiSanPhamTrongGioHang();
	if(localStorage.tong == undefined || localStorage.tong == 0){
		window.location = BASE_URL;
	}
	$(document).ready(function(){
		JS_GH_HuyDatHang();
		JS_GH_ThanhToan();
	});
}
function JS_page_hoadon() {
	JS_DH_HienThiTinhThanhPho();
	JS_HienThiDonHang();
	JS_DH_HienThiNguoiMua();
	
	$(document).ready(function(){
		JS_KiemTraThongTinNhap();
		JS_HD_SachBiDat();
		JS_HD_DatHangThanhCong();
	});
}
function JS_HD_DatHangThanhCong(){
	$("#dh-btn-tc").click(function(){
		window.location = BASE_URL;
	});
}
function JS_HD_SachBiDat(){
	$("#dh-btn-sachbidat").click(function(){
		window.location = BASE_URL+"giohang";
	});
}
function JS_GH_ThanhToan(){
	$("#gh-btn-thanhtoan").click(function(){
		window.location = BASE_URL+"giohang/hoadon";
	});
}
function JS_GH_HuyDatHang(){
	$("#gh-btn-huydathang").click(function(){
		localStorage.clear();
		window.location = BASE_URL;
	});
}
function JS_HienThiSanPhamTrongGioHang(){
	var ds_idtin = [];
	for (var i = 1; i <= localStorage.tong; i++) {
		if(localStorage.getItem(i) != null){
			ds_idtin.push(localStorage.getItem(i));
		}
	}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachDatHang",
		dataType: 'JSON',
		data: {
			ds_idtin: ds_idtin
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += JS_GH_TinBanSach(index, value);
			});
			$("#gh-ds-tbs").append(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_GH_TinBanSach(index, value){
	return `
	<tr>
		<td width="40">${index + 1}</td>
		<td width="150">
			<img class="gh-has" src="${BASE_URL+'public/hinhanh/sach/'+value['linkHinhAnhSach']}">
		</td>
		<td class="pl10" width="400">${value['tenSach']}</td>
		<td class="pl10" width="200">${value['tenTaiKhoan']}</td>
		<td class="pl10" width="150">${value['giaSach']}</td>
		<td class="pl10" width="100">
			<span class="gh-xoa" onclick = "JS_XoaSanPham(${value['idTin']})">Xóa</span>
		</td>
	</tr>
	`;
}
function JS_XoaSanPham(idtin){
	for(var i = 1; i <= localStorage.tong; i++){
		if(localStorage.getItem(i) == idtin){
			localStorage.removeItem(i);
		}
	}
	if(localStorage.tong == undefined || localStorage.tong == 0){
		window.location = BASE_URL;
	}
	location.reload();
	for(var i = 1; i <= localStorage.tong; i++){
		if(localStorage.getItem(i) != undefined){
			return;
		}
	}
	localStorage.removeItem('tong');
}
function JS_DH_HienThiNguoiMua(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_GetThongTinCaNhan",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				$("#dh-email").val(value['email']);
				$("#dh-baoloi-email").html('');
				$("#dh-sdt").val(value['soDienThoai']);
				$("#dh-baoloi-sdt").html('');
				$("#dh-hoten").val(value['tenTaiKhoan']);
				$("#dh-baoloi-hoten").html('');
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_DH_HienThiTinhThanhPho() {
	$.ajax({
		url: BASE_URL+"Ajax/AJ_DSTinhThanhPho",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				if(index==0){
					html += `
						<option value="${value['idTinhThanhPho']}" selected="selected">${value['tenTinhThanhPho']}</option>
					`;
				}else{
					html += `
						<option value="${value['idTinhThanhPho']}">${value['tenTinhThanhPho']}</option>
					`;
				}
			});
			$("#dh-ttp").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('x');
		}
	});
}
function JS_HienThiDonHang() {
	var t = localStorage.tong;
	if(t == undefined){
		history.back();
	}else{
		for(var i=1; i<=t; i++){
			if(localStorage.getItem(i) != null){
				JS_HienThiSanPham(localStorage.getItem(i));
			}
		}
	}
}
function JS_HienThiSanPham(idtin){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetTinBanSach",
		dataType: 'JSON',
		data: {
			idtin: idtin
		},
		success: function(res){
			res = JSON.parse(res);
			$.each(res,function(index,value){
				$("#dh-sach").append(`
					<div class="ta-left w150p">${value['tenSach']} x 1</div>
					<div class="ta-right indam">${value['giaSach']} đ</div>
				`);
				var tongtien = parseInt($("#dh-tongtien").text());
				var s = JS_PhiShip(value['giaSach']);
				$("#dh-tongtien").html(tongtien + parseInt(value['giaSach']) + s);
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_PhiShip(giasach) {
	var phiship = parseInt($("#dh-phiship").text());
	if(phiship == 0){
		var p = 0;
		if(giasach <= 50000){
			p = 7000;
		}else if(giasach <= 100000){
			p = 10000;
		}else{
			p = 15000;
		}
		$("#dh-phiship").html(p);
		return p;
	}else{
		var b = 0;
		if(giasach <= 50000){
			$("#dh-phiship").html(phiship + 3000);
			b = 3000;
		}else if(giasach <= 100000){
			$("#dh-phiship").html(phiship + 5000);
			b = 5000;
		}else{
			$("#dh-phiship").html(phiship + 7000);
			b = 7000;
		}
		return b;
	}
}
function JS_KiemTraThongTinNhap() {
	
	$("#dh-hoten").keyup(function(){ JS_HienThiDauSao("#dh-hoten",".dh-hoten"); });
	$("#dh-email").keyup(function(){ JS_HienThiDauSao("#dh-email",".dh-email"); });
	$("#dh-sdt").keyup(function(){ JS_HienThiDauSao("#dh-sdt",".dh-sdt"); });
	$("#dh-mbd").keyup(function(){ JS_HienThiDauSao("#dh-mbd",".dh-mbd"); });
	$("#dh-dc").keyup(function(){ JS_HienThiDauSao("#dh-dc",".dh-dc"); });
		
	$("#dh-btn-dh").click(function(){
		var dh_hoten = $("#dh-hoten").val();
		var dh_email = $("#dh-email").val();
		var dh_sdt = $("#dh-sdt").val();
		var dh_mbd = $("#dh-mbd").val();
		var dh_dc = $("#dh-dc").val();
		if(
			dh_hoten == '' 
			|| dh_email == '' 
			|| dh_sdt == '' 
			|| dh_mbd == '' 
			|| dh_dc == ''
		){
			$("#dh-tb-thieuthongtin").modal('show');
		}else{
			$("#dh-tb-xacnhandathang").modal('show');
			$("#dh-btn-xn").click(function(){
				JS_XuLyDonDatHang();
			});
		}
	});

}
function JS_XuLyDonDatHang() {
	

	var ds_idtin = [];
	for (var i = 1; i <= localStorage.tong; i++) {
		if(localStorage.getItem(i) != null){
			ds_idtin.push(localStorage.getItem(i));
		}
	}
	JS_KiemTraTruocKhiDatHang(ds_idtin);
}
function JS_KiemTraTruocKhiDatHang(ds_idtin){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachDatHang",
		dataType: 'JSON',
		data: {
			ds_idtin: ds_idtin
		},
		success: function(res){
			res = JSON.parse(res);
			for(var i = 0; i < res.length; i++){
				if(res[i].trangThaiTinBanSach != 0){
					for(var k = 1; k <= localStorage.tong; k++){
						if(localStorage.getItem(k) == res[i].idTin){
							localStorage.removeItem(k);
						}
					}
					$("#hd-tensachbidat").html("Sách "+res[i].tenSach+" đã bị đặt trước!");
					$("#dh-tb-sachbidat").modal('show');
					return;
				}
			}
			JS_ThucHienDatHang();
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_ThucHienDatHang(){
	var ds_idtin = [];
	for (var i = 1; i <= localStorage.tong; i++) {
		if(localStorage.getItem(i) != null){
			ds_idtin.push(localStorage.getItem(i));
		}
	}
	kieuthanhtoan = 1;
	$("#dh-tt-tien").click(function(){
		kieuthanhtoan = 1;
	});
	$("#dh-tt-bank").click(function(){
		kieuthanhtoan = 2;
	});
	var data = {
		"ds_idtin" : ds_idtin,
		"hoten" : $("#dh-hoten").val(),
		"email" : $("#dh-email").val(),
		"sodienthoai" : $("#dh-sdt").val(),
		"diachi" : $("#dh-dc").val(),
		"mabuudien" : $("#dh-mbd").val(),
		"idttp" : $("#dh-ttp").val(),
		"ghichu" : $("#dh-dc").val(),
		"phiship" : parseInt($("#dh-phiship").text()),
		"tongtien" : parseInt($("#dh-tongtien").text()),
		"kieuthanhtoan" : kieuthanhtoan
	};
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_XuLyDonDatHang",
		data: {
			data: data
		},
		success: function(res){
			res = JSON.parse(res);
			if(res == true){
				localStorage.clear();
				$("#dh-tb-thanhcong").modal('show');
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiDauSao(i,c) {
	v = $(i).val();
	if(v != ''){
		$(c).addClass('anhienthi');
	}else{
		$(c).removeClass('anhienthi');
	}
}