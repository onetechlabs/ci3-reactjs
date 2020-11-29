if(sessionStorage.getItem("BASE_URL")=="" || sessionStorage.getItem("BASE_URL")==null || sessionStorage.getItem("BASE_URL")=="undefined" || sessionStorage.getItem("BASE_URL")==undefined){
    window.location="/";
}
var url="/app/load_variables";
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'json';
xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
        var resJSON = xhr.response;
        sessionStorage.setItem("BASE_URL", resJSON["variables"][0].variable_value);
        sessionStorage.setItem("firebaseConfig", resJSON["variables"][1].variable_value);
        sessionStorage.setItem("firebaseRestAPI", resJSON["variables"][2].variable_value);
    }
}
xhr.send();