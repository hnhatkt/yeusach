<?php

// http://localhost/live/Home/Show/1/2

class Notfound extends Controller{

    // Must have SayHi()
    // function __construct() {
    // 	require_once "./mvc/helper/link.php";
    // }
    function hi(){
    	$this->view("test");
    }
    function Index(){
        echo "This page Not found";

    }

}
?>