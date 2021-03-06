/*https://www.share123.vn/2016/05/huong-dan-tao-menu-doc-cho-blogspot.html*/
//<![CDATA[
( function( $ ) {
	$( document ).ready(function() {
		$('#cssmenu-doc li.has-sub>a').on('click', function(){
			$(this).removeAttr('href');
			var element = $(this).parent('li');
			if (element.hasClass('open')) {
				element.removeClass('open');
				element.find('li').removeClass('open');
				element.find('ul').slideUp();
			}
			else {
				element.addClass('open');
				element.children('ul').slideDown();
				element.siblings('li').children('ul').slideUp();
				element.siblings('li').removeClass('open');
				element.siblings('li').find('li').removeClass('open');
				element.siblings('li').find('ul').slideUp();
			}
		});

		$('#cssmenu-doc>ul>li.has-sub>a').append('<span class="holder"></span>');

		(function getColor() {
			var r, g, b;
			var textColor = $('#cssmenu-doc').css('color');
			textColor = textColor.slice(4);
			r = textColor.slice(0, textColor.indexOf(','));
			textColor = textColor.slice(textColor.indexOf(' ') + 1);
			g = textColor.slice(0, textColor.indexOf(','));
			textColor = textColor.slice(textColor.indexOf(' ') + 1);
			b = textColor.slice(0, textColor.indexOf(')'));
			var l = rgbToHsl(r, g, b);
			if (l > 0.7) {
				$('#cssmenu-doc>ul>li>a').css('text-shadow', '0 1px 1px rgba(0, 0, 0, .35)');
				$('#cssmenu-doc>ul>li>a>span').css('border-color', 'rgba(0, 0, 0, .35)');
			}
			else
			{
				$('#cssmenu-doc>ul>li>a').css('text-shadow', '0 1px 0 rgba(255, 255, 255, .35)');
				$('#cssmenu-doc>ul>li>a>span').css('border-color', 'rgba(255, 255, 255, .35)');
			}
		})();

		function rgbToHsl(r, g, b) {
			r /= 255, g /= 255, b /= 255;
			var max = Math.max(r, g, b), min = Math.min(r, g, b);
			var h, s, l = (max + min) / 2;

			if(max == min){
				h = s = 0;
			}
			else {
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch(max){
					case r: h = (g - b) / d + (g < b ? 6 : 0); break;
					case g: h = (b - r) / d + 2; break;
					case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
			}
			return l;
		}
	});
} )( jQuery );

//]]>
// -------------------------------------------------------------------

$(document).ready(function() {

	JS_QuanLyCapCao();

	$("#ql-mk2").keyup(function(){
		var qlmk = $("#ql-mk").val();
		var qlmk2 = $("#ql-mk2").val();
		if(qlmk != qlmk2){
			$("#ql-thongbaomk").html('M???t kh???u kh??ng tr??ng nhau!');
		}else{
			$("#ql-thongbaomk").html('');
		}
	});
	
	$("#ql-btndk").click(function(){
		var qlcodenhap = $("#ql-codenhap").val();
		var qlcodetao = $("#codetao").text();
		if(qlcodenhap != qlcodetao){
			alert("Nh???p code sai, m???i nh???p l???i!");
			JS_TaoCode();
		}
	});

	$("#ql-btndk").hover(function(){
		var qltadm = $("#ql-tadm").val();
		var qlmk = $("#ql-mk").val();
		var qlmk2 = $("#ql-mk2").val();
		var qlcodenhap = $("#ql-codenhap").val();
		var qlcodetao = $("#codetao").text();
		if(qltadm != '' && qlmk == qlmk2 && qlcodenhap == qlcodetao){
			$("#ql-khung-btndk").html(`
				<button class="btndk" name="qlbtndk">????ng k??</button>
			`);
		}
	});

	$("#ql-btn-dangnhap").click(function(){
		var qlcodenhap = $("#ql-codenhap").val();
		var qlcodetao = $("#codetao").text();
		if(qlcodenhap != qlcodetao){
			alert("Nh???p code sai, m???i nh???p l???i!");
			JS_TaoCode();
		}else{
			JS_KiemTraDangNhapAdmin();
		}
	});
	$("#ql-codenhap").keyup(function(event){
		if(event.keyCode === 13) {
			var qlcodenhap = $("#ql-codenhap").val();
			var qlcodetao = $("#codetao").text();
			if(qlcodenhap != qlcodetao){
				alert("Nh???p code sai, m???i nh???p l???i!");
				JS_TaoCode();
			}else{
				JS_KiemTraDangNhapAdmin();
			}
		}
	});

	$("#ql-dangxuat").click(function(){
		// header.js
		JS_UnsetSession('ad',BASE_URL+"quanlywebsite/dangnhap");
	});
	

});
function JS_page_quanly_thongke(){
	$(document).ready(function() {
		JS_TKGD_BieuDoGiaoDichTongHop();
		JS_HienThiChiTietThongKe();
	});
}
function JS_page_quanly(){
	$(document).ready(function() {
		JS_BieuDoGiaoDichThang();
		JS_BieuDoLuongTinDangNam();
	});
}
function JS_page_quanly_xetduyettinbansach() {
	JS_HienThiDanhSachXetDuyetTinBanSach();
	JS_HienThiTrangXetDuyetTinBanSach();
	$(document).ready(function() {
		JS_ChonTrangXetDuyetTin();
		JS_ChonTrangTruocSauXetDuyetTin();
		
	});
}
function JS_page_quanly_danhsachtinbansach() {
	JS_HienThiDanhSachTinBanSach();
	JS_HienThiTrangDanhSachTinBanSach();
	$(document).ready(function() {
		JS_ChonTrangDanhSachTin();
		JS_ChonTrangTruocSauDanhSachTin();
	});
}
function JS_page_quanly_danhsachtintuc() {
	JS_HienThiDanhSachTinTucQuanLy();
	JS_HienThiTrangDanhSachTinTucQuanLy();
	$(document).ready(function() {
		JS_ChonTrangDanhSachTinTuc();
		JS_ChonTrangTruocSauDanhSachTinTuc();
	});
}
function JS_page_quanly_donhang() {
	JS_HienThiDanhSachDonDatHang();
	JS_HienThiTrangDanhSachDonDatHangQuanLy();
	$(document).ready(function() {
		JS_ChonTrangDanhSachDonDatHangQuanLy();
		JS_ChonTrangTruocSauDanhSachDonDatHangQuanLy();
	});
}
function JS_page_quanly_xemdonhang() {
	JS_XemDonHang();
	$(document).ready(function() {
		JS_XemDonHang_XacNhan();
	});
}
function JS_page_quanly_admin(){
	JS_HienThiDanhSachAdmin();
}
function JS_page_quanly_taikhoan(){
	JS_HienThiDanhSachTaiKhoan();
	JS_HienThiTrangDanhSachTaiKhoan();
	$(document).ready(function() {
		JS_ChonTrangDanhSachTaiKhoan();
		JS_ChonTrangTruocSauDanhSachTaiKhoan();
		JS_TuyChonLocDanhSachTaiKhoan();
		JS_LocTenTaiKhoan();
		JS_LocSoDienThoai();
	});
}
function JS_page_quanly_donhangdanggiao(){
	JS_HienThiDanhSachDonHangDangGiao();
}


// -------------------------------------------------------------------------------
function JS_HienThiDanhSachAdmin() {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachAdmin",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			console.log(res);
			$.each(res, function(index, value){
				var html = '';
				html += `
				<tr ${JS_TrangThaiChan(value['voHieuHoa'])} >
					<td width="35">${index+1}</td>
					<td width="200">${value['tenAdmin']}</td>
					<td width="150">${moment(value['ngayThamGia']).locale('vi').format('DD-MM-YYYY')}</td>
					<td width="250">${moment(value['ngayOnline']).locale('vi').fromNow()}</td>
					<td width="250">${value['soDienThoai']}</td>
					<td class="xdtbs-tuychon" width="100">
						${JS_TuyChonTaiKhoan(value['voHieuHoa'],value['idTaiKhoan'])}
					</td>
				</tr>
				`;
				$("#ql-dsa-table-tt").append(html);
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_GiaoHangThanhCong(iddonhang){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GiaoHangThanhCong",
		dataType: 'JSON',
		data: {
			iddonhang: iddonhang
		},
		success: function(res){
			location.reload();
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_KhongNhanHang(iddonhang){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KhongNhanHang",
		dataType: 'JSON',
		data: {
			iddonhang: iddonhang
		},
		success: function(res){
			location.reload();
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiDanhSachDonHangDangGiao() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachDonHangDangGiao",
		dataType: 'JSON',
		data: {
			trang: trang
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length == 0){
				$("#dsddh-dm").html('Kh??ng c?? tin m???i.');
				$("#dsddh-htt").html('');
			}else{
				$.each(res, function(index, value){
					var html = '';
					html += `
						<tr>
							<td width="35">${((trang-1)*6)+1+index}</td>
							<td width="200">
								${JS_HienThiDSSachHoaDon(value['ds_tensach'])}
							</td>
							<td width="80">${value['tongTien']}</td>
							<td width="90">${value['nguoiNhan']}</td>
							<td width="90">${value['soDienThoai']}</td>
							<td width="120">${value['diaChi']}</td>
							<td width="100">${value['maBuuDien']}</td>
							<td width="100">${JS_KieuThanhToan(value['kieuThanhToan'])}</td>
							<td class="xdtbs-tuychon" width="140">
								<a class="xdtbs-dang" onclick="JS_GiaoHangThanhCong(${value['idDonHang']})">Giao th??nh c??ng</a>
								<a class="xdtbs-huy" onclick="JS_KhongNhanHang(${value['idDonHang']})">Kh??ng nh???n h??ng</a>
							</td>
						</tr>
					`;
					$("#dstt-table-tt").append(html);
				});
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_QuanLyCapCao(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_QuanLyCapCao",
		success: function(res){
			if(parseInt(res) == 1){
				$("#ql-cc").removeClass('hiden_im');
				$("#ql-cc-nd").html(`
					<li><a href='${BASE_URL+"quanlywebsite/dangky"}'><span>T???o t??i kho???n admin</span></a></li>
					<li class='last'><a href='${BASE_URL+"quanlywebsite/admin"}'><span>Qu???n l?? admin</span></a></li>
				`);
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiCotCTTK(ds){
	var i = 1;
	$.each(ds, function(index, value){
		var w = parseInt($(index).text());
		if(w > 600){ i = 2; }
		$(value).css("width",w/i);
	});
}
function JS_ChonNgayChiTietThongKe(i){
	var htai = moment(htai).locale('vi').format('YYYY-MM');
	$(i).val(htai);
	$(i).change(function(){
		var a = $(i).val().split("-");
		console.log(htai);
	});
}
function JS_ChiTietThongKe(cl,hei){
	if($(cl).css("height") == "0px"){
		var pos = 0;
		var id = setInterval(ani,0);
		function ani(){
			if (pos == hei) {
				clearInterval(id);
			} else {
				pos++;
				$(cl).css("height",pos);
			}
		}
	}else{
		var pos = hei;
		var id = setInterval(ani,0);
		function ani(){
			if (pos == 0) {
				clearInterval(id);
			} else {
				pos--;
				$(cl).css("height",pos);
			}
		}
	}
}
function JS_TuyChonThongKe(c){
	var ds = [
		".ql-tkgd",".ql-tktk",".ql-tkdh",".ql-tktt"
	];
	ds.forEach(function(item){
		if(item == c){
			$(item).css("display","block");
			$(item).css("overflow","hidden");
		}else{
			$(item).css("display","none");
			$(item).css("height","0px");
		}
	});
}
function JS_HienThiChiTietThongKe(){
	$("#ql-ct-tkgd").click(function(){
		JS_TuyChonThongKe(".ql-tkgd");
		var ds = {
			"#ql-tkstdtt": ".m-stdtt",
			"#ql-tkstbtc": ".m-stbtc",
			"#ql-tkstdb": ".m-stdb",
			"#ql-tksthb": ".m-sthb"
		};
		var html = JS_Html_TKGD();
		$(".ql-tkgd").html(html);
		JS_HienThiCotCTTK(ds);
		JS_ChiTietThongKe(".ql-tkgd",160);
		JS_ChonNgayChiTietThongKe("#ql-tkgd-cn");
	});
	$("#ql-ct-tktk").click(function(){
		JS_TuyChonThongKe(".ql-tktk");
		var ds = {
			"#ql-tktktc": ".m-tktc",
			"#ql-tktkdhd": ".m-tkdhd",
			"#ql-tktkdktt": ".m-tkdktt",
			"#ql-tktkdbc": ".m-tkdbc"
		};
		var html = JS_Html_TKTK();
		$(".ql-tktk").html(html);
		JS_HienThiCotCTTK(ds);
		JS_ChiTietThongKe(".ql-tktk",160);
		JS_ChonNgayChiTietThongKe("#ql-tktk-cn");
	});
	$("#ql-ct-tkdh").click(function(){
		JS_TuyChonThongKe(".ql-tkdh");
		var ds = {
			"#ql-tkdhtt": ".m-dhtt",
			"#ql-tkdhtc": ".m-dhtc",
			"#ql-tkdhdg": ".m-dhdg",
			"#ql-tkdhbh": ".m-dhbh"
		};
		var html = JS_Html_TKDH();
		$(".ql-tkdh").html(html);
		JS_HienThiCotCTTK(ds);
		JS_ChiTietThongKe(".ql-tkdh",160);
		JS_ChonNgayChiTietThongKe("#ql-tkdh-cn");
	});
	$("#ql-ct-tktt").click(function(){
		JS_TuyChonThongKe(".ql-tktt");
		var ds = {
			"#ql-tkltc": ".m-tttc",
			"#ql-tkldg": ".m-ttdg",
			"#ql-tktn": ".m-tttn"
		};
		var html = JS_Html_TKTT();
		$(".ql-tktt").html(html);
		JS_HienThiCotCTTK(ds);
		JS_ChiTietThongKe(".ql-tktt",130);
		JS_ChonNgayChiTietThongKe("#ql-tktt-cn");
	});
}
function JS_Html_TKTT(){
	return `
		<div class="mb-10 mt5 dfr">
			<div class="indam gachchan">Th???ng k?? t????ng t??c</div>
			<input id="ql-tktt-cn" class="ql-tk-cn" type="month">
		</div>
		<table>
			<tr>
				<td class="w180p">L?????t truy c???p:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-tttc"></div>
					<div id="ql-tkltc">943</div>
				</td>
			</tr>
			<tr>
				<td>L?????t ????nh gi??:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-ttdg"></div>
					<div id="ql-tkldg">186</div>
				</td>
			</tr>
			<tr>
				<td>Tin nh???n:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-tttn"></div>
					<div id="ql-tktn">98</div>
				</td>
			</tr>
		</table>
	`;
}
function JS_Html_TKDH(){
	return `
		<div class="mb-10 mt5 dfr">
			<div class="indam gachchan">Th???ng k?? ????n h??ng</div>
			<input id="ql-tkdh-cn" class="ql-tk-cn" type="month">
		</div>
		<table>
			<tr>
				<td class="w180p">????n h??ng trong th??ng:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-dhtt"></div>
					<div id="ql-tkdhtt">296</div>
				</td>
			</tr>
			<tr>
				<td>Giao th??nh c??ng:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-dhtc"></div>
					<div id="ql-tkdhtc">186</div>
				</td>
			</tr>
			<tr>
				<td>????n h??ng ??ang giao:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-dhdg"></div>
					<div id="ql-tkdhdg">98</div>
				</td>
			</tr>
			<tr>
				<td>????n h??ng b??? h???y:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-dhbh"></div>
					<div id="ql-tkdhbh">12</div>
				</td>
			</tr>
		</table>
	`;
}
function JS_Html_TKTK(){
	return `
		<div class="mb-10 mt5 dfr">
			<div class="indam gachchan">Th???ng k?? t??i kho???n</div>
			<input id="ql-tktk-cn" class="ql-tk-cn" type="month">
		</div>
		<table>
			<tr>
				<td class="w180p">T???t c??? t??i kho???n:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-tktc"></div>
					<div id="ql-tktktc">364</div>
				</td>
			</tr>
			<tr>
				<td>??ang ho???t ?????ng:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-tkdhd"></div>
					<div id="ql-tktkdhd">335</div>
				</td>
			</tr>
			<tr>
				<td>????ng k?? trong th??ng:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-tkdktt"></div>
					<div id="ql-tktkdktt">53</div>
				</td>
			</tr>
			<tr>
				<td>??ang b??? ch???n:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-tkdbc"></div>
					<div id="ql-tktkdbc">29</div>
				</td>
			</tr>
		</table>
	`;
}
function JS_Html_TKGD(){
	return `
		<div class="mb-10 mt5 dfr">
			<div class="indam gachchan">Th???ng k?? giao d???ch</div>
			<input id="ql-tkgd-cn" class="ql-tk-cn" type="month">
		</div>
		<table>
			<tr>
				<td class="w180p">S??? tin ????ng trong th??ng:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-stdtt"></div>
					<div id="ql-tkstdtt">532</div>
				</td>
			</tr>
			<tr>
				<td>S??? tin ??ang b??n:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-stdb"></div>
					<div id="ql-tkstdb">333</div>
				</td>
			</tr>
			<tr>
				<td>S??? tin b??n th??nh c??ng:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-stbtc"></div>
					<div id="ql-tkstbtc">162</div>
				</td>
			</tr>
			<tr>
				<td>S??? tin h???y b??n:</td>
				<td class="pl10 dfr">
					<div class="mt5 mr5 ql-cht-st m-sthb"></div>
					<div id="ql-tksthb">37</div>
				</td>
			</tr>
		</table>
	`;
}
function JS_LocSoDienThoai(){
	$("#qltk-lsdt").keyup(function(event){
		var url = window.location.pathname.toString().toLowerCase().split("/");
		if(event.keyCode === 13) {
			var lsdt = $("#qltk-lsdt").val();
			window.location = BASE_URL+`quanlywebsite/taikhoan/1/1//${lsdt}`;
		}
	});
}
function JS_LocTenTaiKhoan(){
	$("#qltk-lttk").keyup(function(event){
		var url = window.location.pathname.toString().toLowerCase().split("/");
		if(event.keyCode === 13) {
			var lttk = $("#qltk-lttk").val();
			window.location = BASE_URL+`quanlywebsite/taikhoan/1/1/${lttk}`;
		}
	});
}
function JS_TuyChonLocDanhSachTaiKhoan(){
	$("#qltk-ltc").change(function(){
		var tuychon = $("#qltk-ltc").val();
		window.location = BASE_URL+`quanlywebsite/taikhoan/1/${tuychon}`;
	});
}
function JS_ChonTrangTruocSauDanhSachTaiKhoan() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined || trang == 1) {$("#dstk-trang-truoc").html(''); trang = 1;}
	var tuychon = $("#qltk-ltc").val();
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTaiKhoan",
		dataType: 'JSON',
		data: {
			tentaikhoan: '',
			sodienthoai: '',
			tuychon: tuychon,
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/10);
			if(trang >= tongtrang) {$("#dstk-trang-sau").html('');}
		},
		error: function(res){
			console.log(res);
		}
	});
	$("#dstk-trang-truoc").click(function(){
		window.location = `${BASE_URL}quanlywebsite/taikhoan/${trang-1}/${tuychon}`;
	});
	$("#dstk-trang-sau").click(function(){
		window.location = `${BASE_URL}quanlywebsite/taikhoan/${parseInt(trang)+1}/${tuychon}`;
	});
	
}
function JS_ChonTrangDanhSachTaiKhoan() {
	$("#qltk-ds-trang").change(function(){
		var tuychon = $("#qltk-ltc").val();
		var trang = $("#qltk-ds-trang").val();
		window.location = `${BASE_URL}quanlywebsite/taikhoan/${trang}/${tuychon}`;
	});
}
function JS_HienThiTrangDanhSachTaiKhoan() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	var tuychon = $("#qltk-ltc").val();
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTaiKhoan",
		dataType: 'JSON',
		data: {
			tentaikhoan: '',
			sodienthoai: '',
			tuychon: tuychon,
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/10);
			var html = '';
			for(var i = 1; i <= tongtrang; i++){
				if(trang == i){
					html += `
						<option selected="selected" value="${i}">Trang ${i}</option>
					`;
				}else{
					html += `
						<option value="${i}">Trang ${i}</option>
					`;
				}
			}
			$("#qltk-ds-trang").html(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiDanhSachTaiKhoan() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	var tentaikhoan = url[6];
	if(tentaikhoan == undefined) {tentaikhoan = ''}
	var sodienthoai = url[7];
	if(sodienthoai == undefined) {sodienthoai = ''}
	var tuychon = url[5];
	if(tuychon == undefined) {tuychon = 1;}
	else{
		$("#qltk-ltc").val(tuychon);
		$("#qltk-ltc").change();
	}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTaiKhoan",
		dataType: 'JSON',
		data: {
			tentaikhoan: tentaikhoan,
			sodienthoai: sodienthoai,
			tuychon: tuychon,
			trang: trang
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length == 0){
				// $("#ql-dstk-dm").html('Kh??ng c?? th??ng tin.');
				$("#ql-dstk-table-tt").html(`
					<tr>
						<td width="35">0</td>
						<td width="200">Tr???ng</td>
						<td width="150">Tr???ng</td>
						<td width="250">Tr???ng</td>
						<td width="250">Tr???ng</td>
						<td class="xdtbs-tuychon" width="102">
							Tr???ng
						</td>
					</tr>
				`);
			}else{
				$.each(res, function(index, value){
					var html = '';
					html += `
						<tr ${JS_TrangThaiChan(value['voHieuHoa'])} >
							<td width="35">${((trang-1)*10)+1+index}</td>
							<td width="200">${value['tenTaiKhoan']}</td>
							<td width="150">${value['soDienThoai']}</td>
							<td width="250">${value['email']}</td>
							<td width="250">${value['diaChi']}</td>
							<td class="xdtbs-tuychon" width="102">
								${JS_TuyChonTaiKhoan(value['voHieuHoa'],value['idTaiKhoan'])}
							</td>
						</tr>
					`;
					$("#ql-dstk-table-tt").append(html);
				});
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_TrangThaiChan(vhh){
	if(vhh == 1){
		return `style = "background-color:#bdc3c7"`;
	}
}
function JS_TuyChonTaiKhoan(vohieuhoa,idtaikhoan){
	if(vohieuhoa == 0){
		return `<a class="qltk-chan" onclick = "JS_ChanTaiKhoan(1,${idtaikhoan})">Ch???n</a>`;
	}else{
		return `<a class="qltk-bochan" onclick = "JS_ChanTaiKhoan(0,${idtaikhoan})">B??? ch???n</a>`;
	}
}
function JS_ChanTaiKhoan(vhh,idtaikhoan){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_ChanTaiKhoan",
		dataType: 'JSON',
		data: {
			vhh: vhh,
			idtaikhoan: idtaikhoan
		},
		success: function(res){
			console.log(res);
			$("#ql-dstk-table-tt").html('');
			JS_HienThiDanhSachTaiKhoan();
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_XemDonHang_GiaoHang(){
	$("#xdh-btn-giaohang").click(function(){
		var url = window.location.pathname.toString().toLowerCase().split("/");
		var iddonhang = url[4];
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_GiaoDonHang",
			data: {
				iddonhang: iddonhang
			},
			success: function(res){
				history.back();
			},
			error: function(res){
				console.log(res);
			}
		});
	});
}
function JS_XemDonHang_HuyDonHang(){
	$("#xdh-btn-huydon").click(function(){
		var url = window.location.pathname.toString().toLowerCase().split("/");
		var iddonhang = url[4];
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_HuyDonHang",
			data: {
				iddonhang: iddonhang
			},
			success: function(res){
				history.back();
			},
			error: function(res){
				console.log(res);
			}
		});
	});
}
function JS_XemDonHang_XacNhan(){
	$("#xdh-btn-gh").click(function(){
		$("#xdh-tb-giaohang").modal("show");
		JS_XemDonHang_GiaoHang();
	});
	$("#xdh-btn-hd").click(function(){
		$("#xdh-tb-huydon").modal("show");
		JS_XemDonHang_HuyDonHang();
	});
}
function JS_XemDonHang(){
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var iddonhang = url[4];
	if(iddonhang != undefined){
		JS_XemDonHang_ThongTin(iddonhang);
		JS_XemDonHang_DanhSachSach(iddonhang);
	}else{
		history.back();
	}
}
function JS_XemDonHang_DanhSachSach(iddonhang){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_XemDonHang_DanhSachSach",
		dataType: 'JSON',
		data: {
			iddonhang: iddonhang
		},
		success: function(res){
			res = JSON.parse(res);
			var html = ``;
			$.each(res, function(index, value){
				html += `
					<div>
						<span>${index + 1}. </span>
						<span>${value['tenSach']}</span>
						<ul>
							<li>
								<span>Ng?????i b??n:</span>
								<span>${value['tenTaiKhoan']}</span>
							</li>
							<li>
								<span>S??? ??i???n tho???i:</span>
								<span>${value['soDienThoai']}</span>
							</li>
							<li>
								<span>Gi?? s??ch:</span>
								<span>${numeral(value['giaSach']).format('0,0')}</span>
								<span> ??</span>
							</li>
							<li>
								<span>Tr???ng th??i:</span>
								<span>
									<select id="ql-xdh-tt${value['idTBS']}" onchange="JS_DoiTrangThaiCTDH(${value['idTBS']})">
										<option value="0">Ch??a x??c nh???n</option>
										<option value="1">C?? h??ng</option>
										<option value="2">Kh??ng c?? h??ng</option>
									</select>
								</span>
							</li>
							<li>
								<span>Ghi ch??:</span>
							</li>
							<span class="ql-xdh-gchu">
								<textarea id="ql-xdh-ghichu${value['idTBS']}" onkeyup="JS_GhiChuCTDH(${value['idTBS']})" cols="30" rows="2"></textarea>
							</span>
						</ul>
					</div>
				`;
			});
			$("#xdh-ds-sach").html(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_GhiChuCTDH(idtin){
	var gc = $("#ql-xdh-ghichu"+idtin).val();
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GhiChuCTDH",
		dataType: 'JSON',
		data: {
			idtin: idtin,
			gc: gc
		},
		success: function(res){
			console.log(res);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_DoiTrangThaiCTDH(idtin){
	var tt = $("#ql-xdh-tt"+idtin).val();
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DoiTrangThaiCTDH",
		dataType: 'JSON',
		data: {
			idtin: idtin,
			tt: tt
		},
		success: function(res){
			console.log(res);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_XemDonHang_ThongTin(iddonhang){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_XemDonHang_ThongTin",
		dataType: 'JSON',
		data: {
			iddonhang: iddonhang
		},
		success: function(res){
			res = JSON.parse(res)[0];
			$("#xdh-nguoinhan").html(res.nguoiNhan);
			$("#xdh-sdt").html(res.soDienThoai);
			$("#xdh-diachi").html(res.diaChi);
			$("#xdh-mbd").html(res.maBuuDien);
			$("#xdh-ngaydat").html(moment(res.thoiGian).format('DD/MM/YYYY'));
			if(res.kieuThanhToan == 1){
				$("#xdh-ktt").html("Tr??? ti???n khi nh???n h??ng.");
			}else{
				$("#xdh-ktt").html("Thanh to??n ng??n h??ng.");
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_XacNhanHuyDonHang(iddonhang){
	$("#qldh-tb-huydonhang").modal("show");
	JS_HuyDonHang(iddonhang);
}
function JS_HuyDonHang(iddonhang){
	$("#qldh-btn-huydonhang").click(function(){
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_HuyDonHang",
			data: {
				iddonhang: iddonhang
			},
			success: function(res){
				JS_page_quanly_donhang();
			},
			error: function(res){
				console.log(res);
			}
		});
	});
}
function JS_ChonTrangTruocSauDanhSachDonDatHangQuanLy() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined || trang == 1) {$("#dsddh-trang-truoc").html(''); trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachDonDatHang",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			if(trang >= tongtrang) {$("#dsddh-trang-sau").html('');}
		},
		error: function(res){
			console.log(res);
		}
	});
	$("#dsddh-trang-truoc").click(function(){
		window.location = `${BASE_URL}quanlywebsite/danhsachdonhang/${trang-1}`;
	});
	$("#dsddh-trang-sau").click(function(){
		window.location = `${BASE_URL}quanlywebsite/danhsachdonhang/${parseInt(trang)+1}`;
	});
	
}
function JS_ChonTrangDanhSachDonDatHangQuanLy() {
	$("#dsddh-trang").change(function(){
		var trang = $("#dsddh-trang").val();
		window.location = `${BASE_URL}quanlywebsite/xetduyetdonhang/${trang}`;
	});
}
function JS_HienThiTrangDanhSachDonDatHangQuanLy() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachDonDatHang",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			var html = '';
			for(var i = 1; i <= tongtrang; i++){
				if(trang == i){
					html += `
						<option selected="selected" value="${i}">Trang ${i}</option>
					`;
				}else{
					html += `
						<option value="${i}">Trang ${i}</option>
					`;
				}
			}
			$("#dsddh-trang").html(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiDanhSachDonDatHang() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachDonDatHang",
		dataType: 'JSON',
		data: {
			trang: trang
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length == 0){
				$("#dsddh-dm").html('Kh??ng c?? tin m???i.');
				$("#dsddh-htt").html('');
			}else{
				$("#dsddh-dm").html(`
					<table class="xdtbs-table bdbt-none">
						<tr class="indam">
							<td width="35">STT</td>
							<td width="200">S??ch</td>
							<td width="70">Ph?? ship</td>
							<td width="80">T???ng gi??</td>
							<td width="90">Ng?????i nh???n</td>
							<td width="90">S??T</td>
							<td width="120">?????a ch???</td>
							<td width="100">M?? b??u ??i???n</td>
							<td width="100">Thanh to??n</td>
							<td width="81">T??y ch???n</td>
						</tr>
					</table>
				`);
				
				$.each(res, function(index, value){
					var html = '';
					html += `
						<tr>
							<td width="35">${((trang-1)*6)+1+index}</td>
							<td width="200">
								${JS_HienThiDSSachHoaDon(value['ds_tensach'])}
							</td>
							<td width="70">${value['phiShip']}</td>
							<td width="80">${value['tongTien']}</td>
							<td width="90">${value['nguoiNhan']}</td>
							<td width="90">${value['soDienThoai']}</td>
							<td width="120">${value['diaChi']}</td>
							<td width="100">${value['maBuuDien']}</td>
							<td width="100">${JS_KieuThanhToan(value['kieuThanhToan'])}</td>
							<td class="xdtbs-tuychon" width="80">
								<a class="xdtbs-dang" href="${BASE_URL}quanlywebsite/xemdonhang/${value['idDonHang']}">Xem</a>
								<a class="xdtbs-huy" onclick="JS_XacNhanHuyDonHang(${value['idDonHang']})">H???y</a>
							</td>
						</tr>
					`;
					$("#dstt-table-tt").append(html);
				});
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiDSSachHoaDon(ds){
	var arr = ds.split(',');
	var d = '';
	for (var i = 0; i < arr.length; i++) {
		d += (i+1)+`. `+arr[i]+"<br>";
	}
	return d;
}
function JS_KieuThanhToan(kieuthanhtoan){
	if(kieuthanhtoan == 1){
		return `Tr??? ti???n khi nh???n h??ng.`;
	}else{
		return `???? chuy???n kho???n`;
	}
}
function JS_ChonTrangTruocSauDanhSachTinTuc() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined || trang == 1) {$("#dstt-trang-truoc").html(''); trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinTucQuanLy",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			if(trang >= tongtrang) {$("#dstt-trang-sau").html('');}
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
	$("#dstt-trang-truoc").click(function(){
		window.location = `${BASE_URL}quanlywebsite/danhsachtintuc/${trang-1}`;
	});
	$("#dstt-trang-sau").click(function(){
		window.location = `${BASE_URL}quanlywebsite/danhsachtintuc/${parseInt(trang)+1}`;
	});
	
}
function JS_ChonTrangDanhSachTinTuc() {
	$("#dstt-trang").change(function(){
		var trang = $("#dstt-trang").val();
		window.location = `${BASE_URL}quanlywebsite/danhsachtintuc/${trang}`;
	});
}
function JS_HienThiTrangDanhSachTinTucQuanLy() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinTucQuanLy",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			var html = '';
			for(var i = 1; i <= tongtrang; i++){
				if(trang == i){
					html += `
						<option selected="selected" value="${i}">Trang ${i}</option>
					`;
				}else{
					html += `
						<option value="${i}">Trang ${i}</option>
					`;
				}
			}
			$("#dstt-trang").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiDanhSachTinTucQuanLy() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinTucQuanLy",
		dataType: 'JSON',
		data: {
			trang: trang
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length == 0){
				$("#dstt-dm").html('Kh??ng c?? tin m???i.');
				$("#dstt-htt").html('');
			}else{
				$("#dstt-dm").html(`
					<table class="xdtbs-table bdbt-none">
						<tr class="indam">
							<td width="35">STT</td>
							<td width="100">H??nh ???nh</td>
							<td width="225">Ti??u ?????</td>
							<td width="120">Tag</td>
							<td width="100">Ng?????i vi???t</td>
							<td width="90">Ng??y ????ng</td>
							<td width="90">L?????t xem</td>
							<td width="120">L?????t b??nh lu???n</td>
							<td width="101">T??y ch???n</td>
						</tr>
					</table>
				`);
				
				$.each(res, function(index, value){
					var html = '';
					html += `
						<tr>
							<td width="35">${((trang-1)*6)+1+index}</td>
							<td width="100">
								<img class="xdtbs-anhsach" src="${BASE_URL + 'public/hinhanh/tintuc/' + value['anhDaiDien']}">
							</td>
							<td class="dstt-td-ql" width="225">${value['tieuDe']}</td>
							<td width="120">${value['tags']}</td>
							<td width="100">${value['nguoiViet']}</td>
							<td width="90">${value['ngayDang']} ??</td>
							<td class="ta-ct" width="90">${value['luotXem']}</td>
							<td class="ta-ct" width="120">${value['luotBinhLuan']}</td>
							<td class="xdtbs-tuychon" width="100">
								<a class="xdtbs-dang" href="${BASE_URL}tintuc/xem/${value['idTinTuc']}" target="_blank">Xem</a>
								<a class="xdtbs-huy" onclick="">X??a tin</a>
							</td>
						</tr>
					`;
					$("#dstt-table-tt").append(html);
				});
			}
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_ChonTrangDanhSachTin() {
	$("#dstbs-trang").change(function(){
		var trang = $("#dstbs-trang").val();
		window.location = `${BASE_URL}quanlywebsite/danhsachtinbansach/${trang}`;
	});
}
function JS_ChonTrangTruocSauDanhSachTin() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined || trang == 1) {$("#dstbs-trang-truoc").html(''); trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinBanSach",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			if(trang >= tongtrang) {$("#dstbs-trang-sau").html('');}
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
	$("#dstbs-trang-truoc").click(function(){
		window.location = `${BASE_URL}quanlywebsite/danhsachtinbansach/${trang-1}`;
	});
	$("#dstbs-trang-sau").click(function(){
		window.location = `${BASE_URL}quanlywebsite/danhsachtinbansach/${parseInt(trang)+1}`;
	});
	
}
function JS_HienThiTrangDanhSachTinBanSach() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinBanSach",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			var html = '';
			for(var i = 1; i <= tongtrang; i++){
				if(trang == i){
					html += `
						<option selected="selected" value="${i}">Trang ${i}</option>
					`;
				}else{
					html += `
						<option value="${i}">Trang ${i}</option>
					`;
				}
			}
			$("#dstbs-trang").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiDanhSachTinBanSach() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinBanSach",
		dataType: 'JSON',
		data: {
			trang: trang
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length == 0){
				$("#dstbs-dst-dm").html('Khong co tin moi');
				$("#dstbs-htt").html('');
			}else{
				$("#dstbs-dst-dm").html(`
					<table class="xdtbs-table bdbt-none">
						<tr class="indam">
							<td width="35">STT</td>
							<td width="100">H??nh s??ch</td>
							<td width="225">T??n s??ch</td>
							<td width="140">T??c gi???</td>
							<td width="100">Danh m???c</td>
							<td width="80">Gi?? s??ch</td>
							<td width="110">Ng?????i ????ng</td>
							<td width="100">Th???i gian</td>
							<td width="101">T??y ch???n</td>
						</tr>
					</table>
				`);
				var html = '';
				$.each(res, function(index, value){
					html += `
						<tr>
							<td width="35">${((trang-1)*6)+1+index}</td>
							<td width="100">
								<img class="xdtbs-anhsach" src="${BASE_URL+ 'public/hinhanh/sach/' + value['linkHinhAnhSach']}">
							</td>
							<td width="225">${value['tenSach']}</td>
							<td width="140">${value['tacGia']}</td>
							<td width="100">${value['tenDanhMuc']}</td>
							<td width="80">${value['giaSach']} ??</td>
							<td width="110">${value['tenTaiKhoan']}</td>
							<td width="100">${value['ngayDang']}</td>
							<td class="xdtbs-tuychon" width="100">
								<a class="xdtbs-dang" href="${BASE_URL}danhsach/chitietsach/${value['idSach']}" target="_blank">Xem</a>
								<a class="xdtbs-huy" onclick="">X??a tin</a>
							</td>
						</tr>
					`;
				});
				$("#dstbs-table-tt").html(html);
			}
		},
		error: function(res){
			console.log(res);
			// alert('loi ds tin');
		}
	});
}
function JS_HienThiTrangXetDuyetTinBanSach() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinBanSachChuaDuyet",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			var html = '';
			for(var i = 1; i <= tongtrang; i++){
				if(trang == i){
					html += `
						<option selected="selected" value="${i}">Trang ${i}</option>
					`;
				}else{
					html += `
						<option value="${i}">Trang ${i}</option>
					`;
				}
			}
			$("#xdtbs-trang").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_ChonTrangXetDuyetTin() {
	$("#xdtbs-trang").change(function(){
		var trang = $("#xdtbs-trang").val();
		window.location = `${BASE_URL}quanlywebsite/xetduyettinbansach/${trang}`;
	});
}
function JS_ChonTrangTruocSauXetDuyetTin() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined || trang == 1) {$("#xdtbs-trang-truoc").html(''); trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinBanSachChuaDuyet",
		dataType: 'JSON',
		data: {
			trang: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var tongtrang = Math.ceil(res.length/6);
			if(trang >= tongtrang) {$("#xdtbs-trang-sau").html('');}
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
	$("#xdtbs-trang-truoc").click(function(){
		window.location = `${BASE_URL}quanlywebsite/xetduyettinbansach/${trang-1}`;
	});
	$("#xdtbs-trang-sau").click(function(){
		window.location = `${BASE_URL}quanlywebsite/xetduyettinbansach/${parseInt(trang)+1}`;
	});
	
}
function JS_XetDuyet_Dang(idsach) {
	if(confirm('B???n mu???n ????ng b??i n??y?')){
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_XetDuyet_Dang",
			dataType: 'JSON',
			data: {
				idsach: idsach
			},
			success: function(res){
				if(res == true){
					JS_HienThiDanhSachXetDuyetTinBanSach();
				}
			},
			error: function(res){
				console.log(res);
			}
		});
	}
}
function JS_XetDuyet_Huy(idsach) {
	if(confirm('B???n mu???n h???y b??i n??y?')){
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_XetDuyet_Huy",
			dataType: 'JSON',
			data: {
				idsach: idsach
			},
			success: function(res){
				if(res == true){
					JS_HienThiDanhSachXetDuyetTinBanSach();
				}
			},
			error: function(res){
				console.log(res);
			}
		});
	}
}
function JS_HienThiDanhSachXetDuyetTinBanSach() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var trang = url[4];
	if(trang == undefined) {trang = 1;}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DanhSachTinBanSachChuaDuyet",
		dataType: 'JSON',
		data: {
			trang: trang
		},
		success: function(res){
			res = JSON.parse(res);
			if(res.length == 0){
				$("#xdtbs-dst-dm").html('Kh??ng c?? tin m???i');
				$("#xdtbs-htt").html('');
			}else{
				$("#xdtbs-dst-dm").html(`
					<table class="xdtbs-table bdbt-none">
						<tr class="indam">
							<td width="35">STT</td>
							<td width="100">H??nh s??ch</td>
							<td width="225">T??n s??ch</td>
							<td width="140">T??c gi???</td>
							<td width="100">Danh m???c</td>
							<td width="80">Gi?? s??ch</td>
							<td width="110">Ng?????i ????ng</td>
							<td width="100">Th???i gian</td>
							<td width="101">T??y ch???n</td>
						</tr>
					</table>
				`);
				var html = '';
				$.each(res, function(index, value){
					html += `
						<tr>
							<td width="35">${((trang-1)*6)+1+index}</td>
							<td width="100">
								<img class="xdtbs-anhsach" src="${BASE_URL+ 'public/hinhanh/sach/' + value['linkHinhAnhSach']}">
							</td>
							<td width="225">${value['tenSach']}</td>
							<td width="140">${value['tacGia']}</td>
							<td width="100">${value['tenDanhMuc']}</td>
							<td width="80">${value['giaSach']} ??</td>
							<td width="110">${value['tenTaiKhoan']}</td>
							<td width="100">${value['ngayDang']}</td>
							<td class="xdtbs-tuychon" width="100">
								<a class="xdtbs-dang" onclick="JS_XetDuyet_Dang(${value['idSach']})">????ng b??i</a>
								<a class="xdtbs-huy" onclick="JS_XetDuyet_Huy(${value['idSach']})" >H???y b???</a>
							</td>
						</tr>
					`;
				});
				$("#xdtbs-table-tt").html(html);
			}
		},
		error: function(res){
			console.log(res);
			// alert('loi ds tin xet duyet');
		}
	});
}
function JS_KiemTraDangNhapAdmin(){
	var qltadm = $("#ql-tadm").val();
	var qlmk = $("#ql-mk").val();
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_KiemTraDangNhapAdmin",
		dataType: 'JSON',
		data: {
			qltadm: qltadm,
			qlmk: qlmk
		},
		success: function(res){
			res = JSON.parse(res);
			if(res == null){
				alert("T??n t??i kho???n ho???c m???t kh???u sai, m???i nh???p l???i!");
				JS_TaoCode();
			}else{
				window.location = BASE_URL+"quanlywebsite";
			}
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_BieuDoGiaoDichThang(){
	var chart = new CanvasJS.Chart("ql-bdgd", {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: ""
		},
		data: [{
			type: "pie",
			startAngle: 270,
			yValueFormatString: "##0.00\"%\"",
			indexLabel: "{label} {y}",
			dataPoints: [
			{y: 68.57, label: "Tin ??ang b??n"},
			{y: 25.82, label: "B??n th??nh c??ng"},
			{y: 5.61, label: "H???y b??n"}
			]
		}]
	});
	chart.render();
}
function JS_BieuDoLuongTinDangNam(){
	var chart = new CanvasJS.Chart("ql-bdltd", {
		animationEnabled: true,
		theme: "light1",
		title:{
			text: ""
		},
		axisY: {
			title: "S??? tin"
		},
		data: [{        
			type: "column",  
			showInLegend: true, 
			legendMarkerColor: "??hite",
			legendText: " ",
			dataPoints: [      
			{ y: 328,  label: "Th??ng 1" },
			{ y: 276,  label: "Th??ng 2" },
			{ y: 532,  label: "Th??ng 3" },
			{ y: 482,  label: "Th??ng 4" },
			{ y: 269,  label: "Th??ng 5" },
			{ y: 381,  label: "Th??ng 6" },
			{ y: 532,  label: "Th??ng 7" },
			{ y: 377,  label: "Th??ng 8" },
			{ y: 218,  label: "Th??ng 9" },
			{ y: 362,  label: "Th??ng 10" },
			{ y: 148,  label: "Th??ng 11" },
			{ y: 330,  label: "Th??ng 12" }
			]
		}]
	});
	chart.render();
}
function JS_TKGD_BieuDoGiaoDichTongHop(){
	var chart = new CanvasJS.Chart("ql-tkgd-th", {
		title: {
			text: ""
		},
		axisX: {
			valueFormatString: "MM YYYY"
		},
		axisY2: {
			title: "Tin b??n s??ch",
			prefix: "",
			suffix: " tin"
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			verticalAlign: "top",
			horizontalAlign: "center",
			dockInsidePlotArea: true,
			itemclick: toogleDataSeries
		},
		data: [{
			type:"line",
			axisYType: "secondary",
			name: "????ng b??n",
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "#,### tin",
			dataPoints: [		
			{ y: 228,  label: "Th??ng 1" },
			{ y: 176,  label: "Th??ng 2" },
			{ y: 142,  label: "Th??ng 3" },
			{ y: 282,  label: "Th??ng 4" },
			{ y: 169,  label: "Th??ng 5" },
			{ y: 281,  label: "Th??ng 6" },
			{ y: 132,  label: "Th??ng 7" },
			{ y: 177,  label: "Th??ng 8" },
			{ y: 118,  label: "Th??ng 9" },
			{ y: 262,  label: "Th??ng 10" },
			{ y: 148,  label: "Th??ng 11" },
			{ y: 230,  label: "Th??ng 12" }
			]
		},
		{
			type: "line",
			axisYType: "secondary",
			name: "H???y b??n",
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "#,### tin",
			dataPoints: [
			{ y: 28,  label: "Th??ng 1" },
			{ y: 16,  label: "Th??ng 2" },
			{ y: 32,  label: "Th??ng 3" },
			{ y: 42,  label: "Th??ng 4" },
			{ y: 29,  label: "Th??ng 5" },
			{ y: 11,  label: "Th??ng 6" },
			{ y: 32,  label: "Th??ng 7" },
			{ y: 17,  label: "Th??ng 8" },
			{ y: 18,  label: "Th??ng 9" },
			{ y: 32,  label: "Th??ng 10" },
			{ y: 18,  label: "Th??ng 11" },
			{ y: 30,  label: "Th??ng 12" }
			]
		},
		{
			type: "line",
			axisYType: "secondary",
			name: "B??n th??nh c??ng",
			showInLegend: true,
			markerSize: 0,
			yValueFormatString: "#,### tin",
			dataPoints: [
			{ y: 84,  label: "Th??ng 1" },
			{ y: 78,  label: "Th??ng 2" },
			{ y: 96,  label: "Th??ng 3" },
			{ y: 128,  label: "Th??ng 4" },
			{ y: 119,  label: "Th??ng 5" },
			{ y: 75,  label: "Th??ng 6" },
			{ y: 90,  label: "Th??ng 7" },
			{ y: 82,  label: "Th??ng 8" },
			{ y: 186,  label: "Th??ng 9" },
			{ y: 70,  label: "Th??ng 10" },
			{ y: 94,  label: "Th??ng 11" },
			{ y: 50,  label: "Th??ng 12" }
			]
		}]
	});
chart.render();
}
function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}
