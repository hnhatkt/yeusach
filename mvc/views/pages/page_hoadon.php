<script type="text/javascript">JS_page_hoadon();</script>
<div>
	<div class="trangchu-ds">
		<div class="container container-md">
			<div class="dh-k">
				<div class="dh-k-trai">
					<div class="dh-trai-tieude">
						Thông tin thanh toán
					</div>
					<div>Họ tên:<span id="dh-baoloi-hoten" class="maudo dh-hoten">*</span></div>
					<input id="dh-hoten" type="text" name="">
					<div class="dh-trai-btt">
						<div>Email:<span id="dh-baoloi-email" class="maudo dh-email">*</span></div>
						<div>Số điện thoại:<span id="dh-baoloi-sdt" class="maudo dh-sdt">*</span></div>
						<input id="dh-email" type="text" name="">
						<input id="dh-sdt" type="number" name="">
					</div>
					<div>Địa chỉ:<span class="maudo dh-dc">*</span> (Nhập đầy đủ số nhà, tên đường)</div>
					<input id="dh-dc" type="text" name="">
					<div class="dh-trai-btt">
						<div>Mã bưu điện:<span class="maudo dh-mbd">*</span></div>
						<div>Tỉnh/Thành phố:</div>
						<input id="dh-mbd" type="text" name="">
						<select id="dh-ttp" name="">
							<!-- js -->
						</select>
					</div>
					<hr>
					<div>Ghi chú:</div>
					<textarea id="dh-gc" name=""></textarea>
				</div>
				<div class="dh-k-phai">
					<div class="dh-phai-tieude">
						Đơn hàng của bạn
					</div>
					<div class="dh-phai-btt">
						<div class="ta-left indam">SẢN PHẨM</div>
						<div class="ta-right indam">TỔNG CỘNG</div>
					</div>
					<hr>
					<div id="dh-sach" class="dh-phai-btt">
						<!-- js -->
					</div>
					<hr>
					<div class="dh-phai-btt">
						<div class="ta-left">Phí ship</div>
						<div class="ta-right indam"><span id="dh-phiship">0</span> đ</div>
					</div>
					<hr>
					<div class="dh-phai-btt">
						<div class="ta-left indam">TỔNG TIỀN</div>
						<div class="ta-right indam"><span id="dh-tongtien">0</span> đ</div>
					</div>
					<hr>
					<div class="dh-phai-tt">
						<span><input type="radio" id="dh-tt-tien" name="kieuthanhtoan" checked="checked" value="1"> Trả tiền khi nhận hàng.</span>
						<span><input type="radio" id="dh-tt-bank" name="kieuthanhtoan" value="2"> Thanh toán online.</span>
					</div>
					<div class="dh-phai-iconbank">
						<img class="mr-13" src="http://localhost/yeusach/public/hinhanh/icon/logo-sacombank.jpg">
						<img class="mr-13" src="http://localhost/yeusach/public/hinhanh/icon/logo-vietinbank.jpg">
						<img src="http://localhost/yeusach/public/hinhanh/icon/logo-agribank.jpg">
					</div>
					<div class="dh-phai-luuy">
						<div class="gachchan">Lưu ý:</div>
						<div>- Kiểm tra kỹ thông tin trước khi đặt hàng.</div>
						<div>- Sản phẩm sẽ được gửi về trong vòng 3-5 ngày.</div>
					</div>
					<div class="dh-k-btn">
						<input id="dh-btn-dh" class="dh-btn-dh" type="button" value="ĐẶT HÀNG">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Thông báo nhập thiếu thông tin -->
<div class="modal fade" id="dh-tb-thieuthongtin" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Thông báo</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Bạn nhập thiếu thông tin, mời xem lại!
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal">Đồng ý</button>
			</div>
		</div>
	</div>
</div>

<!-- Thông báo xác nhận đặt hàng -->
<div class="modal fade" id="dh-tb-xacnhandathang" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Xác nhận</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Bạn chắc chắn đặt hàng?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
				<button id="dh-btn-xn" type="button" data-dismiss="modal" class="btn btn-primary">Đồng ý</button>
			</div>
		</div>
	</div>
</div>

<!-- Thông báo đặt hàng thành công-->
<div class="modal fade" id="dh-tb-thanhcong" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Thông báo</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Đặt hàng thành công!
			</div>
			<div class="modal-footer">
				<button id="dh-btn-tc" type="button" data-dismiss="modal" class="btn btn-primary">Đồng ý</button>
			</div>
		</div>
	</div>
</div>

<!-- Thông báo sách đã bị đặt-->
<div class="modal fade" id="dh-tb-sachbidat" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Thông báo</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div id="hd-tensachbidat" class="modal-body">
				<!-- js -->
			</div>
			<div class="modal-footer">
				<button id="dh-btn-sachbidat" type="button" data-dismiss="modal" class="btn btn-primary">Đồng ý</button>
			</div>
		</div>
	</div>
</div>
