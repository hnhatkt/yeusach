<?php
class AdminModel extends DB{
	public function a(){return 'a';}

	public function MD_TaoTaiKhoanAdmin($tenadmin,$matkhau) {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$ngaythamgia = date('YmdHis');
		$q = "INSERT INTO admin VALUES(null, '$tenadmin', '$matkhau','', $ngaythamgia, '$ngaythamgia', 0,0)";
		if( mysqli_query($this->con, $q) ){
    		$result = true;
    	}else{
    		$result = false;
    	}
    	return json_encode($result);
	}

	public function MD_KiemTraDangNhapAdmin($qltadm,$qlmk){
		$q = "SELECT * FROM admin WHERE tenAdmin = '$qltadm' LIMIT 1";
		$rows = mysqli_query($this->con, $q);
		if( mysqli_num_rows($rows) > 0 ){
			$kq = mysqli_fetch_array($rows);
    		if(password_verify($qlmk, $kq['matKhau'])){
    			$_SESSION['ad']['ten'] = $kq['tenAdmin'];
    			$_SESSION['ad']['quyen'] = $kq['quyenTruyCap'];
    			return json_encode($kq);
    		}else{
    			return null;
    		}
		}else{
			return null;
		}
	}
	public function MD_DanhSachAdmin(){
		$q = "SELECT * FROM admin WHERE quyenTruyCap = 0";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}

}
?>