<script type="text/javascript">JS_page_trangcanhan_suathongtin();</script>
<div class="trangchu-ds">
	<div class="container container-md">
		<div class="dangky-khung">
			<div class="dangky-khung2">
				<form method="post" id="form-suatcn" action="<?php echo BASE_URL; ?>trangcanhan/capnhattaikhoan" enctype="multipart/form-data">
					<div class="dk">
						<p>
							<span>SỬA THÔNG TIN CÁ NHÂN</span>
						</p>
					</div>
					<div class="nhaplieu">
						<p>
							Nhập tên tài khoản (<span id="tcn-kytuttk">0</span>/60)
							<span class="maudo" id="tcn-thongbaottk"></span>
						</p>
						<input type="text" id="tcn-tentaikhoan" name="tcnttk" maxlength="60" placeholder="tên tài khoản ...">
					</div>
					<div class="nhaplieu">
						<p>
							Nhập email (<span id="tcn-kytue">0</span>/100)
							<span class="maudo" id="tcn-thongbaoemail"></span>
						</p>
						<input type="text" id="tcn-email" name="tcnemail" maxlength="100" placeholder="email ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập địa chỉ
							(<span id="tcn-kytudc">0</span>/100)
							<span> - Quận/Huyện, Tỉnh/Thành phố</span>
							<span class="maudo" id="tcn-thongbaodc"></span>
						</p>
						<input type="text" id="tcn-diachi" name="tcndc" maxlength="100" placeholder="địa chỉ ...">
					</div>
					<div class="nhaplieu">
						<p>Chọn avatar</p>
						<div class="anhdd">
							<input type="file" name="tcnavt" id="file" accept="image/*" class="inputfile" data-multiple-caption="{count} files selected" onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])">
							<label for="file">
								<img class="adaidien" src="<?php echo BASE_URL."public/hinhanh/anhdaidien/md.png"; ?>" id="blah">
							</label>
						</div>
					</div>
					<div class="nhaplieu">
						<p>Nhập mã code</p>
						<div class="code">
							<input type="text" id="tcn-codenhap" maxlength="4" placeholder="code ...">
							<span id="codetao"></span>
							<i id="lammoi" class="material-icons">refresh</i>
						</div>
					</div>

					<div id="tcn-btn-btndk" class="btn-dangky">
						<input id="tcn-btn-luusua" name="tcnbtnsua" class="btndk" value="Lưu">
					</div>
					<div class="hoac">
						<hr>
						<span>hoặc</span>
						<hr>
					</div>
					<div class="dangnhap">
						<div class="tcn-btn-huysua" id="tcn-btn-huysua">Hủy</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- Xac nhan sua thong tin ca nhan-->
<div class="modal fade" id="tcn-tb-xacnhansua" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Xác nhận</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Bạn chắc chắn sửa thông tin!
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
				<button id="tcn-btn-xns" type="button" class="btn btn-primary">Đồng ý</button>
			</div>
		</div>
	</div>
</div>




