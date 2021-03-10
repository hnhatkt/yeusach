<?php

class DangKy extends Controller{

	public $TaiKhoanModel;

    public function __construct() {
        $this->TaiKhoanModel = $this->model("TaiKhoanModel");
    }

    function Index() {
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_dangky"
        ]);
    }

    function DangKyTaiKhoan() {

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

    	if(isset($_POST['btn-dangky'])) {
    		$data_tk['sodienthoai'] = $_POST['sodienthoai'];
    		$data_tk['tentaikhoan'] = $_POST['tentaikhoan'];
    		$data_tk['matkhau'] = $_POST['matkhau'];
    		$data_tk['email'] = $_POST['email'];
    		$data_tk['diachi'] = $_POST['diachi'];
   			$data_tk['matkhau'] = password_hash($data_tk['matkhau'], PASSWORD_DEFAULT);
            if($_FILES['anhdaidien']['name'] != ''){
                $_FILES['anhdaidien']['name'] = $data_tk['sodienthoai'].".jpg";
                $data_tk['anhdaidien'] = $_FILES['anhdaidien']['name'];
                $a = SaveUploadFile('anhdaidien','./public/hinhanh/anhdaidien/');
            }else{
                $data_tk['anhdaidien'] = 'md.png';
            }
    		
    		$kq = $this->TaiKhoanModel->Insert('taikhoan',$data_tk);

    		echo "<script type=\"text/javascript\">
            window.location=\"".BASE_URL."dangnhap\";
            alert(\"Chúc mừng bạn đăng ký thành công!\");
            </script>";
    	}
    }
}
?>

