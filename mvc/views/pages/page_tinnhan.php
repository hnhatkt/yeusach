<script type="text/javascript">JS_page_tinnhan();</script>
<div class="khungtrangtn">
	<div>
		<?php require_once "./mvc/views/components/header.php" ?>
	</div>
	
	<div class="khung-tinnhan">
		<div class="tinnhan-trai">
			<div class="tn-t-tren">
				<span id="tn-chontatca">Tất cả</span>
				<span id="tn-chonmua">Mua</span>
				<span id="tn-chonban">Bán</span>
			</div>
			<div id="dstinnhan" class="ds-tn">
				<!-- hiển thị bằng js -->
			</div>
		</div>

		<div class="tinnhan-phai">
			<div class="tknt" id="tktn">
				<img class="tknt-avt" id="tknt-avt">
				<!-- hiển thị bằng js - ảnh đại diện -->
				<div>
					<div id="tknt-tentk">
						<!-- hiển thị bằng js - tên tài khoản -->
					</div>
					<div class="tknt-nt">
						<span><i class="material-icons icon-onl">fiber_manual_record </i></span>
						<span class="nttt" id="tg-tk-online"></span>
					</div>
				</div>
				<div class="dropdown tn-tuychon">
					<span type="button" data-toggle="dropdown">
						<i class="material-icons">more_vert</i>
						<span class="caret"></span>
					</span>
					<ul class="dropdown-menu tn-tuychon-menu">
						<li class="dropdown-item tntc-li"><i class="material-icons tntc-icon">block</i>Chặn người này</li>
						<li class="dropdown-item tntc-li"><i class="material-icons tntc-icon">flag</i>Báo xấu</li>
						<li class="dropdown-item tntc-li" id="chonxoatn"><i class="material-icons tntc-icon">delete</i>Xóa cuộc trò chuyện</li>
					</ul>
				</div>
			</div>
			<div class="tn-tin" id="tn-tin">
				<!-- hiển thị bằng js -->
			</div>
			<div class="khunghienthitn" id="cuontn">
				<div id="khttn">
					<!-- hiển thị bằng js -->
				</div>
			</div>
			<div class="tnp-vtn">
				<div class="tnp-vtn-k">
					<input id="onhaptn" class="onhaptn" type="text">
					<i id="nutguitn" class="material-icons icongui">send</i>
				</div>
			</div>
		</div>
	</div>
</div>

<input id="idnguoigui" type="text" value="<?php echo $_SESSION['taikhoan']['id']; ?>">

