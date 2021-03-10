<?php
class DanhMucModel extends DB{

    public function MD_GetDanhMuc($string) {
    	$string = trim($string);
    	$string = preg_replace('/\s+/', '', $string);
        $q = "SELECT * FROM danhmuc WHERE danhmuc.tagDanhMuc LIKE '%$string%'";
        $rows = mysqli_query($this->con, $q);
        $result = mysqli_fetch_all($rows,MYSQLI_ASSOC);
        return $result;
    }

}
?>

