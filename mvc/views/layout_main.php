<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php require_once "./mvc/helper/taithuvien.php"; ?>
	<script src="http://localhost/yeusach/public/js/jquery.star-rating-svg.js"></script>
	<link rel="stylesheet" type="text/css" href="http://localhost/yeusach/public/css/star-rating-svg.css">
</head>
<body>
	<script type="text/javascript">var BASE_URL = "http://localhost/yeusach/";</script>
	<?php
		require_once "./mvc/views/components/components.php";
		if(isset($data['Header'])){ require_once "./mvc/views/components/".$data["Header"].".php"; }
		require_once "./mvc/views/pages/".$data["Page"].".php";
		if(isset($data['Footer'])){ require_once "./mvc/views/components/".$data["Footer"].".php"; }
	?>
</body>
</html>