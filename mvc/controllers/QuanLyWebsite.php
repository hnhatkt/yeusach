<?php
class QuanLyWebsite extends Controller{

	public $AdminModel;
    public $TinTucModel;

    public function __construct() {
        $this->AdminModel = $this->model("AdminModel");
        $this->TinTucModel = $this->model("TinTucModel");
    }

    function Index(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly"
        ]);
    }

    function DangNhap(){
        $this->view("layout_main",[
            "Page"=>"page_quanly_dangnhap"
        ]);
    }
    function DangKy(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_dangky"
        ]);
    }
    function DangTinTuc(){
        KiemTraTrangThaiDangNhap();
        $ds_tags = $this->TinTucModel->MD_DanhSachTags();
        $ds_tags = json_decode($ds_tags, true);
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_dangtintuc",
            "ds_tags"=>$ds_tags
        ]);
    }
    function XetDuyetTinBanSach() {
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_xetduyettinbansach"
        ]);
    }
    function DanhSachTinBanSach() {
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_danhsachtinbansach"
        ]);
    }
    function DanhSachTinTuc() {
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_danhsachtintuc"
        ]);
    }
    function DonHangDangGiao(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_donhangdanggiao"
        ]);
    }
    function XetDuyetDonHang() {
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_donhang"
        ]);
    }
    function XemDonHang(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_xemdonhang"
        ]);
    }
    function ThongKe(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_thongke"
        ]);
    }
    function TaiKhoan(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_taikhoan"
        ]);
    }
    function Admin(){
        KiemTraTrangThaiDangNhap();
        $this->view("layout_quanly",[
            "Page"=>"page_quanly_admin"
        ]);
    }


    function TaoTaiKhoanAdmin(){
        if(isset($_POST['qlbtndk'])){
            $tenadmin = $_POST['qltadm'];
            $matkhau = password_hash($_POST['qlmk'], PASSWORD_DEFAULT);

            $kq = $this->AdminModel->MD_TaoTaiKhoanAdmin($tenadmin,$matkhau);

            echo "<script type=\"text/javascript\">
            window.location=\"/yeusach/quanlywebsite\";
            alert(\"Chúc mừng bạn đăng ký thành công!\");
            </script>";
        }
    }
    function XuLyDangTinTuc(){
        if(isset($_POST['qldttsubmit'])){
            date_default_timezone_set('Asia/Ho_Chi_Minh');
            $hientai = date('YmdHis');
            $tintuc = array();
            $tintuc['nguoiviet'] = $_POST['qlnguoiviettintuc'];
            $tintuc['tieude'] = $_POST['qltieudetintuc'];
            $tintuc['tomtat'] = $_POST['qltomtattintuc'];
            $tintuc['noidung'] = $_POST['qlnoidungtintuc'];
            $tintuc['thoigian'] = $_POST['qlthoigiandangtintuc'];
            if($_FILES['qlhinhanhtintuc']['name'] != ''){
                $tintuc['hinhanh'] = 'TT'.$hientai.'.jpg';
                $_FILES['qlhinhanhtintuc']['name'] = $tintuc['hinhanh'];
                $a = SaveUploadFile('qlhinhanhtintuc','./public/hinhanh/tintuc/');
                $tintuc['hinhanh'] = "http://localhost/yeusach/public/hinhanh/tintuc/".$tintuc['hinhanh'];
            }
            if(isset($_POST['qlhienthitintuc'])){$tintuc['hienthi'] = 1;}
            else{$tintuc['hienthi'] = 0;}
            $ds_id_tags = array();
            $ds_tags = $this->TinTucModel->MD_DanhSachTags();
            $ds_tags = json_decode($ds_tags, true);

            foreach ($ds_tags as $key => $value) {
                if(isset($_POST[$value['tag']])){array_push($ds_id_tags, $_POST[$value['tag']]);}
            }
            
            $kq = $this->TinTucModel->MD_XuLyDangTinTuc($tintuc,$ds_id_tags);

            echo "<script type=\"text/javascript\">
            window.location=\"/yeusach/quanlywebsite/dangtintuc\";
            alert(\"Đăng tin tức thành công!\");
            </script>";
        }
    }
}

function KiemTraTrangThaiDangNhap(){
    if(!isset($_SESSION['ad'])){
        echo "<script type=\"text/javascript\">
        window.location=\"/yeusach/quanlywebsite/dangnhap\";
        </script>";
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