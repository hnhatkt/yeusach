<?php
class DonHangModel extends DB{

    public function MD_XuLyDonHang($data) {
    	$idtaikhoan = $_SESSION['taikhoan']['id'];
    	$ds_idtin = array();
    	$ds_idtin = $data['ds_idtin'];
		$hoten = $data['hoten'];
		$email = $data['email'];
		$sodienthoai = $data['sodienthoai'];
		$mabuudien = $data['mabuudien'];
		$idttp = $data['idttp'];
		$diachi = $data['diachi'];
		$ghichu = $data['ghichu'];
		$phiship = $data['phiship'];
		$tongtien = $data['tongtien'];
		$kieuthanhtoan = $data['kieuthanhtoan'];
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$hientai = date('YmdHis');
    	$result = true;
    	$q1 = "INSERT INTO donhang VALUES( null,$phiship,$tongtien,'$hoten','$email','$sodienthoai','$diachi',$idttp,'$mabuudien','$ghichu',$kieuthanhtoan,'$hientai',0 )";
    	if( !mysqli_query($this->con, $q1) ){ $result = false; }
    	for($i = 0; $i < count($ds_idtin); $i++){
    		$q2 = "UPDATE tinbansach SET trangThaiTinBanSach  = 1 WHERE idTin = ".$ds_idtin[$i];
    		if( !mysqli_query($this->con, $q2) ){ $result = false; }
    		$q3 = "SELECT * FROM donhang WHERE nguoiNhan = '$hoten' AND sodienthoai = '$sodienthoai' ORDER BY thoiGian DESC LIMIT 1";
    		$rows = mysqli_query($this->con, $q3);
    		$kq = mysqli_fetch_array($rows);
    		$q4 = "INSERT INTO chitietdonhang VALUES(null,".$kq['idDonHang'].",".$ds_idtin[$i].",0,'')";
    		if( !mysqli_query($this->con, $q4) ){ $result = false; }
    		$q5 = "INSERT INTO thongbaomuasach VALUES(null,$idtaikhoan,".$ds_idtin[$i].",0,$hientai)";
    		if( !mysqli_query($this->con, $q5) ){ $result = false; }
    	}
    	return json_encode($result);
    }
    public function MD_DanhSachDonDatHang($trang){
        if($trang == "all"){
            $limit = '';
        }else{
            $vtdau = (($trang-1)*6);
            $soluong = 6;
            $limit = "LIMIT $vtdau,$soluong";
        }
        $q = "SELECT *,GROUP_CONCAT(FS.tenSach) AS ds_tensach
        FROM donhang,
        (SELECT chitietdonhang.*,sach.tenSach FROM chitietdonhang,tinbansach,sach
        WHERE chitietdonhang.idTin = tinbansach.idTin
        AND tinbansach.idSach = sach.idSach) AS FS
        WHERE donhang.idDonHang = FS.idDonHang
        AND donhang.trangThaiDonDatHang = 0
        GROUP BY donhang.idDonHang
        ORDER BY donhang.thoiGian ASC
        $limit";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_HuyDonHang($iddonhang){
        $kq =true;
        $q = "SELECT * FROM chitietdonhang WHERE idDonHang = $iddonhang";
        $rows = mysqli_query($this->con, $q);
        while ($row = mysqli_fetch_array($rows)) {
            $idtin = $row['idTin'];
            $q1 = "UPDATE tinbansach SET trangThaiTinBanSach = 0 WHERE idTin = $idtin";
            if( !mysqli_query($this->con, $q1) ){ $kq = false; }
        }
        $q = "UPDATE donhang SET trangThaiDonDatHang = 3 WHERE idDonHang = $iddonhang";
        if( !mysqli_query($this->con, $q) ){ $kq = false; }
        return json_encode($kq);
    }
    public function MD_XemDonHang_ThongTin($iddonhang){
        $q ="SELECT * FROM donhang WHERE idDonHang = $iddonhang LIMIT 1";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_XemDonHang_DanhSachSach($iddonhang){
        $q = "SELECT * FROM chitietdonhang WHERE idDonHang = $iddonhang";
        $rows = mysqli_query($this->con, $q);
        $row = mysqli_fetch_array($rows);
        $ds_idtin = '( tinbansach.idTin = '.$row['idTin'];
        while ($row = mysqli_fetch_array($rows)) {
            $idtin = $row['idTin'];
            $ds_idtin .= " OR tinbansach.idTin = $idtin ";
        }
        $ds_idtin .= ")";
        $q1 = "SELECT *,tinbansach.idTin AS idTBS FROM tinbansach,sach,taikhoan
        WHERE tinbansach.idSach = sach.idSach
        AND tinbansach.idTaiKhoan = taikhoan.idTaiKhoan
        AND $ds_idtin ";
        $rows = mysqli_query($this->con, $q1);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_GiaoDonHang($iddonhang){
        $kq = true;
        $q = "UPDATE donhang SET trangThaiDonDatHang = 1 WHERE idDonHang = $iddonhang";
        if( !mysqli_query($this->con, $q) ){ $kq = false; }
        return json_encode($kq);
    }
    public function MD_DoiTrangThaiCTDH($idtin,$tt){
        $kq = true;
        $q = "UPDATE chitietdonhang SET trangThaiCT = $tt WHERE idTin = $idtin";
        if( !mysqli_query($this->con, $q) ){ $kq = false; }
        return $kq;
    }
    public function MD_GhiChuCTDH($idtin,$gc){
        $kq = true;
        $q = "UPDATE chitietdonhang SET ghiChu = '$gc' WHERE idTin = $idtin";
        if( !mysqli_query($this->con, $q) ){ $kq = false; }
        return $kq;
    }
    public function MD_DanhSachDonHangDangGiao($trang){
        if($trang == "all"){
            $limit = '';
        }else{
            $vtdau = (($trang-1)*6);
            $soluong = 6;
            $limit = "LIMIT $vtdau,$soluong";
        }
        $q = "SELECT *,GROUP_CONCAT(FS.tenSach) AS ds_tensach
        FROM donhang,
        (SELECT chitietdonhang.*,sach.tenSach FROM chitietdonhang,tinbansach,sach
        WHERE chitietdonhang.idTin = tinbansach.idTin
        AND tinbansach.idSach = sach.idSach) AS FS
        WHERE donhang.idDonHang = FS.idDonHang
        AND donhang.trangThaiDonDatHang = 1
        GROUP BY donhang.idDonHang
        ORDER BY donhang.thoiGian ASC
        $limit";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_GiaoHangThanhCong($iddonhang){
        $kq = true;
        $q = "UPDATE donhang SET trangThaiDonDatHang = 2 WHERE idDonHang = $iddonhang";
        if( !mysqli_query($this->con, $q) ){ $kq = false; }
        $q = "SELECT * FROM donhang,chitietdonhang
        WHERE donhang.idDonHang = chitietdonhang.idDonHang
        AND donhang.idDonHang = $iddonhang";
        $rows = mysqli_query($this->con, $q);
        while ($d = mysqli_fetch_array($rows)) {
            $idtin = $d['idTin'];
            $q = "UPDATE tinbansach SET trangThaiTinBanSach = 5 WHERE idTin = $idtin";
            if( !mysqli_query($this->con, $q) ){ $kq = false; }
        }
        return json_encode($kq);
    }
    public function MD_KhongNhanHang($iddonhang){
        $kq = true;
        $q = "UPDATE donhang SET trangThaiDonDatHang = 3 WHERE idDonHang = $iddonhang";
        if( !mysqli_query($this->con, $q) ){ $kq = false; }
        $q = "SELECT * FROM donhang,chitietdonhang
        WHERE donhang.idDonHang = chitietdonhang.idDonHang
        AND donhang.idDonHang = $iddonhang";
        $rows = mysqli_query($this->con, $q);
        while ($d = mysqli_fetch_array($rows)) {
            $idtin = $d['idTin'];
            $q = "UPDATE tinbansach SET trangThaiTinBanSach = 0 WHERE idTin = $idtin";
            if( !mysqli_query($this->con, $q) ){ $kq = false; }
        }
        return json_encode($kq);
    }

}
?>

