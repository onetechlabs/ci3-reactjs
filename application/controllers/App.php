<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {


	public function __construct(){
		parent::__construct();
	}

	public function load_variables(){
		$this->load->model("Variable");
		$data['variables'] = $this->Variable->loadVariableApplication();
		echo json_encode($data);
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

		$this->load->view('login');
	}

	public function dashboard()
	{
		// loading the script/css only in this page
		// for more information about this function, check the util_helper	
		load_js(["app"], "js_assets");

		$this->load->view('dashboard');
	}
}
