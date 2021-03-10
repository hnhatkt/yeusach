<!-- dangky -->
<div class="dangky-khung2 ql-k-phai-dangky">
	<form method="post" action="/yeusach/quanlywebsite/taotaikhoanadmin">
		<div class="dk">
			<p>
				<span>TẠO TÀI KHOẢN ADMIN</span>
			</p>
		</div>
		<div class="nhaplieu">
			<p>Nhập tên Admin</span></p>
			<span class="thongbaonhaplieu" id="thongbaottk"></span>
			<input type="text" id="ql-tadm" name="qltadm" maxlength="60" placeholder="tên admin ...">
		</div>
		<div class="nhaplieu">
			<p>Nhập mật khẩu</p>
			<input type="password" id="ql-mk" name="qlmk" maxlength="60" placeholder="mật khẩu ...">
		</div>
		<div class="nhaplieu">
			<p>Nhập lại mật khẩu</span></p>
			<span class="thongbaonhaplieu" id="ql-thongbaomk"></span>
			<input type="password" id="ql-mk2" name="qlmk2" maxlength="60" placeholder="mật khẩu ...">
		</div>
		<div class="nhaplieu">
			<p>Nhập mã code</p>
			<div class="code">
				<input type="text" id="ql-codenhap" name="qlcode" maxlength="4" placeholder="code ...">
				<span id="codetao"></span>
				<i id="lammoi" class="material-icons">refresh</i>
			</div>
		</div>

		<div id="ql-khung-btndk" class="btn-dangky">
			<div id="ql-btndk" class="btndk" name="qlbtndk">Đăng ký</div>
		</div>
	</form>
</div>