$(document).ready(function(){

	$("#file1").change(function(){
		$("#blah1").removeClass("anhienthi");
		$(".cmr1").addClass("anhienthi");
		$(".anh2").removeClass("anhienthi");
	});
	$("#file2").change(function(){
		$("#blah2").removeClass("anhienthi");
		$(".cmr2").addClass("anhienthi");
		$(".anh3").removeClass("anhienthi");
	});
	$("#file3").change(function(){
		$("#blah3").removeClass("anhienthi");
		$(".cmr3").addClass("anhienthi");
		$(".anh4").removeClass("anhienthi");
	});
	$("#file4").change(function(){
		$("#blah4").removeClass("anhienthi");
		$(".cmr4").addClass("anhienthi");
		$(".anh5").removeClass("anhienthi");
	});
	$("#file4").change(function(){
		$("#blah4").removeClass("anhienthi");
		$(".cmr4").addClass("anhienthi");
		$(".anh5").removeClass("anhienthi");
	});
	$("#file5").change(function(){
		$("#blah5").removeClass("anhienthi");
		$(".cmr5").addClass("anhienthi");
		$(".anh6").removeClass("anhienthi");
	});
	$("#file6").change(function(){
		$("#blah6").removeClass("anhienthi");
		$(".cmr6").addClass("anhienthi");
	});

	JS_DiaChiTinBanSach();
	JS_DanhMucSach();
	JS_NgonNgu();
	JS_TrangThai();
	JS_AnhSach();
	JS_MoTa();
	JS_KiemTraNhapLieu("#dt-pxtt",".dt-pxtt");
	JS_KiemTraNhapLieu("#dt-ts",".dt-ts");
	JS_KiemTraNhapLieu("#dt-tg",".dt-tg");
	JS_KiemTraNhapLieu("#dt-gs",".dt-gs");
	JS_KiemTraNhapLieu("#dt-nxb",".dt-nxb");
	JS_KiemTraNhapLieu("#dt-namxb",".dt-namxb");
	JS_KiemTraNhapLieu("#dt-st",".dt-st");

	var ds_class = [".dt-anh",".dt-ttp",".dt-qhtx",".dt-dms","dt-ts",".dt-tg",".dt-gs",".dt-nxb",".dt-namxb",".dt-st",".dt-nn",".dt-tt"];
	JS_KiemTraTruocKhiDang(ds_class);

});



function JS_DiaChiTinBanSach() {
	$.ajax({
		url: BASE_URL+"Ajax/AJ_DSTinhThanhPho",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			var html = `<option value=''>-- Chọn --</option>`;
			$.each(res, function(index, value){
				html += `
					<option value='${value['idTinhThanhPho']}'>${value['tenTinhThanhPho']}</option>
				`;
			});
			$("#dt-ttp").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi ds tinh tp');
		}
	});
	$("#dt-ttp").change(function(){
		var idTTP = $("#dt-ttp").val();
		if(idTTP == ''){
			$(".dt-ttp").html('*');
			$(".dt-qhtx").html('*');
			$("#dt-qhtx").html(`<option value=''>-- Chọn --</option>`);
		}else{
			$(".dt-ttp").html('');
			$.ajax({
				type: "POST",
				url: BASE_URL+"Ajax/AJ_DSQuanHuyenThiXa",
				dataType: 'JSON',
				data: {
					idTTP: idTTP
				},
				success: function(res){
					res = JSON.parse(res);
					var html = `<option value=''>-- Chọn --</option>`;
					$.each(res, function(index, value){
						html += `
						<option value='${value['idQuanHuyenThiXa']}'>${value['tenQuanHuyenThiXa']}</option>
						`;
					});
					$("#dt-qhtx").html(html);
				},
				error: function(res){
					console.log(res);
					// alert('loi');
				}
			});
			$("#dt-qhtx").change(function(){
				var idQHTX = $("#dt-qhtx").val();
				if(idQHTX == ''){
					$(".dt-qhtx").html('*');
				}else{
					$(".dt-qhtx").html('');
				}
			});
		}
		
	});
}

function JS_DanhMucSach(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_DanhMucSach",
		dataType: 'JSON',
		success: function(res){
			var html = `<option value=''>-- Chọn --</option>`;
			$.each(res, function(index, value){
				html += `
					<option value='${value['idDanhMuc']}'>${value['tenDanhMuc']}</option>
				`;
			});
			$("#dt-dms").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
	$("#dt-dms").change(function(){
		var idDMS = $("#dt-dms").val();
		if(idDMS == ''){
			$(".dt-dms").html('*');
		}else{
			$(".dt-dms").html('');
		}
	});
}

function JS_NgonNgu(){
	$.ajax({
		url: BASE_URL+"Ajax/AJ_NgonNgu",
		dataType: 'JSON',
		success: function(res){
			res = JSON.parse(res);
			var html = `<option value=''>-- Chọn --</option>`;
			$.each(res, function(index, value){
				html += `
					<option value='${value['idNgonNgu']}'>${value['tenNgonNgu']}</option>
				`;
			});
			$("#dt-nn").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
	$("#dt-nn").change(function(){
		var idNN = $("#dt-nn").val();
		if(idNN == ''){
			$(".dt-nn").html('*');
		}else{
			$(".dt-nn").html('');
		}
	});
}

function JS_TrangThai(){
	$(".dt-t").click(function(){
		$(".dt-tt").html('');
	});
}

function JS_AnhSach(){
	$("#file1").change(function(){
		$(".dt-anh").html('');
	});
}

function JS_KiemTraNhapLieu(id,cl){
	var x = $(id).val();
	if(x != ''){
		$(cl).html('');
	}else{
		$(cl).html('*');
	}
	$(id).keyup(function(){
		var x = $(id).val();
		if(x != ''){
			$(cl).html('');
		}else{
			$(cl).html('*');
		}
	});
}

function JS_MoTa(){
	$("#dt-mt").keyup(function(){
		var dem = $("#dt-mt").val().length;
		if(dem <= 500){
			$("#sokytu-mt").html(dem + "/500");
		}
	});
}

function JS_KiemTraTruocKhiDang(ds_class){
	
	$("#dt-div-dangtin").click(function(){
		var hople = 1;
		for (var i = 0; i < ds_class.length; i++) {
			if($(ds_class[i]).text() != ''){
				hople = 0;
				break;
			}
		}

		if(hople == 0){
			alert("Thiếu thông tin, mời xem lại!");
		}
	});

	$("#dt-div-dangtin").hover(function(){
		var h1 = 1;
		for (var i = 0; i < ds_class.length; i++) {
			if($(ds_class[i]).text() != ''){
				h1 = 0;
				break;
			}
		}
		if(h1 == 1){
			$(".dt-div-dangtin").addClass("anhienthi");
			$(".dt-btn-dangtin").removeClass("anhienthi");
		}
		
	});

	$(".dt-btn-dangtin").hover(function(){
		var h2 = 1;
		for (var i = 0; i < ds_class.length; i++) {
			if($(ds_class[i]).text() != ''){
				h2 = 0;
				break;
			}
		}
		if(h2 == 0){
			$(".dt-btn-dangtin").addClass("anhienthi");
			$(".dt-div-dangtin").removeClass("anhienthi");
		}
	});
}