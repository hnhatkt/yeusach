<script type="text/javascript">JS_page_quanly_xemdonhang()</script>
<div class="xdh-k">
	<div class="xdh-tt-dh">
		<h4 class="xdh-td"><span>Thông tin đơn hàng</span></h4>
		<div>
			<table>
				<tr>
					<td class="indam" width="130">Người nhận:</td>
					<td id="xdh-nguoinhan"></td>
				</tr>
				<tr>
					<td class="indam" width="130">Số điện thoại:</td>
					<td id="xdh-sdt"></td>
				</tr>
				<tr>
					<td class="indam" width="130">Ngày đặt hàng:</td>
					<td id="xdh-ngaydat"></td>
				</tr>
				<tr>
					<td class="indam" width="130">Địa chỉ:</td>
					<td id="xdh-diachi"></td>
				</tr>
				<tr>
					<td class="indam" width="130">Mã bưu điện:</td>
					<td id="xdh-mbd"></td>
				</tr>
				<tr>
					<td class="indam" width="130" style="display: flex; align-items: flex-start;">Tên sách:</td>
					<td id="xdh-ds-sach">
						<!-- js -->
					</td>
				</tr>
				<tr>
					<td class="indam" width="130">Thanh toán:</td>
					<td id="xdh-ktt"></td>
				</tr>
			</table>
		</div>
		<div class="xdh-btn-gh">
			<input id="xdh-btn-gh" type="button" value="Giao hàng">
			<input id="xdh-btn-hd" type="button" value="Hủy đơn">
		</div>
	</div>
	
</div>
<!-- Thông báo xac nhan giao hang -->
<div class="modal fade" id="xdh-tb-giaohang" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Xác nhận</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Xác nhận giao đơn hàng này?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
				<button id="xdh-btn-giaohang" type="button" data-dismiss="modal" class="btn btn-primary">Đồng ý</button>
			</div>
		</div>
	</div>
</div>
<!-- Thông báo xac nhan huy don hang -->
<div class="modal fade" id="xdh-tb-huydon" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLongTitle">Xác nhận</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Hủy đơn hàng này?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
				<button id="xdh-btn-huydon" type="button" data-dismiss="modal" class="btn btn-primary">Đồng ý</button>
			</div>
		</div>
	</div>
</div>