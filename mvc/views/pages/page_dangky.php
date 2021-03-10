<div class="trangchu-ds">
	<div class="container container-md">
		<div class="dangky-khung">
			<div class="dangky-khung2">

				<form method="post" action="<?php echo BASE_URL; ?>DangKy/DangKyTaiKhoan" enctype="multipart/form-data">
					<div class="dk">
						<p>
							<span>ĐĂNG KÝ</span>
						</p>
					</div>
					<div class="nhaplieu">
						<p>Nhập số điện thoại<span id="kytusdt"> (0/20)</span></p>
						<span class="thongbaonhaplieu" id="thongbaosdt"></span>
						<input type="text" id="sodienthoai" name="sodienthoai" maxlength="20" placeholder="số điện thoại ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập tên tài khoản<span id="kytuttk"> (0/60)</span></p>
						<span class="thongbaonhaplieu" id="thongbaottk"></span>
						<input type="text" id="tentaikhoan" name="tentaikhoan" maxlength="60" placeholder="tên tài khoản ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập mật khẩu<span id="kytumk"> (0/60)</span></p>
						<input type="password" id="mk" name="matkhau" maxlength="60" placeholder="mật khẩu ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập lại mật khẩu<span id="kytumk2"> (0/60)</span></p>
						<span class="thongbaonhaplieu" id="thongbaomk"></span>
						<input type="password" id="mk2" name="matkhau2" maxlength="60" placeholder="mật khẩu ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập email
							<span id="kytue"> (0/100)</span>
						</p>
						<span class="thongbaonhaplieu" id="thongbaoemail"></span>
						<input type="text" id="email" name="email" maxlength="100" placeholder="email ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập địa chỉ
							<span id="kytudc"> (0/100)</span>
							<span> - Quận/Huyện, Tỉnh/Thành phố</span>
						</p>
						<input type="text" id="diachi" name="diachi" maxlength="100" placeholder="địa chỉ ...">
					</div>
					<div class="nhaplieu">
						<p>Chọn avatar</p>
						<div class="anhdd">
							<input type="file" name="anhdaidien" id="file" accept="image/*" class="inputfile" data-multiple-caption="{count} files selected" onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])">
							<label for="file">
								<img class="adaidien" src="<?php echo load_anhdaidien("md.png"); ?>" id="blah">
							</label>
						</div>
					</div>
					<div class="nhaplieu">
						<p>Nhập mã code</p>
						<div class="code">
							<input type="text" id="codenhap" name="code" maxlength="4" placeholder="code ...">
							<span id="codetao"></span>
							<i id="lammoi" class="material-icons">refresh</i>
						</div>
					</div>

					<div id="khung-btndk" class="btn-dangky">
						<span id="btn-dangky" class="btndk">Đăng ký</span>
					</div>
					<div class="hoac">
						<hr>
						<span>hoặc</span>
						<hr>
					</div>
					<div class="dangnhap">
						<a href="./dangnhap">Đăng nhập</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>




