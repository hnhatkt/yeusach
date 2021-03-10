<?php

// http://localhost/live/Home/Show/1/2

class GioHang extends Controller{
    
    function Index(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_giohang"
        ]); 
    }
    function HoaDon(){
        $this->view("layout_main",[
            "Header"=>"header",
            "Footer"=>"footer",
            "Page"=>"page_hoadon"
        ]); 
    }

}
?>