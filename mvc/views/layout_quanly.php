<!DOCTYPE html>
<html>
<head>
	<title>home</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php require_once "./mvc/helper/taithuvien.php"; ?>
	<script type="text/javascript" src="http://localhost/yeusach/public/js/page_quanly.js"></script>
	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</head>
<body>
	<script type="text/javascript">
		var BASE_URL = "http://localhost/yeusach/";
	</script>
	<?php require_once "./mvc/views/components/components.php"; ?>
	<div class="ql-k">
		<div class="ql-k-trai">
			<div class="ql-k-trai-logo">
				<img class="ql-logo" src="<?php echo load_icon("Logo-01.png"); ?>">
			</div>
			<div id='cssmenu-doc' class="ql-k-trai-menudoc">
				<ul>
					<li><a href='<?php echo BASE_URL."quanlywebsite" ?>'><span>Trang chính</span></a></li>
					<li class='active has-sub'><a href='#'><span>Thống kê</span></a>
						<ul>
							<li class="lase"><a href='<?php echo BASE_URL."quanlywebsite/thongke" ?>'><span>Thống kê</span></a></li>
						</ul>
					</li>
					<li class='active has-sub'><a href='#'><span>Quản lý tài khoản</span></a>
						<ul>
							<li class="last"><a href='<?php echo BASE_URL."quanlywebsite/taikhoan" ?>'><span>Danh sách tài khoản</span></a></li>
						</ul>
					</li>
					<li class='active has-sub'><a href='#'><span>Quản lý tin bán sách</span></a>
						<ul>
							<li><a href='<?php echo BASE_URL."quanlywebsite/xetduyettinbansach" ?>'><span>Xét duyệt tin bán sách</span></a></li>
							<li class='last'><a href='<?php echo BASE_URL."quanlywebsite/danhsachtinbansach" ?>'><span>Danh sách tin bán sách</span></a></li>
						</ul>
					</li>
					<li class='active has-sub'><a href='#'><span>Quản lý tin tức</span></a>
						<ul>
							<li><a href='<?php echo BASE_URL."quanlywebsite/dangtintuc" ?>'><span>Đăng tin tức</span></a></li>
							<li class='last'><a href='<?php echo BASE_URL."quanlywebsite/danhsachtintuc" ?>'><span>Danh sách tin tức</span></a></li>
						</ul>
					</li>
					<li class='active has-sub'><a href='#'><span>Quản lý đơn hàng</span></a>
						<ul>
							<li><a href='<?php echo BASE_URL."quanlywebsite/xetduyetdonhang" ?>'><span>Xét duyệt đơn hàng</span></a></li>
							<li><a href='<?php echo BASE_URL."quanlywebsite/donhangdanggiao" ?>'><span>Đơn hàng đang giao</span></a></li>
							<li><a href=''><span>Đơn hàng giao thành công</span></a></li>
							<li class='last'><a href=''><span>Đơn hàng bị hủy</span></a></li>
						</ul>
					</li>
					<li id="ql-cc" class='active has-sub hiden_im'><a href='#'><span>Quản lý cấp cao</span></a>
						<ul id="ql-cc-nd">
							<!-- js -->
						</ul>
					</li>
					
					<!-- --------------------------------------------------->
					<!-- <li class='active has-sub'><a href='#'><span>Products</span></a>
						<ul>
							<li class='has-sub'><a href='#'><span>Product 1</span></a>
								<ul>
									<li><a href='#'><span>Sub Product</span></a></li>
									<li class='last'><a href='#'><span>Sub Product</span></a></li>
								</ul>
							</li>
							<li class='has-sub'><a href='#'><span>Product 2</span></a>
								<ul>
									<li><a href='#'><span>Sub Product</span></a></li>
									<li class='last'><a href='#'><span>Sub Product</span></a></li>
								</ul>
							</li>
						</ul>
					</li>
					<li><a href='#'><span>About</span></a></li>
					<li class='last'><a href='#'><span>Contact</span></a></li> -->
				</ul>
			</div>
		</div>

		<div class="ql-k-phai">
			<div class="ql-k-phai-taikhoan">
				<div></div>
				<div class="dropdown">
					<span class="dropdown-toggle" type="button" data-toggle="dropdown">
						<?php echo $_SESSION['ad']['ten']; ?>
						<span class="caret"></span>
					</span>
					<ul class="dropdown-menu ql-admin-menu">
						<li class="dropdown-item"><a href="/yeusach"><span>Trang chủ</span></a></li>
						<li class="dropdown-item"><span id="ql-dangxuat">Đăng xuất</span></li>
					</ul>
				</div>
			</div>
			<div class="ql-k-phai-noidung">
				<?php require_once "./mvc/views/pages/".$data["Page"].".php"; ?>
			</div>
		</div>
	</div>

</body>
</html>