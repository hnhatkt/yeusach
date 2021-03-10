<?php

// http://localhost/live/Home/Show/1/2

class Tintuc extends Controller{

    function Index(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_tintuc"
        ]);
    }
     function DanhSach(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_danhsachtintuc"
        ]);
    }
    function Xem($idtintuc){
    	$this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_xemtintuc"
        ]);
    }
}
?>