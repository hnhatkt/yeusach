<div class="header-1">
	<div class="container container-md header-dp">
		<div class="header-logo">
			<a href="/yeusach">
				<img src="<?php echo load_icon("Logo-01.png"); ?>">
			</a>
		</div>
		<div class="header-1-2 header-dp">
			<div class="header-info">
				<a href="Info">Thông tin website</a>
			</div>
			<div class="header-info">
				<a href="Contact">Liên hệ</a>
			</div>
		</div>
		<div class="header-1-3 header-dp">
		<?php
			if(isset($_SESSION['taikhoan'])){ ?>
				<div class="number-icon">
					<i id="nhantin-icon" class="material-icons">chat</i>
					<span id="sotinnhanchuaxem"></span>
				</div>
				<div class="number-icon dropdown">
					<i class="material-icons" data-toggle="dropdown">notifications</i>
					<span id="hd-sotb-chuaxem"></span>
					<div id="hd-btb" class="hd-tbms dropdown-menu">
						<h5>Thông báo</h5>
						<i class="material-icons" data-toggle="dropdown">more_vert</i>
						<div class="hd-tbms-tc dropdown-menu">
							<span class="hd-dd">
								<i class="material-icons">check</i>
								<span id="hd-dddd">Đánh dấu tất cả là đã đọc</span>
							</span>
							<span class="hd-dd">
								<i class="material-icons">web</i>
								<span>Mở bảng thông báo</span>
							</span>
						</div>
						<div id="hd-ds-tb">
							<!-- js -->
						</div>
					</div>
				</div>
				<div class="number-icon">
					<i id="hd-giohang" class="material-icons">add_shopping_cart</i>
					<span id="soluongdathang"></span>
				</div>
			<?php } ?>
		</div>
		<div id="taikhoan" class="header-1-4 header-dp user-area">
			<?php CP_HienThiUser(); ?>
		</div>
	</div>
</div>

<div class="header-2">
	<div class="container">
		<nav class="navbar navbar-expand-lg navbar-light">
			<a class="navbar-brand trangchu" href="<?php echo BASE_URL ?>">Trang chủ</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li id="danhmuc" class="nav-item">
						<a class="nav-link" href="<?php echo BASE_URL ?>danhmuc">Danh mục</a>
					</li>
					<li id="tintuc" class="nav-item">
						<a class="nav-link" href="<?php echo BASE_URL ?>tintuc">Tin tức</a>
					</li>
					<li id="phukien" class="nav-item">
						<a class="nav-link" href="<?php echo BASE_URL ?>phukien">Phụ kiện</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Đăng tin
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item mn-dtbs" id="mn-dtbs">Đăng tin bán sách</a>
							<a class="dropdown-item" href="#">Hướng dẫn đăng tin</a>
							<!-- <div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Hướng dẫn đăng</a> -->
						</div>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input id="hd-timkiemsach" class="form-control mr-sm-2" type="search" placeholder="Tìm kiếm sách" aria-label="Search">
					<input id="hd-btn-timkiemsach" type="button" class="btn btn-outline-success my-2 my-sm-0" value="Tìm">
				</form>
			</div>
		</nav>
	</div>
</div>
