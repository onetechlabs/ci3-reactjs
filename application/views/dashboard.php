<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Dashboard - Moda Transportation Coordinator</title>
	<link href="<?php echo base_url(); ?>templates/src/assets/libs/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>templates/dist/css/style.min.css" rel="stylesheet">
	
	<!--for CSS Custom place here !-->
	<style>
		@media (max-width: 1169px) and (min-width: 768px){
			.logo-icon img{
				width:100;
				/* Fixed Blur Image When Resizing */
				filter: blur(0);
				-webkit-filter: blur(0);
				transform: translateZ(0);
				-webkit-transform: translateZ(0); 
			}
			.sidebartoggler{
				display:none !important;
			}
		}
		@media (min-width: 993px){
			.btn-custom{
				font-size: 11px!important;
			}
			.hidden-on-tablet-and-lower{
				display:flex!important;
			}
			.tab-nav-allaccount, .tab-nav-allaccount-content{
				display:none!important;
			}
		}
		@media (max-width: 992px){
			.card-list p {
				font-size: 13px !important  ;
			}
			.hidden-on-tablet-and-lower{
				display:none!important;
			}
			.container-fluid{
				display:flex;
				flex-direction:column !important;
			}
		}
		@media (max-width: 993px) and (min-width: 769px){
			.mb-5, .my-5 {
				margin-bottom: 5rem!important;
			}
		}
		@media (max-width: 375px){ 
			.btn-custom{
				margin-left:5% !important;
			}
		}
		@media (max-width: 575px){ 
			#userDetailInfo{
				flex-direction:column;
			}
			.welcome-allAccount p{
				text-align: center;
				display: block !important;
				margin-bottom:10px!important;
			}
			.btn-custom{
				margin-left:3% !important;
			}
			.infoUser{
				display:none;
			}
			.nav-item {
				min-width: 0 !important;
			}
			.nav-item,.nav-link {
				width: 70px;
				text-align: center;
				font-size: 10px;
			}
			.card-img {
				box-shadow: 0!important;
				border-radius: 0!important;
			}
			.card-content {
				border-radius: 0!important;
				box-shadow: 0!important;
			}
			.card-img {
				border: none !important;
				box-shadow: none !important;
			}
		}
		@media (min-width: 768px){
			#main-wrapper[data-layout=vertical][data-sidebar-position=fixed][data-sidebartype=full] .topbar .top-navbar .navbar-collapse, #main-wrapper[data-layout=vertical][data-sidebar-position=fixed][data-sidebartype=overlay] .topbar .top-navbar .navbar-collapse {
				margin-left: 193px;
			}
			#main-wrapper[data-layout=vertical][data-sidebartype=full] .topbar .top-navbar .navbar-header {
				width: 184px;
			}
		}
		@media (max-width: 768px){
			.tabData{
				display:flex;
				flex-direction:column!important;
				width: 100%;
			}
		}	
		.left-menu-content:hover{
			background-color: #dfdfdf !important;
    		cursor: pointer;
		}
		.panel-wrapper{
			z-index: 2 !important;
			position: absolute;
			width: 100%;
			margin: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
		.container-fluid{
			display:flex;
			flex-direction:row;
		}
		.bg-blue{
			color:#FFF;
			background: #1e5799;
			background: #0074b7;
			background: -moz-linear-gradient(top, #0074b7 0%, #2989d8 73%, #2989d8 81%, #2989d8 92%, #418db9 100%);
			background: -webkit-linear-gradient(top, #0074b7 0%,#2989d8 73%,#2989d8 81%,#2989d8 92%,#418db9 100%);
			background: linear-gradient(to bottom, #0074b7 0%,#2989d8 73%,#2989d8 81%,#2989d8 92%,#418db9 100%);
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0074b7', endColorstr='#418db9',GradientType=0 );
		}
		.directors_list, .staff_list, .driver_list{
			padding: 10px;
		}
		.usersList{
			width: 100%;
			height: 60vh;
		}
		.generalList{
			width: 100%;
			height: 70vh;
		}
		.transactionList{
			width: 100%;
			height: 74vh;
		}
		.card-body {
			flex: 1 1 auto;
			height: 0;
			padding: 1.25rem;
		}
		.nav-tabs .nav-item {
			margin-right: 2px;
		}
		.form-control:disabled, .form-control[readonly] {
			background-color: transparent !important;
			opacity: 1;
		}
		.avatarUploadIcon{
			position: absolute;
			width: 30px;
			top: 78px;
    		margin-left: 60px;
			filter: blur(0);
			-webkit-filter: blur(0);
			transform: translateZ(0);
			-webkit-transform: translateZ(0);
		}
		.avaCenter{
			width:100px;
			height:100px;
		}
		.avatarWrapper{
			display:flex;
			flex-direction:'column';
			align-items:'center';
			justify-content: center;
		}
		.avatarWrapper img{
			border-radius:50%;
		}
		.formWrapper{
			width:100%;
			border-bottom:#CCC 2px solid;
			margin-bottom:10px;
		}
		.formTitle{
			font-size:10px;
			color:#808080;
		}
		.formInput{
			border:none;
			padding:0;
		}
		.tabData{
			display:flex;
			flex-direction:row;
			width: 100%;
		}
		.tab-nav-newaccount, .tab-nav-allaccount{
			width: 80%;
			border: none;
		}
		.tab-nav-newaccount .nav-item, .tab-nav-allaccount .nav-item{
			min-width: 100px;
			text-align:center;
		}
		.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
			color: #000;
			background-color: #FFF;
			border-color: #dee2e6 #dee2e6 #fff;
		}
		.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link {
			color: #FFF;
			background-color: #1e78bd;
			border-color:transparent;
		}
		.tab-content{
			display:flex;
			flex-direction:'column';
			align-items:'center';
			justify-content: center;
			width: 100%;
		}
		.tab-pane{
			width:80%;
			background:#FFF;
			color:#000;
			padding:20px;
			border-radius: 0px 10px 10px 10px;
			overflow:auto;
		}
		.tab-pane p{
			width:100%;
			display:flex;
			flex-direction:'column';
		}
		.overlay-blue{
			/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#7abcff+0,60abf8+44,4096ee+100;Blue+3D+%2314 */
			background: #7abcff; /* Old browsers */
			background: -moz-linear-gradient(top,  #7abcff 0%, #60abf8 44%, #4096ee 100%); /* FF3.6-15 */
			background: -webkit-linear-gradient(top,  #7abcff 0%,#60abf8 44%,#4096ee 100%); /* Chrome10-25,Safari5.1-6 */
			background: linear-gradient(to bottom,  #7abcff 0%,#60abf8 44%,#4096ee 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7abcff', endColorstr='#4096ee',GradientType=0 ); /* IE6-9 */
			position: absolute;
			height: 100%;
			top: 0;
			opacity:0.5;
			width: 100%;
			z-index: 1;
		}
		.welcome-allAccount{
			width: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color:#FFF;
			padding:30px;
			z-index:2;
		}
		.welcome-allAccount > .row {
			width:100%;
			height: 60vh;
		}
		.welcome-account{
			width: 100%;
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color:#FFF;
			padding:30px;
			z-index:2;
		}
		.welcome-dashboard{
			/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#7abcff+0,60abf8+44,4096ee+100;Blue+3D+%2314 */
			background: #7abcff; /* Old browsers */
			background: -moz-linear-gradient(top,  #7abcff 0%, #60abf8 44%, #4096ee 100%); /* FF3.6-15 */
			background: -webkit-linear-gradient(top,  #7abcff 0%,#60abf8 44%,#4096ee 100%); /* Chrome10-25,Safari5.1-6 */
			background: linear-gradient(to bottom,  #7abcff 0%,#60abf8 44%,#4096ee 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7abcff', endColorstr='#4096ee',GradientType=0 ); /* IE6-9 */
			position: absolute;
			height: 100%;
			top: 0;
			width: 100%;
			z-index: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color:#FFF;
			opacity:0.8;
			padding:30px
		}
		.topbar .navbar-collapse {
			padding: 0;
		}
		.menuIcon{
			width:17px;
			/* Fixed Blur Image When Resizing */
			filter: blur(0);
			-webkit-filter: blur(0);
			transform: translateZ(0);
			-webkit-transform: translateZ(0);
		}
		.afterNameSideMenuSignOut{
			position: absolute;
			right: 0;
			width: 60px;
			text-align: center;
			top: 20px;
			font-size: 9px;
			border-radius: 10px;
			/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#7db9e8+0,1e5799+100 */
			background: #7db9e8; /* Old browsers */
			background: -moz-linear-gradient(top,  #7db9e8 0%, #1e5799 100%); /* FF3.6-15 */
			background: -webkit-linear-gradient(top,  #7db9e8 0%,#1e5799 100%); /* Chrome10-25,Safari5.1-6 */
			background: linear-gradient(to bottom,  #7db9e8 0%,#1e5799 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7db9e8', endColorstr='#1e5799',GradientType=0 ); /* IE6-9 */
		}
		.afterNameSideMenu{
			font-size:9px;
			margin-top:-10px;
		}
		.sidebar-link-icon{
			height: 18px;
			width: 18px;
			margin: -3px 8px 0 5px;
			fill: rgba(0,158,251,.1);
			color: #fff;
		}
		.dashboardBeforeLogo {
			position: absolute;
			top: -20px;
			font-size: 10px;
		}
		.topbar .top-navbar .navbar-header .navbar-brand {
			padding:0 16px;
		}
		.logo-icon img{
			/* Fixed Blur Image When Resizing */
			filter: blur(0);
			-webkit-filter: blur(0);
			transform: translateZ(0);
			-webkit-transform: translateZ(0);
		}
		#main-wrapper[data-layout=horizontal] .left-sidebar[data-sidebarbg=skin5], #main-wrapper[data-layout=vertical] .left-sidebar[data-sidebarbg=skin5] {
			background: #1e5799;
			/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#1e5799+0,2989d8+73,2989d8+81,2989d8+92,7db9e8+100 */
			background: #0074b7; /* Old browsers */
			background: -moz-linear-gradient(top,  #0074b7 0%, #2989d8 73%, #2989d8 81%, #2989d8 92%, #418db9 100%); /* FF3.6-15 */
			background: -webkit-linear-gradient(top,  #0074b7 0%,#2989d8 73%,#2989d8 81%,#2989d8 92%,#418db9 100%); /* Chrome10-25,Safari5.1-6 */
			background: linear-gradient(to bottom,  #0074b7 0%,#2989d8 73%,#2989d8 81%,#2989d8 92%,#418db9 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0074b7', endColorstr='#418db9',GradientType=0 ); /* IE6-9 */
		}
		#main-wrapper[data-layout=horizontal] .left-sidebar[data-sidebarbg=skin5] .sidebar-nav ul, #main-wrapper[data-layout=vertical] .left-sidebar[data-sidebarbg=skin5] .sidebar-nav ul {
    		background: none;
		}
		.scroll-sidebar {
			position: relative;
			height: calc(100%);
		}
		#sidebarnav .user-profile{
			margin: 0 !important;
			position: absolute;
			bottom: 0;
			left: 0;
			/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#0074b7+0,2989d8+73,2989d8+81,2989d8+92,0f99dd+100 */
			background: #0074b7; /* Old browsers */
			background: -moz-linear-gradient(top,  #0074b7 0%, #2989d8 73%, #2989d8 81%, #2989d8 92%, #0f99dd 100%); /* FF3.6-15 */
			background: -webkit-linear-gradient(top,  #0074b7 0%,#2989d8 73%,#2989d8 81%,#2989d8 92%,#0f99dd 100%); /* Chrome10-25,Safari5.1-6 */
			background: linear-gradient(to bottom,  #0074b7 0%,#2989d8 73%,#2989d8 81%,#2989d8 92%,#0f99dd 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0074b7', endColorstr='#0f99dd',GradientType=0 ); /* IE6-9 */
			opacity:1!important;
		}
		.sidebar-nav ul .user-profile .sidebar-link {
			opacity: 1;
		}

		/** ----------CUSTOM STYLE-------- **/
		/* ---------------------------------------------------
			CONTENT STYLE
		----------------------------------------------------- */

		#content {
			width: calc(100% - 250px);
			padding: 10px 40px;
			min-height: 100vh;
			transition: all 0.3s;
			position: absolute;
			top: 0;
			right: 0;
		}

		#content.active {
			width: 100%;
		}

		/* ---------------------------------------------------
			MEDIAQUERIES
		----------------------------------------------------- */

		@media (max-width: 768px) {
			#sidebar {
				margin-left: -250px;
			}
			#sidebarCollapse.none {
				display: inherit;
			}

			#sidebar.active {
				margin-left: 0;
			}
			#content {
				width: 100%;
				padding: 10px 20px;
			}
			#content.active {
				width: calc(100% - 250px);
			}
			#sidebarCollapse span {
				display: none;
			}
			.left-menu-m { 
				margin-left: 0 !important; 
				margin-right: 0 !important;
			}
		}

		/* ---------------------------------------------------
			INPUT STYLE
		----------------------------------------------------- */

		input[type=text].newForm,
		input[type=number].newForm,
		input[type=email].newForm,
		select.newForm {
			padding: 12px 0;
			border: none;
			margin: 0;
			background: none;
			border-bottom: 2px solid #b5b5b5;
			box-shadow: 0 0 0 rgb(255, 255, 255);
		}

		select.newForm {
			padding: 0px !important;
			margin-top: 6px !important;

		}

		.btn-custom {
			background: rgb(73,168,217);
			color: #ffffff;
			border-radius: 5px;
			border: none;
			margin-right: auto;
			margin-left: auto;
			width: 100%;
			height: 40%;
		}

		.fileContainer {
			overflow: hidden;
			position: relative;
		}
		.fileContainer [type=file] {
			cursor: inherit;
			display: block;
			font-size: 999px;
			filter: alpha(opacity=0);
			min-height: 100%;
			min-width: 100%;
			opacity: 0;
			position: absolute;
			right: 0;
			text-align: right;
			top: 0;
		}

		.card-img {
			border: 1px solid #e5e5e5;
			box-shadow: 3px 3px 3px #e5e5e5;
			border-radius: 10px 0px 0px 10px;
			padding: 15px;
			display: flex;
		}

		.card-list {
			padding: 10px;
		}
		.card-list p {
			font-size: 14px;
			color: #000000;
		}
		.card-content {
			border: 1px solid #e5e5e5;
			box-shadow: 3px 3px 3px #e5e5e5;
			border-radius: 0px 10px 10px 0px;
			padding: 15px;
			align-items: center;
			justify-content: center;
			display: flex;
		}

		.card-btn {
			font-size: 11px !important;
			padding: 10px;
		}

		.border-shadow {
			box-shadow: 3px 3px 3px #e5e5e5;
		}

		.card-header.custom {
			background: rgb(73,168,217);
			color: #ffffff;
			width: 150px;
			text-align: center;
			border-radius: 10px 10px 0px 0px;
			margin-left: 30px;
			padding: 9px !important;
		}

		.card {
			border-radius: 10px;
			height: 100%;
    		overflow: auto;
		}

		.left-menu-m { 
			margin-left: -31px; 
			margin-right: -31px;
		}
		.left-menu {
			height: 163vh;
			z-index: 999;
		}
		.left-menu-content{
			border-bottom: 1px solid #b5b5b5;
			padding: 15px;
			
		}
		.left-menu-content.active{
			background-color: #f5f5f5;   
		}
		.left-menu-content:hover{
			background-color: #f5f5f5;   
		}
		.left-menu-content p{
			padding: 0;
			margin: 1px;
			font-size: 10px !important;
			font-weight: bold;
			color: #000000;
		}
		.noNotif{
			text-align: center;
			align-items: center;
			justify-content: center;
			display: flex;
			padding: 20px!important;
		}
		.py-2 {
			padding-bottom: 1.5rem!important;
		}
		.transactionListsText{
			font-size: 9px;
			color: #131313cc;
			text-align:right;
			margin-left: auto;
		}

		.border-radius-0 {
			border-radius: 0px;
		}

		.header-title {
			font-size: 13px;
		}

		.border-form {
			border-bottom: 5px solid #000000;
		}

		.form-no-input {
			border: 1px solid #000000;
			border-radius: 5px;
			padding: 7px 15px;
			margin-bottom: 15px;
			background: #ffffff;;
		}

		.mini-checkbox {
			font-size: 10px;
		}

		.card-body.schedule {
			position: relative;
			border-radius: 10px;
		} 
		
		div.absolute {
			position: absolute;
			height: 100%;
			width: 100%;
			right: 0;
			background: red;
			opacity: 0.9;
			border-radius: 10px;
			color: #ffffff;
		}

		.box-shadow {
			box-shadow: 3px 3px 3px #e5e5e5;
		}

		.border-radius-5 {
			border-radius: 5px;
		}

		.btn-black {
			background: #000000;
			color: #fff;
		}
		
		.paginationjs, .paginationjs .paginationjs-pages, .paginationjs .paginationjs-pages ul{
			display: flex;
			flex-direction: row;
			width: 100%;
			list-style: none;
		}
		.paginationjs .paginationjs-pages ul, .paginationjs .paginationjs-nav, .paginationjs .paginationjs-go-input, .paginationjs .paginationjs-go-button{
			margin-top:10px!important;
			margin-bottom:10px!important;
			padding: 0px !important;
			justify-content: flex-end;
			align-items: center;
			display: flex;
			flex: 0 0 auto;
		}
		.J-paginationjs-nav{
			display: block ruby;
			text-align: right;
			white-space: nowrap;
		}
		.paginationjs {
			line-height: 1.6;
			font-family: Marmelad, "Lucida Grande", Arial, "Hiragino Sans GB", Georgia, sans-serif;
			font-size: 14px;
			box-sizing: initial
		}

		.paginationjs:after {
			display: table;
			content: " ";
			clear: both
		}

		.paginationjs .paginationjs-pages {
			float: right
		}

		.paginationjs .paginationjs-pages ul {
			float: right;
			margin: 0;
			padding: 0
		}

		.paginationjs .paginationjs-go-button,
		.paginationjs .paginationjs-go-input,
		.paginationjs .paginationjs-nav {
			float: right;
			margin-left: 10px;
			font-size: 14px
		}

		.paginationjs .paginationjs-pages li {
			float: right;
			border: 1px solid #aaa;
			border-right: none;
			list-style: none
		}

		.paginationjs .paginationjs-pages li>a {
			min-width: 30px;
			height: 28px;
			line-height: 28px;
			display: block;
			background: #fff;
			font-size: 14px;
			color: #333;
			text-decoration: none;
			text-align: center
		}

		.paginationjs .paginationjs-pages li>a:hover {
			background: #eee
		}

		.paginationjs .paginationjs-pages li.active {
			border: none
		}

		.paginationjs .paginationjs-pages li.active>a {
			height: 30px;
			line-height: 30px;
			background: #0978be;
			color: #fff
		}

		.paginationjs .paginationjs-pages li.disabled>a {
			opacity: .3
		}

		.paginationjs .paginationjs-pages li.disabled>a:hover {
			background: 0 0
		}

		.paginationjs .paginationjs-pages li:first-child,
		.paginationjs .paginationjs-pages li:first-child>a {
			border-radius: 3px 0 0 3px
		}

		.paginationjs .paginationjs-pages li:last-child {
			border-right: 1px solid #aaa;
			border-radius: 0 3px 3px 0
		}

		.paginationjs .paginationjs-pages li:last-child>a {
			border-radius: 0 3px 3px 0
		}

		.paginationjs .paginationjs-go-input>input[type=text] {
			width: 30px;
			height: 28px;
			background: #fff;
			border-radius: 3px;
			border: 1px solid #aaa;
			padding: 0;
			font-size: 14px;
			text-align: center;
			vertical-align: baseline;
			outline: 0;
			box-shadow: none;
			box-sizing: initial
		}

		.paginationjs .paginationjs-go-button>input[type=button] {
			min-width: 40px;
			height: 30px;
			line-height: 28px;
			background: #fff;
			border-radius: 3px;
			border: 1px solid #aaa;
			text-align: center;
			padding: 0 8px;
			font-size: 14px;
			vertical-align: baseline;
			outline: 0;
			box-shadow: none;
			color: #333;
			cursor: pointer;
			vertical-align: middle\9
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-go-input>input[type=text],
		.paginationjs.paginationjs-theme-blue .paginationjs-pages li {
			border-color: #289de9
		}

		.paginationjs .paginationjs-go-button>input[type=button]:hover {
			background-color: #f8f8f8
		}

		.paginationjs .paginationjs-nav {
			height: 30px;
			line-height: 30px
		}

		.paginationjs .paginationjs-go-button,
		.paginationjs .paginationjs-go-input {
			margin-left: 5px\9
		}

		.paginationjs.paginationjs-small {
			font-size: 12px
		}

		.paginationjs.paginationjs-small .paginationjs-pages li>a {
			min-width: 26px;
			height: 24px;
			line-height: 24px;
			font-size: 12px
		}

		.paginationjs.paginationjs-small .paginationjs-pages li.active>a {
			height: 26px;
			line-height: 26px
		}

		.paginationjs.paginationjs-small .paginationjs-go-input {
			font-size: 12px
		}

		.paginationjs.paginationjs-small .paginationjs-go-input>input[type=text] {
			width: 26px;
			height: 24px;
			font-size: 12px
		}

		.paginationjs.paginationjs-small .paginationjs-go-button {
			font-size: 12px
		}

		.paginationjs.paginationjs-small .paginationjs-go-button>input[type=button] {
			min-width: 30px;
			height: 26px;
			line-height: 24px;
			padding: 0 6px;
			font-size: 12px
		}

		.paginationjs.paginationjs-small .paginationjs-nav {
			height: 26px;
			line-height: 26px;
			font-size: 12px
		}

		.paginationjs.paginationjs-big {
			font-size: 16px
		}

		.paginationjs.paginationjs-big .paginationjs-pages li>a {
			min-width: 36px;
			height: 34px;
			line-height: 34px;
			font-size: 16px
		}

		.paginationjs.paginationjs-big .paginationjs-pages li.active>a {
			height: 36px;
			line-height: 36px
		}

		.paginationjs.paginationjs-big .paginationjs-go-input {
			font-size: 16px
		}

		.paginationjs.paginationjs-big .paginationjs-go-input>input[type=text] {
			width: 36px;
			height: 34px;
			font-size: 16px
		}

		.paginationjs.paginationjs-big .paginationjs-go-button {
			font-size: 16px
		}

		.paginationjs.paginationjs-big .paginationjs-go-button>input[type=button] {
			min-width: 50px;
			height: 36px;
			line-height: 34px;
			padding: 0 12px;
			font-size: 16px
		}

		.paginationjs.paginationjs-big .paginationjs-nav {
			height: 36px;
			line-height: 36px;
			font-size: 16px
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-pages li>a {
			color: #289de9
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-pages li>a:hover {
			background: #e9f4fc
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-pages li.active>a {
			background: #289de9;
			color: #fff
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-pages li.disabled>a:hover {
			background: 0 0
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-go-button>input[type=button] {
			background: #289de9;
			border-color: #289de9;
			color: #fff
		}

		.paginationjs.paginationjs-theme-green .paginationjs-go-input>input[type=text],
		.paginationjs.paginationjs-theme-green .paginationjs-pages li {
			border-color: #449d44
		}

		.paginationjs.paginationjs-theme-blue .paginationjs-go-button>input[type=button]:hover {
			background-color: #3ca5ea
		}

		.paginationjs.paginationjs-theme-green .paginationjs-pages li>a {
			color: #449d44
		}

		.paginationjs.paginationjs-theme-green .paginationjs-pages li>a:hover {
			background: #ebf4eb
		}

		.paginationjs.paginationjs-theme-green .paginationjs-pages li.active>a {
			background: #449d44;
			color: #fff
		}

		.paginationjs.paginationjs-theme-green .paginationjs-pages li.disabled>a:hover {
			background: 0 0
		}

		.paginationjs.paginationjs-theme-green .paginationjs-go-button>input[type=button] {
			background: #449d44;
			border-color: #449d44;
			color: #fff
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-go-input>input[type=text],
		.paginationjs.paginationjs-theme-yellow .paginationjs-pages li {
			border-color: #ec971f
		}

		.paginationjs.paginationjs-theme-green .paginationjs-go-button>input[type=button]:hover {
			background-color: #55a555
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-pages li>a {
			color: #ec971f
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-pages li>a:hover {
			background: #fdf5e9
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-pages li.active>a {
			background: #ec971f;
			color: #fff
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-pages li.disabled>a:hover {
			background: 0 0
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-go-button>input[type=button] {
			background: #ec971f;
			border-color: #ec971f;
			color: #fff
		}

		.paginationjs.paginationjs-theme-red .paginationjs-go-input>input[type=text],
		.paginationjs.paginationjs-theme-red .paginationjs-pages li {
			border-color: #c9302c
		}

		.paginationjs.paginationjs-theme-yellow .paginationjs-go-button>input[type=button]:hover {
			background-color: #eea135
		}

		.paginationjs.paginationjs-theme-red .paginationjs-pages li>a {
			color: #c9302c
		}

		.paginationjs.paginationjs-theme-red .paginationjs-pages li>a:hover {
			background: #faeaea
		}

		.paginationjs.paginationjs-theme-red .paginationjs-pages li.active>a {
			background: #c9302c;
			color: #fff
		}

		.paginationjs.paginationjs-theme-red .paginationjs-pages li.disabled>a:hover {
			background: 0 0
		}

		.paginationjs.paginationjs-theme-red .paginationjs-go-button>input[type=button] {
			background: #c9302c;
			border-color: #c9302c;
			color: #fff
		}

		.paginationjs.paginationjs-theme-red .paginationjs-go-button>input[type=button]:hover {
			background-color: #ce4541
		}

		.paginationjs .paginationjs-pages li.paginationjs-next {
			border-right: 1px solid #aaa\9
		}

		.paginationjs .paginationjs-go-input>input[type=text] {
			line-height: 28px\9;
			vertical-align: middle\9
		}

		.paginationjs.paginationjs-big .paginationjs-pages li>a {
			line-height: 36px\9
		}

		.paginationjs.paginationjs-big .paginationjs-go-input>input[type=text] {
			height: 36px\9;
			line-height: 36px\9
		}

		#navbarSupportedContent .nav-item,#navbarSupportedContent .nav-link {
			width: 100%!important;
			text-align: center;
			font-size: 14px!important;
		}
		.infoUser{
			position: absolute;
			width: 16px;
			bottom: 20%;
			right: 0;
			margin-right: 10%;
			filter: blur(0);
			-webkit-filter: blur(0);
			transform: translateZ(0);
			-webkit-transform: translateZ(0);
		}
	</style>

	<script src="<?php echo base_url(); ?>src/util/config.js"></script>
</head>
<body>

<div id="Dashboard" class="App"></div>
<script src="<?php echo base_url(); ?>templates/src/assets/libs/jquery/dist/jquery.min.js"></script>
<?php print_assets($this->session->flashdata('js_assets')) ?>
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
<script src="<?php echo base_url(); ?>templates/src/assets/libs/sweetalert2/dist/sweetalert2.all.min.js"></script>
<script src="<?php echo base_url(); ?>templates/src/assets/extra-libs/sweetalert2/sweet-alert.init.js"></script>
<script src="https://pagination.js.org/dist/2.1.5/pagination.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0-rc.1/Chart.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>

<!--for Jquery Function place here !-->
<script>
	$(document).ready(function(){
		if(sessionStorage.getItem("email")==null){
			$("#Dashboard").html("");
            Swal.fire({
                type: 'error',
                title: "Oops .. Something Wrong!",
                text: "It's look like you are not logged in.",
            }).then(function() {
				window.location = "/";
			});
        }else{
			$('[data-toggle="tooltip"]').tooltip();
			$(".preloader").fadeOut();
			var sidebartogglerClick=false;
			$(".sidebartoggler").on('click',function(){
				if(sidebartogglerClick==false){
					sidebartogglerClick=true;
					$(".logo-icon img").attr("width","100%");
					$(".dashboardBeforeLogo").hide();
					$(".user-profile .sidebar-link").attr("style","display: flex;flex-direction: column;align-items: center;");
				}else{
					sidebartogglerClick=false;
					$(".logo-icon img").attr("width","100");
					$(".dashboardBeforeLogo").show();
					$(".user-profile .sidebar-link").removeAttr("style");
				}
			});
			$(".scroll-sidebar").hover(function(){
				if(sidebartogglerClick==true){
					$(".logo-icon img").attr("width","100");
					$(".dashboardBeforeLogo").show();
					$(".user-profile .sidebar-link").removeAttr("style");
				}
			}, function(){
				if(sidebartogglerClick==true){
					$(".logo-icon img").attr("width","100%");
					$(".dashboardBeforeLogo").hide();
					$(".user-profile .sidebar-link").attr("style","display: flex;flex-direction: column;align-items: center;");
				}
			});
		}
	});
</script>
</body>
</html>