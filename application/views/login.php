<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login - Moda Transportation Coordinator</title>
	<link href="<?php echo base_url(); ?>templates/src/assets/libs/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>templates/dist/css/style.min.css" rel="stylesheet">
	<!--for CSS Custom place here !-->
	<style>
		.logo img{
			width:100px;
			/* Fixed Blur Image When Resizing */
			filter: blur(0);
			-webkit-filter: blur(0);
			transform: translateZ(0);
			-webkit-transform: translateZ(0);
		}
		.logo-sub-title{
			font-size:12px;
			margin-top:20px;
			margin-bottom:10px;
		}
		.powered_on_login{
			width: 100px;
			display: block;
			margin-left:auto;
			margin-right:auto;
			/* Fixed Blur Image When Resizing */
			filter: blur(0);
			-webkit-filter: blur(0);
			transform: translateZ(0);
			-webkit-transform: translateZ(0);
		}
		.auth-wrapper .auth-box.on-sidebar {
			align-items: center;
			justify-content: center;
			display: flex;
		}
	</style>
	<script src="<?php echo base_url(); ?>src/util/config.js"></script>
</head>
<body>

<div id="Login" class="App"></div>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/jquery/dist/jquery.min.js"></script>
<?php print_assets($this->session->flashdata('js_assets')) ?>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/sweetalert2/dist/sweetalert2.all.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/extra-libs/sweetalert2/sweet-alert.init.js"></script>
<!--for Jquery Function place here !-->
<script>
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
		$(".preloader").fadeOut();
		$("form").on('submit',function(){
			return false;
		});
	});
</script>
</body>
</html>