//Kiểm tra đăng ký
var loidangky = Array();
loidangky['sodienthoai'] = true;
loidangky['tentaikhoan'] = true;
loidangky['mk'] = true;
loidangky['email'] = true;
loidangky['diachi'] = true;



$(document).ready(function(){

	var BASE_URL = "/yeusach/";
	JS_CapNhatNgayOnline();
	JS_ChonDangTinBanSach();
	JS_HienThiSoLuongDatHang();
	JS_HienThiThongBaoMuaSach();
	JS_TimKiemSach();
	JS_DanhDauTatCaThongBaoDaDoc();
	

	//In đậm menu khi chọn
	var arr_id = ['danhmuc', 'tintuc', 'phukien', 'dangban'];
	var arr_url = [BASE_URL+'danhmuc', BASE_URL+'tintuc', BASE_URL+'phukien', BASE_URL+'dangban'];
	var url = $(location).attr("pathname");
	if ( arr_url.indexOf(url) != -1 ){
		var position = arr_url.indexOf(url);
		var idd = arr_id[position];
		$(`#${idd}`).addClass("active");
	}
	if ( url == BASE_URL ){
		$(".trangchu").css({"color": "rgba(0,0,0,.9)"});
	} else {
		$(".trangchu").css({"color": "rgba(0,0,0,.5)"});
	}

	//Kiểm tra thông tin đăng ký

	var data = new Array();

	$("#sodienthoai").keyup(function() {
		data['nhap'] = $(this).val();
		data['idthongbao'] = "#thongbaosdt";
		data['thongbao'] = "Số điện thoại này đã có người sử dụng!";
		JS_KTDK("sodienthoai",data);
		$("#kytusdt").html(" (" + data['nhap'].length + "/20)");
	});

	$("#tentaikhoan").keyup(function() {
		data['nhap'] = $(this).val();
		data['idthongbao'] = "#thongbaottk";
		data['thongbao'] = "Tên tài khoản này đã có người sử dụng!";
		JS_KTDK("tentaikhoan",data);
		$("#kytuttk").html(" (" + data['nhap'].length + "/60)");
	});

	$("#email").keyup(function() {
		data['nhap'] = $(this).val();
		data['idthongbao'] = "#thongbaoemail";
		data['thongbao'] = "Email này đã có người sử dụng!";
		JS_KTDK("email",data);
		$("#kytue").html(" (" + data['nhap'].length + "/100)");
	});

	$("#mk").keyup(function() {
		var mk = $(this).val();
		var mk2 = $("#mk2").val();
		JS_KTMK(mk,mk2);
		$("#kytumk").html(" ("+mk.length+"/60)");
	});

	$("#mk2").keyup(function() {
		var mk = $("#mk").val();
		var mk2 = $(this).val();
		JS_KTMK(mk,mk2);
		$("#kytumk2").html(" ("+mk2.length+"/60)");
	});

	$("#diachi").keyup(function() {
		var diachi = $("#diachi").val();
		$("#kytudc").html(" ("+diachi.length+"/100)");
		if(diachi.length == 0) {
			loidangky['diachi'] = true;
		}else{
			loidangky['diachi'] = false;
		}
	});
	$("#hd-giohang").click(function(){
		if(localStorage.tong == undefined){
			alert('Không có sản phẩm trong giỏ hàng!');
		}else{
			window.location = BASE_URL+"giohang";
		}
	});

	//Đăng ký
	$("#btn-dangky").click(function(){
		if(
			loidangky['sodienthoai'] == true ||
			loidangky['tentaikhoan'] == true ||
			loidangky['mk'] == true ||
			loidangky['email'] == true ||
			loidangky['diachi'] == true
		){
			alert('Thông tin sai hoặc thiếu, mời nhập lại!');
			JS_TaoCode();
		}
		else {
			var codenhap = $("#codenhap").val();
			var codetao = $("#codetao").text();
			if(codenhap != codetao){
				alert("Mã code sai. Mời nhập lại!");
				JS_TaoCode();
			}
		}
	});



	$("#btn-dangky").hover(function(){
		if(
			loidangky['sodienthoai'] == true ||
			loidangky['tentaikhoan'] == true ||
			loidangky['mk'] == true ||
			loidangky['email'] == true ||
			loidangky['diachi'] == true
		){
			
		}
		else {
			var codenhap = $("#codenhap").val();
			var codetao = $("#codetao").text();
			if(codenhap == codetao){
				$("#khung-btndk").html("<button name=\"btn-dangky\" class=\"btndk\">Đăng ký</button>");
			}
		}
	});

	//Kiểm tra thông tin đăng nhập

	JS_TaoCode();
	$("#lammoi").click(function(){
		JS_TaoCode();
	});

	$("#btn-dangnhap").click(function(){
		var datadn = new Array();
		datadn['sodienthoai'] = $("#sodienthoaidn").val();
		datadn['matkhau'] = $("#mkdn").val();
		datadn['codenhap'] = $("#codenhap").val();
		datadn['codetao'] = $("#codetao").text();
		if(datadn['sodienthoai'] == "" || datadn['matkhau'] == "" || datadn['codenhap'] == ""){
			alert("Xin nhập đủ thông tin đăng nhập!");
			JS_TaoCode();
		}else{
			if(datadn['codenhap'] != datadn['codetao']){
				alert("Mã code sai. Mời nhập lại!");
				JS_TaoCode();
			}else{
				JS_KTDN(datadn);
			}
		}
	});

	$("#dangxuat").click(function(){
		JS_UnsetSession('taikhoan',BASE_URL);
	});
	

});

function JS_DanhDauTatCaThongBaoDaDoc(){
	$("#hd-dddd").click(function(){
		$.ajax({
			url: BASE_URL+"Ajax/AJ_DanhDauTatCaThongBaoDaDoc",
			success: function(res){
				$("#hd-ds-tb").html('');
				JS_GetThongBaoMuaSach();
				$("#hd-btb").addClass("show");
			},
			error: function(res){
				console.log(res);
			}
		});
	});
}
function JS_TimKiemSach(){
	$("#hd-btn-timkiemsach").click(function(){
		var ndtk = $("#hd-timkiemsach").val();
		window.location = BASE_URL+"danhsach/timkiem/"+ndtk;
	});
}
function JS_HienThiThongBaoMuaSach(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_KiemTraDangNhap",
		success: function(res){
			res = JSON.parse(res);
			if(res == true){
				JS_GetThongBaoMuaSach();
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_GetThongBaoMuaSach(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_GetThongBaoMuaSach",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			var sotbchuaxem = 0;
			$.each(res, function(index, value){
				$("#hd-ds-tb").append(`
					<div ${JS_KiemTraDaXemThongBao(value['daXem'])} onclick="JS_XemThongBao(${value['idThongBaoMuaSach']})" class="hd-mtb">
						<img src="${BASE_URL+"public/hinhanh/anhdaidien/"+value['anhDaiDien']}">
						<div>
							<span class="indam">${value['tenTaiKhoan']} </span>
							<span>đã mua sách </span>
							<span class="indam">${value['tenSach']} </span>
							<span>của bạn.</span>
							<div class="fs10 fsi">${moment(value['thoiGianThongBao']).locale('vi').fromNow()}</div>
						</div>
					</div>
				`);
				if(value['daXem'] == 0){ sotbchuaxem++; }
			});
			if(sotbchuaxem > 0){
				$("#hd-sotb-chuaxem").html(sotbchuaxem);
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_XemThongBao(idthongbaomuasach){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_XemThongBao",
		data: {
			idthongbaomuasach: idthongbaomuasach
		},
		success: function(res){
			console.log(res);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_KiemTraDaXemThongBao(daxem){
	if(daxem == 0){
		return `style="background-color: #b2bec3"`;
	}
}
function JS_XoaGioHangKhiKhongDangNhap(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_KiemTraDangNhap",
		success: function(res){
			res = JSON.parse(res);
			if(res == false) {
				localStorage.clear();
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_KTDK(key,data) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KiemTraDK",
		dataType: 'JSON',
		data: {
			key: key,
			data: data["nhap"]
		},
		success: function(res){
			if(res == '1') {
				$(data['idthongbao']).html(data['thongbao']);
				loidangky[key] = true;
			}
			else {
				$(data['idthongbao']).html("");
				loidangky[key] = false;
				if(data['nhap'] == ""){
					$(data['idthongbao']).html("Không được để trống!");
					loidangky[key] = true;
				}
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}

//Kiểm tra đăng nhập
function JS_KTDN(data) {
	var ngayONL = moment(ngayONL).locale('vi').format('YYYY-MM-DD HH:mm:ss');
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KiemTraDN",
		dataType: 'JSON',
		data: {
			sdt: data['sodienthoai'],
			mk: data['matkhau'],
			ngayONL: ngayONL
		},
		success: function(res){
			res = JSON.parse(res);
			if(res == null){
				alert("Tài khoản không chính xác!");
				JS_TaoCode();
			}else{
				window.location = BASE_URL;
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}

//Cập nhật thời gian đăng nhập
function JS_CapNhatNgayOnline(){
	var ngayONL = moment(ngayONL).locale('vi').format('YYYY-MM-DD HH:mm:ss');
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_CapNhatNgayOnline",
		dataType: 'JSON',
		data: {
			ngayONL: ngayONL
		},
		success: function(res){
			// console.log(res);
		},
		error: function(res){
			console.log(res);
		}
	});
}

//unset SESSION
function JS_UnsetSession(name,link){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_HuySession",
		dataType: 'JSON',
		data: {
			data: name
		},
		success: function(res){
			alert("Đăng xuất thành công!");
			localStorage.clear();
			window.location=link;
		},
		error: function(res){
			console.log(res);
		}
	});
}

//Kiểm tra mật khẩu
function JS_KTMK(mk,mk2) {
	if(mk!=mk2) {
		$("#thongbaomk").html("Mật khẩu không trùng nhau!");
		loidangky['mk'] = true;
	}
	else {
		$("#thongbaomk").html("");
		loidangky['mk'] = false;
	}
}

//Tạo code random
function JS_TaoCode(){
	var alpha = new Array('d','c','B','f','D','C','a', 'E', 'F','b', 'A', 'e');
	for (var i=0;i<2;i++){
		var a = alpha[Math.floor(Math.random() * alpha.length)];
		var b = Math.floor(Math.random() * 10);
		var c = alpha[Math.floor(Math.random() * alpha.length)];
		var d = Math.floor(Math.random() * 10);
	}
	var code = '' + a + b + c + d;
	$("#codetao").html(code);
}

function JS_ChonDangTinBanSach() {
	$("#mn-dtbs").click(function(){
		$.ajax({
			url: BASE_URL+"Ajax/AJ_KiemTraDangNhap",
			dataType: 'JSON',
			success: function(res){
				if(res == false){
					if(window.confirm("Bạn chưa đăng nhập, Bạn muốn đăng nhập không?")) {
						window.location = BASE_URL+"dangnhap";
					}
				}else{
					window.location = BASE_URL+"dangtin";
				}
			},
			error: function(res){
				console.log(res);
				// alert('loi');
			}
		});
	});
}


