<?php

// http://localhost/live/Home/Show/1/2

class DanhMuc extends Controller{

	public $DanhMucModel;

    public function __construct() {
        $this->DanhMucModel = $this->model("DanhMucModel");
    }

    function Index(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_danhmuc",
            "DanhMuc"=>$this->DanhMucModel->MD_GetDanhMuc('')
        ]);
    }

}
?>