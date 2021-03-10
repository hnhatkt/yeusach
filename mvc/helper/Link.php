<?php

	function redirect_to($string){
		header("location:".BASE_URL."$string");
	}

	function load_icon($string){
		return BASE_URL."public/hinhanh/icon/{$string}";
	}

	function load_anhdaidien($string){
		return BASE_URL."public/hinhanh/anhdaidien/{$string}";
	}

	function load_slide_img($string){
		return BASE_URL."public/hinhanh/slide/{$string}";
	}

	function load_sach($string){
		return BASE_URL."public/hinhanh/sach/{$string}";
	}

	function load_image_baiviet($string){
		return BASE_URL."public/hinhanh/baiviet/{$string}";
	}

	function load_arr_css($arr) {
		foreach ($arr as $key => $value) {
			echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"";
			echo BASE_URL."public/css/{$value}.css";
			echo "\">";
		}
	}

	function load_arr_css_online($arr) {
		foreach ($arr as $key => $value) {
			echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"";
			echo $value;
			echo "\">";
		}
	}

	function load_arr_js($arr){
		foreach ($arr as $key => $value) {
			echo "<script src=\"";
			echo BASE_URL."public/js/{$value}.js";
			echo "\"></script>";
		}
	}

	function load_arr_js_online($arr){
		foreach ($arr as $key => $value) {
			echo "<script src=\"";
			echo $value;
			echo "\"></script>";
		}
	}

?>