<div class="trangchu-ds">
	<div class="container container-md">

		<div>
			<!-- dieuhuong -->
		</div>
		<div class="khung-cts">
			<div class="cts-trai">
				<div class="cts-anh">
					<?php CP_Slide($data['DSHinhAnhSach']); ?>
				</div>
				<div>
					<span class="cts-tensach"><?php echo $data['TinBanSach']['tenSach']; ?></span>
				</div>
				<div>
					<span class="cts-tacgia"><?php echo $data['TinBanSach']['tacGia']; ?></span>
				</div>
				<div>
					<span class="cts-gia"><?php echo number_format($data['TinBanSach']['giaSach']); ?> đ</span>
				</div>
				<div>
					<span>Mô tả: <?php echo $data['TinBanSach']['moTa']; ?></span>
				</div>
				<div>
					<span>Số điện thoại: </span>
					<span class="cts-sdt"><?php echo $data['TinBanSach']['soDienThoai']; ?></span>
				</div>
				<div>
					<span>Địa chỉ: <?php echo $data['TinBanSach']['tenQuanHuyenThiXa']; ?>, <?php echo $data['TinBanSach']['tenTinhThanhPho']; ?></span>
				</div>
				<div>
					<table class="bangtt">
						<tr>
							<td>Nhà xuất bản</td>
							<td>: <?php echo $data['TinBanSach']['nhaXuatBan']; ?></td>
							<td>Ngôn ngữ</td>
							<td>: <?php echo $data['TinBanSach']['tenNgonNgu']; ?></td>
						</tr>
						<tr>
							<td>Thể loại</td>
							<td>: <?php echo $data['TinBanSach']['tenDanhMuc']; ?></td>
							<td>Năm xuất bản</td>
							<td>: <?php echo $data['TinBanSach']['namXuatBan']; ?></td>
						</tr>
						<tr>
							<td>Trạng thái</td>
							<td>: mới <?php echo $data['TinBanSach']['trangThai']; ?>%</td>
							<td>Số trang</td>
							<td>: <?php echo $data['TinBanSach']['soTrang']; ?> trang</td>
						</tr>
					</table>
				</div>
				<a class="cts-mua" id="cts-btn-mua">
					<?php 
					if(isset($_SESSION['taikhoan']['id'])) {$idht = $_SESSION['taikhoan']['id'];}
					else {$idht = 0;}
					?>
					<script type="text/javascript">JS_CP_CTS_Mua(<?php echo $data['TinBanSach']['trangThaiTinBanSach'].','.$data['TinBanSach']['idTin'].','.$data['TinBanSach']['idTaiKhoan'].','.$idht; ?>);</script>
				</a>
			</div>

			<div class="cts-phai">
				<div class="cts-ttcn">
					<div class="ttcn1">
						<img class="ttcn-avt" src="<?php echo BASE_URL.'public/hinhanh/anhdaidien/'.$data['TinBanSach']['anhDaiDien']; ?>">
						<div>
							<div class="ttcn-ten"><?php echo $data['TinBanSach']['tenTaiKhoan']; ?></div>
							<div class="ttcn-tg">Hoạt động 10 phút trước</div>
						</div>
						<div class="ttcn-xt">
							<a href="<?php echo BASE_URL.'trangcanhan/'.$data['TinBanSach']['idTaiKhoan']; ?>">Xem trang</a>
						</div>
					</div>
					<div class="ttcn2">
						<div>
							<div>Cá nhân</div>
							<i class="material-icons">account_circle</i>
						</div>
						<div>
							<div>Đánh giá</div>
							<span>---</span>
						</div>
						<div>
							<div>Phản hồi chat</div>
							<span>100%</span>
						</div>
					</div>
				</div>
				<div class="cts-ll">
					<div>
						<i class="material-icons">local_phone</i>
						<span><?php echo $data['TinBanSach']['soDienThoai']; ?></span>
					</div>
					<div id="ntvoinguoiban">
						<i class="material-icons">chat</i>
						<span  onclick="JS_TaoTinNhan(<?php echo $data['TinBanSach']['idTin']; ?>)">Nhắn tin với người bán</span>
					</div>
				</div>
			</div>
		</div>
		
	
	</div>
</div>

