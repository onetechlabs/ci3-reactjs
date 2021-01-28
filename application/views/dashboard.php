<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dashboard Example - Codeigniter 3 with React JS & Admin Pro</title>
	<link href="<?php echo base_url(); ?>templates/src/assets/libs/chartist/dist/chartist.min.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>templates/dist/js/pages/chartist/chartist-init.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>templates/src/assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>templates/src/assets/libs/c3/c3.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>templates/dist/css/style.min.css" rel="stylesheet">
</head>
<body>

<div id="Dashboard" class="App"></div>

<?php print_assets($this->session->flashdata('js_assets')) ?>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/jquery/dist/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/app.min.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/app.init.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/app-style-switcher.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/extra-libs/sparkline/sparkline.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/waves.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/sidebarmenu.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/feather.min.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/custom.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/chartist/dist/chartist.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/d3/dist/d3.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/c3/c3.min.js"></script>
<script src="<?php echo base_url(); ?>templates/dist/js/pages/dashboards/dashboard1.js"></script>
<!--for Jquery Function place here !-->
<script>
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
    	$(".preloader").fadeOut();
	});
</script>
</body>
</html>