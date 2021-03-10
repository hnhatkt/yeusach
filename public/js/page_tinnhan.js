$(document).ready(function() {
	$("#nhantin-icon").click(function(){
		window.location=BASE_URL+"tinnhan/tatca";
	});
	JS_SoTinNhanChuaXem();
});

function JS_page_tinnhan() {
	$(document).ready(function() {
		var url = window.location.pathname.toString().toLowerCase().split("/");
		var loaitn = url[3];
		var idtinnhan = url[4];
		var idnguoigui = $("#idnguoigui").val();

		JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan);
		setInterval (function(){ JS_SoTinNhanChuaXem(); }, 1000);
		setInterval (function(){ JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan); }, 1000);

		$("#ntvoinguoiban").click(function(){
			var idtin = window.location.pathname.toString().toLowerCase().split("/")[4];
			JS_TaoTinNhan(idtin);
		});
		if(idtinnhan != undefined){
			JS_LoadTinBanSachDangNhan(idtinnhan);
			JS_LoadTinNhan(idtinnhan,idnguoigui);
			JS_Cuon('cuontn');
			setInterval (function(){ JS_LoadTinNhan(idtinnhan,idnguoigui); }, 1000);

			$("#nutguitn").click(function(){
				JS_GuiTinNhan(idtinnhan,idnguoigui);
				JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan);
			});
			$("#onhaptn").keyup(function(event){
				if(event.keyCode === 13) {
					JS_GuiTinNhan(idtinnhan,idnguoigui);
					JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan);
				}
			});
		}else{
			$(".tinnhan-phai").html('');
		}
		$("#tn-chontatca").click(function(){
			loaitn = "tatca";
			JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan);
			$("#tn-chontatca").addClass("indam");
			$("#tn-chonmua,#tn-chonban").removeClass("indam");
		});

		$("#tn-chonban").click(function(){
			loaitn = "ban";
			JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan);
			$("#tn-chonban").addClass("indam");
			$("#tn-chontatca,#tn-chonmua").removeClass("indam");
		});
		$("#tn-chonmua").click(function(){
			loaitn = "mua";
			JS_HienThiDSTinNhan(loaitn,"#dstinnhan",idtinnhan);
			$("#tn-chonmua").addClass("indam");
			$("#tn-chontatca,#tn-chonban").removeClass("indam");
		});
		$("#chonxoatn").click(function(){
			JS_XoaTinNhan(idtinnhan);
			window.location=BASE_URL+"tinnhan/"+loaitn;
		});
	});
}

function JS_TaoTinNhan(idtin){
	var htai = moment(htai).locale('vi').format('YYYY-MM-DD HH:mm:ss');
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_TaoTinNhan",
		dataType: 'JSON',
		data: {
			idtin: idtin,
			hientai: htai
		},
		success: function(res){
			if(res=="chuadn"){
				if(window.confirm("Bạn chưa đăng nhập, Bạn muốn đăng nhập không?")) {
					window.location = BASE_URL+"dangnhap";
				}
			}else{
				if(res !== false){
					window.location=BASE_URL+"tinnhan/tatca/"+res;
				}
			}
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}

function JS_HienThiDSTinNhan(loaitn,idhienthi,idtinnhan) {
	var mua = 0, ban = 0;
	if(loaitn == "tatca"){
		mua = 1;
		ban = 1;
	}else if(loaitn == "mua"){
		mua = 1;
	}else{
		ban = 1;
	}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetDSTinNhan",
		dataType: 'JSON',
		data: {
			mua: mua,
			ban: ban	
		},
		success: function(res){
			ds = JSON.parse(res);
			var tndc = '';
			var html = '';

			if(ds.length == 0){
				html += `<div class="kctn">Không có tin nhắn</div>`;
			}else{
				$.each(ds, function(index, value){
					var chuaxem = '';
					if(value['daXem'] == 0){chuaxem = "indam maudo"};
					if(idtinnhan == value['idTinNhan']){
						tndc = ".tn-duocchon" + index;
						$("#tknt-avt").attr("src",BASE_URL+'public/hinhanh/anhdaidien/'+value['anhDaiDien']);
						$("#tknt-tentk").html(value['tenTaiKhoan']);
						$("#tg-tk-online").html("hoạt động " + moment(value['ngayOnline']).locale('vi').fromNow());
					}
					html += `
						<div class="tn-duocchon${index}" >
							<a class="tn-khung-tk" href="${BASE_URL}tinnhan/${loaitn}/${value['idTinNhan']}">
								<div id="tn-anh" class="tn-anh">
									<img src="${BASE_URL+'public/hinhanh/anhdaidien/'+value['anhDaiDien']}">
								</div>
								<div class="tn-ttc">
									<span>
										<span class="${chuaxem}">
											${value['tenTaiKhoan']}
										</span>
										<span class="tn-tgg"> - 
											${moment(value['thoiGian']).locale('vi').fromNow()}
										</span>
									</span>
									<span class="tn-tensach">${value['tenSach']}</span>
								</div>
							</a>
						</div>
					`;
				});
			}
			$(idhienthi).html(html);
			$(tndc).css({"background-color":"#dcdde1"});
			var ltndc = "#tn-chon" + loaitn;
			$(ltndc).addClass("indam");
		},
		error: function(res){
			// alert('loi');
		}
	});
}

function JS_LoadTinNhan(idtinnhan,idnguoigui){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_GetLSTN",
		dataType: 'JSON',
		data: {
			idtinnhan: idtinnhan
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value) {
				if(idnguoigui == value['idNguoiGui']){
					html += `
						<div class="tn-htphai">
							<div>
								${value['noiDungGui']}
								<div class="tgnt">
								${moment(value['thoiGianGui']).locale('vi').format('HH:mm - D/M/YY')}
								</div>
							</div>
						</div>
					`;
				}else{
					html += `
						<div class="tn-httrai">
							<div>
								${value['noiDungGui']}
								<div class="tgnt">
								${moment(value['thoiGianGui']).locale('vi').format('HH:mm - D/M/YY')}
								</div>
							</div>
						</div>
					`;
				}
				$('#khttn').html(html);
			});
		},
		error: function(res){
			console.log(res);
		}
	});
}

function JS_LoadTinBanSachDangNhan(idtinnhan){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_LoadTinBanSachDangNhan",
		dataType: 'JSON',
		data: {
			idtinnhan: idtinnhan
		},
		success: function(res){
			res = JSON.parse(res);
			var html = '';
			$.each(res, function(index, value) {
				html +=`
				<img class="tn-tin-anh" src="${BASE_URL+'public/hinhanh/sach/'+value['linkHinhAnhSach']}">
				<div>
					<div class="tn-tin-tensach">${value['tenSach']}</div>
					<div class="tn-tin-giasach">${value['giaSach']} đ</div>
				</div>
				`;
			});
			$('#tn-tin').html(html);
		},
		error: function(res){
			console.log(res);
			alert('loi');
		}
	});
}

function JS_Cuon (id) {
   var div = document.getElementById(id);
   $('#' + id).animate({
      scrollTop:  99999
   }, 500);
}

function JS_GuiTinNhan(idtinnhan,idnguoigui) {
	var ndtn = $("#onhaptn").val();
	var htai = moment(htai).locale('vi').format('YYYY-MM-DD HH:mm:ss');
	$("#onhaptn").val('');

	if(ndtn!=''){
		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_GhiTinNhan",
			dataType: 'JSON',
			data: {
				noidungtinnhan: ndtn,
				hientai: htai,
				idnguoigui: idnguoigui,
				idtinnhan: idtinnhan
			},
			success: function(res){
				JS_LoadTinNhan(idtinnhan,idnguoigui);
				JS_Cuon('cuontn');
			},
			error: function(res){
				console.log(res);
				// alert('loi');
			}
		});
	}
}

function JS_SoTinNhanChuaXem(){
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_SoTinNhanChuaXem",
		dataType: 'JSON',
		data: {
		},
		success: function(res){
			if(res != 0){
				$("#sotinnhanchuaxem").html(res);
			}else{
				$("#sotinnhanchuaxem").html('');
			}
			
		},
		error: function(res){
			console.log(res);
			// alert('loistncx');
		}
	});
}

function JS_XoaTinNhan(idtn) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_XoaTinNhan",
		dataType: 'JSON',
		data: {
			idtn: idtn
		},
		success: function(res){
			// alert(res);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}






