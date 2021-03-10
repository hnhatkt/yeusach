<?php

// http://localhost/live/Home/Show/1/2

class DangTin extends Controller{

	public $TinBanSachModel;

    public function __construct() {
        $this->TinBanSachModel = $this->model("TinBanSachModel");
    }

    function Index() {
        $this->view("layout_main",[
            "Header"=>"header",
            "Page"=>"page_dangtin"
        ]);
    }

    function XuLyDangTin() {

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

        if(isset($_POST['dangtin'])){
        	date_default_timezone_set('Asia/Ho_Chi_Minh');
			$hientai = date('YmdHis');
			$idtaikhoan = $_SESSION['taikhoan']['id'];
			for($i = 1; $i <= 5; $i++){
				$anh = 'dtanh'.$i;
				if($_FILES[$anh]['name'] != ''){
					$_FILES[$anh]['name'] = $anh.$idtaikhoan.$hientai.".jpg";
					$data_anh[$anh] = $_FILES[$anh]['name'];
					$a = SaveUploadFile($anh,'./public/hinhanh/sach/');
				}
			}
			
			$data_tin['idTTP'] = $_POST['dttinhthanhpho'];
			$data_tin['idQHTX'] = $_POST['dtquanhuyenthixa'];
			$data_tin['idDMS'] = $_POST['dtdanhmucsach'];
			$data_tin['tensach'] = $_POST['dttensach'];
			$data_tin['tacgia'] = $_POST['dttacgia'];
			$data_tin['giasach'] = $_POST['dtgiasach'];
			$data_tin['nhaxuatban'] = $_POST['dtnhaxuatban'];
			$data_tin['namxuatban'] = $_POST['dtnamxuatban'];
			$data_tin['sotrang'] = $_POST['dtsotrang'];
			$data_tin['idngonngu'] = $_POST['dtngonngu'];
			$data_tin['trangthai'] = $_POST['dttrangthai'];
			$data_tin['mota'] = $_POST['dtmota'];
			$data_tin['hientai'] = $hientai;
            // $datatin = [
            //     ''=>
            // ];
        }
        $kq = $this->TinBanSachModel->MD_GhiTin($data_tin, $data_anh);
        echo "<script type=\"text/javascript\">
            window.location=\"/yeusach\";
            alert(\"Đăng tin bán sách thành công. Chờ xác nhận!\");
            </script>";
    }
}
?>