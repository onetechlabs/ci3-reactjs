<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login - Codeigniter 3 with React JS & Admin Pro</title>
    <link href="<?php echo base_url(); ?>templates/dist/css/style.min.css" rel="stylesheet">
</head>
<body>

<div id="Login" class="App"></div>

<?php print_assets($this->session->flashdata('js_assets')) ?>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/jquery/dist/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/popper.js/dist/umd/popper.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<!--for Jquery Function place here !-->
<script>
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
    	$(".preloader").fadeOut();
	});
</script>
</body>
</html>