<?php
class TinBanSachModel extends DB{

	public function MD_BanSachThanhCong($idsach){
		$q = "UPDATE tinbansach SET trangThaiTinBanSach = 5 WHERE idSach = $idsach";
		if(mysqli_query($this->con, $q)){ return true; }
        else{ return false; }
	}

    public function MD_HuyBanSach($idsach){
        $q = "UPDATE tinbansach SET trangThaiTinBanSach = 4 WHERE idSach = $idsach";
        if(mysqli_query($this->con, $q)){ return true; }
        else{ return false; }
    }
    public function MD_GetTinBanSachThanhCong($idtaikhoan) {
        $q =  "SELECT * FROM tinbansach,sach
        WHERE tinbansach.idSach = sach.idSach
        AND tinbansach.idTaiKhoan = $idtaikhoan
        AND tinbansach.trangThaiTinBanSach = 5";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

	public function MD_GhiTin($data_tin, $data_anh) {

        $idTK = $_SESSION['taikhoan']['id'];
        
        // insert sách
        $q = "INSERT INTO sach VALUES (null, '".$data_tin['tensach']."', ".$data_tin['idDMS'].", '".$data_tin['tacgia']."', '".$data_tin['namxuatban']."', '".$data_tin['nhaxuatban']."', ".$data_tin['idngonngu'].", ".$data_tin['sotrang'].", ".$data_tin['trangthai'].", ".$data_tin['giasach'].")";
        if( mysqli_query($this->con, $q) ){
            $kq = true;
        }else{
            $kq = false;
            return $kq;
        }
        $q = "SELECT * FROM sach 
        WHERE tenSach = '".$data_tin['tensach']."'
        ORDER BY idSach DESC
        LIMIT 1";
        $rows = mysqli_query($this->con, $q);
        $kq = mysqli_fetch_array($rows);
        $idsach = $kq['idSach'];

        // insert tin bán sách
        $q = "INSERT INTO tinbansach VALUES (null, ".$idTK.", ".$idsach.", '".$data_tin['mota']."', '".$data_tin['hientai']."', ".$data_tin['idTTP'].", ".$data_tin['idQHTX'].", 3, 1)";
        if( mysqli_query($this->con, $q) ){
            $kq = true;
        }else{
            $kq = false;
            return $kq;
        }

        // insert hình ảnh
        for($i = 1; $i <= 5; $i++){
            $anh = 'dtanh'.$i;
            if(isset($data_anh[$anh])){
                $q = "INSERT INTO hinhanhsach VALUES (null, ".$idsach.", '".$data_anh[$anh]."')";
                if( mysqli_query($this->con, $q) ){
                    $kq = true;
                }else{
                    $kq = false;
                    return $kq;
                }
            }
        }
        return $kq;
    }
    public function MD_GetTinBanSach($idtin){
        $q = "SELECT * FROM tinbansach,sach
        WHERE sach.idSach = tinbansach.idSach
        AND tinbansach.idTin = $idtin";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_GetDanhSachDatHang($ds_idtin){
        $d = 'AND (';
        for($i = 0; $i < count($ds_idtin); $i++){
            if($i != 0){$d .= ' OR ';}
            $d .= "tinbansach.idTin = ".$ds_idtin[$i];
        }
        $d .= ")";
        $q = "SELECT * FROM tinbansach,sach,hinhanhsach,taikhoan
        WHERE tinbansach.idSach = sach.idSach
        AND tinbansach.idTaiKhoan = taikhoan.idTaiKhoan
        AND sach.idsach = hinhanhsach.idsach $d
        GROUP BY hinhanhsach.idsach";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_GetThongBaoMuaSach($idtaikhoan){
        $q = "SELECT * FROM thongbaomuasach,tinbansach,sach,taikhoan
        WHERE thongbaomuasach.idTinBanSach = tinbansach.idTin
        AND tinbansach.idSach = sach.idSach
        AND thongbaomuasach.idNguoiMua = taikhoan.idTaiKhoan
        AND tinbansach.idTaiKhoan = $idtaikhoan
        ORDER BY thongbaomuasach.thoiGianThongBao DESC";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_XemThongBao($idthongbaomuasach){
        $q = "UPDATE thongbaomuasach SET daXem = 1 WHERE idThongBaoMuaSach = $idthongbaomuasach";
        if( mysqli_query($this->con, $q) ){
            return true;
        }else{
            return false;
        }
    }
    public function MD_DanhDauTatCaThongBaoDaDoc($idtaikhoan){
        $q = "UPDATE thongbaomuasach,tinbansach SET daXem = 1 
        WHERE thongbaomuasach.idTinBanSach = tinbansach.idTin
        AND tinbansach.idTaiKhoan = $idtaikhoan";
        if( mysqli_query($this->con, $q) ){
            return true;
        }else{
            return false;
        }
    }
}
?>