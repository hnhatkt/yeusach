<?php

class TinNhan extends Controller{

    public $TinNhanModel;

    public function __construct() {
        $this->TinNhanModel = $this->model("TinNhanModel");
    }

    function Index() {
        $this->view("layout_main",[
            "Page"=>"page_tinnhan",
        ]);
    }

}
?>

