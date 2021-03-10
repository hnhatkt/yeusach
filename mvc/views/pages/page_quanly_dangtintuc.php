<form class="h100" method="post" action="/yeusach/quanlywebsite/xulydangtintuc" enctype="multipart/form-data">
	<div class="ql-k-tintuc">
		<div class="ql-k-tintuc-trai">
			<h5>Soạn thảo nội dung tin tức</h5>
			<textarea name="qlnoidungtintuc" id="ql-noidungtintuc"></textarea>
		</div>
		<div class="ql-k-tintuc-phai">
			<div>
				<h6>Người viết tin tức</h6>
				<input class="ql-tt-tt" type="text" name="qlnguoiviettintuc">
				<h6>Tiêu đề tin tức</h6>
				<input class="ql-tt-tt" type="text" name="qltieudetintuc">
				<h6>Tóm tắt</h6>
				<textarea name="qltomtattintuc"></textarea>
				<br>
				<h6>Hình ảnh đại diện</h6>
				<div class="ql-tintuc-hinhanh">
					<input id="ql-tintuc-hinhanh" type="file" name="qlhinhanhtintuc" accept="image/*" onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])">
					<label for="ql-tintuc-hinhanh">
						<img id="blah" src="<?php echo load_icon("upload-image.png"); ?>">
					</label>
				</div>
				<h6>Tag</h6>
				<div>
					<table class="ql-tag-baiviet">
						<tr>
							<?php
							for($i = 0; $i < count($data['ds_tags']); $i++){
								if($i != 0 && $i % 2 == 0){
									echo "</tr><tr>"; } ?>
								<td class="ql-dtt-tags">
									<input type="checkbox" name="<?php echo $data['ds_tags'][$i]['tag']; ?>" value="<?php echo $data['ds_tags'][$i]['idTagTinTuc']; ?>">
									<span><?php echo $data['ds_tags'][$i]['tenTagTinTuc']; ?></span>
								</td>
							<?php } ?>
						</tr>
					</table>
				</div>
				<h6 class="mt5">Ngày/Giờ đăng</h6>
				<input type="datetime-local" name="qlthoigiandangtintuc">
				<h6 class="mt15">Hiển thị &nbsp; <input type="checkbox" name="qlhienthitintuc"></h6>
			</div>
			<div class="ql-k-btn-tintuc">
				<input class="ql-btn-tintuc" type="submit" name="qldttsubmit" value="Đăng tin ngay">
			</div>
		</div>
	</div>
</form>
<script>
	CKEDITOR.replace( 'ql-noidungtintuc' );
</script>

