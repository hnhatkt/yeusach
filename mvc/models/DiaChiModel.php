<?php
class DiaChiModel extends DB{

    public function MD_DSTinhThanhPho() {
        $q = "SELECT * FROM tinhthanhpho";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

    public function MD_DSQuanHuyenThiXa($idTTP){
    	$q = "SELECT * FROM quanhuyenthixa WHERE idTinhThanhPho = $idTTP";
    	$rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

    public function MD_NgonNgu(){
    	$q = "SELECT * FROM ngonngu";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return json_encode($result);
    }

}
?>

