function JS_page_tintuc() {
	JS_HienThiTagTinTuc();
	JS_HienThiDanhSachTinTucTongHop();
	JS_HienThiDanhSachTinDeCuTrangTinTuc();
	JS_HienThiDanhSachTinTuc("ttc","#tt-ttc");
	JS_HienThiDanhSachTinTuc(1,"#tt-sk");
}
function JS_page_tintuc_trangchu() {
	JS_HienThiDanhSachTinDeCuTrangChu("ttc","#tc-tdc-ttc");
	JS_HienThiDanhSachTinDeCuTrangChu(1,"#tc-tdc-sk");
}
function JS_page_tintuc_xem() {
	JS_HienThiTagTinTuc();
	JS_HienThiChiTietTinTuc();
	JS_HienThiBinhLuanTinTuc();
	JS_HienThiTinLienQuan("#xtt-ds-tlq");
}
function JS_page_tintuc_danhsach() {
	var dstt_sl = 5;
	$(document).ready(function() {
		$("#tt-dstt-xt").click(function(){
			dstt_sl += 5;
			JS_HienThiDanhSachTinTucTheoTag(dstt_sl,"tag","#tt-dstt");
		});
	});
	
	JS_HienThiTagTinTuc();
	JS_HienThiDanhSachTinTucTheoTag(dstt_sl,"tag","#tt-dstt");

}
function JS_HienThiDanhSachTinTucTheoTag(dstt_sl,tag,id) {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var tag = url[4];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinTheoTag",
		dataType: 'JSON',
		data: {
			soluong: dstt_sl,
			tag: tag
		},
		success: function(res){
			res = JSON.parse(res);
			if(dstt_sl > res.length) {$("#tt-dstt-xt").html('');}
			var html = '';
			$.each(res, function(index, value){
				html += `
					<a class="tt-thea" href="${BASE_URL}tintuc/xem/${value['idTinTuc']}" target="_blank">
						<div class="tintuc-one">
							<img src="${BASE_URL + 'public/hinhanh/tintuc/' +value['anhDaiDien']}">
							<div class="tintuc-one-mota">
								<div>
									<span class="tintuc-one-tag">
										${value['tenTagTinTuc']}
									</span>
								</div>
								<div class="tintuc-one-mota-content">
									<span class="content-tieude">
										${value['tieuDe']}
									</span>
									<span class="content-time">
										${moment(value['ngayDang']).locale('vi').fromNow()} - ${value['luotXem']} luot xem
									</span>
									<span class="content-tomtat">
										${value['tomTat']}
									</span>
								</div>
							</div>
						</div>
					</a>
				`;
			});
			$(id).html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiTinLienQuan(id) {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtintuc = url[4];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinLienQuan",
		dataType: 'JSON',
		data: {
			soluong: 6,
			idtintuc: idtintuc
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<div class="xtt-tlq">
						<a href="${BASE_URL}tintuc/xem/${value['idTinTuc']}">
							<img src="${BASE_URL + 'public/hinhanh/tintuc/' +value['anhDaiDien']}">
							<div class="xtt-tlq-td">${value['tieuDe']}</div>
						</a>
					</div>
				`;
			});
			$(id).html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiDanhSachTinDeCuTrangChu(loai,id){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinDeCu",
		dataType: 'JSON',
		data: {
			soluong: 5,
			idtag: loai
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<div class="khung-baiviet">
						<a class="khung-baiviet-a" href="${BASE_URL}tintuc/xem/${value['idTinTuc']}">
							<div class="ten-baiviet">
								<span class="tbv">${index+1}. ${value['tieuDe']}</span>
							</div>
							<div class="tomtat-baiviet">
								<img class="tt-bv-anh" src="${BASE_URL + 'public/hinhanh/tintuc/' +value['anhDaiDien']}">
								<div>
									<span class="catchuoi">
										${value['tomTat']}
									</span>
								</div>
								
								<span class="doctiep" href="#">
									<<đọc tiếp>>
								</span>
							</div>
						</a>
					</div>
				`;
			});
			$(id).html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiDanhSachTinTuc(loai,id) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinTuc",
		dataType: 'JSON',
		data: {
			soluong: 5,
			idtag: loai
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<a class="tt-thea" href="${BASE_URL}tintuc/xem/${value['idTinTuc']}">
						<div class="tintuc-one">
							<img src="${BASE_URL + 'public/hinhanh/tintuc/' +value['anhDaiDien']}">
							<div class="tintuc-one-mota">
								<div>
									<span class="tintuc-one-tag">
										${value['tenTagTinTuc']}
									</span>
								</div>
								<div class="tintuc-one-mota-content">
									<span class="content-tieude">
										${value['tieuDe']}
									</span>
									<span class="content-time">
										${moment(value['ngayDang']).locale('vi').fromNow()} - ${value['luotXem']} luot xem
									</span>
									<span class="content-tomtat">
										${value['tomTat']}
									</span>
								</div>
							</div>
						</div>
					</a>
				`;
			});
			$(id).html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiDanhSachTinDeCuTrangTinTuc() {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinDeCu",
		dataType: 'JSON',
		data: {
			soluong: 5,
			idtag: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<div class="tintuc-chung-xemnhieu">
						<a class="tt-thea" href="${BASE_URL}tintuc/xem/${value['idTinTuc']}">
							<img src="${BASE_URL + 'public/hinhanh/tintuc/' +value['anhDaiDien']}">
							<div class="tintuc-chung-xemnhieu-mota">
								<span class="tt-tdc-stt">${index+1}</span>
								<div class="tt-tdc-tt">
									<a class="loaitin inhoa" href="${value['linkTag']}">${value['tenTagTinTuc']}</a>
									<span>${value['tieuDe']}</span>
								</div>
							</div>
						</a>
					</div>
				`;
			});
			$("#tt-tdc").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}
function JS_HienThiDanhSachTinTucTongHop() {
	// trang tin tuc
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachTinTuc",
		dataType: 'JSON',
		data: {
			soluong: 4,
			idtag: "all"
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<a class="tt-thea" href="${BASE_URL}tintuc/xem/${value['idTinTuc']}">
						<div class="tintuc-chung-moinhat" style="background-image: url(${BASE_URL + 'public/hinhanh/tintuc/' +value['anhDaiDien']});">
							<div class="tt-ttc-bg">
								<div class="tintuc-chung-moinhat-mota">
									<span class="loaitin">${value['tenTagTinTuc']}</span>
									<span>/ ${moment(value['ngayDang']).locale('vi').fromNow()}</span>
									<div class="mota-tieude">
										<span>
											${value['tieuDe']}
										</span>
									</div>
								</div>
							</div>
						</div>
					</a>
				`;
			});
			$("#tt-th").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});

}
function JS_HienThiChiTietTinTuc() {
	// trang chi tiet
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtintuc = url[4];
	JS_XemTinTuc(idtintuc);
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetTinTuc",
		dataType: 'JSON',
		data:{
			idtintuc: idtintuc
		},
		success: function(res){
			res = JSON.parse(res);
			res = res[0];
			$("#xemtintuc-tieude").html(res.tieuDe);
			$("#xemtintuc-thoigian").html(moment(res.ngayDang).format("HH:MM DD/MM/YYYY"));
			$("#xemtintuc-luotxem").html(res.luotXem + " lượt xem");
			$("#xemtintuc-tomtat").html(res.tomTat);
			$("#xemtintuc-noidung").html(res.noiDung);
			$("#xemtintuc-nguoiviet").html(res.nguoiViet);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetTags",
		dataType: 'JSON',
		data:{
			idtintuc: idtintuc
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value){
				html += `
					<a href="${BASE_URL}danhsachtintuc/${value['tag']}" style="background-color:${value['mauSac']}">${value['tenTagTinTuc']}</a>
				`;
			});
			$("#xemtintuc-tags").html(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_XemTinTuc() {
	// tăng lượt xem
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtintuc = url[4];
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_XemTinTuc",
		dataType: 'JSON',
		data:{
			idtintuc: idtintuc
		},
		success: function(res){
			console.log(res);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiBinhLuanTinTuc() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var idtintuc = url[4];
	JS_HienThiDanhSachBinhLuan(idtintuc);
	$.ajax({
		url: BASE_URL+"Ajax/AJ_GetTaiKhoanHienTai",
		dataType: 'JSON',
		success: function(res){
			var avt = res.anh;
			var ten = res.ten;
			$("#xtt-avt-bl").attr({"src":BASE_URL + 'public/hinhanh/anhdaidien/' + avt});
			$("#xtt-btn-gbl").click(function(){ JS_GuiBinhLuan(ten,avt,idtintuc); });
			$("#xtt-ndbl").keyup(function(){
				if(event.keyCode === 13){ JS_GuiBinhLuan(ten,avt,idtintuc); }
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_BinhLuan(ten,avt,noidung,thoigian){
	return `
		<div class="xtt-o-bl">
			<img src="${BASE_URL + 'public/hinhanh/anhdaidien/' + avt}">
			<div class="xtt-tt-bl">
				<div class="bl-tk">${ten}</div>
				<div class="bl-nd">${noidung}</div>
				<div class="bl-tg">${thoigian}</div>
			</div>
		</div>
	`;
}
function JS_GhiBinhLuan(idtintuc,noidungbinhluan) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GhiBinhLuan",
		data:{
			idtintuc: idtintuc,
			noidungbinhluan: noidungbinhluan
		},
		success: function(res){
			// alert(res);
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_GuiBinhLuan(ten,avt,idtintuc) {
	var ndbl = $("#xtt-ndbl").val();
	if(ndbl != ''){
		$("#xtt-ndbl").val('');
		var html_bl = JS_BinhLuan(ten,avt,ndbl,"1 giây trước");
		$("#xtt-ds-bl").prepend(html_bl);
		JS_GhiBinhLuan(idtintuc,ndbl);
		var sobl = parseInt($("#xtt-so-bl").text());
		var tongbl = parseInt($("#xtt-tong-bl").text());
		$("#xtt-so-bl").html(sobl+1);
		$("#xtt-tong-bl").html(tongbl+1);
	}
}
function JS_HienThiDanhSachBinhLuan(idtintuc) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDanhSachBinhLuan",
		dataType: 'JSON',
		data:{
			idtintuc: idtintuc
		},
		success: function(res){
			res = JSON.parse(res);
			$("#xtt-tong-bl").html(res.length);
			var sobl = 0;
			if((sobl+5) >= res.length){
				if(res.length != 0){
					var htmlbd = '';
					for(var i = sobl; i < res.length; i++){
						htmlbd += JS_BinhLuan(res[i]['tenTaiKhoan'], res[i]['anhDaiDien'], res[i]['noiDungBinhLuan'], moment(res[i]['thoiGianBinhLuan']).locale('vi').fromNow());
					}
					$("#xtt-so-bl").html(res.length);
					$("#xtt-ds-bl").append(htmlbd);
				}
			}else{
				var html = '';
				for(var i = sobl; i < (sobl+5); i++){
					html += JS_BinhLuan(res[i]['tenTaiKhoan'], res[i]['anhDaiDien'], res[i]['noiDungBinhLuan'], moment(res[i]['thoiGianBinhLuan']).locale('vi').fromNow());
				}
				sobl += 5;
				$("#xtt-so-bl").html(sobl);
				$("#xtt-xt").html('Xem thêm');
				$("#xtt-ds-bl").prepend(html);
			}
			
			$("#xtt-xt").click(function(){
				if((sobl+5) < res.length){
					var htmlxt = '';
					for(var i = sobl; i < (sobl+5); i++){
						htmlxt += JS_BinhLuan(res[i]['tenTaiKhoan'], res[i]['anhDaiDien'], res[i]['noiDungBinhLuan'], moment(res[i]['thoiGianBinhLuan']).locale('vi').fromNow());
					}
					sobl += 5;
					$("#xtt-so-bl").html(sobl);
					$("#xtt-ds-bl").append(htmlxt);
				}else{
					var htmlxt = '';
					for(var i = sobl; i < res.length; i++){
						htmlxt += JS_BinhLuan(res[i]['tenTaiKhoan'], res[i]['anhDaiDien'], res[i]['noiDungBinhLuan'], moment(res[i]['thoiGianBinhLuan']).locale('vi').fromNow());
					}
					$("#xtt-so-bl").html(res.length);
					$("#xtt-ds-bl").append(htmlxt);
					$("#xtt-xt").html('');
				}
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_HienThiTagTinTuc() {
	$.ajax({
		url: BASE_URL+"Ajax/AJ_DanhSachTagsTinTuc",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			var html = `<a href="${BASE_URL}tintuc/danhsach/tintucchung">Tin tức chung</a>`;
			$.each(res, function(index, value){
				html += `
					<a href="${BASE_URL}tintuc/danhsach/${value['tag']}">${value['tenTagTinTuc']}</a>
				`;
			});
			$("#tintuc-dstags").html(html);
		},
		error: function(res){
			console.log(res);
		}
	});
}