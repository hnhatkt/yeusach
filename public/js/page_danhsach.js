function JS_page_danhsach() {
	JS_DuLieuBoLoc();

	var ds_sotin = 5;
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var p_kieuloc = url[3];
	var p_id = url[4];
	var p_idDM = '';
	var p_idTTP = '';
	var p_ndtk = '';
	if(p_kieuloc == "danhmuc" && p_id != undefined){
		p_idDM = p_id;
	}else if(p_kieuloc == "tinhthanhpho" && p_id != undefined){
		p_idTTP = p_id;
	}else if(p_kieuloc == "timkiem"){
		p_ndtk = url[4];
	}
	JS_LocDSTinBanSach(ds_sotin,p_idTTP,p_idDM,'',1,p_ndtk);

	$(document).ready(function(){
		$("#ds-xt").click(function(){
			ds_sotin += 5;
			JS_HienThiDanhSachLocTinBanSach(ds_sotin);
		});

		$("#ds-btn-loc").click(function(){
			ds_sotin = 5;
			JS_HienThiDanhSachLocTinBanSach(ds_sotin);
		});

		$("#ds-tuychonhienthi").change(function(){
			ds_sotin = 5;
			JS_HienThiDanhSachLocTinBanSach(ds_sotin);
		});
	});
}
function JS_HienThiDanhSachLocTinBanSach(ds_sotin){
	var idTTP = $("#bl-ttp").val();
	var idDM = $("#bl-dm").val();
	var NXB = $("#bl-nxb").val();
	var tensach = $("#hd-timkiemsach").val();
	var tuychonhienthi = $("#ds-tuychonhienthi").val();
	JS_LocDSTinBanSach(ds_sotin,idTTP,idDM,NXB,tuychonhienthi,tensach);
}
function JS_LocDSTinBanSach(sotin,idtinhthanhpho,iddanhmuc,namxuatban,tuychonhienthi,tensach) {
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_LocDSTinBanSach",
		dataType: 'JSON',
		data:{
			sotin: sotin,
			idtinhthanhpho: idtinhthanhpho,
			iddanhmuc: iddanhmuc,
			namxuatban: namxuatban,
			tuychonhienthi: tuychonhienthi,
			tensach: tensach
		},
		success: function(res){

			var html = '';
			if(sotin > res.length) {
				$("#ds-xt").html('');
				$("#ds-st").html(res.length);
			}else{
				$("#ds-st").html(sotin);
			}
			$("#hd-timkiemsach").val(tensach);
			$.each(res, function(index, values){
				html += JS_TinBanSach(index, values);
			});

			$("#ds-dsbd").html(html);

		},
		error: function(res){
			console.log(res);
		}
	});
}
function JS_DuLieuBoLoc() {
	var url = window.location.pathname.toString().toLowerCase().split("/");
	var c_kieuloc = url[3];
	var c_id = url[4];
	var c_idDM = '';
	var c_idTTP = '';
	if(c_kieuloc == "danhmuc" && c_id != undefined){
		c_idDM = c_id;
	}else if(c_kieuloc == "tinhthanhpho" && c_id != undefined){
		c_idTTP = c_id;
	}
	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_LocDanhMuc",
		dataType: 'JSON',
		data:{
			dm: ''
		},
		success: function(res){
			var html = ` <option value="0">-- Tất cả --</option> `;

			$.each(res, function(index, value){
				var selected_DM = '';
				if(value['idDanhMuc'] == c_idDM){
					selected_DM = "selected";
				}
				html += `
					<option value="${value['idDanhMuc']}" ${selected_DM}>${value['tenDanhMuc']}</option>
				`;
			});

			$("#bl-dm").html(html);

		},
		error: function(xhr, status, error) {
		  var err = eval("(" + xhr.responseText + ")");
		  console.log(err.Message);
		}
	});

	$.ajax({
		type: "POST",
		url: BASE_URL+"Ajax/AJ_DSTinhThanhPho",
		dataType: 'JSON',
		data:{
		},
		success: function(res){

			var html = ` <option value="0">-- Tất cả --</option> `;
			res = JSON.parse(res);
			$.each(res, function(index, value){
				var selected_TTP = '';
				if(value['idTinhThanhPho'] == c_idTTP){
					selected_TTP = "selected";
				}
				html += `
					<option value="${value['idTinhThanhPho']}" ${selected_TTP}>${value['tenTinhThanhPho']}</option>
				`;
			});
			$("#bl-ttp").html(html);
		},
		error: function(res){
			console.log(res);
			// alert('loi');
		}
	});
}