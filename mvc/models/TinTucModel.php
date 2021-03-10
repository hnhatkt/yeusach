<?php
class TinTucModel extends DB{

	public function MD_XuLyDangTinTuc($tintuc,$ds_id_tags) {
		$qtintuc = "INSERT INTO tintuc VALUES (null, '".$tintuc['tieude']."', '".$tintuc['tomtat']."', '".$tintuc['noidung']."', '".$tintuc['hinhanh']."', '".$tintuc['nguoiviet']."', '".$tintuc['thoigian']."',0,".$tintuc['hienthi']." )";

		if(mysqli_query($this->con, $qtintuc)){
			$qidtintuc = "SELECT * FROM tintuc WHERE tieuDe = '".$tintuc['tieude']."'";
			$rows = mysqli_query($this->con, $qidtintuc);
			$kq = mysqli_fetch_array($rows);
			foreach ($ds_id_tags as $key => $value) {
				$qtag = "INSERT INTO lichsutagtintuc VALUES (null, ".$kq['idTinTuc'].", ".$value.")";
				mysqli_query($this->con, $qtag);
			}
			$qdecu = "INSERT INTO tintucdecu VALUE (null, ".$kq['idTinTuc'].", '".$tintuc['thoigian']."')";
			mysqli_query($this->con, $qdecu);
			return true;
		}else{
			return false;
		}
	}

	public function MD_DanhSachTags() {
		$q = "SELECT * FROM tagtintuc";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetTinTuc($idtintuc) {
		$q = "SELECT * FROM tintuc WHERE idTinTuc = $idtintuc LIMIT 1";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetTags($idtintuc) {
		$q = "SELECT * FROM lichsutagtintuc,tagtintuc
		WHERE idTinTuc = $idtintuc
		AND lichsutagtintuc.idTagTinTuc = tagtintuc.idTagTinTuc";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_XemTinTuc($idtintuc) {
		$q = "SELECT * FROM tintuc WHERE idTinTuc = $idtintuc LIMIT 1";
		$rows = mysqli_query($this->con, $q);
		$kq = mysqli_fetch_array($rows);
		$luotxem = $kq['luotXem'] + 1;
		$q = "UPDATE tintuc SET luotXem = $luotxem WHERE idTinTuc = $idtintuc";
		if(mysqli_query($this->con, $q)) {
			return true;
		}else{
			return false;
		}
	}
	public function MD_GhiBinhLuan($idtintuc,$noidungbinhluan) {
		if(isset($_SESSION['taikhoan'])){
			$idtaikhoan = $_SESSION['taikhoan']['id'];
			date_default_timezone_set('Asia/Ho_Chi_Minh');
			$thoigian = date('YmdHis');
			$q = "INSERT INTO binhluantintuc VALUES (null, $idtintuc, $idtaikhoan, '$noidungbinhluan', $thoigian)";
			if(mysqli_query($this->con, $q)) {
				return true;
			}else{ return false; }
		}else{ return false; }
		
	}
	public function MD_GetDanhSachBinhLuan($idtintuc) {
		$q = "SELECT * FROM binhluantintuc,taikhoan
		WHERE idTinTuc = $idtintuc
		AND binhluantintuc.idTaiKhoan = taikhoan.idTaiKhoan
		ORDER BY binhluantintuc.thoiGianBinhLuan DESC";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetDanhSachTinTuc($soluong,$idtag) {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$hientai = date('YmdHis');
		switch ($idtag) {
			case 'all':
				$q = "SELECT * FROM
				(SELECT tintuc.idTinTuc,tieuDe,anhDaiDien,ngayDang,idTagTinTuc FROM tintuc
				LEFT JOIN lichsutagtintuc ON tintuc.idTinTuc = lichsutagtintuc.idTinTuc
				GROUP BY tintuc.tieuDe
				HAVING tintuc.ngayDang < $hientai
				ORDER BY tintuc.ngayDang DESC
				LIMIT $soluong) AS TT,tagtintuc
				WHERE TT.idTagTinTuc = tagtintuc.idTagTinTuc";
				break;

			case 'ttc':
				$q = "SELECT * FROM
				(SELECT tintuc.idTinTuc,tieuDe,anhDaiDien,ngayDang,idTagTinTuc,tomTat,luotXem
				FROM tintuc
				LEFT JOIN lichsutagtintuc ON tintuc.idTinTuc = lichsutagtintuc.idTinTuc
				GROUP BY tintuc.tieuDe
				HAVING (tintuc.ngayDang < $hientai AND lichsutagtintuc.idTagTinTuc != 1)
				ORDER BY tintuc.ngayDang DESC
				LIMIT $soluong) AS TT,tagtintuc
				WHERE TT.idTagTinTuc = tagtintuc.idTagTinTuc";
				break;
			
			default:
				$q = "SELECT * FROM tintuc,lichsutagtintuc,tagtintuc
				WHERE tintuc.idTinTuc = lichsutagtintuc.idtintuc
				AND lichsutagtintuc.idTagTinTuc = $idtag
				AND lichsutagtintuc.idTagTinTuc = tagtintuc.idTagTinTuc
				HAVING tintuc.ngayDang < $hientai
				ORDER BY tintuc.ngayDang DESC
				LIMIT $soluong";
				break;
		}
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetDanhSachTinDeCu($soluong,$idtag) {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$hientai = date('YmdHis');
		switch ($idtag) {
			case 'all':
				$q = "SELECT * FROM
				(SELECT tintuc.idTinTuc,tieuDe,tomTat,anhDaiDien,idTagTinTuc,ngayDang
				FROM tintucdecu,tintuc
				LEFT JOIN lichsutagtintuc ON tintuc.idTinTuc = lichsutagtintuc.idTinTuc
				GROUP BY tintuc.tieuDe
				HAVING tintuc.ngayDang < $hientai
				ORDER BY tintucdecu.thoiGian DESC 
				LIMIT $soluong) AS TT,tagtintuc
				WHERE TT.idTagTinTuc = tagtintuc.idTagTinTuc";
				break;

			case 'ttc':
				$q = "SELECT * FROM
				(SELECT tintuc.idTinTuc,tieuDe,tomTat,anhDaiDien,idTagTinTuc,ngayDang
				FROM tintucdecu,tintuc
				LEFT JOIN lichsutagtintuc ON tintuc.idTinTuc = lichsutagtintuc.idTinTuc
				GROUP BY tintuc.tieuDe
				HAVING (tintuc.ngayDang < $hientai AND lichsutagtintuc.idTagTinTuc != 1)
				ORDER BY tintucdecu.thoiGian DESC 
				LIMIT $soluong) AS TT,tagtintuc
				WHERE TT.idTagTinTuc = tagtintuc.idTagTinTuc";
				break;

			default:
				$q = "SELECT * FROM tintuc,lichsutagtintuc,tagtintuc,tintucdecu
				WHERE tintuc.idTinTuc = lichsutagtintuc.idtintuc
				AND tintucdecu.idTinTuc = tintuc.idTinTuc
				AND lichsutagtintuc.idTagTinTuc = $idtag
				AND lichsutagtintuc.idTagTinTuc = tagtintuc.idTagTinTuc
				HAVING tintuc.ngayDang < $hientai
				ORDER BY tintucdecu.thoiGian DESC
				LIMIT $soluong";
				break;
		}
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetDanhSachTinLienQuan($soluong,$idtintuc) {
		$q = "SELECT * FROM
		(SELECT idTagTinTuc FROM tintuc,lichsutagtintuc
		WHERE tintuc.idTinTuc = lichsutagtintuc.idTinTuc
		AND tintuc.idTinTuc = $idtintuc) AS TT,
		(SELECT idTagTinTuc,tieuDe,anhDaiDien,ngayDang,tintuc.idTinTuc FROM tintuc,lichsutagtintuc
		WHERE tintuc.idTinTuc = lichsutagtintuc.idTinTuc
		HAVING tintuc.idTinTuc != $idtintuc) AS TLQ
		WHERE TT.idTagTinTuc = TLQ.idTagTinTuc
		GROUP BY tieuDe
		ORDER BY ngayDang DESC
		LIMIT 6";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetDanhSachTinTheoTag($soluong,$tag) {
		switch ($tag) {
			case 'tintucchung':
				$q = "SELECT * FROM tintuc,lichsutagtintuc,tagtintuc
				WHERE tintuc.idTinTuc = lichsutagtintuc.idTinTuc
				AND lichsutagtintuc.idTagTinTuc = tagtintuc.idTagTinTuc
				GROUP BY tintuc.tieuDe
				ORDER BY tintuc.ngayDang DESC
				LIMIT $soluong ";
				break;
			
			default:
				$q = "SELECT * FROM tintuc,lichsutagtintuc,tagtintuc
				WHERE tintuc.idTinTuc = lichsutagtintuc.idTinTuc
				AND lichsutagtintuc.idTagTinTuc = tagtintuc.idTagTinTuc
				AND tagtintuc.tag = '$tag'
				GROUP BY tintuc.tieuDe
				ORDER BY tintuc.ngayDang DESC
				LIMIT $soluong ";
				break;
		}
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	public function MD_GetDanhSachTinTucQuanLy($trang) {
		if($trang == "all"){
			$limit = '';
		}else{
			$vtdau = (($trang-1)*6);
			$soluong = 6;
			$limit = "LIMIT $vtdau,$soluong";
		}
		
		$q = "SELECT S.*, COUNT(binhluantintuc.idBinhLuanTinTuc) AS luotBinhLuan FROM
		(SELECT tintuc.idTinTuc,anhDaiDien, tieuDe, nguoiViet, ngayDang, luotXem, GROUP_CONCAT(LST.tenTagTinTuc) AS tags
		FROM tintuc
		LEFT JOIN
		(SELECT idTinTuc,tenTagTinTuc
		FROM lichsutagtintuc,tagtintuc
		WHERE lichsutagtintuc.idTagTinTuc = tagtintuc.idTagTinTuc) AS LST
		ON tintuc.idTinTuc = LST.idTinTuc
		GROUP BY tintuc.idTinTuc) AS S
		LEFT JOIN binhluantintuc
		ON S.idTinTuc = binhluantintuc.idTinTuc
		GROUP BY S.idTinTuc
		ORDER BY ngayDang DESC
		$limit";
		$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
	}
	

}
?>