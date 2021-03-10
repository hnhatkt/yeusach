<?php

class TrangCaNhan extends Controller{

    public $TaiKhoanModel;

    public function __construct() {
        $this->TaiKhoanModel = $this->model("TaiKhoanModel");
    }

    function Index() {
        $this->view("layout_main",[
        	"Header"=>"header",
        	"Footer"=>"footer",
            "Page"=>"page_trangcanhan"
        ]);
    }

    function SuaThongTin() {
        $this->view("layout_main",[
        	"Header"=>"header",
        	"Footer"=>"footer",
            "Page"=>"page_trangcanhan_suathongtin"
        ]);
    }

    function CapNhatTaiKhoan() {
        if(isset($_POST['tcnbtnsua'])){
            $data['tentaikhoan'] = $_POST['tcnttk'];
            $data['email'] = $_POST['tcnemail'];
            $data['diachi'] = $_POST['tcndc'];
            $sodienthoai = $_SESSION['taikhoan']['sdt'];
            if($_FILES['tcnavt']['name'] != ''){
                $_FILES['tcnavt']['name'] = $sodienthoai.".jpg";
                $data['anhdaidien'] = $_FILES['tcnavt']['name'];
                $a = SaveUploadFile('tcnavt','./public/hinhanh/anhdaidien/');
            }else{
                $data['anhdaidien'] = '';
            }
            $kq = $this->TaiKhoanModel->MD_CapNhatTaiKhoan($data);
            $idtaikhoan = $_SESSION['taikhoan']['id'];
            echo "<script type=\"text/javascript\">
            window.location=\"".BASE_URL."trangcanhan/$idtaikhoan\";
            </script>";
        }
    }
}

function SaveUploadFile($strfile,$strpath){
    $ketqua="";
    if(isset($_FILES[$strfile])){
        if($_FILES[$strfile]['error']==UPLOAD_ERR_OK){
            $name=$_FILES[$strfile]['name'];
            if(move_uploaded_file($_FILES[$strfile]['tmp_name'], $strpath.$name))
                $ketqua="ok!";
            else
                $ketqua="khong di chuyen duoc file!";
        }else
        $ketqua="file bi loi!";
    }
    else
        $ketqua="khong ton tai file upload!";
    return $ketqua;
}
?>

