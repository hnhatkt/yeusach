<?php

// http://localhost/live/Home/Show/1/2

class TrangChu extends Controller{

	public $SachModel;

    public function __construct() {
        $this->SachModel = $this->model("SachModel");
    }

    function Index(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page" => "page_trangchu"
        ]);
    }

}
?>