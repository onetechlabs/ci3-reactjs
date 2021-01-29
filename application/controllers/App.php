<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {


	public function __construct(){
		parent::__construct();
		//Load Libraries
		$this->load->library('session');
		//Load Helpers
		$this->load->helper('url');
		$this->load->helper('util');
		//Load Models
		$this->load->model('AppModel');
	}


	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		// loading the script/css only in this page
		// for more information about this function, check the util_helper;
		load_js(["app"], "js_assets");

		$headerWeb			=	$this->AppModel->loginHeader();
		$jsNonReactJsWeb	=	$this->AppModel->loginJs();
		$cssWeb				=	$this->AppModel->loginCss();
		$dataTemplates		= 	array(
									"headerWeb"=>$headerWeb,
									"jsNonReactJsWeb"=>$jsNonReactJsWeb,
									"cssWeb"=>$cssWeb
								);

		$this->load->view('login',$dataTemplates);
	}

	public function dashboard()
	{

		// loading the script/css only in this page
		// for more information about this function, check the util_helper;
		load_js(["app"], "js_assets");

		$headerWeb			=	$this->AppModel->dashboardHeader();
		$jsNonReactJsWeb	=	$this->AppModel->dashboardJs();
		$cssWeb				=	$this->AppModel->dashboardCss();
		$dataTemplates		= 	array(
									"headerWeb"=>$headerWeb,
									"jsNonReactJsWeb"=>$jsNonReactJsWeb,
									"cssWeb"=>$cssWeb
								);

		$this->load->view('dashboard',$dataTemplates);
	}
}
