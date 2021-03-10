<?php
class SachModel extends DB{

    public function GetTinBanSachTrangChu($sotin,$idsach,$trangthaitbs) {
        if($idsach == 'all') {
            $locid = '';
        }else{
            $locid = "AND tinbansach.idSach = ".$idsach;
        }
        if($trangthaitbs == 0){
            $tt = "AND tinbansach.trangThaiTinBanSach = 0";
        }else{
            $tt = '';
        }
        $q = "SELECT * FROM tinbansach, taikhoan, danhmuc, tinhthanhpho, quanhuyenthixa, ngonngu,
        (
        SELECT sach.*,hinhanhsach.linkHinhAnhSach FROM sach, hinhanhsach
        WHERE sach.idSach = hinhanhsach.idSach
        GROUP BY hinhanhsach.idSach
        ) AS FS
        WHERE FS.idSach = tinbansach.idSach
        AND taikhoan.idTaiKhoan = tinbansach.idTaiKhoan
        AND FS.idDanhMuc = danhMuc.idDanhMuc
        AND FS.idNgonNgu = ngonngu.idNgonNgu
        AND tinbansach.idTinhThanhPho = tinhthanhpho.idTinhThanhPho
        AND tinbansach.idQuanHuyenThiXa = quanhuyenthixa.idQuanHuyenThiXa
        AND tinbansach.hienThi = 1
        $tt $locid
        ORDER BY tinbansach.ngayDang DESC
        LIMIT $sotin";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return $result;
    }

    public function MD_GetLocDSTinBanSach($sotin,$idtinhthanhpho,$iddanhmuc,$namxuatban,$tuychonhienthi,$tensach) {
        if($idtinhthanhpho != 0) {
            $locidtinhthanhpho = "AND tinhthanhpho.idTinhThanhPho = ".$idtinhthanhpho;
        }else{
            $locidtinhthanhpho = '';
        }
        if($iddanhmuc != 0) {
            $lociddanhmuc = "AND danhmuc.idDanhMuc = ".$iddanhmuc;
        }else{
            $lociddanhmuc = '';
        }
        if($namxuatban != '') {
            $locnamxuatban = "AND FS.namXuatBan = '".$namxuatban."'";
        }else{
            $locnamxuatban = '';
        }
        if($tensach != ''){
            $loctensach = "AND FS.tenSach LIKE \"%".$tensach."%\"";
        }else{
            $loctensach = '';
        }
        if($tuychonhienthi == 1){
            $loctuychonhienthi = "ORDER BY tinbansach.ngayDang DESC";
        }elseif($tuychonhienthi == 2){
            $loctuychonhienthi = "ORDER BY tinbansach.ngayDang ASC";
        }elseif($tuychonhienthi == 3){
            $loctuychonhienthi = "ORDER BY FS.giaSach DESC";
        }elseif($tuychonhienthi == 4){
            $loctuychonhienthi = "ORDER BY FS.giaSach ASC";
        }
        $q = "SELECT * FROM tinbansach, taikhoan, danhmuc, tinhthanhpho, quanhuyenthixa, ngonngu,
        (
        SELECT sach.*,hinhanhsach.linkHinhAnhSach FROM sach, hinhanhsach
        WHERE sach.idSach = hinhanhsach.idSach
        GROUP BY hinhanhsach.idSach
        ) AS FS
        WHERE FS.idSach = tinbansach.idSach
        AND taikhoan.idTaiKhoan = tinbansach.idTaiKhoan
        AND FS.idDanhMuc = danhmuc.idDanhMuc
        AND FS.idNgonNgu = ngonngu.idNgonNgu
        AND tinbansach.idTinhThanhPho = tinhthanhpho.idTinhThanhPho
        AND tinbansach.idQuanHuyenThiXa = quanhuyenthixa.idQuanHuyenThiXa
        AND tinbansach.hienThi = 1
        AND tinbansach.trangThaiTinBanSach = 0
        $locidtinhthanhpho
        $lociddanhmuc
        $loctensach
        $locnamxuatban
        $loctuychonhienthi
        LIMIT $sotin";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return $result;
    }

    public function GetDSHinhAnhSach($idsach){
        $q = "SELECT linkHinhAnhSach FROM hinhanhsach
        WHERE idSach = $idsach";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    
    public function MD_GetDanhSachTinBanSachQuanLy($trang,$trangthai,$sapxep) {
        switch ($trang) {
            case 'all':
                $q = "SELECT * FROM
                (SELECT sach.*,linkHinhAnhSach FROM sach,hinhanhsach
                WHERE sach.idSach = hinhanhsach.idSach
                GROUP BY hinhanhsach.idSach) AS FS 
                ,tinbansach,danhmuc,taikhoan
                WHERE FS.idSach = tinbansach.idSach
                AND FS.idDanhMuc = danhmuc.idDanhMuc
                AND tinbansach.idTaiKhoan = taikhoan.idTaiKhoan
                AND tinbansach.hienThi = 1
                AND tinbansach.trangThaiTinBanSach = $trangthai
                ORDER BY tinbansach.ngayDang $sapxep";
                break;
            
            default:
                $vtdau = (($trang-1)*6);
                $soluong = 6;
                $q = "SELECT * FROM
                (SELECT sach.*,linkHinhAnhSach FROM sach,hinhanhsach
                WHERE sach.idSach = hinhanhsach.idSach
                GROUP BY hinhanhsach.idSach) AS FS 
                ,tinbansach,danhmuc,taikhoan
                WHERE FS.idSach = tinbansach.idSach
                AND FS.idDanhMuc = danhmuc.idDanhMuc
                AND tinbansach.idTaiKhoan = taikhoan.idTaiKhoan
                AND tinbansach.hienThi = 1
                AND tinbansach.trangThaiTinBanSach = $trangthai
                ORDER BY tinbansach.ngayDang $sapxep
                LIMIT $vtdau,$soluong";
                break;
        }
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }
    public function MD_XetDuyet_Dang($idsach) {
        $q = "UPDATE tinbansach SET trangThaiTinBanSach = 0 WHERE idSach = $idsach";
        if(mysqli_query($this->con, $q)){ return true; }
        else{ return false; }
    }
    public function MD_XetDuyet_Huy($idsach) {
        $q1 = "DELETE FROM tinbansach WHERE idSach = $idsach";
        $q2 = "DELETE FROM sach WHERE idSach = $idsach";
        $q3 = "DELETE FROM hinhanhsach WHERE idSach = $idsach";
        if(mysqli_query($this->con, $q1) && mysqli_query($this->con, $q2) && mysqli_query($this->con, $q3)){ return true; }
        else{ return false; }
    }
    public function MD_GetDanhSachTinBanSachTheoTaiKhoan($idtaikhoan,$soluong){
        if($soluong == 'all'){
            $limit = '';
        }else{
            $limit = 'LIMIT '.$soluong;
        }
        $q = "SELECT * FROM tinbansach,danhmuc,tinhthanhpho,quanhuyenthixa,taikhoan,
        (SELECT sach.*,linkHinhAnhSach FROM sach,hinhanhsach
        WHERE sach.idSach = hinhanhsach.idSach
        GROUP BY hinhanhsach.idSach) AS FS
        WHERE tinbansach.idTaiKhoan = $idtaikhoan
        AND tinbansach.idTaiKhoan = taikhoan.idTaiKhoan
        AND tinbansach.idSach = FS.idSach
        AND FS.idDanhMuc = danhmuc.idDanhMuc
        AND tinbansach.idTinhThanhPho = tinhthanhpho.idTinhThanhPho
        AND quanhuyenthixa.idQuanHuyenThiXa = tinbansach.idQuanHuyenThiXa
        AND tinbansach.hienThi = 1
        ORDER BY tinbansach.ngayDang DESC
        $limit";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

}
?>