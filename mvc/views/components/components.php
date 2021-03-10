<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>

<?php
	function CP_HopThoaiXacNhan($idarea,$tieude,$noidung) { ?>
		<!-- Modal -->
		<div class="modal fade" id="<?php echo $idarea; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLongTitle"><?php echo $tieude; ?></h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <?php echo $noidung; ?>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Save changes</button>
		      </div>
		    </div>
		  </div>
		</div>
	<?php }
	function CP_HienThiUser() {
		if(isset($_SESSION['taikhoan'])) { ?>

			<img src="<?php echo BASE_URL.'public/hinhanh/anhdaidien/'. $_SESSION['taikhoan']['anh']; ?>">
			<div class="dropdown">
				<span class=" dropdown-toggle" type="button" data-toggle="dropdown">
					<?php echo $_SESSION['taikhoan']['ten']; ?>
					<span class="caret"></span>
				</span>
				<ul class="dropdown-menu user-menu">
					<li class="dropdown-item"><a href="<?php echo BASE_URL; ?>trangcanhan/<?php echo $_SESSION['taikhoan']['id']; ?>">Trang cá nhân</a></li>
					<li class="dropdown-item"><span id="">Quản lý đơn hàng</span></li>
					<li class="dropdown-item"><span id="dangxuat">Đăng xuất</span></li>
				</ul>
			</div>
			
		<?php }
		else { ?>

			<div class="dangnhap-dangky">
				<a href="<?php echo BASE_URL; ?>DangNhap"><span>Đăng nhập</span></a>
				<span>|</span>
				<a href="<?php echo BASE_URL; ?>DangKy"><span>Đăng ký</span></a>
			</div>

		<?php }
	}

	function CP_Slide($DSHinhAnhSach){ ?>
		<?php $DSHinhAnhSach = json_decode($DSHinhAnhSach); ?>
		<div class="">
			<div id="demo" class="carousel slide" data-ride="carousel">

				<!-- Indicators -->
				<ul class="carousel-indicators">
					<li data-target="#demo" data-slide-to="0" class="active"></li>
					<?php
					$d = count($DSHinhAnhSach);
					if($d > 1) {
						for($i = 1; $i < $d; $i++){ ?>
							<li data-target="#demo" data-slide-to="<?php echo $i; ?>"></li>
						<?php }
					} ?>
				</ul>

				<!-- The slideshow -->
				<div class="carousel-inner k-ha-sl">
					<div class="carousel-item active">
						<img src="<?php echo BASE_URL.'public/hinhanh/sach/'.$DSHinhAnhSach[0]->linkHinhAnhSach ?>" width="100%">
					</div>
					<?php
					$d = count($DSHinhAnhSach);
					if($d > 1) {
						for($i = 1; $i < $d; $i++){ ?>
							<div class="carousel-item">
								<img src="<?php echo BASE_URL.'public/hinhanh/sach/'.$DSHinhAnhSach[$i]->linkHinhAnhSach ?>" width="100%">
							</div>
						<?php }
					} ?>
				</div>

				<!-- Left and right controls -->
				<a class="carousel-control-prev" href="#demo" data-slide="prev">
					<span class="carousel-control-prev-icon"></span>
				</a>

				<a class="carousel-control-next" href="#demo" data-slide="next">
					<span class="carousel-control-next-icon"></span>
				</a>
			</div>
		</div>
	<?php }

	function CP_DanhMuc($values) { ?>
		<div class="danhmuc-khung">
			<a href="<?php echo BASE_URL.'danhsach/danhmuc/'.$values["idDanhMuc"]; ?>">
				<div class="danhmuc-bg" style="background-image: url(<?php echo BASE_URL.'public/hinhanh/danhmuc/'.$values["linkBG"]; ?>.jpg);">
					<div class="danhmuc-wrap">
					</div>
				</div>
				<span>
					<?php echo $values["tenDanhMuc"]; ?>
				</span>
			</a>
		</div>
	<?php }

	function CP_BoLoc() { ?>
		<div class="boloc">
			<div class="khung-boloc">
				<div>
					Tỉnh, thành phố
					<select id="bl-ttp" name="bltinhthanhpho">
						<!-- Hiển thị bằng JS -->
					</select>
				</div>
				<div>
					Danh mục
					<select id="bl-dm" name="bldanhmuc">
						<!-- Hiển thị bằng JS -->
					</select>
				</div>
				<div>
					Năm xuất bản
					<input id="bl-nxb" type="number" name="namxuatban">
				</div>
				<div>
					<button id="ds-btn-loc" class="ds-btn-loc">Lọc</button>
				</div>
			</div>
			<div class="khung-luachon">
				<span>Tất cả</span>
				<span>Cá nhân</span>
				<span>Cửa hàng</span>
				<select id="ds-tuychonhienthi">
					<option value="1">Tin mới trước</option>
					<option value="2">Tin cũ trước</option>
					<option value="3">Giá cao trước</option>
					<option value="4">Giá thấp trước</option>
				</select>
			</div>
		</div>
	<?php }

	function CP_HienThiTagTinTuc(){ ?>
		<div class="khung-tintuc-nav">
			<div id="tintuc-dstags" class="tintuc-nav container container-md">
				<!-- Hiển thị băng js -->
			</div>
		</div>
	<?php }

?>

</body>
</html>