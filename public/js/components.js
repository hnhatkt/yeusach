$(document).ready(function(){
	if(localStorage.soluong != undefined && localStorage.soluong != 'NaN'){
		$("#soluongdathang").html(localStorage.soluong);
	}
});


// Tính thời gian đăng
function tinhthoigian(time){
	document.write(moment(time).locale('vi').fromNow());
}
function JS_CP_CTS_Mua(trangthai,idtin,idtkban,idht) {
	if(trangthai == 5){ $("#cts-btn-mua").html('<div style="color: #27ae60">Bán thành công</div>'); }
	if(trangthai == 4){ $("#cts-btn-mua").html('<div style="color: #e74c3c">Hủy bán</div>'); }
	if(trangthai == 3){ $("#cts-btn-mua").html('<div style="color: #2980b9">Tin đang duyệt</div>'); }
	if(trangthai == 2){ $("#cts-btn-mua").html('<div style="color: #16a085">Đang giao hàng</div>'); }
	if(trangthai == 1){ $("#cts-btn-mua").html('<div style="color: #f39c12">Đang đặt hàng</div>'); }
	if(trangthai == 0 && idtkban != idht || idtkban == 0){
		$("#cts-btn-mua").html(JS_TrangThaiDatHang(idtkban,idtin));
	}else{
		if(trangthai != 0){
			JS_TrangThaiDatHang(idtkban,idtin);
		}else{
			$("#cts-btn-mua").html('Tin đang bán');
		}
	}
}




