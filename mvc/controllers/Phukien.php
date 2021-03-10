<?php

// http://localhost/live/Home/Show/1/2

class Phukien extends Controller{

    function Index(){
        $this->view("layout_main",[
            "Page"=>"page_phukien"
        ]);
        
    }
}
?>