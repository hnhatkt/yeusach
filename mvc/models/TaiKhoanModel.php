<?php
class TaiKhoanModel extends DB{

    public function Insert($key,$data) {
    	$q = "";
    	if($key == 'taikhoan') {
    		date_default_timezone_set('Asia/Ho_Chi_Minh');
    		$ngaythamgia = date('YmdHis');
    		$q = "INSERT INTO taikhoan VALUES( null, '".$data['tentaikhoan']."', '".$data['matkhau']."', '".$data['sodienthoai']."', '".$data['email']."', '".$data['diachi']."', '".$data['anhdaidien']."', $ngaythamgia, $ngaythamgia, 0 )";
    	}
    	$result = false;
    	if( mysqli_query($this->con, $q) ){
    		$result = true;
    	}
    	return json_encode($result);
    }

    public function MD_KiemTraDangKy($key,$data) {
    	$q = "";
    	if($key == 'tentaikhoan') {
    		$q = "SELECT idTaiKhoan FROM taikhoan WHERE tenTaiKhoan = '$data'";
    	}
    	if($key == 'sodienthoai') {
    		$q = "SELECT idTaiKhoan FROM taikhoan WHERE soDienThoai = '$data'";
    	}
    	if($key == 'email') {
    		$q = "SELECT idTaiKhoan FROM taikhoan WHERE email = '$data'";
    	}

    	$rows = mysqli_query($this->con, $q);
    	$kq = '0';
    	if( mysqli_num_rows($rows) > 0 ){
    		$kq = '1';
    	}
    	return json_encode($kq);
    }

    public function MD_KiemTraDangNhap($data) {
     	$sdt = $data['sdt'];
     	$mk = $data['mk'];
        $nol = $data['ngayONL'];
     	$kq = "";
     	$q = "SELECT * FROM taikhoan WHERE soDienThoai = '$sdt'";
     	$rows = mysqli_query($this->con, $q);
    	
    	if( mysqli_num_rows($rows) > 0 ){
            $u = "UPDATE taikhoan SET ngayOnline = '$nol' WHERE soDienThoai = '$sdt'";
            $ru = mysqli_query($this->con, $u);

    		$kq = mysqli_fetch_array($rows);
    		if(password_verify($mk, $kq['matKhau'])){
    			$_SESSION['taikhoan']['id'] = $kq['idTaiKhoan'];
    			$_SESSION['taikhoan']['ten'] = $kq['tenTaiKhoan'];
    			$_SESSION['taikhoan']['sdt'] = $kq['soDienThoai'];
    			$_SESSION['taikhoan']['email'] = $kq['email'];
    			$_SESSION['taikhoan']['diachi'] = $kq['diaChi'];
    			$_SESSION['taikhoan']['anh'] = $kq['anhDaiDien'];
    			$_SESSION['taikhoan']['ngaythamgia'] = $kq['ngayThamGia'];
    			return json_encode($kq);
    		}else{ return null; }
    	}else{ return null; }
    }

    public function MD_CapNhatNgayOnline($ngayONL){
        if(isset($_SESSION['taikhoan'])){
           $idtaikhoan = $_SESSION['taikhoan']['id'];
           $u = "UPDATE taikhoan SET ngayOnline = '$ngayONL' WHERE idTaiKhoan = $idtaikhoan";
           if(mysqli_query($this->con, $u)){
                return true;
            }else{ return false; } 
        }else{ return false; }
    }

    public function MD_GetTaiKhoan($idtaikhoan){
        $q = "SELECT * FROM taikhoan WHERE idTaiKhoan = $idtaikhoan LIMIT 1";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

    public function MD_CapNhatTaiKhoan($data){
        $avt = '';
        $idtaikhoan = $_SESSION['taikhoan']['id'];
        $tentaikhoan = $data['tentaikhoan'];
        $email = $data['email'];
        $diachi = $data['diachi'];
        if($data['anhdaidien'] != ''){
            $avt = ",anhDaiDien = '".$data['anhdaidien']."' ";
        }
        $q = "UPDATE taikhoan
        SET tenTaiKhoan = '$tentaikhoan', email = '$email', diaChi = '$diachi' $avt
        WHERE idTaiKhoan = $idtaikhoan";
        if(mysqli_query($this->con, $q)){
            $_SESSION['taikhoan']['ten'] = $tentaikhoan;
            $_SESSION['taikhoan']['email'] = $email;
            $_SESSION['taikhoan']['diachi'] = $diachi;
            if($data['anhdaidien'] != ''){
                $_SESSION['taikhoan']['anh'] = $data['anhdaidien'];
            }
            return true;
        }else {return false;}
    }

    public function MD_TheoDoiTaiKhoan($idtaikhoan,$key){
        $id = $_SESSION['taikhoan']['id'];
        $q = "SELECT * FROM lichsutheodoitaikhoan WHERE idTKTheoDoi = $id";
        $rows = mysqli_query($this->con, $q);
        if( mysqli_num_rows($rows) > 0){
            if($key == "huy"){
                $h = "DELETE FROM lichsutheodoitaikhoan WHERE idTKTheoDoi = $id";
                if(mysqli_query($this->con, $h)){
                    return "dahuy";
                }
            }
            return "datd";
        }else{
            $in = "INSERT INTO lichsutheodoitaikhoan VALUES(null,$id,$idtaikhoan)";
            if(mysqli_query($this->con, $in)){ return "datd"; }
            else{ return false; }
        }
    }
    public function MD_GetDanhSachTaiKhoan($trang,$tentaikhoan,$sodienthoai,$tuychon){
        if($trang == "all"){
            $limit = '';
        }else{
            $vtdau = (($trang-1)*10);
            $soluong = 10;
            $limit = "LIMIT $vtdau,$soluong";
        }
        if($tuychon == 3){
            $tc = " AND voHieuHoa = 1 ";
        }else if($tuychon == 2){
            $tc = " AND voHieuHoa = 0 ";
        }else{
            $tc = '';
        }
        if($tentaikhoan == ''){
            $ttk = '';
        }else{
            $ttk = " AND tenTaiKhoan LIKE \"%".$tentaikhoan."%\" ";
        }
        if($sodienthoai == ''){
            $sdt = '';
        }else{
            $sdt = " AND soDienThoai LIKE \"%".$sodienthoai."%\" ";
        }
        $q = "SELECT * FROM taikhoan WHERE tenTaiKhoan != '' $tc $ttk $sdt $limit";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_ChanTaiKhoan($vhh, $idtaikhoan){
        $q = "UPDATE taikhoan SET voHieuHoa = $vhh WHERE idTaiKhoan = $idtaikhoan";
        if(mysqli_query($this->con, $q)){
            return true;
        }else{
            return false;
        }
    }
    public function MD_LuuDanhGia($idtaikhoan,$diem,$noidung){
        $idtkdg = $_SESSION['taikhoan']['id'];
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $hientai = date('YmdHis');
        $q = "INSERT INTO danhgianguoidung VALUES(null,$idtkdg,$idtaikhoan,$diem,'$noidung','$hientai')";
        if(mysqli_query($this->con, $q)){
            return true;
        }else{
            return false;
        }
    }
    public function MD_GetDanhSachDanhGia($idtaikhoan){
        $q = "SELECT * FROM danhgianguoidung,taikhoan
        WHERE idTaiKhoanDDG = $idtaikhoan
        AND danhgianguoidung.idTaiKhoanDG = taikhoan.idTaiKhoan
        ORDER BY thoiGianDanhGia DESC";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

}
?>