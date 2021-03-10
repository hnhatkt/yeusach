<?php

class DangNhap extends Controller{

	public $TaiKhoanModel;

    public function __construct() {
        $this->TaiKhoanModel = $this->model("TaiKhoanModel");
    }

    function Index() {
        $this->view("layout_main",[
        	"Header"=>"header",
        	"Footer"=>"footer",
            "Page"=>"page_dangnhap"
        ]);
    }

    
}
?>