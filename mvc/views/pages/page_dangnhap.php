<div class="trangchu-ds">
	<div class="container container-md">
		<div class="dangky-khung">
			<div class="dangky-khung2">

				<form method="post" action="DangNhap/KhachHangDangNhap" enctype="multipart/form-data">
					<div class="dk">
						<p>
							<span>ĐĂNG NHẬP</span>
						</p>
					</div>
					<div class="nhaplieu">
						<p>Nhập số điện thoại</p>
						<input type="text" id="sodienthoaidn" name="sodienthoai" maxlength="20" placeholder="số điện thoại ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập mật khẩu</p>
						<input type="password" id="mkdn" name="matkhau" maxlength="60" placeholder="mật khẩu ...">
					</div>
					<div class="nhaplieu">
						<p>Nhập mã code</p>
						<div class="code">
							<input type="text" id="codenhap" name="code" maxlength="4" placeholder="code ...">
							<span id="codetao"></span>
							<i id="lammoi" class="material-icons">refresh</i>
						</div>
					</div>

					<div id="khung-btndn" class="btn-dangky">
						<span id="btn-dangnhap" class="btndk">Đăng nhập</span>
					</div>
					<div class="hoac">
						<hr>
						<span>hoặc</span>
						<hr>
					</div>
					<div class="dangnhap">
						<a href="./dangky">Đăng ký</a>
					</div>

				</form>
				
			</div>
		</div>
	</div>
</div>




