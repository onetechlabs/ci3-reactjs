var firebaseConfigJSON = JSON.parse(sessionStorage.getItem("firebaseConfig")); 
export const BASE_URL = sessionStorage.getItem("BASE_URL");
export const CURRENT_URL = window.location.href;
export const TEMPLATES_SCRIPTS = BASE_URL+'templates/dist/';
export const TEMPLATES_ASSETS = BASE_URL+'templates/src/assets/';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = firebaseConfigJSON;
export const firebaseRestAPI= sessionStorage.getItem("firebaseRestAPI");