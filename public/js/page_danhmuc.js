$(document).ready(function() {

	//Lọc danh mục
	$("#locdm").keyup(function() {
		
		var danhmuc = $(this).val();

		$.ajax({
			type: "POST",
			url: BASE_URL+"Ajax/AJ_LocDanhMuc",
			dataType: 'JSON',
			data: {
				dm: danhmuc
			},
			success: function(res){

				var html = '';
				$.each(res, function(index, values){
					html += `
					<div class="danhmuc-khung">
						<a href="${BASE_URL + 'danhsach/danhmuc/' + values["idDanhMuc"]}">
							<div class="danhmuc-bg" style="background-image: url(${BASE_URL}public/hinhanh/danhmuc/${values["linkBG"]}.jpg);">
								<div class="danhmuc-wrap"></div>
							</div>
							<span>
								${values["tenDanhMuc"]}
							</span>
						</a>
					</div>
					`;
				});
				$("#list-danhmuc").html(html);

				$("#listSearch").html(res.length);

			},
			error: function(res){
				console.log(res);
			}
		});
	});

});