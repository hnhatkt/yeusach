<?php

// http://localhost/live/Home/Show/1/2

class DanhSach extends Controller{

	public $SachModel;

    public function __construct() {
        $this->SachModel = $this->model("SachModel");
    }

    function Index(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_danhsach"
        ]); 
    }

    function ChiTietSach($idsach) {
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_chitietsach",
            "TinBanSach" => $this->SachModel->GetTinBanSachTrangChu(1,$idsach,1)[0],
            "DSHinhAnhSach" => $this->SachModel->GetDSHinhAnhSach($idsach)
        ]);
    }

}
?>