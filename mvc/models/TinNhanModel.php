<?php
class TinNhanModel extends DB{

    public function MD_GetDSTinNhan($mua,$ban) {

        $id = $_SESSION['taikhoan']['id'];

        if($mua == 1 && $ban == 0) {
            $q = "
            SELECT * FROM tinnhan,taikhoan,tinbansach,trangthaitinnhan,sach
            WHERE idNguoiMua = $id
            AND tinnhan.idNguoiBan = taikhoan.idTaiKhoan
            AND tinnhan.idTin = tinbansach.idTin
            AND tinbansach.idSach = sach.idSach
            AND tinnhan.idTinNhan = trangthaitinnhan.idTinNhan
            AND trangthaitinnhan.idTaiKhoan = $id
            AND trangthaitinnhan.hienThi = 1
            ORDER BY thoiGian DESC ";
        }elseif($mua == 0 && $ban == 1){
            $q = "
            SELECT * FROM tinnhan,taikhoan,tinbansach,trangthaitinnhan,sach
            WHERE tinnhan.idNguoiBan = $id
            AND tinnhan.idNguoiMua = taikhoan.idTaiKhoan
            AND tinnhan.idTin = tinbansach.idTin
            AND tinbansach.idSach = sach.idSach
            AND tinnhan.idTinNhan = trangthaitinnhan.idTinNhan
            AND trangthaitinnhan.idTaiKhoan = $id
            AND trangthaitinnhan.hienThi = 1
            ORDER BY thoiGian DESC ";
        }else{
            $q = "
            SELECT * FROM
            (SELECT idNguoiBan as id, thoiGian, idTinNhan, idTin FROM tinnhan AS IDD WHERE idNguoiMua = $id
            UNION
            SELECT idNguoiMua as id, thoiGian, idTinNhan, idTin FROM tinnhan AS IDD WHERE idNguoiBan = $id)
            AS IDD, taikhoan,tinbansach,trangthaitinnhan,sach
            WHERE IDD.id = taikhoan.idTaiKhoan
            AND IDD.idTin = tinbansach.idTin
            AND tinbansach.idSach = sach.idSach
            AND IDD.idTinNhan = trangthaitinnhan.idTinNhan
            AND trangthaitinnhan.idTaiKhoan = $id
            AND trangthaitinnhan.hienThi = 1
            ORDER BY thoiGian DESC ";
        }
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

    public function MD_GetLSTN($idtinnhan) {
        // Đổi trạng thái đã xem
        $idtaikhoan = $_SESSION['taikhoan']['id'];
        $q = "UPDATE trangthaitinnhan SET daXem = 1 
        WHERE idTinNhan = $idtinnhan
        AND idTaiKhoan = $idtaikhoan";
        $rows = mysqli_query($this->con, $q);

        $q = "SELECT * FROM lichsutinnhan WHERE idTinNhan = $idtinnhan ORDER BY thoiGianGui ASC";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

    public function MD_GhiTinNhan($noidungtinnhan,$hientai,$idnguoigui,$idtinnhan){

        // Đổi trạng thái người nhận tin nhắn thành chưa xem
        $q = "UPDATE trangthaitinnhan SET daXem = 0 
        WHERE idTinNhan = $idtinnhan
        AND idTaiKhoan != $idnguoigui";
        $rows = mysqli_query($this->con, $q);

        $q = " INSERT INTO lichsutinnhan
        VALUES (null,$idtinnhan,$idnguoigui,'$noidungtinnhan','$hientai')";
        $q2 = "UPDATE tinnhan SET thoiGian = '$hientai' WHERE idTinNhan = $idtinnhan";

        if(mysqli_query($this->con, $q) && mysqli_query($this->con, $q2)){
            return true;
        }else{
            return false;
        }
    }

    public function MD_TaoTinNhan($idtin,$hientai){
        $q = "SELECT * FROM tinbansach WHERE idTin = $idtin";
        $rows = mysqli_query($this->con, $q);
        $kq = mysqli_fetch_array($rows);
        $idNguoiBan = $kq['idTaiKhoan'];
        $idNguoiMua = $_SESSION['taikhoan']['id'];

        if($idNguoiMua == $idNguoiBan) {
            return false;
        }else{
           $q = "SELECT * FROM tinnhan
           WHERE idNguoiMua = '$idNguoiMua'
           AND idNguoiBan = '$idNguoiBan'
           AND idTin = $idtin
           LIMIT 1";
           $rows = mysqli_query($this->con, $q);

           if( mysqli_num_rows($rows) > 0 ){
            $kq = mysqli_fetch_array($rows);
            $idtinnhan = $kq['idTinNhan'];
            $qtttn = "SELECT * FROM trangthaitinnhan
            WHERE idTinNhan = $idtinnhan
            AND idTaiKhoan = $idNguoiMua
            LIMIT 1";
            $rtttn = mysqli_query($this->con, $qtttn);
            $kq = mysqli_fetch_array($rtttn);
            if($kq['hienThi']==0){
                $u = "UPDATE trangthaitinnhan SET hienThi = 1 
                WHERE idTinNhan = $idtinnhan
                AND idTaiKhoan = $idNguoiMua";
                if(mysqli_query($this->con, $u)){
                    return $idtinnhan;
                }else{
                    return false;
                }
            }else{
                return $idtinnhan;
            }
            }else{
                $q1 = "INSERT INTO tinnhan VALUES (null,$idtin,$idNguoiMua,$idNguoiBan,'$hientai')";
                if(mysqli_query($this->con, $q1)){
                    $q2 = "SELECT * FROM tinnhan
                    WHERE idNguoiMua = '$idNguoiMua'
                    AND idNguoiBan = '$idNguoiBan'
                    AND idTin = $idtin
                    LIMIT 1";
                    $rows2 = mysqli_query($this->con, $q2);
                    $kq2 = mysqli_fetch_array($rows2);
                    $idtinnhan = $kq2['idTinNhan'];

                    $q3 = "INSERT INTO trangthaitinnhan VALUES (null,$idNguoiMua,$idtinnhan,1,1)";
                    $q4 = "INSERT INTO trangthaitinnhan VALUES (null,$idNguoiBan,$idtinnhan,0,1)";
                    if(mysqli_query($this->con, $q3) && mysqli_query($this->con, $q4)){
                        return $idtinnhan;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            } 
        }
    }

    public function MD_XoaTinNhan($idtn) {
        $idtaikhoan = $_SESSION['taikhoan']['id'];
        $u = "UPDATE trangthaitinnhan SET hienThi = 0 
        WHERE idTinNhan = $idtn
        AND idTaiKhoan = $idtaikhoan";
        if( mysqli_query($this->con, $u) ){
            return true;
        }else{
            return false;
        }
    }

    public function MD_LoadTinBanSachDangNhan($idtinnhan) {
        $q = "SELECT * FROM tinnhan, tinbansach,
        (
        SELECT sach.*,hinhanhsach.linkHinhAnhSach FROM sach, hinhanhsach
        WHERE sach.idSach = hinhanhsach.idSach
        GROUP BY hinhanhsach.idSach
        ) AS FS
        WHERE tinnhan.idTin = tinbansach.idTin
        AND tinbansach.idSach = FS.idSach
        AND tinnhan.idTinNhan = $idtinnhan
        ";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

    public function MD_SoTinNhanChuaXem(){
        if(isset($_SESSION['taikhoan'])){
            $idtaikhoan = $_SESSION['taikhoan']['id'];
            $q = "SELECT * FROM trangthaitinnhan 
            WHERE idTaiKhoan = $idtaikhoan
            AND daXem = 0";
            $rows = mysqli_query($this->con, $q);
            $num = mysqli_num_rows($rows);
            return json_encode($num);
        }else{return false;}
    }
}
?>