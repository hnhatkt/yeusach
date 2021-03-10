<?php
class Ajax extends Controller {
	
	public $DanhMucModel;
	public $TaiKhoanModel;
	public $SachModel;
	public $TinBanSachModel;
	public $TinNhanModel;
	public $DiaChiModel;
	public $AdminModel;
	public $TinTucModel;
	public $DonHangModel;

	function __construct() {
		$this->DanhMucModel = $this->model("DanhMucModel");
		$this->TaiKhoanModel = $this->model("TaiKhoanModel");
		$this->SachModel = $this->model("SachModel");
		$this->TinBanSachModel = $this->model("TinBanSachModel");
		$this->TinNhanModel = $this->model("TinNhanModel");
		$this->DiaChiModel = $this->model("DiaChiModel");
		$this->AdminModel = $this->model("AdminModel");
		$this->TinTucModel = $this->model("TinTucModel");
		$this->DonHangModel = $this->model("DonHangModel");
	}
	
	public function AJ_GetTaiKhoanHienTai() {
		if(isset($_SESSION['taikhoan'])){
			$taikhoan['id'] = $_SESSION['taikhoan']['id'];
			$taikhoan['anh'] = $_SESSION['taikhoan']['anh'];
			$taikhoan['ten'] = $_SESSION['taikhoan']['ten'];
			echo json_encode($taikhoan);
		}else {
			echo false;
		}
	}
	public function AJ_LocDanhMuc() {
		$dm = $_POST['dm'];
		$data = $this->DanhMucModel->MD_GetDanhMuc($dm);
		echo json_encode($data);
	}
	public function AJ_KiemTraDK() {
		$key = $_POST['key'];
		$data = $_POST['data'];
		if($key == 'sodienthoai'){
			$kq = $this->TaiKhoanModel->MD_KiemTraDangKy('sodienthoai',$data);
		}
		if($key == 'tentaikhoan'){
			$kq = $this->TaiKhoanModel->MD_KiemTraDangKy('tentaikhoan',$data);
		}
		if($key == 'email'){
			$kq = $this->TaiKhoanModel->MD_KiemTraDangKy('email',$data);
		}
		echo json_decode($kq);
	}
	public function AJ_KiemTraDN() {
		$data = array();
		$data['sdt'] = $_POST['sdt'];
		$data['mk'] = $_POST['mk'];
		$data['ngayONL'] = $_POST['ngayONL'];
		$kq = $this->TaiKhoanModel->MD_KiemTraDangNhap($data);
		echo json_encode($kq);
	}
	public function AJ_KiemTraDangNhap() {
		if(isset($_SESSION['taikhoan'])) {
			$kq = true;
		}else{
			$kq = false;
		}
		echo json_encode($kq);
	}
	public function AJ_CapNhatNgayOnline(){
		$ngayONL = $_POST['ngayONL'];
		$kq = $this->TaiKhoanModel->MD_CapNhatNgayOnline($ngayONL);
		echo json_encode($kq);
	}
	public function AJ_HuySession() {
		$name = $_POST['data'];
		unset($_SESSION[$name]);
		echo json_encode($name);
	}
	public function AJ_TinBanSachTrangChu() {
		$sotin = $_POST['data'];
		$idsach = $_POST['idsach'];
		$kq = $this->SachModel->GetTinBanSachTrangChu($sotin,$idsach,0);
		echo json_encode($kq);
	}
	public function AJ_GhiTinNhan() {
		$noidungtinnhan = $_POST['noidungtinnhan'];
		$hientai = $_POST['hientai'];
		$idnguoigui = $_POST['idnguoigui'];
		$idtinnhan = $_POST['idtinnhan'];
		$kq = $this->TinNhanModel->MD_GhiTinNhan($noidungtinnhan,$hientai,$idnguoigui,$idtinnhan);
		echo json_encode($kq);
	}
	public function AJ_GetLSTN() {
		$idtinnhan = $_POST['idtinnhan'];
		$kq = $this->TinNhanModel->MD_GetLSTN($idtinnhan);
		echo json_encode($kq);
	}
	public function AJ_XoaTinNhan() {
		$idtn = $_POST['idtn'];
		$kq = $this->TinNhanModel->MD_XoaTinNhan($idtn);
		echo json_encode($kq);
	}
	public function AJ_TaoTinNhan() {
		if(!isset($_SESSION['taikhoan'])){
			echo json_encode("chuadn");
		}else{
			$idtin = $_POST['idtin'];
			$hientai = $_POST['hientai'];
			$kq = $this->TinNhanModel->MD_TaoTinNhan($idtin,$hientai);
			echo json_encode($kq);
		}
	}
	public function AJ_GetDSTinNhan() {
		$mua = $_POST['mua'];
		$ban = $_POST['ban'];
		$kq = $this->TinNhanModel->MD_GetDSTinNhan($mua,$ban);
		echo json_encode($kq);
	}
	public function AJ_LoadTinBanSachDangNhan() {
		$idtinnhan = $_POST['idtinnhan'];
		$kq = $this->TinNhanModel->MD_LoadTinBanSachDangNhan($idtinnhan);
		echo json_encode($kq);
	}
	public function AJ_SoTinNhanChuaXem(){
		$kq = $this->TinNhanModel->MD_SoTinNhanChuaXem();
		echo json_encode($kq);
	}
	public function AJ_DSTinhThanhPho(){
		$kq = $this->DiaChiModel->MD_DSTinhThanhPho();
		echo json_encode($kq);
	}
	public function AJ_DSQuanHuyenThiXa(){
		$idTTP = $_POST['idTTP'];
		$kq = $this->DiaChiModel->MD_DSQuanHuyenThiXa($idTTP);
		echo json_encode($kq);
	}
	public function AJ_DanhMucSach(){
		$kq = $this->DanhMucModel->MD_GetDanhMuc('');
		echo json_encode($kq);
	}
	public function AJ_NgonNgu(){
		$kq = $this->DiaChiModel->MD_NgonNgu('');
		echo json_encode($kq);
	}
	public function AJ_LocDSTinBanSach() {
		$sotin = $_POST['sotin'];
		$idtinhthanhpho = $_POST['idtinhthanhpho'];
		$iddanhmuc = $_POST['iddanhmuc'];
		$namxuatban = $_POST['namxuatban'];
		$tuychonhienthi = $_POST['tuychonhienthi'];
		$tensach = $_POST['tensach'];
		$kq = $this->SachModel->MD_GetLocDSTinBanSach($sotin,$idtinhthanhpho,$iddanhmuc,$namxuatban,$tuychonhienthi,$tensach);
		echo json_encode($kq);
	}
	public function AJ_KiemTraDangNhapAdmin() {
		$qltadm = $_POST['qltadm'];
		$qlmk = $_POST['qlmk'];
		$kq = $this->AdminModel->MD_KiemTraDangNhapAdmin($qltadm,$qlmk);
		echo json_encode($kq);
	}
	public function AJ_DanhSachTagsTinTuc() {
		$kq = $this->TinTucModel->MD_DanhSachTags();
		echo json_encode($kq);
	}
	public function AJ_GetTinTuc() {
		$idtintuc = $_POST['idtintuc'];
		$kq = $this->TinTucModel->MD_GetTinTuc($idtintuc);
		echo json_encode($kq);
	}
	public function AJ_GetTags() {
		$idtintuc = $_POST['idtintuc'];
		$kq = $this->TinTucModel->MD_GetTags($idtintuc);
		echo json_encode($kq);
	}
	public function AJ_XemTinTuc() {
		$idtintuc = $_POST['idtintuc'];
		$kq = $this->TinTucModel->MD_XemTinTuc($idtintuc);
		echo json_encode($kq);
	}
	public function AJ_GhiBinhLuan() {
		$idtintuc = $_POST['idtintuc'];
		$noidungbinhluan = $_POST['noidungbinhluan'];
		$kq = $this->TinTucModel->MD_GhiBinhLuan($idtintuc,$noidungbinhluan);
		echo $kq;
	}
	public function AJ_GetDanhSachBinhLuan() {
		$idtintuc = $_POST['idtintuc'];
		$kq = $this->TinTucModel->MD_GetDanhSachBinhLuan($idtintuc);
		echo json_encode($kq);
	}
	public function AJ_GetDanhSachTinTuc() {
		$soluong = $_POST['soluong'];
		$idtag = $_POST['idtag'];
		$kq = $this->TinTucModel->MD_GetDanhSachTinTuc($soluong,$idtag);
		echo json_encode($kq);
	}
	public function AJ_GetDanhSachTinDeCu() {
		$soluong = $_POST['soluong'];
		$idtag = $_POST['idtag'];
		$kq = $this->TinTucModel->MD_GetDanhSachTinDeCu($soluong,$idtag);
		echo json_encode($kq);
	}
	public function AJ_GetDanhSachTinLienQuan() {
		$soluong = $_POST['soluong'];
		$idtintuc = $_POST['idtintuc'];
		$kq = $this->TinTucModel->MD_GetDanhSachTinLienQuan($soluong,$idtintuc);
		echo json_encode($kq);
	}
	public function AJ_GetDanhSachTinTheoTag() {
		$soluong = $_POST['soluong'];
		$tag = $_POST['tag'];
		$kq = $this->TinTucModel->MD_GetDanhSachTinTheoTag($soluong,$tag);
		echo json_encode($kq);
	}
	public function AJ_DanhSachTinBanSachChuaDuyet() {
		$trang = $_POST['trang'];
		$kq = $this->SachModel->MD_GetDanhSachTinBanSachQuanLy($trang,3,"ASC");
		echo json_encode($kq);
	}
	public function AJ_DanhSachTinBanSach() {
		$trang = $_POST['trang'];
		$kq = $this->SachModel->MD_GetDanhSachTinBanSachQuanLy($trang,0,"DESC");
		echo json_encode($kq);
	}
	public function AJ_XetDuyet_Dang() {
		$idsach = $_POST['idsach'];
		$kq = $this->SachModel->MD_XetDuyet_Dang($idsach);
		echo json_encode($kq);
	}
	public function AJ_XetDuyet_Huy() {
		$idsach = $_POST['idsach'];
		$kq = $this->SachModel->MD_XetDuyet_Huy($idsach);
		echo json_encode($kq);
	}
	public function AJ_DanhSachTinTucQuanLy() {
		$trang = $_POST['trang'];
		$kq = $this->TinTucModel->MD_GetDanhSachTinTucQuanLy($trang);
		echo json_encode($kq);
	}
	public function AJ_XuLyDonDatHang() {
		$data = $_POST['data'];
		$kq = $this->DonHangModel->MD_XuLyDonHang($data);
		echo $kq;
	}
	public function AJ_GetTaiKhoan() {
		$idtaikhoan = $_POST['idtaikhoan'];
		$kq = $this->TaiKhoanModel->MD_GetTaiKhoan($idtaikhoan);
		echo json_encode($kq);
	}
	public function AJ_GetDanhSachTinBanSachTheoTaiKhoan() {
		$idtaikhoan = $_POST['idtaikhoan'];
		$soluong = $_POST['soluong'];
		$kq = $this->SachModel->MD_GetDanhSachTinBanSachTheoTaiKhoan($idtaikhoan,$soluong);
		echo json_encode($kq);
	}
	public function AJ_KiemTraIDTaiKhoan() {
		if(isset($_SESSION['taikhoan'])){
			$idtaikhoan = $_POST['idtaikhoan'];
			if($idtaikhoan == $_SESSION['taikhoan']['id']){ echo json_encode(true); }
			else{ echo json_encode(false); }
		}else{ echo json_encode(false); }
		
	}
	public function AJ_BanSachThanhCong() {
		$idsach = $_POST['idsach'];
		$kq = $this->TinBanSachModel->MD_BanSachThanhCong($idsach);
		echo json_encode($kq);
	}
	public function AJ_HuyBanSach() {
		$idsach = $_POST['idsach'];
		$kq = $this->TinBanSachModel->MD_HuyBanSach($idsach);
		echo json_encode($kq);
	}
	public function AJ_GetTinBanSachThanhCong() {
		$idtaikhoan = $_POST['idtaikhoan'];
		$kq = $this->TinBanSachModel->MD_GetTinBanSachThanhCong($idtaikhoan);
		echo json_encode($kq);
	}
	public function AJ_GetThongTinCaNhan() {
		$idtaikhoan = $_SESSION['taikhoan']['id'];
		$kq = $this->TaiKhoanModel->MD_GetTaiKhoan($idtaikhoan);
		echo json_encode($kq);
	}
	public function AJ_TheoDoiTaiKhoan(){
		if(isset($_SESSION['taikhoan'])){
			$idtaikhoan = $_POST['idtaikhoan'];
			$key = $_POST['key'];
			$kq = $this->TaiKhoanModel->MD_TheoDoiTaiKhoan($idtaikhoan,$key);
			echo json_encode($kq);
		}else{ echo json_encode("cdn"); }
	}
	public function AJ_GetTinBanSach(){
		$idtin = $_POST['idtin'];
		$kq = $this->TinBanSachModel->MD_GetTinBanSach($idtin);
		echo json_encode($kq);
	}
	public function AJ_GetDanhSachDatHang(){
		$ds_idtin = $_POST['ds_idtin'];
		$kq = $this->TinBanSachModel->MD_GetDanhSachDatHang($ds_idtin);
		echo json_encode($kq);
	}
	public function AJ_GetThongBaoMuaSach(){
		$idtaikhoan = $_SESSION['taikhoan']['id'];
		$kq = $this->TinBanSachModel->MD_GetThongBaoMuaSach($idtaikhoan);
		echo json_encode($kq);
	}
	public function AJ_XemThongBao(){
		$idthongbaomuasach = $_POST['idthongbaomuasach'];
		$kq = $this->TinBanSachModel->MD_XemThongBao($idthongbaomuasach);
		echo $kq;
	}
	public function AJ_DanhDauTatCaThongBaoDaDoc(){
		$idtaikhoan = $_SESSION['taikhoan']['id'];
		$kq = $this->TinBanSachModel->MD_DanhDauTatCaThongBaoDaDoc($idtaikhoan);
		echo $kq;
	}
	public function AJ_DanhSachDonDatHang(){
		$trang = $_POST['trang'];
		$kq = $this->DonHangModel->MD_DanhSachDonDatHang($trang);
		echo json_encode($kq);
	}
	public function AJ_HuyDonHang(){
		$iddonhang = $_POST['iddonhang'];
		$kq = $this->DonHangModel->MD_HuyDonHang($iddonhang);
		echo $kq;
	}
	public function AJ_XemDonHang_ThongTin(){
		$iddonhang = $_POST['iddonhang'];
		$kq = $this->DonHangModel->MD_XemDonHang_ThongTin($iddonhang);
		echo json_encode($kq);
	}
	public function AJ_XemDonHang_DanhSachSach(){
		$iddonhang = $_POST['iddonhang'];
		$kq = $this->DonHangModel->MD_XemDonHang_DanhSachSach($iddonhang);
		echo json_encode($kq);
	}
	public function AJ_GiaoDonHang(){
		$iddonhang = $_POST['iddonhang'];
		$kq = $this->DonHangModel->MD_GiaoDonHang($iddonhang);
		echo json_encode($kq);
	}
	public function AJ_DanhSachTaiKhoan(){
		$trang = $_POST['trang'];
		$ttk = $_POST['tentaikhoan'];
		$sodienthoai = $_POST['sodienthoai'];
		$tuychon = $_POST['tuychon'];
		$kq = $this->TaiKhoanModel->MD_GetDanhSachTaiKhoan($trang,$ttk,$sodienthoai,$tuychon);
		echo json_encode($kq);
	}
	public function AJ_ChanTaiKhoan(){
		$idtaikhoan = $_POST['idtaikhoan'];
		$vhh = $_POST['vhh'];
		$kq = $this->TaiKhoanModel->MD_ChanTaiKhoan($vhh,$idtaikhoan);
		echo json_encode($kq);
	}
	public function AJ_LuuDanhGia(){
		$idtaikhoan = $_POST['idtaikhoan'];
		$diem = $_POST['diem'];
		$noidung = $_POST['noidung'];
		$kq = $this->TaiKhoanModel->MD_LuuDanhGia($idtaikhoan,$diem,$noidung);
		echo $kq;
	}
	public function AJ_GetDanhSachDanhGia(){
		$idtaikhoan = $_POST['idtaikhoan'];
		$kq = $this->TaiKhoanModel->MD_GetDanhSachDanhGia($idtaikhoan);
		echo json_encode($kq);
	}
	public function AJ_DoiTrangThaiCTDH(){
		$idtin = $_POST['idtin'];
		$tt = $_POST['tt'];
		$kq = $this->DonHangModel->MD_DoiTrangThaiCTDH($idtin,$tt);
		echo $kq;
	}
	public function AJ_GhiChuCTDH(){
		$idtin = $_POST['idtin'];
		$gc = $_POST['gc'];
		$kq = $this->DonHangModel->MD_GhiChuCTDH($idtin,$gc);
		echo $kq;
	}
	public function AJ_QuanLyCapCao(){
		if(isset($_SESSION['ad']['quyen'])){
			echo $_SESSION['ad']['quyen'];
		}else{
			echo 'no';
		}
	}
	public function AJ_DanhSachDonHangDangGiao(){
		$trang = $_POST['trang'];
		$kq = $this->DonHangModel->MD_DanhSachDonHangDangGiao($trang);
		echo json_encode($kq);
	}
	public function AJ_GiaoHangThanhCong(){
		$iddonhang = $_POST['iddonhang'];
		$kq = $this->DonHangModel->MD_GiaoHangThanhCong($iddonhang);
		echo json_encode($kq);
	}
	public function AJ_KhongNhanHang(){
		$iddonhang = $_POST['iddonhang'];
		$kq = $this->DonHangModel->MD_KhongNhanHang($iddonhang);
		echo json_encode($kq);
	}
	public function AJ_DanhSachAdmin(){
		$kq = $this->AdminModel->MD_DanhSachAdmin();
		echo json_encode($kq);
	}

}
?>