<div class="trangchu-ds">
	<div class="container container-md">

		<div class="khung-danhmuc">
			<div class="danhmuc-top">
				<p>
					Danh mục sách
				</p>
				<div class="locdm">
					<span>Tìm kiếm nhanh:</span>
					<form method="post">
						<input id="locdm" type="text" name="danhmuc" placeholder="Nhập tên thể loại..">
					</form>
					<!-- <div id="listSearch"></div> -->
				</div>
			</div>
			
			<div id="list-danhmuc" class="list-danhmuc">				
				
				<?php
				foreach($data['DanhMuc'] as $key => $values) {
					CP_DanhMuc($values);
				}
				?>

			</div>
		</div>
	</div>
</div>

