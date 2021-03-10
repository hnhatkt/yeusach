<div>
	<div class="trangchu-ds">
		<div class="container container-md">
			<div>
				<div class="dt-td">
					Đăng tin
					<i class="material-icons dt-cl">close</i>
				</div>
			</div>
			<form method="post" action="/yeusach/dangtin/xulydangtin" enctype="multipart/form-data">
				<div class="dt-k-tt">
					<div class="dt-m-tt">
						<span>Hình ảnh <span class="red dt-anh">*</span></span>
						<div class="dt-k-anh">
							<input type="file" name="dtanh1" id="file1" accept="image/*" onchange="document.getElementById('blah1').src = window.URL.createObjectURL(this.files[0])">
							<input type="file" name="dtanh2" id="file2" accept="image/*" onchange="document.getElementById('blah2').src = window.URL.createObjectURL(this.files[0])">
							<input type="file" name="dtanh3" id="file3" accept="image/*" onchange="document.getElementById('blah3').src = window.URL.createObjectURL(this.files[0])">
							<input type="file" name="dtanh4" id="file4" accept="image/*" onchange="document.getElementById('blah4').src = window.URL.createObjectURL(this.files[0])">
							<input type="file" name="dtanh5" id="file5" accept="image/*" onchange="document.getElementById('blah5').src = window.URL.createObjectURL(this.files[0])">
							<input type="file" name="dtanh6" id="file6" accept="image/*" onchange="document.getElementById('blah6').src = window.URL.createObjectURL(this.files[0])">

							<div>
								<label for="file1"  class="dt-i-cmr">
									<i class="material-icons cmr1">camera_alt</i>
									<img id="blah1" class="dt-anh anhienthi">
								</label>
							</div>
							<div class="anh2 anhienthi">
								<label for="file2"  class="dt-i-cmr">
									<i class="material-icons cmr2">camera_alt</i>
									<img id="blah2" class="dt-anh anhienthi">
								</label>
							</div>
							<div class="anh3 anhienthi">
								<label for="file3"  class="dt-i-cmr">
									<i class="material-icons cmr3">camera_alt</i>
									<img id="blah3" class="dt-anh anhienthi">
								</label>
							</div>
							<div class="anh4 anhienthi">
								<label for="file4"  class="dt-i-cmr">
									<i class="material-icons cmr4">camera_alt</i>
									<img id="blah4" class="dt-anh anhienthi">
								</label>
							</div>
							<div class="anh5 anhienthi">
								<label for="file5"  class="dt-i-cmr">
									<i class="material-icons cmr5">camera_alt</i>
									<img id="blah5" class="dt-anh anhienthi">
								</label>
							</div>
							<div class="anh6 anhienthi">
								<label for="file6"  class="dt-i-cmr">
									<i class="material-icons cmr6">camera_alt</i>
									<img id="blah6" class="dt-anh anhienthi">
								</label>
							</div>

						</div>
					</div>
					<div class="dt-m-tt">
						<span>Tỉnh, thành phố <span class="red dt-ttp">*</span></span>
						<select id="dt-ttp" name="dttinhthanhpho">
							<!-- Hiển thị bằng js -->
						</select>
					</div>
					<div class="dt-m-tt">
						<span>Quận, huyện, thị xã <span class="red dt-qhtx">*</span></span>
						<select id="dt-qhtx" name="dtquanhuyenthixa">
							<option value = ''>-- Chọn --</option>
							<!-- Hiển thị bằng js -->
						</select>
					</div>
					<div class="dt-m-tt">
						<span>Danh mục sách <span class="red dt-dms">*</span></span>
						<select id="dt-dms" name="dtdanhmucsach">
							<option value = ''>-- Chọn --</option>
							<!-- Hiển thị bằng js -->
						</select>
					</div>
					<div class="dt-m-tt">
						<span>Tên sách <span class="red dt-ts">*</span></span>
						<input id="dt-ts" type="text" name="dttensach">
					</div>
					<div class="dt-m-tt">
						<span>Tác giả <span class="red dt-tg">*</span></span>
						<input id="dt-tg" type="text" name="dttacgia">
					</div>
					<div class="dt-m-tt">
						<span>Giá sách(VNĐ) <span class="red dt-gs">*</span></span>
						<input id="dt-gs" type="number" name="dtgiasach">
					</div>
					<div class="dt-m-tt">
						<span>Nhà xuất bản <span class="red dt-nxb">*</span></span>
						<input id="dt-nxb" type="text" name="dtnhaxuatban">
					</div>
					<div class="dt-m-tt">
						<span>Năm xuất bản <span class="red dt-namxb">*</span></span>
						<input id="dt-namxb" type="number" maxlength="4" name="dtnamxuatban">
					</div>
					<div class="dt-m-tt">
						<span>Số trang <span class="red dt-st">*</span></span>
						<input id="dt-st" type="number" name="dtsotrang">
					</div>
					<div class="dt-m-tt">
						<span>Ngôn ngữ <span class="red dt-nn">*</span></span>
						<select id="dt-nn" name="dtngonngu">
							<option value = ''>-- Chọn --</option>
							<!-- Hiển thị bằng js -->
						</select>
					</div>
					<div class="dt-m-tt">
						<span>Trạng thái mới <span class="red dt-tt">*</span></span>
						<div class="dt-ktt">
							<input type="radio" class="dt-t" name="dttrangthai" value="99">
							<span>99%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="90">
							<span>90%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="80">
							<span>80%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="70">
							<span>70%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="60">
							<span>60%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="50">
							<span>50%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="40">
							<span>40%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="30">
							<span>30%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="20">
							<span>20%</span>
							<input type="radio" class="dt-t" name="dttrangthai" value="10">
							<span>10%</span>
						</div>
					</div>
					<div class="dt-m-tt">
						<span>Mô tả cuốn sách <span id="sokytu-mt">(0/500)</span></span>
						<textarea id="dt-mt" class="dt-mt" maxlength="500" name="dtmota"></textarea>
					</div>
				</div>
				<div class="dt-k-btn-dangtin" id="dt-k-btn-dangtin">
					<div class="dt-div-dangtin" id="dt-div-dangtin">Đăng ngay</div>
					<button name="dangtin" class="dt-btn-dangtin anhienthi" id="dt-btn-dangtin">Đăng ngay</button>
				</div>
			</form>
		</div>
	</div>
</div>
