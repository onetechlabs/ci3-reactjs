<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo $headerWeb["titleWeb"]; ?></title>
	<?php
		for($iCss=0; $iCss < count($cssWeb); $iCss++){
			echo "<link href=\"".$cssWeb[$iCss]."\" rel=\"stylesheet\">";
		}
	?>
</head>
<body>
	<div id="Login" class="App"></div>
	<!--REACT JS-->
	<?php print_assets($this->session->flashdata('js_assets')) ?>
	<!--NON REACT JS-->
	<?php
		for($iJsNR=0; $iJsNR < count($jsNonReactJsWeb); $iJsNR++){
			echo "<script src=\"".$jsNonReactJsWeb[$iJsNR]."\"></script>";
		}
	?>
</body>
</html>