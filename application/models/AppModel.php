<?php
class AppModel extends CI_Model {

    public $companyName="PT. Yutama Kreasindo";
    public $productName="ERP Signal Bit";

    /* Login Template Model */

    public function loginHeader()
    {
        $dataHeader=array();
        $dataHeader["titleWeb"]=$this->productName." - ".$this->companyName;
        return $dataHeader;
    }

    public function loginCss()
    {
        $dataCss=array();
        $dataCss[0]=base_url()."templates/dist/css/style.min.css";
        return $dataCss;
    }

    public function loginJs()
    {
        $dataJsWithoutReactJs=array();
        $dataJsWithoutReactJs[0]=base_url()."templates/src/assets/libs/jquery/dist/jquery.min.js";
        $dataJsWithoutReactJs[1]=base_url()."templates/src/assets/libs/popper.js/dist/umd/popper.min.js";
        $dataJsWithoutReactJs[2]=base_url()."templates/src/assets/libs/bootstrap/dist/js/bootstrap.min.js";
        $dataJsWithoutReactJs[3]=base_url()."templates/dist/js/pages/login/core.js";
        return $dataJsWithoutReactJs;
    }

    /* Dashboard Template Model */

    public function dashboardHeader()
    {
        $dataHeader=array();
        $dataHeader["titleWeb"]="(Dashboard) ".$this->productName." - ".$this->companyName;
        return $dataHeader;
    }

    public function dashboardCss()
    {
        $dataCss=array();
        $dataCss[0]=base_url()."templates/src/assets/libs/chartist/dist/chartist.min.css";
        $dataCss[1]=base_url()."templates/dist/js/pages/chartist/chartist-init.css";
        $dataCss[2]=base_url()."templates/src/assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css";
        $dataCss[3]=base_url()."templates/src/assets/libs/c3/c3.min.css";
        $dataCss[4]=base_url()."templates/dist/css/style.min.css";
        return $dataCss;
    }

    public function dashboardJs()
    {
        $dataJsWithoutReactJs=array();
        $dataJsWithoutReactJs[0]=base_url()."templates/src/assets/libs/jquery/dist/jquery.min.js";
        $dataJsWithoutReactJs[1]=base_url()."templates/src/assets/libs/popper.js/dist/umd/popper.min.js";
        $dataJsWithoutReactJs[2]=base_url()."templates/src/assets/libs/bootstrap/dist/js/bootstrap.min.js";
        $dataJsWithoutReactJs[3]=base_url()."templates/dist/js/app.min.js";
        $dataJsWithoutReactJs[4]=base_url()."templates/dist/js/app.init.js";
        $dataJsWithoutReactJs[5]=base_url()."templates/dist/js/app-style-switcher.js";
        $dataJsWithoutReactJs[6]=base_url()."templates/src/assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";
        $dataJsWithoutReactJs[7]=base_url()."templates/src/assets/extra-libs/sparkline/sparkline.js";
        $dataJsWithoutReactJs[8]=base_url()."templates/dist/js/waves.js";
        $dataJsWithoutReactJs[9]=base_url()."templates/dist/js/sidebarmenu.js";
        $dataJsWithoutReactJs[10]=base_url()."templates/dist/js/feather.min.js";
        $dataJsWithoutReactJs[11]=base_url()."templates/dist/js/custom.min.js";
        $dataJsWithoutReactJs[12]=base_url()."templates/src/assets/libs/chartist/dist/chartist.min.js";
        $dataJsWithoutReactJs[13]=base_url()."templates/src/assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js";
        $dataJsWithoutReactJs[14]=base_url()."templates/src/assets/libs/d3/dist/d3.min.js";
        $dataJsWithoutReactJs[15]=base_url()."templates/src/assets/libs/c3/c3.min.js";
        $dataJsWithoutReactJs[16]=base_url()."templates/dist/js/pages/dashboard/core.js";
        return $dataJsWithoutReactJs;
    }
    
}