import React,{Component, Fragment} from 'react'
import Menus from '../util/menus'
import Header from '../util/header'
import PreReload from '../util/prereload'
import { firebaseRestAPI, TEMPLATES_ASSETS, firebaseConfig, BASE_URL } from '../util/constants'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

/* Init Firebase */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import moment from 'moment'
export const auth = firebase.auth();
export const firestoreDB = firebase.firestore();
export const firestoreStorage = firebase.storage();
firebase.analytics();
/* End Init Firebase */

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardHeight:0,
            avatar_url:sessionStorage.getItem("avatar_url"),
            display_name:sessionStorage.getItem("display_name"),
            email:sessionStorage.getItem("email"),
            role:sessionStorage.getItem("role"),
            unique_code:sessionStorage.getItem("unique_code"),

            is_edit:"no",
            id_user_edit:0,

            directors_list:[],
            staff_list:[],
            driver_list:[],

            setPerPage:12,
            director_trip_list:[],
            staff_trip_list:[],
            driver_trip_list:[],
            confirmed_trip_list:[],
            dataInbox:[],
            form_spk_fppkd_driver_id:"",

            director_avatar_type:'',
            director_avatar_file:'',
            director_firstname_form:'',
            director_lastname_form:'',
            director_gender_form:'',
            director_company_form:'Sinergi Mitra Investama (SMI)',
            director_division_form:'',
            director_id_number_form:'',
            director_mobilephone_form:'',
            director_email_form:'',
            director_id_unique_form:'',

            staff_avatar_type:'',
            staff_avatar_file:'',
            staff_avatar_type:'',
            staff_avatar_file:'',
            staff_directorCode_form:'',
            staff_firstname_form:'',
            staff_lastname_form:'',
            staff_gender_form:'',
            staff_company_form:'Sinergi Mitra Investama (SMI)',
            staff_division_form:'',
            staff_id_number_form:'',
            staff_mobilephone_form:'',
            staff_email_form:'',
            staff_id_unique_form:'',

            driver_avatar_type:'',
            driver_avatar_file:'',
            driver_firstname_form:'',
            driver_lastname_form:'',
            driver_gender_form:'',
            driver_company_form:'',
            driver_id_number_form:'',
            driver_mobilephone_form:'',
            driver_email_form:'',
            driver_vehicle_type_form:'',
            driver_vehicle_number_form:'',
            driver_id_unique_form:'',

            confirmationResult:'',
            verificationCode:'',
            readOnlyForm:false,
            readOnlyImportantForm:false,

            activePage:'dashboard'
        };
        this.headerWrapper = React.createRef();
    }
    static defaultProps = {
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjoZcWALEFrYre7Rhyf-SUij4CHDZdLPc",
    }
    CMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -6.229728, lng: 106.6894312 }}
        options={{
          disableDefaultUI: true,
        }}
    >
    </GoogleMap>
    ));
    _infoUser(dataUser){
        //console.log(dataUser);
        var url=firebaseRestAPI+"databases/(default)/documents/request_trips";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var doc = xhr.response.documents;
            if(dataUser.role=="VIP_User"){
                var fullname=dataUser.director_firstname+" "+dataUser.director_lastname;
                var email=dataUser.director_email;
                var gender=dataUser.director_gender;
                var avatar=dataUser.director_avatar_url;
                var company=dataUser.director_company;
                var id_number=dataUser.director_id_number;
                var id_unique=dataUser.director_id_unique;
                var mobilephone=dataUser.director_mobilephone;
                var is_active=dataUser.is_active;
                var division=dataUser.director_division ? dataUser.director_division : "";
            }else if(dataUser.role=="NonVIP_User"){
                var fullname=dataUser.staff_firstname+" "+dataUser.staff_lastname;
                var email=dataUser.staff_email;
                var gender=dataUser.staff_gender;
                var avatar=dataUser.staff_avatar_url;
                var company=dataUser.staff_company;
                var id_number=dataUser.staff_id_number;
                var id_unique=dataUser.staff_id_unique;
                var mobilephone=dataUser.staff_mobilephone;
                var is_active=dataUser.is_active;
                var division=dataUser.staff_division ? dataUser.staff_division : "";
            }else{
                var fullname=dataUser.driver_firstname+" "+dataUser.driver_lastname;
                var email=dataUser.driver_email;
                var gender=dataUser.driver_gender;
                var avatar=dataUser.driver_avatar_url;
                var company=dataUser.driver_company;
                var id_number=dataUser.driver_id_number;
                var id_unique=dataUser.driver_id_unique;
                var mobilephone=dataUser.driver_mobilephone;
                var is_active=dataUser.is_active;
                var division="-";
            }
            var tripTotal=0;
            var tripInWeek=0;
            var tripInMonth=0;
            var OWTTrip=0;
            var ONTTrip=0;
            var PRTTrip=0;
            doc.forEach((item, index)=>{
                if(item.fields.type_request.stringValue!=="EXT"  && item.fields.status_trip.stringValue !== "Cancel"){
                    if(item.fields.user_requesting_role.stringValue=="VIP_User" || item.fields.user_requesting_role.stringValue=="NonVIP_User"){
                        if(item.fields.user_requesting_id.stringValue == id_unique){
                            var date = moment(item.fields.date_pickup.stringValue);
                            var isThisWeek = (moment(date).isSame(new Date(), 'week'))
                            var isThisMonth = (moment(date).isSame(new Date(), 'month'))
                            
                            tripTotal++; 
                            if(isThisWeek){
                                tripInWeek++;
                            }
                            if(isThisMonth){
                                tripInMonth++;
                            }
                            if(item.fields.type_request.stringValue=="OWT"){
                                OWTTrip++;
                            }
                            if(item.fields.type_request.stringValue=="ONT"){
                                ONTTrip++;
                            }
                            if(item.fields.type_request.stringValue=="PRT"){
                                PRTTrip++;
                            }
                        }
                    }
                    
                    if(item.fields.driver_id.stringValue == id_unique){
                        var date = moment(item.fields.date_pickup.stringValue);
                        var isThisWeek = (moment(date).isSame(new Date(), 'week'))
                        var isThisMonth = (moment(date).isSame(new Date(), 'month'))
                        
                        tripTotal++; 
                        if(isThisWeek){
                            tripInWeek++;
                        }
                        if(isThisMonth){
                            tripInMonth++;
                        }


                        if(item.fields.type_request.stringValue=="OWT"){
                            OWTTrip++;
                        }
                        if(item.fields.type_request.stringValue=="ONT"){
                            ONTTrip++;
                        }
                        if(item.fields.type_request.stringValue=="PRT"){
                            PRTTrip++;
                        }
                    }
                }
            });
            
            var htmlInfo=""+
                "<div class='col-md-6' style='margin-top:10px; margin-bottom:10px;'>"+
                "<h3>"+fullname+"'s Detail Information</h3>"+
                "<table style='width: 100%;margin-bottom:30px;'>"+
                    "<thead>"+
                        "<tr>"+
                            "<td colspan='2' style='text-align:center'><img id='avatar_user_info' src='"+avatar+"' width='100'/></td>"+
                        "<tr>"+
                            "<td>Fullname</td>"+
                            "<td>: "+fullname+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Email</td>"+
                            "<td>: "+email+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Gender</td>"+
                            "<td>: "+gender+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Company</td>"+
                            "<td>: "+company+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Division</td>"+
                            "<td>: "+division+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Identity Number</td>"+
                            "<td>: "+id_number+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>ID APP</td>"+
                            "<td>: "+id_unique+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Contact Person</td>"+
                            "<td>: "+mobilephone+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Is Active ?</td>"+
                            "<td>: "+is_active.toUpperCase()+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>Download Report</td>"+
                            "<td>: <button class='btn btn-success' id='genReport'>Generate PDF</button></td>"+
                        "</tr>"+
                    "</thead>"+
                "</table>"+
                "</div>"+
                "<div class='col-md-6' style='margin-top:10px; margin-bottom:10px;'>"+
                "<h3>"+fullname+"'s Statistics</h3>"+
                "<table style='width: 100%;margin-bottom:10px;'>"+
                    "<thead>"+
                        "<tr>"+
                            "<td colspan='2' style='padding: 10px;'><canvas id='infoDoTrip'></canvas></td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td style='background: #CCC;padding: 10px;'>Total Trip</td>"+
                            "<td style='padding: 10px;'>: "+tripTotal+" Trips</td>"+
                        "<tr>"+
                            "<td style='background: #E6E6E6;padding: 10px;'>This Week</td>"+
                            "<td style='padding: 10px;'>: "+tripInWeek+" Trips</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td style='background: #CCC;padding: 10px;'>This Month</td>"+
                            "<td style='padding: 10px;'>: "+tripInMonth+" Trips</td>"+
                        "</tr>"+
                    "</thead>"+
                "</table>"+
                "<table style='width: 100%;margin-bottom:30px;'>"+
                    "<thead>"+
                        "<tr>"+
                            "<td colspan='2' style='padding: 10px;'><canvas id='infoTypeDoTrip'></canvas></td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td style='background: #CCC;padding: 10px;'>One Way Trip</td>"+
                            "<td style='padding: 10px;'>: "+OWTTrip+" Trips</td>"+
                        "<tr>"+
                            "<td style='background: #E6E6E6;padding: 10px;'>Overnight Trip</td>"+
                            "<td style='padding: 10px;'>: "+ONTTrip+" Trips</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td style='background: #CCC;padding: 10px;'>Pickup & Return Trip</td>"+
                            "<td style='padding: 10px;'>: "+PRTTrip+" Trips</td>"+
                        "</tr>"+
                    "</thead>"+
                "</table>"+
                "</div>";
            $("#userDetailInfo").html(htmlInfo);
            $("#userDetailInfo").attr("style","display:flex;");
            var ctx = document.getElementById("infoDoTrip").getContext('2d');
            var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Trip Total", "Trip In Week", "Trip In Month"],
                datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                ],
                data: [tripTotal, tripInWeek, tripInMonth]
                }]
            }
            });
            var ctx2 = document.getElementById("infoTypeDoTrip").getContext('2d');
            var myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ["OWT Trip", "ONT Trip", "PRT Trip"],
                datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                ],
                data: [OWTTrip, ONTTrip, PRTTrip]
                }]
            }
            });
            var doc = new jsPDF("landscape");
            var specialElementHandlers = {
                '#jspdf_report_user': function (element, renderer) {
                    return true;
                }
            };

            $('#genReport').click(function () {
                var doc = new jsPDF();
                doc.setFontSize(20);
                doc.text(15, 25, "User Information");
                doc.setFontSize(12);
                doc.text(15, 35, "Fullname: "+fullname);
                doc.text(15, 45, "Gender: "+gender);
                doc.text(15, 55, "Email: "+email);
                doc.text(15, 65, "Contact Person: "+mobilephone);
                doc.text(15, 75, "ID Unique: "+id_unique);
                doc.text(15, 85, "Identity Number: "+id_number);
                doc.text(15, 95, "Company: "+company);
                doc.text(15, 105, "Division: "+division);
                doc.setFontSize(20);
                doc.text(15, 120, "Trip Per Request Type");
                doc.setFontSize(12);
                doc.text(15, 130, "One Way Trip: "+OWTTrip+" Trips");
                doc.text(15, 140, "Overnight Trip: "+ONTTrip+" Trips");
                doc.text(15, 150, "Pickup & Return Trip: "+PRTTrip+" Trips");
                doc.setFontSize(20);
                doc.text(15, 165, "Trip Per Unit Time");
                doc.setFontSize(12);
                doc.text(15, 175, "Total Trip: "+tripTotal+" Trips");
                doc.text(15, 185, "Trip in This Week: "+tripInWeek+" Trips");
                doc.text(15, 195, "Trip in This Month: "+tripInMonth+" Trips");
                doc.setFontSize(10);
                doc.text(15, 215, "This Document was created at "+moment(new Date()).format("DD MMMM YYYY HH:MM"));
                doc.text(15, 220, "Downloaded by "+sessionStorage.getItem("email"));
                doc.save(id_unique+'_report.pdf');
            });
        }
        xhr.send();
    }
    _uploadAvatarOnAccount(role){
        document.getElementById("avatarUploadAccount-"+role).click();
    }
    _phoneValidation(value) {
        const condition = /^\+62[0-9]+$/;
        return condition.test(value);
    }
    _onChangeAvatar(a,input){
        if (input.target.files && input.target.files[0]) {
            if(a=="Director"){
                var reader = new FileReader();
        
                reader.onload = function(e) {
                    document.getElementById("avatarUploadAccountPreview-director").src=e.target.result;
                }

                this.setState({
                    director_avatar_type:input.target.files[0].type,
                    director_avatar_file:input.target.files[0],
                });
                
                reader.readAsDataURL(input.target.files[0]); 
            }else if(a=="Staff"){
                var reader = new FileReader();
        
                reader.onload = function(e) {
                    document.getElementById("avatarUploadAccountPreview-staff").src=e.target.result;
                }

                this.setState({
                    staff_avatar_type:input.target.files[0].type,
                    staff_avatar_file:input.target.files[0],
                });
                
                reader.readAsDataURL(input.target.files[0]);  
            }else if(a=="Driver"){
                var reader = new FileReader();
        
                reader.onload = function(e) {
                    document.getElementById("avatarUploadAccountPreview-driver").src=e.target.result;
                }
    
                this.setState({
                    driver_avatar_type:input.target.files[0].type,
                    driver_avatar_file:input.target.files[0],
                });
                
                reader.readAsDataURL(input.target.files[0]); 
            }
        }else{
            Swal.fire({
                type: 'error',
                title: 'Avatar Error!',
                text: 'Avatar could not be empty!'
            });
        }
    }
    _emailValidation(value) {
        const condition = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return condition.test(value);
    }
    _changeStatusUser(is_active,uid){
        $(".preloader").fadeIn(1000);
        if(is_active=="yes"){
            firestoreDB.collection("detail_users").doc(uid).update({
                is_active:"no"
            })
            .then((docRef)=>{
                $(".preloader").fadeOut(2000);
                Swal.fire({
                    type: 'success',
                    title: 'Deactivated User Success!',
                    text: 'This User has been Deactivated !'
                });
            });
        }else{
            firestoreDB.collection("detail_users").doc(uid).update({
                is_active:"yes"
            })
            .then((docRef)=>{
                $(".preloader").fadeOut(2000);
                Swal.fire({
                    type: 'success',
                    title: 'Activation Successfully!',
                    text: 'This User has been Activated !'
                });
            });
        }
    }
    _resetTabOnClick(e){
        if(e=="Director"){
            this.setState({
                director_avatar_type:'',
                director_avatar_file:'',
                director_firstname_form:'',
                director_lastname_form:'',
                director_gender_form:'',
                director_company_form:'Sinergi Mitra Investama (SMI)',
                director_division_form:'',
                director_id_number_form:'',
                director_mobilephone_form:'',
                director_email_form:'',
                director_id_unique_form:'',

                staff_avatar_type:'',
                staff_avatar_file:'',
                staff_avatar_type:'',
                staff_avatar_file:'',
                staff_directorCode_form:'',
                staff_firstname_form:'',
                staff_lastname_form:'',
                staff_gender_form:'',
                staff_company_form:'Sinergi Mitra Investama (SMI)',
                staff_division_form:'',
                staff_id_number_form:'',
                staff_mobilephone_form:'',
                staff_email_form:'',
                staff_id_unique_form:'',

                driver_avatar_type:'',
                driver_avatar_file:'',
                driver_firstname_form:'',
                driver_lastname_form:'',
                driver_gender_form:'',
                driver_company_form:'',
                driver_id_number_form:'',
                driver_mobilephone_form:'',
                driver_email_form:'',
                driver_vehicle_type_form:'',
                driver_vehicle_number_form:'',
                driver_id_unique_form:'',
    
                confirmationResult:'',
                verificationCode:'',
                readOnlyForm:false,
                readOnlyImportantForm:false,
                is_edit:"no",
            });
            document.getElementById("avatarUploadAccountPreview-director").src="https://www.w3schools.com/howto/img_avatar.png";
            document.getElementById("avatarUploadAccountPreview-staff").src="https://www.w3schools.com/howto/img_avatar.png";
            document.getElementById("avatarUploadAccountPreview-driver").src="https://www.shareicon.net/data/512x512/2016/04/10/747353_people_512x512.png";
        }else if(e=="Staff"){
            this.setState({
                director_avatar_type:'',
                director_avatar_file:'',
                director_firstname_form:'',
                director_lastname_form:'',
                director_gender_form:'',
                director_company_form:'Sinergi Mitra Investama (SMI)',
                director_division_form:'',
                director_id_number_form:'',
                director_mobilephone_form:'',
                director_email_form:'',
                director_id_unique_form:'',

                staff_avatar_type:'',
                staff_avatar_file:'',
                staff_avatar_type:'',
                staff_avatar_file:'',
                staff_directorCode_form:'',
                staff_firstname_form:'',
                staff_lastname_form:'',
                staff_gender_form:'',
                staff_company_form:'Sinergi Mitra Investama (SMI)',
                staff_division_form:'',
                staff_id_number_form:'',
                staff_mobilephone_form:'',
                staff_email_form:'',
                staff_id_unique_form:'',

                driver_avatar_type:'',
                driver_avatar_file:'',
                driver_firstname_form:'',
                driver_lastname_form:'',
                driver_gender_form:'',
                driver_company_form:'',
                driver_id_number_form:'',
                driver_mobilephone_form:'',
                driver_email_form:'',
                driver_vehicle_type_form:'',
                driver_vehicle_number_form:'',
                driver_id_unique_form:'',
    
                confirmationResult:'',
                verificationCode:'',
                readOnlyForm:false,
                readOnlyImportantForm:false,
                is_edit:"no",
            });
            firestoreDB.collection("detail_users").where("role", "==", "VIP_User")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === "added") {
                        $(".account-directors").append("<option value='"+change.doc.data().director_id_unique+"'>"+change.doc.data().director_firstname+" "+change.doc.data().director_lastname+" ("+change.doc.data().director_division+")"+"</option>");
                    }
                    $(".account-directors option[value='"+change.doc.data().director_id_unique+"']").remove();
                    $(".account-directors").append("<option value='"+change.doc.data().director_id_unique+"'>"+change.doc.data().director_firstname+" "+change.doc.data().director_lastname+" ("+change.doc.data().director_division+")"+"</option>");
                });
            });
            document.getElementById("avatarUploadAccountPreview-director").src="https://www.w3schools.com/howto/img_avatar.png";
            document.getElementById("avatarUploadAccountPreview-staff").src="https://www.w3schools.com/howto/img_avatar.png";
            document.getElementById("avatarUploadAccountPreview-driver").src="https://www.shareicon.net/data/512x512/2016/04/10/747353_people_512x512.png";
        }else if(e=="Driver"){
            this.setState({
                director_avatar_type:'',
                director_avatar_file:'',
                director_firstname_form:'',
                director_lastname_form:'',
                director_gender_form:'',
                director_company_form:'Sinergi Mitra Investama (SMI)',
                director_division_form:'',
                director_id_number_form:'',
                director_mobilephone_form:'',
                director_email_form:'',
                director_id_unique_form:'',

                staff_avatar_type:'',
                staff_avatar_file:'',
                staff_avatar_type:'',
                staff_avatar_file:'',
                staff_directorCode_form:'',
                staff_firstname_form:'',
                staff_lastname_form:'',
                staff_gender_form:'',
                staff_company_form:'Sinergi Mitra Investama (SMI)',
                staff_division_form:'',
                staff_id_number_form:'',
                staff_mobilephone_form:'',
                staff_email_form:'',
                staff_id_unique_form:'',

                driver_avatar_type:'',
                driver_avatar_file:'',
                driver_firstname_form:'',
                driver_lastname_form:'',
                driver_gender_form:'',
                driver_company_form:'',
                driver_id_number_form:'',
                driver_mobilephone_form:'',
                driver_email_form:'',
                driver_vehicle_type_form:'',
                driver_vehicle_number_form:'',
                driver_id_unique_form:'',
    
                confirmationResult:'',
                verificationCode:'',
                readOnlyForm:false,
                readOnlyImportantForm:false,
                is_edit:"no",
            });
            document.getElementById("avatarUploadAccountPreview-director").src="https://www.w3schools.com/howto/img_avatar.png";
            document.getElementById("avatarUploadAccountPreview-staff").src="https://www.w3schools.com/howto/img_avatar.png";
            document.getElementById("avatarUploadAccountPreview-driver").src="https://www.shareicon.net/data/512x512/2016/04/10/747353_people_512x512.png";
        }
    }
    _onEditPerson(role,user_unique_id){
        $('.preloader').fadeIn(500);

        setTimeout(()=>{
            this.setState({activePage:"formAccount"}); 
            document.getElementsByClassName('directTo-'+role+'-form')[0].click();
            this.setState({is_edit:"yes"}); 
        },1000); 
        setTimeout(()=>{
            if(role=="director"){
                firestoreDB.collection("detail_users")
                .where("director_id_unique","==",user_unique_id)
                .onSnapshot(function(snapshot) {
                    snapshot.forEach((snap) => {
                        console.log(snap.id);
                        this.setState({
                            readOnlyImportantForm:true,
                            id_user_edit:snap.id,
                            director_id_unique_form:snap.data().director_id_unique,
                            director_avatar_file:snap.data().director_avatar_url,
                            director_firstname_form:snap.data().director_firstname,
                            director_lastname_form:snap.data().director_lastname,
                            director_gender_form:snap.data().director_gender,
                            director_company_form:snap.data().director_company,
                            director_division_form:snap.data().director_division,
                            director_id_number_form:snap.data().director_id_number,
                            director_mobilephone_form:snap.data().director_mobilephone,
                            director_email_form:snap.data().director_email,
                        });
                    });
                }.bind(this));
            }else if(role=="staff"){
                firestoreDB.collection("detail_users")
                .where("staff_id_unique","==",user_unique_id)
                .onSnapshot(function(snapshot) {
                    snapshot.forEach((snap) => {
                        console.log(snap.data());
                        var getDirector=(snap.data().staff_directorCode).split("director");
                        this.setState({
                            readOnlyImportantForm:true,
                            id_user_edit:snap.id,
                            staff_id_unique_form:snap.data().staff_id_unique,
                            staff_avatar_file:snap.data().staff_avatar_url,
                            staff_directorCode_form:getDirector[1],
                            staff_firstname_form:snap.data().staff_firstname,
                            staff_lastname_form:snap.data().staff_lastname,
                            staff_gender_form:snap.data().staff_gender,
                            staff_company_form:snap.data().staff_company,
                            staff_division_form:snap.data().staff_division,
                            staff_id_number_form:snap.data().staff_id_number,
                            staff_mobilephone_form:snap.data().staff_mobilephone,
                            staff_email_form:snap.data().staff_email,
                        });
                    });
                }.bind(this));
            }else if(role=="driver"){
                firestoreDB.collection("detail_users")
                .where("driver_id_unique","==",user_unique_id)
                .onSnapshot(function(snapshot) {
                    snapshot.forEach((snap) => {
                        console.log(snap.data());
                        this.setState({
                            readOnlyImportantForm:true,
                            id_user_edit:snap.id,
                            driver_id_unique_form:snap.data().driver_id_unique,
                            driver_avatar_file:snap.data().driver_avatar_url,
                            driver_firstname_form:snap.data().driver_firstname,
                            driver_lastname_form:snap.data().driver_lastname,
                            driver_gender_form:snap.data().driver_gender,
                            driver_company_form:snap.data().driver_company,
                            driver_id_number_form:snap.data().driver_id_number,
                            driver_mobilephone_form:snap.data().driver_mobilephone,
                            driver_email_form:snap.data().driver_email,
                            driver_vehicle_type_form:snap.data().driver_vehicle_type,
                            driver_vehicle_number_form:snap.data().driver_vehicle_number,
                        });
                    });
                }.bind(this));
            }
            $('.preloader').fadeOut(1000);
        },3000);
    }
    _confirmOTPUser(e){
        $(".preloader").fadeIn(1000);
        if(e=="Director"){
            var fullname = this.state.director_firstname_form + " " + this.state.director_lastname_form;
            this.state.confirmationResult.confirm(this.state.verificationCode).then((result)=>{
                var user = result.user;
                const metadata = {
                    contentType: this.state.director_avatar_type
                };
                var now = new Date();
                let avatarStorageRef = firestoreStorage.ref('avatar_users/users-'+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+'.jpg');
                const task = avatarStorageRef.put(this.state.director_avatar_file,this.state.director_avatar_type);
                task.then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    var now = new Date();
                    firestoreDB.collection("detail_users").add({
                        director_avatar_url:url,
                        director_id_unique:"SMI.DIR-SMKT-"+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString(),
                        director_firstname:this.state.director_firstname_form,
                        director_lastname:this.state.director_lastname_form,
                        director_gender:this.state.director_gender_form,
                        director_company:this.state.director_company_form,
                        director_division:this.state.director_division_form,
                        director_id_number:this.state.director_id_number_form,
                        director_mobilephone:this.state.director_mobilephone_form,
                        director_email:this.state.director_email_form,
                        role:'VIP_User',
                        is_active:'yes'
                    })
                    .then((docRef)=>{
                        $(".preloader").fadeOut(2000);
                        Swal.fire({
                            type: 'success',
                            title: 'Add new User Succesfully!',
                            text: fullname+' has been added !'
                        });
                        this.setState({
                            director_avatar_type:'',
                            director_avatar_file:'',
                            director_firstname_form:'',
                            director_lastname_form:'',
                            director_gender_form:'',
                            director_company_form:'Sinergi Mitra Investama (SMI)',
                            director_division_form:'',
                            director_id_number_form:'',
                            director_mobilephone_form:'',
                            director_email_form:'',
                            director_id_unique_form:'',
        
                            confirmationResult:'',
                            verificationCode:'',
                            readOnlyForm:false,
                            readOnlyImportantForm:false,
                        });
                        document.getElementById("avatarUploadAccountPreview-director").src="https://www.w3schools.com/howto/img_avatar.png";
                    })
                    .catch(function(error) {
                        $(".preloader").fadeOut(2000);
                        console.error("Error adding document: ", error);
                    });
                })
                .catch(console.error);
            }).catch(function (error) {
                $(".preloader").fadeOut(2000);
                console.error("Error When Retreiving OTP User: ", error);
                Swal.fire({
                    type: 'error',
                    title: 'OOps ..OTP is Wrong!',
                    text: 'OTP was not filled correctly!'
                });
            });
        }else if(e=="Staff"){
            var fullname = this.state.staff_firstname_form + " " + this.state.staff_lastname_form;
            this.state.confirmationResult.confirm(this.state.verificationCode).then((result)=>{
                var user = result.user;
                const metadata = {
                    contentType: this.state.staff_avatar_type
                };
                var now = new Date();
                let avatarStorageRef = firestoreStorage.ref('avatar_users/users-'+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+'.jpg');
                const task = avatarStorageRef.put(this.state.staff_avatar_file,this.state.staff_avatar_type);
                task.then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    var now = new Date();
                    firestoreDB.collection("detail_users").add({
                        staff_avatar_url:url,
                        staff_id_unique:"SMI.STAFF-SMKT-"+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString(),
                        staff_directorCode:'director'+this.state.staff_directorCode_form,
                        staff_firstname:this.state.staff_firstname_form,
                        staff_lastname:this.state.staff_lastname_form,
                        staff_gender:this.state.staff_gender_form,
                        staff_company:this.state.staff_company_form,
                        staff_division:this.state.staff_division_form,
                        staff_id_number:this.state.staff_id_number_form,
                        staff_mobilephone:this.state.staff_mobilephone_form,
                        staff_email:this.state.staff_email_form,
                        role:'NonVIP_User',
                        is_active:'yes'
                    })
                    .then((docRef)=>{
                        $(".preloader").fadeOut(2000);
                        Swal.fire({
                            type: 'success',
                            title: 'Add new User Succesfully!',
                            text: fullname+' has been added !'
                        });
                        this.setState({
                            staff_avatar_type:'',
                            staff_avatar_file:'',
                            staff_directorCode_form:'',
                            staff_firstname_form:'',
                            staff_lastname_form:'',
                            staff_gender_form:'',
                            staff_company_form:'Sinergi Mitra Investama (SMI)',
                            staff_division_form:'',
                            staff_id_number_form:'',
                            staff_mobilephone_form:'',
                            staff_email_form:'',
                            staff_id_unique_form:'',
            
                            confirmationResult:'',
                            verificationCode:'',
                            readOnlyForm:false,
                            readOnlyImportantForm:false,
                        });
                        document.getElementById("avatarUploadAccountPreview-staff").src="https://www.w3schools.com/howto/img_avatar.png";
                    })
                    .catch(function(error) {
                        $(".preloader").fadeOut(2000);
                        console.error("Error adding document: ", error);
                    });
                })
                .catch(console.error);
            }).catch(function (error) {
                $(".preloader").fadeOut(2000);
                console.error("Error When Retreiving OTP User: ", error);
                Swal.fire({
                    type: 'error',
                    title: 'OOps ..OTP is Wrong!',
                    text: 'OTP was not filled correctly!'
                });
            });
        }else if(e=="Driver"){
            var fullname = this.state.driver_firstname_form + " " + this.state.driver_lastname_form;
            this.state.confirmationResult.confirm(this.state.verificationCode).then((result)=>{
                var user = result.user;
                const metadata = {
                    contentType: this.state.driver_avatar_type
                };
                var now = new Date();
                let avatarStorageRef = firestoreStorage.ref('avatar_users/users-'+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+'.jpg');
                const task = avatarStorageRef.put(this.state.driver_avatar_file,this.state.driver_avatar_type);
                task.then(snapshot => snapshot.ref.getDownloadURL())
                .then((url) => {
                    var now = new Date();
                    firestoreDB.collection("detail_users").add({
                        driver_avatar_url:url,
                        driver_id_unique:"SMI.DRIVER-SMKT-"+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString(),
                        driver_firstname:this.state.driver_firstname_form,
                        driver_lastname:this.state.driver_lastname_form,
                        driver_gender:this.state.driver_gender_form,
                        driver_company:this.state.driver_company_form,
                        driver_id_number:this.state.driver_id_number_form,
                        driver_mobilephone:this.state.driver_mobilephone_form,
                        driver_email:this.state.driver_email_form,
                        driver_vehicle_type:this.state.driver_vehicle_type_form,
                        driver_vehicle_number:this.state.driver_vehicle_number_form,
                        role:'Driver_User',
                        is_active:'yes'
                    })
                    .then((docRef)=>{
                        $(".preloader").fadeOut(2000);
                        Swal.fire({
                            type: 'success',
                            title: 'Add new User Succesfully!',
                            text: fullname+' has been added !'
                        });
                        this.setState({
                            driver_avatar_type:'',
                            driver_avatar_file:'',
                            driver_firstname_form:'',
                            driver_lastname_form:'',
                            driver_gender_form:'',
                            driver_company_form:'',
                            driver_id_number_form:'',
                            driver_mobilephone_form:'',
                            driver_email_form:'',
                            driver_vehicle_type_form:'',
                            driver_vehicle_number_form:'',
                            driver_id_unique_form:'',
        
                            confirmationResult:'',
                            verificationCode:'',
                            readOnlyForm:false,
                            readOnlyImportantForm:false,
                        });
                        document.getElementById("avatarUploadAccountPreview-driver").src="https://www.shareicon.net/data/512x512/2016/04/10/747353_people_512x512.png";
                    })
                    .catch(function(error) {
                        $(".preloader").fadeOut(2000);
                        console.error("Error adding document: ", error);
                    });
                })
                .catch(console.error);
            }).catch(function (error) {
                $(".preloader").fadeOut(2000);
                console.error("Error When Retreiving OTP User: ", error);
                Swal.fire({
                    type: 'error',
                    title: 'OOps ..OTP is Wrong!',
                    text: 'OTP was not filled correctly!'
                });
            });
        }
    }
    _saveForm(e){
        if(e=="updateUserDirector"){
            if(
                this.state.director_avatar_file=='' ||
                this.state.director_firstname_form=='' ||
                this.state.director_lastname_form=='' ||
                this.state.director_gender_form=='' ||
                this.state.director_company_form=='' ||
                this.state.director_division_form=='' ||
                this.state.director_id_number_form=='' ||
                this.state.director_mobilephone_form=='' ||
                this.state.director_email_form==''
            ){
                Swal.fire({
                    type: 'error',
                    title: 'Form cannot be empty !',
                    text: 'Account cannot be added because still have form was not filled correctly!'
                });
                return false;
            }else{
                if(this._phoneValidation(this.state.director_mobilephone_form)==false){
                    Swal.fire({
                        type: 'error',
                        title: 'Phone Must be (+62XXXXXXXXX) Format !',
                        text: 'Phone was not filled correctly!'
                    });
                    return false;
                }else{
                    if(this._emailValidation(this.state.director_email_form)==false){
                        Swal.fire({
                            type: 'error',
                            title: 'Invalid Email Format!',
                            text: 'Email was not filled correctly!'
                        });
                        return false;
                    }else{
                        $(".preloader").fadeIn(1000);
                        //update profile
                        var fullname = this.state.director_firstname_form + " " + this.state.director_lastname_form;
                        const metadata = {
                            contentType: this.state.director_avatar_type
                        };
                        var now = new Date();
                        if(this.state.director_avatar_type==""){}else{
                            let avatarStorageRef = firestoreStorage.ref('avatar_users/users-'+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+'.jpg');
                            const task = avatarStorageRef.put(this.state.director_avatar_file,this.state.director_avatar_type);
                            task.then(snapshot => snapshot.ref.getDownloadURL())
                            .then((url) => {
                                console.log(url);
                                this.setState({director_avatar_file: url});
                            });
                        }
                        setTimeout(()=>{
                            firestoreDB.collection("detail_users").doc(this.state.id_user_edit).update({
                                director_avatar_url:this.state.director_avatar_file,
                                director_firstname:this.state.director_firstname_form,
                                director_lastname:this.state.director_lastname_form,
                                director_gender:this.state.director_gender_form,
                                director_division:this.state.director_division_form
                            })
                            .then((docRef)=>{
                                firestoreDB.collection("request_trips").where("user_requesting_id","==",this.state.director_id_unique_form)
                                .onSnapshot(function(snapshot) {
                                    var reqTripUpdateVIPUserInfo = [];
                                    var i = 0;
                                    snapshot.forEach((snap) => {
                                        reqTripUpdateVIPUserInfo.push(snap.data());
                                        reqTripUpdateVIPUserInfo[i].id=snap.id;
                                        firestoreDB.collection("request_trips").doc(snap.id).update({
                                            user_requesting_name:this.state.director_firstname_form+" "+this.state.director_lastname_form,
                                            user_requesting_mobilephone: this.state.director_mobilephone_form
                                        }).then((docRef)=>{});
                                        i++;
                                    });
                                }.bind(this));
                                Swal.fire({
                                    type: 'success',
                                    title: 'Update User Profile Succesfully!',
                                    text: fullname+' has been Saved !'
                                }).then(()=>{
                                    setTimeout(()=>{
                                        this.setState({
                                            director_avatar_type:'',
                                            director_avatar_file:'',
                                            director_firstname_form:'',
                                            director_lastname_form:'',
                                            director_gender_form:'',
                                            director_company_form:'Sinergi Mitra Investama (SMI)',
                                            director_division_form:'',
                                            director_id_number_form:'',
                                            director_mobilephone_form:'',
                                            director_email_form:'',
                                            director_id_unique_form:'',
                        
                                            confirmationResult:'',
                                            verificationCode:'',
                                            readOnlyForm:false,
                                            readOnlyImportantForm:false,
                                            is_edit:'no',
                                            id_user_edit:0,
                                            activePage:'allAccount'
                                        });
                                    },1000);
                                });
                                document.getElementById("avatarUploadAccountPreview-director").src="https://www.w3schools.com/howto/img_avatar.png";
                                $(".preloader").fadeOut(2000);
                            })
                            .catch(function(error) {
                                $(".preloader").fadeOut(2000);
                                console.error("Error Updating document: ", error);
                            });
                        },3000);
                    }
                }
            }
        }else if(e=="updateUserStaff"){
            if(
                this.state.staff_avatar_file=='' ||
                this.state.staff_directorCode_form=='' ||
                this.state.staff_firstname_form=='' ||
                this.state.staff_lastname_form=='' ||
                this.state.staff_gender_form=='' ||
                this.state.staff_company_form=='' ||
                this.state.staff_division_form=='' ||
                this.state.staff_id_number_form=='' ||
                this.state.staff_mobilephone_form=='' ||
                this.state.staff_email_form==''
            ){
                Swal.fire({
                    type: 'error',
                    title: 'Form cannot be empty !',
                    text: 'Account cannot be added because still have form was not filled correctly!'
                });
                return false;
            }else{
                if(this._phoneValidation(this.state.staff_mobilephone_form)==false){
                    Swal.fire({
                        type: 'error',
                        title: 'Phone Must be (+62XXXXXXXXX) Format !',
                        text: 'Phone was not filled correctly!'
                    });
                    return false;
                }else{
                    if(this._emailValidation(this.state.staff_email_form)==false){
                        Swal.fire({
                            type: 'error',
                            title: 'Invalid Email Format!',
                            text: 'Email was not filled correctly!'
                        });
                        return false;
                    }else{
                        $(".preloader").fadeIn(1000);
                        //update profile
                        var fullname = this.state.staff_firstname_form + " " + this.state.staff_lastname_form;
                        const metadata = {
                            contentType: this.state.staff_avatar_type
                        };
                        var now = new Date();
                        if(this.state.staff_avatar_type==""){}else{
                            let avatarStorageRef = firestoreStorage.ref('avatar_users/users-'+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+'.jpg');
                            const task = avatarStorageRef.put(this.state.staff_avatar_file,this.state.staff_avatar_type);
                            task.then(snapshot => snapshot.ref.getDownloadURL())
                            .then((url) => {
                                console.log(url);
                                this.setState({staff_avatar_file: url});
                            });
                        }
                        setTimeout(()=>{
                            firestoreDB.collection("detail_users").doc(this.state.id_user_edit).update({
                                staff_avatar_url:this.state.staff_avatar_file,
                                staff_directorCode:"director"+this.state.staff_directorCode_form,
                                staff_firstname:this.state.staff_firstname_form,
                                staff_lastname:this.state.staff_lastname_form,
                                staff_gender:this.state.staff_gender_form,
                                staff_division:this.state.staff_division_form
                            })
                            .then((docRef)=>{
                                firestoreDB.collection("request_trips").where("user_requesting_id","==",this.state.staff_id_unique_form)
                                .onSnapshot(function(snapshot) {
                                    var reqTripUpdateNonVIPUserInfo = [];
                                    var i = 0;
                                    snapshot.forEach((snap) => {
                                        reqTripUpdateNonVIPUserInfo.push(snap.data());
                                        reqTripUpdateNonVIPUserInfo[i].id=snap.id;
                                        firestoreDB.collection("request_trips").doc(snap.id).update({
                                            user_requesting_name:this.state.staff_firstname_form+" "+this.state.staff_lastname_form,
                                            user_requesting_mobilephone: this.state.staff_mobilephone_form
                                        }).then((docRef)=>{});
                                        i++;
                                    });
                                }.bind(this));
                                Swal.fire({
                                    type: 'success',
                                    title: 'Update User Profile Succesfully!',
                                    text: fullname+' has been Saved !'
                                }).then(()=>{
                                    setTimeout(()=>{
                                        this.setState({
                                            staff_avatar_type:'',
                                            staff_avatar_file:'',
                                            staff_directorCode_form:'',
                                            staff_firstname_form:'',
                                            staff_lastname_form:'',
                                            staff_gender_form:'',
                                            staff_company_form:'Sinergi Mitra Investama (SMI)',
                                            staff_division_form:'',
                                            staff_id_number_form:'',
                                            staff_mobilephone_form:'',
                                            staff_email_form:'',
                                            staff_id_unique_form:'',
                        
                                            confirmationResult:'',
                                            verificationCode:'',
                                            readOnlyForm:false,
                                            readOnlyImportantForm:false,
                                            is_edit:'no',
                                            id_user_edit:0,
                                            activePage:'allAccount'
                                        });
                                    },1000);
                                });
                                
                                document.getElementById("avatarUploadAccountPreview-staff").src="https://www.w3schools.com/howto/img_avatar.png";
                                $(".preloader").fadeOut(2000);
                            })
                            .catch(function(error) {
                                $(".preloader").fadeOut(2000);
                                console.error("Error Updating document: ", error);
                            });
                        },3000);
                    }
                }
            }
        }else if(e=="updateUserDriver"){
            if(
                this.state.driver_avatar_file=='' ||
                this.state.driver_firstname_form=='' ||
                this.state.driver_lastname_form=='' ||
                this.state.driver_gender_form=='' ||
                this.state.driver_company_form=='' ||
                this.state.driver_id_number_form=='' ||
                this.state.driver_mobilephone_form=='' ||
                this.state.driver_email_form=='' ||
                this.state.driver_vehicle_type_form=='' ||
                this.state.driver_vehicle_number_form==''
            ){
                Swal.fire({
                    type: 'error',
                    title: 'Form cannot be empty !',
                    text: 'Account cannot be added because still have form was not filled correctly!'
                });
                return false;
            }else{
                if(this._phoneValidation(this.state.driver_mobilephone_form)==false){
                    Swal.fire({
                        type: 'error',
                        title: 'Phone Must be (+62XXXXXXXXX) Format !',
                        text: 'Phone was not filled correctly!'
                    });
                    return false;
                }else{
                    if(this._emailValidation(this.state.driver_email_form)==false){
                        Swal.fire({
                            type: 'error',
                            title: 'Invalid Email Format!',
                            text: 'Email was not filled correctly!'
                        });
                        return false;
                    }else{
                        $(".preloader").fadeIn(1000);
                        //update profile
                        var fullname = this.state.driver_firstname_form + " " + this.state.driver_lastname_form;
                        const metadata = {
                            contentType: this.state.driver_avatar_type
                        };
                        var now = new Date();
                        if(this.state.driver_avatar_type==""){}else{
                            let avatarStorageRef = firestoreStorage.ref('avatar_users/users-'+now.getDate().toString()+(now.getMonth()+1).toString()+now.getFullYear().toString()+now.getHours().toString()+now.getMinutes().toString()+now.getSeconds().toString()+'.jpg');
                            const task = avatarStorageRef.put(this.state.driver_avatar_file,this.state.driver_avatar_type);
                            task.then(snapshot => snapshot.ref.getDownloadURL())
                            .then((url) => {
                                console.log(url);
                                this.setState({driver_avatar_file: url});
                            });
                        }
                        
                        setTimeout(()=>{
                            firestoreDB.collection("detail_users").doc(this.state.id_user_edit).update({
                                driver_avatar_url:this.state.driver_avatar_file,
                                driver_firstname:this.state.driver_firstname_form,
                                driver_lastname:this.state.driver_lastname_form,
                                driver_gender:this.state.driver_gender_form,
                                driver_vehicle_type:this.state.driver_vehicle_type_form,
                                driver_vehicle_number:this.state.driver_vehicle_number_form,
                            })
                            .then((docRef)=>{
                                firestoreDB.collection("request_trips").where("driver_id","==",this.state.driver_id_unique_form)
                                .onSnapshot(function(snapshot) {
                                    var reqTripUpdateDriverUserInfo = [];
                                    var i = 0;
                                    snapshot.forEach((snap) => {
                                        reqTripUpdateDriverUserInfo.push(snap.data());
                                        reqTripUpdateDriverUserInfo[i].id=snap.id;
                                        firestoreDB.collection("request_trips").doc(snap.id).update({
                                            driver_name:this.state.driver_firstname_form+" "+this.state.driver_lastname_form,
                                            driver_mobilephone: this.state.driver_mobilephone_form,
                                            driver_avatar: this.state.driver_avatar_file
                                        }).then((docRef)=>{});
                                        i++;
                                    });
                                }.bind(this));
                                Swal.fire({
                                    type: 'success',
                                    title: 'Update User Profile Succesfully!',
                                    text: fullname+' has been Saved !'
                                }).then(()=>{
                                    this.setState({
                                        driver_avatar_type:'',
                                        driver_avatar_file:'',
                                        driver_firstname_form:'',
                                        driver_lastname_form:'',
                                        driver_gender_form:'',
                                        driver_company_form:'',
                                        driver_id_number_form:'',
                                        driver_mobilephone_form:'',
                                        driver_email_form:'',
                                        driver_vehicle_type_form:'',
                                        driver_vehicle_number_form:'',
                                        driver_id_unique_form:'',
                    
                                        confirmationResult:'',
                                        verificationCode:'',
                                        readOnlyForm:false,
                                        readOnlyImportantForm:false,
                                        is_edit:'no',
                                        id_user_edit:0,
                                        activePage:'allAccount'
                                    });
                                });
                                
                                document.getElementById("avatarUploadAccountPreview-driver").src="https://www.w3schools.com/howto/img_avatar.png";
                                $(".preloader").fadeOut(2000);
                            })
                            .catch(function(error) {
                                $(".preloader").fadeOut(2000);
                                console.error("Error Updating document: ", error);
                            });
                        },3000);
                        
                    }
                }
            }
        }else if(e=="createUserDirector"){
            if(
                this.state.director_avatar_file=='' ||
                this.state.director_firstname_form=='' ||
                this.state.director_lastname_form=='' ||
                this.state.director_gender_form=='' ||
                this.state.director_company_form=='' ||
                this.state.director_division_form=='' ||
                this.state.director_id_number_form=='' ||
                this.state.director_mobilephone_form=='' ||
                this.state.director_email_form==''
            ){
                Swal.fire({
                    type: 'error',
                    title: 'Form cannot be empty !',
                    text: 'Account cannot be added because still have form was not filled correctly!'
                });
                return false;
            }else{
                if(this._phoneValidation(this.state.director_mobilephone_form)==false){
                    Swal.fire({
                        type: 'error',
                        title: 'Phone Must be (+62XXXXXXXXX) Format !',
                        text: 'Phone was not filled correctly!'
                    });
                    return false;
                }else{
                    if(this._emailValidation(this.state.director_email_form)==false){
                        Swal.fire({
                            type: 'error',
                            title: 'Invalid Email Format!',
                            text: 'Email was not filled correctly!'
                        });
                        return false;
                    }else{
                        $(".preloader").fadeIn(1000);
                        var CheckEmail = this.state.director_email_form;
                        var CheckPhone = this.state.director_mobilephone_form;
                        var url=firebaseRestAPI+"databases/(default)/documents/detail_users";
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'json';
                        xhr.onload = function() {
                            var status = xhr.status;
                            if (status === 200) {
                                var doc = xhr.response.documents;
                                var cEmail=0;
                                doc.forEach((item, index)=>{
                                    if(item.fields.role.stringValue=="VIP_User"){
                                        if(item.fields.director_email.stringValue==CheckEmail){
                                            cEmail++;
                                        }
                                    }
                                });
                                if(cEmail > 0){
                                    $(".preloader").fadeOut(2000);
                                    Swal.fire({
                                        type: 'error',
                                        title: 'This Account was Registered !',
                                        text: 'This Account Cannot be Inserted Because duplicate email data!'
                                    });
                                    return false;
                                }else{
                                    var url=firebaseRestAPI+"databases/(default)/documents/detail_users";
                                    var xhr2 = new XMLHttpRequest();
                                    xhr2.open('GET', url, true);
                                    xhr2.responseType = 'json';
                                    xhr2.onload = function() {
                                        var status = xhr2.status;
                                        if (status === 200) {
                                            var doc = xhr2.response.documents;
                                            var cPhone=0;
                                            doc.forEach((item, index)=>{
                                                if(item.fields.role.stringValue=="VIP_User"){
                                                    if(item.fields.director_mobilephone.stringValue==CheckPhone){
                                                        cPhone++;
                                                    }
                                                }
                                            });
                                            if(cPhone > 0){
                                                $(".preloader").fadeOut(2000);
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'This Account was Registered !',
                                                    text: 'This Account Cannot be Inserted Because duplicate phone data!'
                                                });
                                                return false;
                                            }else{
                                                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('saveDirector', {
                                                    'size': 'invisible',
                                                    'callback': function(response) {}
                                                });
                                                auth.signInWithPhoneNumber(CheckPhone, recaptchaVerifier)
                                                .then((confirmationResult)=>{
                                                    this.setState({confirmationResult:confirmationResult});
                                                    $(".preloader").fadeOut(2000);
                                                    Swal.fire({
                                                        type: 'success',
                                                        title: 'User OTP Verification',
                                                        text: 'Next Step Need OTP Confirmation From The User is Must!'
                                                    });
                                                    this.setState({readOnlyForm:true});
                                                }).catch(function (error) {
                                                    $(".preloader").fadeOut(2000);
                                                    console.error("Error Sent OTP: ", error);
                                                });
                                            }
                                        } else {
                                            callback("error fetch");
                                            $(".preloader").fadeOut(2000);
                                        }
                                    }.bind(this);
                                    xhr2.send();
                                }
                            } else {
                                callback("error fetch");
                                $(".preloader").fadeOut(2000);
                            }
                        }.bind(this);
                        xhr.send();
                    }
                }
            }
        }else if(e=="createUserStaff"){
            if(
                this.state.staff_avatar_file=='' ||
                this.state.staff_directorCode_form=='' || 
                this.state.staff_firstname_form=='' ||
                this.state.staff_lastname_form=='' ||
                this.state.staff_gender_form=='' ||
                this.state.staff_company_form=='' ||
                this.state.staff_division_form=='' ||
                this.state.staff_id_number_form=='' ||
                this.state.staff_mobilephone_form=='' ||
                this.state.staff_email_form==''
            ){
                Swal.fire({
                    type: 'error',
                    title: 'Form cannot be empty !',
                    text: 'Account cannot be added because still have form was not filled correctly!'
                });
                return false;
            }else{
                if(this._phoneValidation(this.state.staff_mobilephone_form)==false){
                    Swal.fire({
                        type: 'error',
                        title: 'Phone Must be (+62XXXXXXXXX) Format !',
                        text: 'Phone was not filled correctly!'
                    });
                    return false;
                }else{
                    if(this._emailValidation(this.state.staff_email_form)==false){
                        Swal.fire({
                            type: 'error',
                            title: 'Invalid Email Format!',
                            text: 'Email was not filled correctly!'
                        });
                        return false;
                    }else{
                        $(".preloader").fadeIn(1000);
                        var CheckEmail = this.state.staff_email_form;
                        var CheckPhone = this.state.staff_mobilephone_form;
                        var url=firebaseRestAPI+"databases/(default)/documents/detail_users";
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'json';
                        xhr.onload = function() {
                            var status = xhr.status;
                            if (status === 200) {
                                var doc = xhr.response.documents;
                                var cEmail=0;
                                doc.forEach((item, index)=>{
                                    if(item.fields.role.stringValue=="NonVIP_User"){
                                        if(item.fields.staff_email.stringValue==CheckEmail){
                                            cEmail++;
                                        }
                                    }
                                });
                                if(cEmail > 0){
                                    $(".preloader").fadeOut(2000);
                                    Swal.fire({
                                        type: 'error',
                                        title: 'This Account was Registered !',
                                        text: 'This Account Cannot be Inserted Because duplicate email data!'
                                    });
                                    return false;
                                }else{
                                    var url=firebaseRestAPI+"databases/(default)/documents/detail_users";
                                    var xhr2 = new XMLHttpRequest();
                                    xhr2.open('GET', url, true);
                                    xhr2.responseType = 'json';
                                    xhr2.onload = function() {
                                        var status = xhr2.status;
                                        if (status === 200) {
                                            var doc = xhr2.response.documents;
                                            var cPhone=0;
                                            doc.forEach((item, index)=>{
                                                if(item.fields.role.stringValue=="NonVIP_User"){
                                                    if(item.fields.staff_mobilephone.stringValue==CheckPhone){
                                                        cPhone++;
                                                    }
                                                }
                                            });
                                            if(cPhone > 0){
                                                $(".preloader").fadeOut(2000);
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'This Account was Registered !',
                                                    text: 'This Account Cannot be Inserted Because duplicate phone data!'
                                                });
                                                return false;
                                            }else{
                                                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('saveStaff', {
                                                    'size': 'invisible',
                                                    'callback': function(response) {}
                                                });
                                                auth.signInWithPhoneNumber(CheckPhone, recaptchaVerifier)
                                                .then((confirmationResult)=>{
                                                    this.setState({confirmationResult:confirmationResult});
                                                    $(".preloader").fadeOut(2000);
                                                    Swal.fire({
                                                        type: 'success',
                                                        title: 'User OTP Verification',
                                                        text: 'Next Step Need OTP Confirmation From The User is Must!'
                                                    });
                                                    this.setState({readOnlyForm:true});
                                                }).catch(function (error) {
                                                    $(".preloader").fadeOut(2000);
                                                    console.error("Error Sent OTP: ", error);
                                                });
                                            }
                                        } else {
                                            callback("error fetch");
                                            $(".preloader").fadeOut(2000);
                                        }
                                    }.bind(this);
                                    xhr2.send();
                                }
                            } else {
                                callback("error fetch");
                                $(".preloader").fadeOut(2000);
                            }
                        }.bind(this);
                        xhr.send();
                    }
                }
            }
        }else if(e=="createUserDriver"){
            if(
                this.state.driver_avatar_file=='' ||
                this.state.driver_firstname_form=='' ||
                this.state.driver_lastname_form=='' ||
                this.state.driver_gender_form=='' ||
                this.state.driver_company_form=='' ||
                this.state.driver_id_number_form=='' ||
                this.state.driver_mobilephone_form=='' ||
                this.state.driver_email_form=='' ||
                this.state.driver_vehicle_type_form=='' ||
                this.state.driver_vehicle_number_form==''
            ){
                Swal.fire({
                    type: 'error',
                    title: 'Form cannot be empty !',
                    text: 'Account cannot be added because still have form was not filled correctly!'
                });
                return false;
            }else{
                if(this._phoneValidation(this.state.driver_mobilephone_form)==false){
                    Swal.fire({
                        type: 'error',
                        title: 'Phone Must be (+62XXXXXXXXX) Format !',
                        text: 'Phone was not filled correctly!'
                    });
                    return false;
                }else{
                    if(this._emailValidation(this.state.driver_email_form)==false){
                        Swal.fire({
                            type: 'error',
                            title: 'Invalid Email Format!',
                            text: 'Email was not filled correctly!'
                        });
                        return false;
                    }else{
                        $(".preloader").fadeIn(1000);
                        var CheckEmail = this.state.driver_email_form;
                        var CheckPhone = this.state.driver_mobilephone_form;
                        var url=firebaseRestAPI+"databases/(default)/documents/detail_users";
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'json';
                        xhr.onload = function() {
                            var status = xhr.status;
                            if (status === 200) {
                                var doc = xhr.response.documents;
                                var cEmail=0;
                                doc.forEach((item, index)=>{
                                    if(item.fields.role.stringValue=="Driver_User"){
                                        if(item.fields.driver_email.stringValue==CheckEmail){
                                            cEmail++;
                                        }
                                    }
                                });
                                if(cEmail > 0){
                                    $(".preloader").fadeOut(2000);
                                    Swal.fire({
                                        type: 'error',
                                        title: 'This Account was Registered !',
                                        text: 'This Account Cannot be Inserted Because duplicate email data!'
                                    });
                                    return false;
                                }else{
                                    var url=firebaseRestAPI+"databases/(default)/documents/detail_users";
                                    var xhr2 = new XMLHttpRequest();
                                    xhr2.open('GET', url, true);
                                    xhr2.responseType = 'json';
                                    xhr2.onload = function() {
                                        var status = xhr2.status;
                                        if (status === 200) {
                                            var doc = xhr2.response.documents;
                                            var cPhone=0;
                                            doc.forEach((item, index)=>{
                                                if(item.fields.role.stringValue=="Driver_User"){
                                                    if(item.fields.driver_mobilephone.stringValue==CheckPhone){
                                                        cPhone++;
                                                    }
                                                }
                                            });
                                            if(cPhone > 0){
                                                $(".preloader").fadeOut(2000);
                                                Swal.fire({
                                                    type: 'error',
                                                    title: 'This Account was Registered !',
                                                    text: 'This Account Cannot be Inserted Because duplicate phone data!'
                                                });
                                                return false;
                                            }else{
                                                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('saveDriver', {
                                                    'size': 'invisible',
                                                    'callback': function(response) {}
                                                });
                                                auth.signInWithPhoneNumber(CheckPhone, recaptchaVerifier)
                                                .then((confirmationResult)=>{
                                                    this.setState({confirmationResult:confirmationResult});
                                                    $(".preloader").fadeOut(2000);
                                                    Swal.fire({
                                                        type: 'success',
                                                        title: 'User OTP Verification',
                                                        text: 'Next Step Need OTP Confirmation From The User is Must!'
                                                    });
                                                    this.setState({readOnlyForm:true});
                                                }).catch(function (error) {
                                                    $(".preloader").fadeOut(2000);
                                                    console.error("Error Sent OTP: ", error);
                                                });
                                            }
                                        } else {
                                            callback("error fetch");
                                            $(".preloader").fadeOut(2000);
                                        }
                                    }.bind(this);
                                    xhr2.send();
                                }
                            } else {
                                callback("error fetch");
                                $(".preloader").fadeOut(2000);
                            }
                        }.bind(this);
                        xhr.send();
                    }
                }
            }
        }
    }
    componentDidMount () {
        this.setState({dashboardHeight:parseInt(window.innerHeight)-parseInt(this.headerWrapper.current.offsetHeight)});
        document.getElementById('dashboard').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            setTimeout(()=>{
                $(".preloader").fadeOut(1000);
            },2000);
            this.setState({activePage:'dashboard'});
            this.setState({dataInbox:[]});
        };
        document.getElementById('newAccount').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            setTimeout(()=>{
                $(".preloader").fadeOut(1000);
            },2000);
            this.setState({activePage:'formAccount'});
            this.setState({dataInbox:[]});
            this. _resetTabOnClick("Director");
            this. _resetTabOnClick("Staff");
            this. _resetTabOnClick("Driver");
        };
        
        document.getElementById('inboxDirector').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            setTimeout(()=>{
                $(".preloader").fadeOut(1000);
            },2000);
            this.setState({activePage:'inbox-director'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("request_trips")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                var director_trip_list = [];
                var i = 0;
                snapshot.forEach((snap) => {
                    if(snap.data().status_no_request=="SPK" || snap.data().status_no_request=="FPPKD"){
                        director_trip_list.push(snap.data());
                        director_trip_list[i].id=snap.id;
                        i++;
                    }
                });

                console.log(director_trip_list);
                this.setState({ director_trip_list:director_trip_list });
            }.bind(this));
        };

        document.getElementById('inboxStaff').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            setTimeout(()=>{
                $(".preloader").fadeOut(1000);
            },2000);
            this.setState({activePage:'inbox-staff'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("request_trips")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                var staff_trip_list = [];
                var i = 0;
                snapshot.forEach((snap) => {
                    if(snap.data().status_no_request=="SPK" && snap.data().user_requesting_role=="NonVIP_User" || snap.data().status_no_request=="FPPKD" && snap.data().user_requesting_role=="NonVIP_User"){
                        staff_trip_list.push(snap.data());
                        staff_trip_list[i].id=snap.id;
                        i++;
                    }
                });

                console.log(staff_trip_list);
                this.setState({ staff_trip_list:staff_trip_list });
            }.bind(this));
        };

        document.getElementById('inboxDriver').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            setTimeout(()=>{
                $(".preloader").fadeOut(1000);
            },2000);
            this.setState({activePage:'inbox-driver'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("request_trips")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                var driver_trip_list = [];
                var i = 0;
                snapshot.forEach((snap) => {
                    if(snap.data().status_no_request=="PPKD"){
                        driver_trip_list.push(snap.data());
                        driver_trip_list[i].id=snap.id;
                        i++;
                    }
                });

                console.log(driver_trip_list);
                this.setState({ driver_trip_list:driver_trip_list });
            }.bind(this));
        };

        document.getElementById('schedules').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            var dateNow=new Date();
            var dateToString=moment(dateNow).format("YYYY-MM-DD");
            this.setState({activePage:'schedules'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("request_trips").orderBy('date_return','desc').where("type_request","in",["ONT","PRT","OWT"]).where("date_return",">=",dateToString)
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                var confirmed_trip_list = [];
                var i = 0;
                
                snapshot.forEach((snap) => {
                    if(snap.data().status_no_request=="PPKD-CONFIRMED"){
                        confirmed_trip_list.push(snap.data());
                        confirmed_trip_list[i].id=snap.id;
                        i++;
                    }
                });
                console.log(confirmed_trip_list);
                confirmed_trip_list.forEach((row,index)=>{
                    var arr_xtratrip=[];
                    var sum_driver_rating=0;
                    var row_driver_rating=0;
                    var result_driver_rating=0;
                    var rating_star=[];
                    //extra trip
                    var url=firebaseRestAPI+"databases/(default)/documents/request_trips";
                    $.getJSON(url, function(result){
                        result.documents.filter(function(data,index){return data.fields.type_request.stringValue=="EXT" && data.fields.parent_request_id.stringValue==row.no_request;}).forEach((e,index)=>{
                            arr_xtratrip.push(e.fields);
                        });
                    }.bind(this));
                    //Rating
                    var url2=firebaseRestAPI+"databases/(default)/documents/rating_users";
                    $.getJSON(url2, function(result){
                        result.documents.filter(function(data,index){return data.fields.user_received_id.stringValue==row.driver_id;}).forEach((e,index)=>{
                            sum_driver_rating=parseInt(sum_driver_rating)+parseInt(e.fields.user_rating.stringValue);
                            row_driver_rating++;
                        });
                        console.log(sum_driver_rating+" "+row_driver_rating);
                        result_driver_rating = Math.round(sum_driver_rating / row_driver_rating);
                        confirmed_trip_list[index].driver_rating=result_driver_rating;
                        if(result_driver_rating==1){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==2){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==3){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==4){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==5){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                        }
                        confirmed_trip_list[index].driver_rating_star_collection=rating_star;
                    }.bind(this));
                    confirmed_trip_list[index].detail_ext_trip=arr_xtratrip;
                    //this.setState({ confirmed_trip_list:confirmed_trip_list });
                });
                setTimeout(()=>{
                    this.setState({ confirmed_trip_list:confirmed_trip_list },()=>{
                        if(this.state.activePage=="schedules"){
                            $('#order_data_list').pagination({
                                dataSource: this.state.confirmed_trip_list,
                                pageSize: this.state.setPerPage,    
                                showGoInput: true,
                                showGoButton: true,    
                                showPageNumbers: false,
                                showNavigator: true,
                                callback: function(data, pagination) {
                                    this.setState({ confirmed_trip_list:data },()=>{console.log(this.state.confirmed_trip_list)});
                                }.bind(this)
                            });
                        }
                    });
                    $(".preloader").fadeOut(1000);
                },2000);
            }.bind(this));
        };

        document.getElementById('activity').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            var dateNow=new Date();
            var dateToString=moment(dateNow).format("YYYY-MM-DD");
            this.setState({activePage:'activity'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("request_trips").orderBy('date_pickup','desc').where("type_request","in",["ONT","PRT","OWT"])
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                var confirmed_trip_list = [];
                var i = 0;
                
                snapshot.forEach((snap) => {
                    if(snap.data().status_no_request=="PPKD-CONFIRMED" && snap.data().date_pickup == dateToString || snap.data().status_no_request=="PPKD-CONFIRMED" && snap.data().date_return == dateToString){
                        confirmed_trip_list.push(snap.data());
                        confirmed_trip_list[i].id=snap.id;
                        i++;
                    }
                });
                console.log(confirmed_trip_list);
                confirmed_trip_list.forEach((row,index)=>{
                    var arr_xtratrip=[];
                    var sum_driver_rating=0;
                    var row_driver_rating=0;
                    var result_driver_rating=0;
                    var rating_star=[];
                    //extra trip
                    var url=firebaseRestAPI+"databases/(default)/documents/request_trips";
                    $.getJSON(url, function(result){
                        result.documents.filter(function(data,index){return data.fields.type_request.stringValue=="EXT" && data.fields.parent_request_id.stringValue==row.no_request;}).forEach((e,index)=>{
                            arr_xtratrip.push(e.fields);
                        });
                    }.bind(this));
                    //Rating
                    var url2=firebaseRestAPI+"databases/(default)/documents/rating_users";
                    $.getJSON(url2, function(result){
                        result.documents.filter(function(data,index){return data.fields.user_received_id.stringValue==row.driver_id;}).forEach((e,index)=>{
                            sum_driver_rating=parseInt(sum_driver_rating)+parseInt(e.fields.user_rating.stringValue);
                            row_driver_rating++;
                        });
                        console.log(sum_driver_rating+" "+row_driver_rating);
                        result_driver_rating = Math.round(sum_driver_rating / row_driver_rating);
                        confirmed_trip_list[index].driver_rating=result_driver_rating;
                        if(result_driver_rating==1){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==2){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==3){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==4){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==5){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                        }
                        confirmed_trip_list[index].driver_rating_star_collection=rating_star;
                    }.bind(this));
                    confirmed_trip_list[index].detail_ext_trip=arr_xtratrip;
                    //this.setState({ confirmed_trip_list:confirmed_trip_list });
                });
                setTimeout(()=>{
                    this.setState({ confirmed_trip_list:confirmed_trip_list },()=>{
                        if(this.state.activePage=="activity"){
                            $('#order_data_list').pagination({
                                dataSource: this.state.confirmed_trip_list,
                                pageSize: this.state.setPerPage,    
                                showGoInput: true,
                                showGoButton: true,    
                                showPageNumbers: false,
                                showNavigator: true,
                                callback: function(data, pagination) {
                                    this.setState({ confirmed_trip_list:data },()=>{console.log(this.state.confirmed_trip_list)});
                                }.bind(this)
                            });
                        }
                    });
                    $(".preloader").fadeOut(1000);
                },2000);
            }.bind(this));
        };

        document.getElementById('history').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            var dateNow=new Date();
            var dateToString=moment(dateNow).format("YYYY-MM-DD");
            this.setState({activePage:'history'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("request_trips").orderBy('date_pickup','desc').where("type_request","in",["ONT","PRT","OWT"])
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                var confirmed_trip_list = [];
                var i = 0;
                
                snapshot.forEach((snap) => {
                    if(snap.data().status_no_request=="PPKD-CONFIRMED" && snap.data().date_return < dateToString){
                        confirmed_trip_list.push(snap.data());
                        confirmed_trip_list[i].id=snap.id;
                        i++;
                    }
                });
                console.log(confirmed_trip_list);
                confirmed_trip_list.forEach((row,index)=>{
                    var arr_xtratrip=[];
                    var sum_driver_rating=0;
                    var row_driver_rating=0;
                    var result_driver_rating=0;
                    var rating_star=[];
                    var driver_rating_order=[];
                    //extra trip
                    var url=firebaseRestAPI+"databases/(default)/documents/request_trips";
                    $.getJSON(url, function(result){
                        result.documents.filter(function(data,index){return data.fields.type_request.stringValue=="EXT" && data.fields.parent_request_id.stringValue==row.no_request;}).forEach((e,index)=>{
                            arr_xtratrip.push(e.fields);
                        });
                    }.bind(this));
                    //Rating
                    var url2=firebaseRestAPI+"databases/(default)/documents/rating_users";
                    $.getJSON(url2, function(result){
                        result.documents.filter(function(data,index){return data.fields.user_received_id.stringValue==row.driver_id;}).forEach((e,index)=>{
                            sum_driver_rating=parseInt(sum_driver_rating)+parseInt(e.fields.user_rating.stringValue);
                            row_driver_rating++;
                        });
                        console.log(sum_driver_rating+" "+row_driver_rating);
                        result_driver_rating = Math.round(sum_driver_rating / row_driver_rating);
                        confirmed_trip_list[index].driver_rating=result_driver_rating;
                        if(result_driver_rating==1){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==2){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==3){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==4){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-off.png");
                        }else if(result_driver_rating==5){
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                            rating_star.push(TEMPLATES_ASSETS+"images/rating/star-on.png");
                        }
                        confirmed_trip_list[index].driver_rating_star_collection=rating_star;
                    }.bind(this));
                    $.getJSON(url2, function(result){
                        result.documents.filter(function(data,index){return data.fields.no_request.stringValue==row.no_request;}).forEach((e,index)=>{
                            driver_rating_order.push(e.fields);
                        });
                        confirmed_trip_list[index].driver_rating_orders=driver_rating_order;
                    }.bind(this));
                    confirmed_trip_list[index].detail_ext_trip=arr_xtratrip;
                    //this.setState({ confirmed_trip_list:confirmed_trip_list });
                });
                setTimeout(()=>{
                    this.setState({ confirmed_trip_list:confirmed_trip_list },()=>{
                        if(this.state.activePage=="history"){
                            $('#order_data_list').pagination({
                                dataSource: this.state.confirmed_trip_list,
                                pageSize: this.state.setPerPage,    
                                showGoInput: true,
                                showGoButton: true,    
                                showPageNumbers: false,
                                showNavigator: true,
                                callback: function(data, pagination) {
                                    this.setState({ confirmed_trip_list:data },()=>{console.log(this.state.confirmed_trip_list)});
                                }.bind(this)
                            });
                        }
                    });
                    $(".preloader").fadeOut(1000);
                },2000);
            }.bind(this));
        };

        document.getElementById('allAccount').onclick = ()=>{
            $(".preloader").fadeIn(1000);
            setTimeout(()=>{
                $(".preloader").fadeOut(1000);
            },2000);
            this.setState({activePage:'allAccount'});
            this.setState({dataInbox:[]});
            firestoreDB.collection("detail_users").where("role", "==", "VIP_User")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                let directors_list = [];
                var i=0;
                snapshot.forEach((snap) => {
                    directors_list.push(snap.data());
                    directors_list[i].id=snap.id;
                    i++;
                });
                this.setState({ directors_list:directors_list });
            }.bind(this));
            firestoreDB.collection("detail_users").where("role", "==", "NonVIP_User")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                let staff_list = [];
                var i=0;
                snapshot.forEach((snap) => {
                    staff_list.push(snap.data());
                    staff_list[i].id=snap.id;
                    i++;
                });
                this.setState({ staff_list:staff_list });
            }.bind(this));
            firestoreDB.collection("detail_users").where("role", "==", "Driver_User")
            .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                let driver_list = [];
                var i=0;
                snapshot.forEach((snap) => {
                    driver_list.push(snap.data());
                    driver_list[i].id=snap.id;
                    i++;
                });
                this.setState({ driver_list:driver_list });
            }.bind(this));
        };
    }
    render(){
        return (
            <div>
                {/* Loading Component */}
                <PreReload></PreReload>
                {/* Loading Component */}
        
                <div id="main-wrapper">
        
                    {/* Header */}
                    <div ref={this.headerWrapper}>
                        <Header></Header>
                    </div>
                    {/* Header */}
                    
                    {/* Side Menus */}
                    <Menus></Menus>
                    {/* End Side Menus */}
        
                    {/* Container Page */}
                    <div className="page-wrapper" ref={this.pageWrapper}>
                        {this.state.activePage=="dashboard" &&
                            <div>
                                <div className="welcome-dashboard">
                                    Welcome {this.state.email} as {this.state.role == "AdminCT" ? "Coordinator Transportation (Administrator)" : "Unknown Role"}, You do not have any view at this moment
                                </div>
                                <div className="dashboard-gmap">
                                    <Fragment>
                                        <this.CMap
                                            googleMapURL={this.props.googleMapURL}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{ height: this.state.dashboardHeight+'px' }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                        >
                                        </this.CMap>
                                    </Fragment>
                                </div>
                            </div>
                        }
                        {this.state.activePage=="allAccount" &&
                            <div>
                                <div className="modal fade" id="infouser" tabIndex="-1" role="dialog" aria-labelledby="infouser" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-scrollable modal-full-width" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="scrollableModalTitle">User Detail Information</h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body" id="userDetailInfo">
                                                
                                            </div>
                                            <div className="modal-footer">
                                                <div id='jspdf_report_user'></div>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="welcome-allAccount">
                                    <ul className="nav nav-tabs tab-nav-allaccount">
                                        <li className="nav-item" onClick={()=>{this._resetTabOnClick('Director');}}>
                                            <a href="#dir-list-form" data-toggle="tab" aria-expanded="true" className="nav-link active">
                                                Director
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>{this._resetTabOnClick('Staff');}}>
                                            <a href="#staff-list-form" data-toggle="tab" aria-expanded="false" className="nav-link ">
                                                Staff
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>{this._resetTabOnClick('Driver');}}>
                                            <a href="#driver-list-form" data-toggle="tab" aria-expanded="false" className="nav-link ">
                                                Driver
                                            </a>
                                        </li>
                                    </ul>

                                    <div className="tab-content tab-nav-allaccount-content">
                                        <div className="tab-pane show active" style={{height:(parseInt(this.state.dashboardHeight)-150)+'px',alignItems:'center',justifyContent:'center'}} id="dir-list-form">
                                            <div className="directors_list">
                                                {this.state.directors_list.length > 0 ? 
                                                    <div>
                                                        {this.state.directors_list.map((data,index) => {
                                                            return (
                                                                <div className="row px-3 mb-3" key={"key"+index}>
                                                                    <div className="col-sm-3 card-img align-items-center" data-toggle="modal" data-target="#infouser" onClick={()=>{this._infoUser(data)}}>
                                                                        <img src={TEMPLATES_ASSETS+"images/info.png"} className="infoUser" alt="" />
                                                                        <img src={data.director_avatar_url} className="img-fluid rounded-circle" alt="" />
                                                                    </div>
                                                                    <div className="col-sm-9 card-content" style={{paddingLeft:0}}>
                                                                        <div className="row" style={{width:"100%"}}>
                                                                            <div style={{color:"#000"}} className="col-sm-7">
                                                                                <p className="font-weight-bold m-0">{data.director_firstname} {data.director_lastname}</p>
                                                                            </div>
                                                                            <div className="col-sm-5" style={{padding: 0}}>
                                                                                <button className="btn-custom mb-3" onClick={()=>this._onEditPerson('director', data.director_id_unique)}>Edit</button>
                                                                                <button className="btn-custom" style={{backgroundColor:'#f00', color:'#FFF'}} onClick={()=>{this._changeStatusUser(data.is_active,data.id)}}>{data.is_active=="yes"?"Active":"Blocked"}</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div> 
                                                :
                                                    <div style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                        color: '#1f79be',
                                                    }}>No Data was Found</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane" style={{height:(parseInt(this.state.dashboardHeight)-150)+'px',alignItems:'center',justifyContent:'center'}} id="staff-list-form">
                                            <div className="staff_list">
                                                {this.state.staff_list.length>0 ? 
                                                    <div>
                                                        {this.state.staff_list.map((data,index) => {
                                                            return (
                                                                <div className="row px-3 mb-3" key={"key"+index}>
                                                                    <div className="col-sm-3 card-img align-items-center" data-toggle="modal" data-target="#infouser" onClick={()=>{this._infoUser(data)}}>
                                                                        <img src={TEMPLATES_ASSETS+"images/info.png"} className="infoUser" alt="" />
                                                                        <img src={data.staff_avatar_url} className="img-fluid rounded-circle" alt="" />
                                                                    </div>
                                                                    <div className="col-sm-9 card-content" style={{paddingLeft:0}}>
                                                                        <div className="row" style={{width:"100%"}}>
                                                                            <div style={{color:"#000"}} className="col-sm-7">
                                                                                <p className="font-weight-bold m-0">{data.staff_firstname} {data.staff_lastname}</p>
                                                                            </div>
                                                                            <div className="col-sm-5" style={{padding: 0}}>
                                                                                <button className="btn-custom mb-3" onClick={()=>{this._onEditPerson('staff',data.staff_id_unique)}}>Edit</button>
                                                                                <button className="btn-custom" style={{backgroundColor:'#f00', color:'#FFF'}} onClick={()=>{this._changeStatusUser(data.is_active,data.id)}}>{data.is_active=="yes"?"Active":"Blocked"}</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div> 
                                                :
                                                    <div style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                        color: '#1f79be',
                                                    }}>No Data was Found</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="tab-pane" style={{height:(parseInt(this.state.dashboardHeight)-150)+'px',alignItems:'center',justifyContent:'center'}} id="driver-list-form">
                                            <div className="driver_list">
                                                {this.state.driver_list.length>0 ? 
                                                    <div>
                                                        {this.state.driver_list.map((data,index) => {
                                                            return (
                                                                <div className="row px-3 mb-3" key={"key"+index}>
                                                                    <div className="col-sm-3 card-img align-items-center" data-toggle="modal" data-target="#infouser" onClick={()=>{this._infoUser(data)}}>
                                                                        <img src={TEMPLATES_ASSETS+"images/info.png"} className="infoUser" alt="" />
                                                                        <img src={data.driver_avatar_url} className="img-fluid rounded-circle" alt="" />
                                                                    </div>
                                                                    <div className="col-sm-9 card-content" style={{paddingLeft:0}}>
                                                                        <div className="row" style={{width:"100%"}}>
                                                                            <div style={{color:"#000"}} className="col-sm-7">
                                                                                <p className="font-weight-bold m-0">{data.driver_firstname} {data.driver_lastname}</p>
                                                                            </div>
                                                                            <div className="col-sm-5" style={{padding: 0}}>
                                                                                <button className="btn-custom mb-3" onClick={()=>{this._onEditPerson('driver',data.driver_id_unique)}}>Edit</button>
                                                                                <button className="btn-custom" style={{backgroundColor:'#f00', color:'#FFF'}} onClick={()=>{this._changeStatusUser(data.is_active,data.id)}}>{data.is_active=="yes"?"Active":"Blocked"}</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div> 
                                                :
                                                    <div style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        display: 'flex',
                                                        color: '#1f79be',
                                                    }}>No Data was Found</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row hidden-on-tablet-and-lower">
                                        <div className="col-lg-4 mb-5 usersList">
                                            <div className="card-header custom" style={{marginLeft:'auto', marginRight:'auto'}}> Director </div>
                                            <div className="card" style={{overflowX: 'hidden',alignItems:'center',justifyContent:'center'}}>
                                                <div className="card-body" className="directors_list">
                                                    {this.state.directors_list.length>0 ? 
                                                        <div>
                                                            {this.state.directors_list.map((data,index) => {
                                                                return (
                                                                    <div className="row px-3 mb-3" key={"key"+index}>
                                                                        <div className="col-sm-3 card-img align-items-center" data-toggle="modal" data-target="#infouser" onClick={()=>{this._infoUser(data)}}>
                                                                            <img src={TEMPLATES_ASSETS+"images/info.png"} className="infoUser" alt="" />
                                                                            <img src={data.director_avatar_url} className="img-fluid rounded-circle" alt="" />
                                                                        </div>
                                                                        <div className="col-sm-9 card-content" style={{paddingLeft:0}}>
                                                                            <div className="row" style={{width:"100%"}}>
                                                                                <div style={{color:"#000"}} className="col-sm-7">
                                                                                    <p className="font-weight-bold m-0">{data.director_firstname} {data.director_lastname}</p>
                                                                                </div>
                                                                                <div className="col-sm-5" style={{padding: 0}}>
                                                                                    <button className="btn-custom mb-3" onClick={()=>{this._onEditPerson('director',data.director_id_unique)}}>Edit</button>
                                                                                    <button className="btn-custom" style={{backgroundColor:'#f00', color:'#FFF'}} onClick={()=>{this._changeStatusUser(data.is_active,data.id)}}>{data.is_active=="yes"?"Active":"Blocked"}</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div> 
                                                    :
                                                        <div style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            display: 'flex',
                                                            color: '#1f79be',
                                                        }}>No Data was Found</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-5 usersList">
                                            <div className="card-header custom" style={{marginLeft:'auto', marginRight:'auto'}}> Staff </div>
                                            <div className="card" style={{overflowX: 'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                                                <div className="card-body my-3" className="staff_list">
                                                    {this.state.staff_list.length>0 ? 
                                                        <div>
                                                            {this.state.staff_list.map((data,index) => {
                                                                return (
                                                                    <div className="row px-3 mb-3" key={"key"+index}>
                                                                        <div className="col-sm-3 card-img align-items-center" data-toggle="modal" data-target="#infouser" onClick={()=>{this._infoUser(data)}}>
                                                                            <img src={TEMPLATES_ASSETS+"images/info.png"} className="infoUser" alt="" />
                                                                            <img src={data.staff_avatar_url} className="img-fluid rounded-circle" alt="" />
                                                                        </div>
                                                                        <div className="col-sm-9 card-content" style={{paddingLeft:0}}>
                                                                            <div className="row" style={{width:"100%"}}>
                                                                                <div style={{color:"#000"}} className="col-sm-7">
                                                                                    <p className="font-weight-bold m-0">{data.staff_firstname} {data.staff_lastname}</p>
                                                                                </div>
                                                                                <div className="col-sm-5" style={{padding: 0}}>
                                                                                    <button className="btn-custom mb-3" onClick={()=>{this._onEditPerson('staff',data.staff_id_unique)}}>Edit</button>
                                                                                    <button className="btn-custom" style={{backgroundColor:'#f00', color:'#FFF'}} onClick={()=>{this._changeStatusUser(data.is_active,data.id)}}>{data.is_active=="yes"?"Active":"Blocked"}</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div> 
                                                    :
                                                        <div style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            display: 'flex',
                                                            color: '#1f79be',
                                                        }}>No Data was Found</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-5 usersList">
                                            <div className="card-header custom" style={{marginLeft:'auto', marginRight:'auto'}}> Driver </div>
                                            <div className="card" style={{overflowX: 'hidden',alignItems:'center',justifyContent:'center'}}>
                                                <div className="card-body my-3" className="driver_list">
                                                    {this.state.driver_list.length>0 ? 
                                                        <div>
                                                            {this.state.driver_list.map((data,index) => {
                                                                return (
                                                                    <div className="row px-3 mb-3" key={"key"+index}>
                                                                        <div className="col-sm-3 card-img align-items-center" data-toggle="modal" data-target="#infouser" onClick={()=>{this._infoUser(data)}}>
                                                                            <img src={TEMPLATES_ASSETS+"images/info.png"} className="infoUser" alt="" />
                                                                            <img src={data.driver_avatar_url} className="img-fluid rounded-circle" alt="" />
                                                                        </div>
                                                                        <div className="col-sm-9 card-content" style={{paddingLeft:0}}>
                                                                            <div className="row" style={{width:"100%"}}>
                                                                                <div style={{color:"#000"}} className="col-sm-7">
                                                                                    <p className="font-weight-bold m-0">{data.driver_firstname} {data.driver_lastname}</p>
                                                                                </div>
                                                                                <div className="col-sm-5" style={{padding: 0}}>
                                                                                    <button className="btn-custom mb-3" onClick={()=>{this._onEditPerson('driver',data.driver_id_unique)}}>Edit</button>
                                                                                    <button className="btn-custom" style={{backgroundColor:'#f00', color:'#FFF'}} onClick={()=>{this._changeStatusUser(data.is_active,data.id)}}>{data.is_active=="yes"?"Active":"Blocked"}</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div> 
                                                    :
                                                        <div style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            display: 'flex',
                                                            color: '#1f79be',
                                                        }}>No Data was Found</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overlay-blue"></div>
                                <div className="allaccount-gmap">
                                    <Fragment>
                                        <this.CMap
                                            googleMapURL={this.props.googleMapURL}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{ height: this.state.dashboardHeight+'px' }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                        >
                                        </this.CMap>
                                    </Fragment>
                                </div>
                            </div>
                        }
                        {this.state.activePage=="formAccount" &&
                            <div>
                                <div className="welcome-account">
                                    <ul className="nav nav-tabs tab-nav-newaccount">
                                        <li className="nav-item" onClick={()=>{this._resetTabOnClick('Director');}}>
                                            <a href="#dir-form" data-toggle="tab" aria-expanded="true" className="nav-link active directTo-director-form">
                                                Director
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>{this._resetTabOnClick('Staff');}}>
                                            <a href="#staff-form" data-toggle="tab" aria-expanded="false" className="nav-link directTo-staff-form">
                                                Staff
                                            </a>
                                        </li>
                                        <li className="nav-item" onClick={()=>{this._resetTabOnClick('Driver');}}>
                                            <a href="#driver-form" data-toggle="tab" aria-expanded="false" className="nav-link directTo-driver-form">
                                                Driver
                                            </a>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane show active" style={{height:(parseInt(this.state.dashboardHeight)-150)+'px'}} id="dir-form">
                                            <div style={{paddingTop:20,paddingBottom:20,}}>
                                                <center><h2>Form Director</h2></center>
                                                <div className="tabData">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="formWrapper">
                                                            <div className="formTitle">First Name</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({director_firstname_form:event.target.value});}} value={this.state.director_firstname_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Last Name</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({director_lastname_form:event.target.value});}} value={this.state.director_lastname_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Gender</div>
                                                            <select className="form-control formInput formReadonly" disabled={this.state.readOnlyForm} value={this.state.director_gender_form || ""} onChange={(event)=>{this.setState({director_gender_form:event.target.value});}}>
                                                                <option value="">Choose a Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Company Sub</div>
                                                            <input type="text" className="form-control formInput" readOnly="readonly" onChange={(event)=>{this.setState({director_company_form:event.target.value});}} value={this.state.director_company_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Division</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({director_division_form:event.target.value});}} value={this.state.director_division_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">ID Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({director_id_number_form:event.target.value});}} value={this.state.director_id_number_form || ""}></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="formWrapper" style={{borderBottom:0}}>
                                                            <div className="avatarWrapper">
                                                                <div className="avaCenter" onClick={()=>{ this._uploadAvatarOnAccount('director'); }}>
                                                                    <img className="avatarUploadIcon" src={TEMPLATES_ASSETS+"images/moda_assets/plusUpload.png"}></img>
                                                                    <img id="avatarUploadAccountPreview-director" src={this.state.director_avatar_file || "https://www.w3schools.com/howto/img_avatar.png"} width="100" height="100"></img>
                                                                </div>
                                                            </div>
                                                            <input type="file" id="avatarUploadAccount-director" onChange={(event)=>{this._onChangeAvatar('Director',event)}} className="form-control hidden" style={{display:'none'}}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Mobile Phone Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({director_mobilephone_form:event.target.value});}} value={this.state.director_mobilephone_form || ""}></input>
                                                        </div>
                                                        {
                                                            this.state.confirmationResult !=="" &&
                                                            <div className="formWrapper" style={{borderBottom:0}}>
                                                                <div className="formTitle">Enter OTP Mobile Phone Number for This User</div>
                                                                <input type="text" className="form-control formInput" onChange={(event)=>{this.setState({verificationCode:event.target.value});}} placeholder="OTP Number Here!"></input>
                                                                <button className="btn btn-success" onClick={()=>{this._confirmOTPUser("Director")}}>Enter OTP Confirmation</button>
                                                            </div>
                                                        }
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Email</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({director_email_form:event.target.value});}} value={this.state.director_email_form || ""}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{textAlign:'right'}}>
                                                    {
                                                    (this.state.confirmationResult =="" && this.state.is_edit=="no") &&
                                                    <button id="saveDirector" className="btn btn-info" onClick={()=>{this._saveForm('createUserDirector')}} style={{marginRight:10}}>Save</button>
                                                    } 
                                                    {
                                                    (this.state.confirmationResult =="" && this.state.is_edit=="yes") &&
                                                    <button id="saveDirector" className="btn btn-info" onClick={()=>{this._saveForm('updateUserDirector')}} style={{marginRight:10}}>Update Info</button>
                                                    } 
                                                    <a href={BASE_URL+"app/dashboard"} className="btn btn-danger">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" style={{height:(parseInt(this.state.dashboardHeight)-150)+'px'}} id="staff-form">
                                            <div style={{paddingTop:20,paddingBottom:20,}}>
                                                <center><h2>Form Staff</h2></center>
                                                <div className="tabData">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="formWrapper">
                                                            <div className="formTitle">First Name</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({staff_firstname_form:event.target.value});}} value={this.state.staff_firstname_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Last Name</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({staff_lastname_form:event.target.value});}} value={this.state.staff_lastname_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Gender</div>
                                                            <select className="form-control formInput formReadonly" disabled={this.state.readOnlyForm} value={this.state.staff_gender_form || ""} onChange={(event)=>{this.setState({staff_gender_form:event.target.value});}}>
                                                                <option value="">Choose a Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Company Sub</div>
                                                            <input type="text" className="form-control formInput" readOnly="readonly" onChange={(event)=>{this.setState({staff_company_form:event.target.value});}} value={this.state.staff_company_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Division</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({staff_division_form:event.target.value});}} value={this.state.staff_division_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">ID Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({staff_id_number_form:event.target.value});}} value={this.state.staff_id_number_form || ""}></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="formWrapper" style={{borderBottom:0}}>
                                                            <div className="avatarWrapper">
                                                                <div className="avaCenter" onClick={()=>{ this._uploadAvatarOnAccount('staff'); }}>
                                                                    <img className="avatarUploadIcon" src={TEMPLATES_ASSETS+"images/moda_assets/plusUpload.png"}></img>
                                                                    <img id="avatarUploadAccountPreview-staff" src={this.state.staff_avatar_file || "https://www.w3schools.com/howto/img_avatar.png"} width="100" height="100"></img>
                                                                </div>
                                                            </div>
                                                            <input type="file" id="avatarUploadAccount-staff" onChange={(event)=>{this._onChangeAvatar('Staff',event)}} className="form-control hidden" style={{display:'none'}}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Director</div>
                                                            <select className="form-control formInput formReadonly account-directors" disabled={this.state.readOnlyForm || this.state.readOnlyImportantForm} value={this.state.staff_directorCode_form || ""} onChange={(event)=>{this.setState({staff_directorCode_form:event.target.value});}}>
                                                                <option value="">Choose a Director</option>
                                                            </select>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Mobile Phone Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({staff_mobilephone_form:event.target.value});}} value={this.state.staff_mobilephone_form || ""}></input>
                                                        </div>
                                                        {
                                                            this.state.confirmationResult !=="" &&
                                                            <div className="formWrapper" style={{borderBottom:0}}>
                                                                <div className="formTitle">Enter OTP Mobile Phone Number for This User</div>
                                                                <input type="text" className="form-control formInput" onChange={(event)=>{this.setState({verificationCode:event.target.value});}} placeholder="OTP Number Here!"></input>
                                                                <button className="btn btn-success" onClick={()=>{this._confirmOTPUser("Staff")}}>Enter OTP Confirmation</button>
                                                            </div>
                                                        }
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Email</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({staff_email_form:event.target.value});}} value={this.state.staff_email_form || ""}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{textAlign:'right'}}>
                                                    {
                                                    (this.state.confirmationResult =="" && this.state.is_edit=="no") &&
                                                    <button id="saveStaff" className="btn btn-info" onClick={()=>{this._saveForm('createUserStaff')}} style={{marginRight:10}}>Save</button>
                                                    }  
                                                    {
                                                    (this.state.confirmationResult =="" && this.state.is_edit=="yes") &&
                                                    <button id="saveStaff" className="btn btn-info" onClick={()=>{this._saveForm('updateUserStaff')}} style={{marginRight:10}}>Update Info</button>
                                                    } 
                                                    <a href={BASE_URL+"app/dashboard"} className="btn btn-danger">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" style={{height:(parseInt(this.state.dashboardHeight)-150)+'px'}} id="driver-form">
                                            <div style={{paddingTop:20,paddingBottom:20,}}>
                                                <center><h2>Form Driver</h2></center>
                                                <div className="tabData">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="formWrapper">
                                                            <div className="formTitle">First Name</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({driver_firstname_form:event.target.value});}} value={this.state.driver_firstname_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Last Name</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm} onChange={(event)=>{this.setState({driver_lastname_form:event.target.value});}} value={this.state.driver_lastname_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Gender</div>
                                                            <select className="form-control formInput formReadonly" disabled={this.state.readOnlyForm} value={this.state.driver_gender_form || ""} onChange={(event)=>{this.setState({driver_gender_form:event.target.value});}}>
                                                                <option value="">Choose a Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Company Sub</div>
                                                            <input type="text" className="form-control formInput" disabled={this.state.readOnlyForm} onChange={(event)=>{this.setState({driver_company_form:event.target.value});}} value={this.state.driver_company_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">ID Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({driver_id_number_form:event.target.value});}} value={this.state.driver_id_number_form || ""}></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="formWrapper" style={{borderBottom:0}}>
                                                            <div className="avatarWrapper">
                                                                <div className="avaCenter" onClick={()=>{ this._uploadAvatarOnAccount('driver'); }}>
                                                                    <img className="avatarUploadIcon" src={TEMPLATES_ASSETS+"images/moda_assets/plusUpload.png"}></img>
                                                                    <img id="avatarUploadAccountPreview-driver" src={this.state.driver_avatar_file || "https://www.shareicon.net/data/512x512/2016/04/10/747353_people_512x512.png"} width="100" height="100"></img>
                                                                </div>
                                                            </div>
                                                            <input type="file" id="avatarUploadAccount-driver" onChange={(event)=>{this._onChangeAvatar('Driver',event)}} className="form-control hidden" style={{display:'none'}}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Mobile Phone Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({driver_mobilephone_form:event.target.value});}} value={this.state.driver_mobilephone_form || ""}></input>
                                                        </div>
                                                        {
                                                            this.state.confirmationResult !=="" &&
                                                            <div className="formWrapper" style={{borderBottom:0}}>
                                                                <div className="formTitle">Enter OTP Mobile Phone Number for This User</div>
                                                                <input type="text" className="form-control formInput" onChange={(event)=>{this.setState({verificationCode:event.target.value});}} placeholder="OTP Number Here!"></input>
                                                                <button className="btn btn-success" onClick={()=>{this._confirmOTPUser("Driver")}}>Enter OTP Confirmation</button>
                                                            </div>
                                                        }
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Email</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm || this.state.readOnlyImportantForm} onChange={(event)=>{this.setState({driver_email_form:event.target.value});}} value={this.state.driver_email_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Vehicle Type</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm } onChange={(event)=>{this.setState({driver_vehicle_type_form:event.target.value});}} value={this.state.driver_vehicle_type_form || ""}></input>
                                                        </div>
                                                        <div className="formWrapper">
                                                            <div className="formTitle">Vehicle Number</div>
                                                            <input type="text" className="form-control formInput formReadonly" readOnly={this.state.readOnlyForm } onChange={(event)=>{this.setState({driver_vehicle_number_form:event.target.value});}} value={this.state.driver_vehicle_number_form || ""}></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12" style={{textAlign:'right'}}>
                                                    {
                                                    (this.state.confirmationResult =="" && this.state.is_edit=="no") &&
                                                    <button id="saveDriver" className="btn btn-info" onClick={()=>{this._saveForm('createUserDriver')}} style={{marginRight:10}}>Save</button>
                                                    }  
                                                    {
                                                    (this.state.confirmationResult =="" && this.state.is_edit=="yes") &&
                                                    <button id="saveDriver" className="btn btn-info" onClick={()=>{this._saveForm('updateUserDriver')}} style={{marginRight:10}}>Update Info</button>
                                                    } 
                                                    <a href={BASE_URL+"app/dashboard"} className="btn btn-danger">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overlay-blue"></div>
                                <div className="newaccount-gmap">
                                    <Fragment>
                                        <this.CMap
                                            googleMapURL={this.props.googleMapURL}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{ height: this.state.dashboardHeight+'px' }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                        >
                                        </this.CMap>
                                    </Fragment>
                                </div>
                            </div>
                        }
                        {this.state.activePage=="inbox-director" &&
                            <div className="container-fluid" style={{padding:0,overflowY:'hidden'}}>
                                    <div className="col-md-3" style={{paddingLeft:0,paddingRight:0}}>
                                        <div className="bg-blue dashboard-right-part">
                                            <div className="scrollable position-relative" style={{height: 'calc(100vh - 68px)',overflow:'auto'}}>
                                                <p style={{padding:10+"px"}}>
                                                    <div>
                                                        <div className="col-md-12 mb-5 transactionList">
                                                            <div className="card-header custom" style={{marginLeft:'auto', marginRight:'auto'}}> What's New ? </div>
                                                            <div className="card" style={{overflow:'hidden'}}>
                                                                
                                                                    <div className="card-body" className="transaction_directors_list" style={{overflow:'auto'}}>
                                                                        {this.state.director_trip_list.filter(function(data,index){return data.user_requesting_role=="VIP_User";}).length > 0 ?
                                                                            <div>
                                                                                {this.state.director_trip_list.filter(function(data,index){return data.user_requesting_role=="VIP_User";}).map((data,index)=>{
                                                                                    return (
                                                                                        <div key={"key"+index} onClick={()=>{
                                                                                            $(".preloader").fadeIn(1000);
                                                                                            this.setState({dataInbox:[data]});
                                                                                            setTimeout(()=>{
                                                                                                firestoreDB.collection("detail_users").where("role", "==", "Driver_User")
                                                                                                .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                                                                                                    snapshot.docChanges().forEach(function(change) {
                                                                                                        if (change.type === "added") {
                                                                                                            $(".account-drivers").append("<option value='"+change.doc.data().driver_id_unique+","+change.doc.data().driver_avatar_url+","+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+","+change.doc.data().driver_mobilephone+","+change.doc.data().driver_vehicle_type+","+change.doc.data().driver_vehicle_number+"'>"+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+" ("+change.doc.data().driver_company+")"+"</option>");
                                                                                                        }
                                                                                                        $(".account-drivers option[value='"+change.doc.data().driver_id_unique+","+change.doc.data().driver_avatar_url+","+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+","+change.doc.data().driver_mobilephone+","+change.doc.data().driver_vehicle_type+","+change.doc.data().driver_vehicle_number+"']").remove();
                                                                                                        $(".account-drivers").append("<option value='"+change.doc.data().driver_id_unique+","+change.doc.data().driver_avatar_url+","+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+","+change.doc.data().driver_mobilephone+","+change.doc.data().driver_vehicle_type+","+change.doc.data().driver_vehicle_number+"'>"+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+" ("+change.doc.data().driver_company+")"+"</option>");
                                                                                                    });
                                                                                                });
                                                                                                var valueDropdownDriver=this.state.dataInbox[0].driver_id !== "" ? this.state.dataInbox[0].driver_id+","+this.state.dataInbox[0].driver_avatar+","+this.state.dataInbox[0].driver_name+","+this.state.dataInbox[0].driver_mobilephone+","+this.state.dataInbox[0].driver_vehicle_type+","+this.state.dataInbox[0].driver_vehicle_number:"";
                                                                                                console.log(valueDropdownDriver);
                                                                                                setTimeout(()=>{this.setState({form_spk_fppkd_driver_id:valueDropdownDriver})},1000)
                                                                                                $(".preloader").fadeOut(2000);
                                                                                            },2000);
                                                                                        }}> 
                                                                                            <div className="left-menu-content active d-flex justify-content-between" style={{flexDirection: 'column'}}>
                                                                                                <div className="py-2">
                                                                                                    <p>{data.type_request=="OWT" ? "One Way Trip" : data.type_request=="ONT" ? "Overnight Trip": data.type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</p>
                                                                                                    <p>{data.user_requesting_id}</p>
                                                                                                    <p>{data.status_no_request} No.{data.no_request}</p>
                                                                                                </div>
                                                                                                <div className="d-flex align-items-end">
                                                                                                    <span className="transactionListsText">{moment(data.created_at, "YYYY-MM-DD HH:mm").format("DD MMMM YYYY HH:mm")}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                            :
                                                                            <div style={{
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                display: 'flex',
                                                                                color: '#1f79be',
                                                                                position:'absolute',
                                                                                height:'100%',
                                                                                width:'100%'
                                                                            }}>No Data was Found</div>
                                                                        }
                                                                    </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9" style={{padding:0}}>
                                        <div className="row panel-wrapper">
                                            {console.log(this.state.dataInbox),
                                                this.state.dataInbox.length > 0 &&
                                                <div className="col-lg-10 generalList">
                                                    <div className="card" style={{overflow: 'hidden'}}>
                                                        <div className="card-body" style={{overflowX: 'hidden'}}>
                                                            <div >
                                                                <div className="mb-4">
                                                                    <div className="header-title">
                                                                        <p>{moment(this.state.dataInbox[0].created_at, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</p>
                                                                    </div>
                                                                    <div className="d-lg-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <img src={TEMPLATES_ASSETS+"images/company-logo.png"} className="img-fluid mb-4 mt-2" width="40%" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            {this.state.dataInbox[0].status_no_request=="SPK" &&
                                                                                <button className="btn btn-primary" onClick={()=>{
                                                                                    $('.preloader').fadeIn(1000);
                                                                                    firestoreDB.collection("request_trips").doc(this.state.dataInbox[0].id).update({
                                                                                        status_no_request:"FPPKD"
                                                                                    })
                                                                                    .then((docRef)=>{
                                                                                        $(".preloader").fadeOut(2000);
                                                                                        Swal.fire({
                                                                                            type: 'success',
                                                                                            title: 'FPPKD Status!',
                                                                                            text: 'Status FPPKD was Updated !'
                                                                                        });
                                                                                        this.setState({dataInbox:[], form_spk_fppkd_driver_id:''});
                                                                                    });
                                                                                }}><i className="fas fa-file-alt"></i> Create FPPKD</button>
                                                                            }
                                                                            {this.state.dataInbox[0].status_no_request=="FPPKD" &&
                                                                                <button className="btn btn-success" onClick={()=>{
                                                                                    
                                                                                    if(this.state.form_spk_fppkd_driver_id!==""){
                                                                                        $('.preloader').fadeIn(1000);
                                                                                        var splitDriver=(this.state.form_spk_fppkd_driver_id).split(",");
                                                                                        firestoreDB.collection("request_trips").doc(this.state.dataInbox[0].id).update({
                                                                                            status_no_request:"PPKD",
                                                                                            driver_id:splitDriver[0],
                                                                                            driver_avatar:splitDriver[1],
                                                                                            driver_name:splitDriver[2],
                                                                                            driver_mobilephone:splitDriver[3],
                                                                                            driver_vehicle_type:splitDriver[4],
                                                                                            driver_vehicle_number:splitDriver[5],
                                                                                        })
                                                                                        .then((docRef)=>{
                                                                                            $(".preloader").fadeOut(2000);
                                                                                            Swal.fire({
                                                                                                type: 'success',
                                                                                                title: 'PPKD Status!',
                                                                                                text: 'Status PPKD was Updated !'
                                                                                            });
                                                                                            this.setState({dataInbox:[], form_spk_fppkd_driver_id:''});
                                                                                        });
                                                                                    }else{
                                                                                            Swal.fire({
                                                                                                type: 'error',
                                                                                                title: 'Driver is Empty!',
                                                                                                text: 'Choosing a Driver is a Must!'
                                                                                            });
                                                                                    }
                                                                                }}><i className="fas fa-file-alt"></i> Create PPKD</button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="border-form">
                                                                            <h5>{this.state.dataInbox[0].type_request=="OWT" ? "One Way Trip" : this.state.dataInbox[0].type_request=="ONT" ? "Overnight Trip": this.state.dataInbox[0].type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</h5>
                                                                            <h5 className="font-weight-bold">{this.state.dataInbox[0].status_no_request} NO. {this.state.dataInbox[0].no_request}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-lg-8 col-12">
                                                                            <label for="passengger_name">Passenger Name</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="mobile_number">Mobile Number</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_mobilephone}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <label for="passengger_id">Passenger ID</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_id}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-8">
                                                                            <label for="duty_purpose">Duty Purpose</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].purpose}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="duty_status">Duty Status</label>
                                                                            <div className="form-no-input mb-2" style={{background:"#000",color:'#FFF',fontSize:12,fontWeight:'bold'}}>
                                                                                {this.state.dataInbox[0].type_request=="OWT" ? "One Way Trip" : this.state.dataInbox[0].type_request=="ONT" ? "Overnight Trip": this.state.dataInbox[0].type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}
                                                                            </div>
                                                                            <div className="mini-checkbox d-flex align-items-center">
                                                                                <input type="checkbox" aria-label="Checkbox for following text input" readonly={true} checked={this.state.dataInbox[0].return_at_pickup_location=="Yes" ? true : false}/>
                                                                                <span className="px-2">Return at Pickup Location</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="duty_date">Duty Date</label>
                                                                            <div className="form-no-input">
                                                                                {moment(this.state.dataInbox[0].date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="to">to</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].date_return !== undefined? moment(this.state.dataInbox[0].date_return, "YYYY-MM-DD").format("dddd, DD MMMM YYYY") : moment(this.state.dataInbox[0].date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                            </div>
                                                                        </div>
                                    
                                                                        <div className="col-lg-6">
                                                                            <label for="pickup_time">Pickup Time</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].time_pickup}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="return_time">Return Time</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].time_return!==undefined?this.state.dataInbox[0].time_return:"--:--"}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-9">
                                                                            <label for="pickup_location">Pickup Location</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].pickup_location_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <label for="passenger">Passenger</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].amount_passenger}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <label for="destinatiom">Destination</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].destination_location_name}
                                                                            </div>
                                                                        </div>
                                                                        {this.state.dataInbox[0].status_no_request=="FPPKD" &&
                                                                        <div className="col-lg-12">
                                                                            <label for="driver_request">Drivers that will Duty</label>
                                                                            <div className="form-no-input">
                                                                                <select className="form-control formReadonly account-drivers" style={{border:'none'}} disabled={this.state.readOnlyForm || this.state.readOnlyImportantForm} value={this.state.form_spk_fppkd_driver_id || ""} onChange={(event)=>{this.setState({form_spk_fppkd_driver_id:event.target.value});}}>
                                                                                    <option value="">Choose a Driver for This Request !</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="overlay-blue"></div>
                                        <div className="inbox-gmap">
                                            <Fragment>
                                                <this.CMap
                                                    googleMapURL={this.props.googleMapURL}
                                                    loadingElement={<div style={{ height: `100%` }} />}
                                                    containerElement={<div style={{ height: this.state.dashboardHeight+'px' }} />}
                                                    mapElement={<div style={{ height: `100%` }} />}
                                                >
                                                </this.CMap>
                                            </Fragment>
                                        </div>
                                    </div>
                            </div>
                        }

                        {this.state.activePage=="inbox-staff" &&
                            <div className="container-fluid" style={{padding:0,overflowY:'hidden'}}>
                                    <div className="col-md-3" style={{paddingLeft:0,paddingRight:0}}>
                                        <div className="bg-blue dashboard-right-part">
                                            <div className="scrollable position-relative" style={{height: 'calc(100vh - 68px)',overflow:'auto'}}>
                                                <p style={{padding:10+"px"}}>
                                                    <div>
                                                        <div className="col-md-12 mb-5 transactionList">
                                                            <div className="card-header custom" style={{marginLeft:'auto', marginRight:'auto'}}> What's New ? </div>
                                                            <div className="card" style={{overflow:'hidden'}}>
                                                                {this.state.staff_trip_list.filter(function(data,index){return data.user_requesting_role=="NonVIP_User";}).length > 0 ?
                                                                <div>
                                                                    <div className="card-body" className="transaction_staff_list" style={{overflow:'auto'}}>
                                                                        {this.state.staff_trip_list.map((data,index)=>{
                                                                            return (
                                                                                <div key={"key"+index} onClick={()=>{
                                                                                    $(".preloader").fadeIn(1000);
                                                                                    this.setState({dataInbox:[data]});
                                                                                    setTimeout(()=>{
                                                                                        firestoreDB.collection("detail_users").where("role", "==", "Driver_User")
                                                                                        .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
                                                                                            snapshot.docChanges().forEach(function(change) {
                                                                                                if (change.type === "added") {
                                                                                                    $(".account-drivers").append("<option value='"+change.doc.data().driver_id_unique+","+change.doc.data().driver_avatar_url+","+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+","+change.doc.data().driver_mobilephone+","+change.doc.data().driver_vehicle_type+","+change.doc.data().driver_vehicle_number+"'>"+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+" ("+change.doc.data().driver_company+")"+"</option>");
                                                                                                }
                                                                                                $(".account-drivers option[value='"+change.doc.data().driver_id_unique+","+change.doc.data().driver_avatar_url+","+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+","+change.doc.data().driver_mobilephone+","+change.doc.data().driver_vehicle_type+","+change.doc.data().driver_vehicle_number+"']").remove();
                                                                                                $(".account-drivers").append("<option value='"+change.doc.data().driver_id_unique+","+change.doc.data().driver_avatar_url+","+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+","+change.doc.data().driver_mobilephone+","+change.doc.data().driver_vehicle_type+","+change.doc.data().driver_vehicle_number+"'>"+change.doc.data().driver_firstname+" "+change.doc.data().driver_lastname+" ("+change.doc.data().driver_company+")"+"</option>");
                                                                                            });
                                                                                        });
                                                                                        var valueDropdownDriver=this.state.dataInbox[0].driver_id !== "" ? this.state.dataInbox[0].driver_id+","+this.state.dataInbox[0].driver_avatar+","+this.state.dataInbox[0].driver_name+","+this.state.dataInbox[0].driver_mobilephone+","+this.state.dataInbox[0].driver_vehicle_type+","+this.state.dataInbox[0].driver_vehicle_number:"";
                                                                                        console.log(valueDropdownDriver);
                                                                                        setTimeout(()=>{this.setState({form_spk_fppkd_driver_id:valueDropdownDriver})},1000)
                                                                                        $(".preloader").fadeOut(2000);
                                                                                    },2000);
                                                                                }}> 
                                                                                    <div className="left-menu-content active d-flex justify-content-between" style={{flexDirection: 'column'}}>
                                                                                        <div className="py-2">
                                                                                            <p>{data.type_request=="OWT" ? "One Way Trip" : data.type_request=="ONT" ? "Overnight Trip": data.type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</p>
                                                                                            <p>{data.user_requesting_id}</p>
                                                                                            <p>{data.status_no_request} No.{data.no_request}</p>
                                                                                        </div>
                                                                                        <div className="d-flex align-items-end">
                                                                                            <span className="transactionListsText">{moment(data.created_at, "YYYY-MM-DD HH:mm").format("DD MMMM YYYY HH:mm")}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        
                                                                        })}
                                                                    </div>
                                                                    </div>
                                                                    :
                                                                    <div style={{
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        display: 'flex',
                                                                        color: '#1f79be',
                                                                        position:'absolute',
                                                                        height:'100%',
                                                                        width:'100%'
                                                                    }}>No Data was Found</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9" style={{padding:0}}>
                                        <div className="row panel-wrapper">
                                            {console.log(this.state.dataInbox),
                                                this.state.dataInbox.length > 0 &&
                                                <div className="col-lg-10 generalList">
                                                    <div className="card" style={{overflow: 'hidden'}}>
                                                        <div className="card-body" style={{overflowX: 'hidden'}}>
                                                            <div >
                                                                <div className="mb-4">
                                                                    <div className="header-title">
                                                                        <p>{moment(this.state.dataInbox[0].created_at, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</p>
                                                                    </div>
                                                                    <div className="d-lg-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <img src={TEMPLATES_ASSETS+"images/company-logo.png"} className="img-fluid mb-4 mt-2" width="40%" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            {(this.state.dataInbox[0].status_no_request=="SPK" && this.state.dataInbox[0].status_trip=="Waiting Approval") &&
                                                                                <button className="btn btn-primary" ><i className="fas fa-clock"></i> Waiting Approval </button>
                                                                            }
                                                                            {(this.state.dataInbox[0].status_no_request=="SPK" && this.state.dataInbox[0].status_trip=="Approval") &&
                                                                                <button className="btn btn-primary" onClick={()=>{
                                                                                    $('.preloader').fadeIn(1000);
                                                                                    firestoreDB.collection("request_trips").doc(this.state.dataInbox[0].id).update({
                                                                                        status_no_request:"FPPKD"
                                                                                    })
                                                                                    .then((docRef)=>{
                                                                                        $(".preloader").fadeOut(2000);
                                                                                        Swal.fire({
                                                                                            type: 'success',
                                                                                            title: 'FPPKD Status!',
                                                                                            text: 'Status FPPKD was Updated !'
                                                                                        });
                                                                                        this.setState({dataInbox:[], form_spk_fppkd_driver_id:''});
                                                                                    });
                                                                                }}><i className="fas fa-file-alt"></i> Create FPPKD</button>
                                                                            }
                                                                            {(this.state.dataInbox[0].status_no_request=="FPPKD" && this.state.dataInbox[0].status_trip=="Approval") &&
                                                                                <button className="btn btn-success" onClick={()=>{
                                                                                    
                                                                                    if(this.state.form_spk_fppkd_driver_id!==""){
                                                                                        $('.preloader').fadeIn(1000);
                                                                                        var splitDriver=(this.state.form_spk_fppkd_driver_id).split(",");
                                                                                        firestoreDB.collection("request_trips").doc(this.state.dataInbox[0].id).update({
                                                                                            status_no_request:"PPKD",
                                                                                            driver_id:splitDriver[0],
                                                                                            driver_avatar:splitDriver[1],
                                                                                            driver_name:splitDriver[2],
                                                                                            driver_mobilephone:splitDriver[3],
                                                                                            driver_vehicle_type:splitDriver[4],
                                                                                            driver_vehicle_number:splitDriver[5],
                                                                                        })
                                                                                        .then((docRef)=>{
                                                                                            $(".preloader").fadeOut(2000);
                                                                                            Swal.fire({
                                                                                                type: 'success',
                                                                                                title: 'PPKD Status!',
                                                                                                text: 'Status PPKD was Updated !'
                                                                                            });
                                                                                            this.setState({dataInbox:[], form_spk_fppkd_driver_id:''});
                                                                                        });
                                                                                    }else{
                                                                                            Swal.fire({
                                                                                                type: 'error',
                                                                                                title: 'Driver is Empty!',
                                                                                                text: 'Choosing a Driver is a Must!'
                                                                                            });
                                                                                    }
                                                                                }}><i className="fas fa-file-alt"></i> Create PPKD</button>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="border-form">
                                                                            <h5>{this.state.dataInbox[0].type_request=="OWT" ? "One Way Trip" : this.state.dataInbox[0].type_request=="ONT" ? "Overnight Trip": this.state.dataInbox[0].type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</h5>
                                                                            <h5 className="font-weight-bold">{this.state.dataInbox[0].status_no_request} NO. {this.state.dataInbox[0].no_request}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-lg-8 col-12">
                                                                            <label for="passengger_name">Passenger Name</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="mobile_number">Mobile Number</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_mobilephone}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <label for="passengger_id">Passenger ID</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_id}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-8">
                                                                            <label for="duty_purpose">Duty Purpose</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].purpose}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="duty_status">Duty Status</label>
                                                                            <div className="form-no-input mb-2" style={{background:"#000",color:'#FFF',fontSize:12,fontWeight:'bold'}}>
                                                                                {this.state.dataInbox[0].type_request=="OWT" ? "One Way Trip" : this.state.dataInbox[0].type_request=="ONT" ? "Overnight Trip": this.state.dataInbox[0].type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}
                                                                            </div>
                                                                            <div className="mini-checkbox d-flex align-items-center">
                                                                                <input type="checkbox" aria-label="Checkbox for following text input" readonly={true} checked={this.state.dataInbox[0].return_at_pickup_location=="Yes" ? true : false}/>
                                                                                <span className="px-2">Return at Pickup Location</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="duty_date">Duty Date</label>
                                                                            <div className="form-no-input">
                                                                                {moment(this.state.dataInbox[0].date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="to">to</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].date_return !== undefined? moment(this.state.dataInbox[0].date_return, "YYYY-MM-DD").format("dddd, DD MMMM YYYY") : moment(this.state.dataInbox[0].date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                            </div>
                                                                        </div>
                                    
                                                                        <div className="col-lg-6">
                                                                            <label for="pickup_time">Pickup Time</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].time_pickup}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="return_time">Return Time</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].time_return!==undefined?this.state.dataInbox[0].time_return:"--:--"}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-9">
                                                                            <label for="pickup_location">Pickup Location</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].pickup_location_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <label for="passenger">Passenger</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].amount_passenger}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <label for="destinatiom">Destination</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].destination_location_name}
                                                                            </div>
                                                                        </div>
                                                                        {this.state.dataInbox[0].status_no_request=="FPPKD" &&
                                                                        <div className="col-lg-12">
                                                                            <label for="driver_request">Drivers that will Duty</label>
                                                                            <div className="form-no-input">
                                                                                <select className="form-control formReadonly account-drivers" style={{border:'none'}} disabled={this.state.readOnlyForm || this.state.readOnlyImportantForm} value={this.state.form_spk_fppkd_driver_id || ""} onChange={(event)=>{this.setState({form_spk_fppkd_driver_id:event.target.value});}}>
                                                                                    <option value="">Choose a Driver for This Request !</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="overlay-blue"></div>
                                        <div className="inbox-gmap">
                                            <Fragment>
                                                <this.CMap
                                                    googleMapURL={this.props.googleMapURL}
                                                    loadingElement={<div style={{ height: `100%` }} />}
                                                    containerElement={<div style={{ height: this.state.dashboardHeight+'px' }} />}
                                                    mapElement={<div style={{ height: `100%` }} />}
                                                >
                                                </this.CMap>
                                            </Fragment>
                                        </div>
                                    </div>
                            </div>
                        }

                        {this.state.activePage=="inbox-driver" &&
                            <div className="container-fluid" style={{padding:0,overflowY:'hidden'}}>
                                    <div className="col-md-3" style={{paddingLeft:0,paddingRight:0}}>
                                        <div className="bg-blue dashboard-right-part">
                                            <div className="scrollable position-relative" style={{height: 'calc(100vh - 68px)',overflow:'auto'}}>
                                                <p style={{padding:10+"px"}}>
                                                    <div>
                                                        <div className="col-md-12 mb-5 transactionList">
                                                            <div className="card-header custom" style={{marginLeft:'auto', marginRight:'auto'}}> What's New ? </div>
                                                            <div className="card" style={{overflow:'hidden'}}>
                                                                
                                                                    <div className="card-body" className="transaction_driver_list" style={{overflow:'auto'}}>
                                                                    {this.state.driver_trip_list.filter(function(data,index){return data.user_requesting_role=="NonVIP_User" && data.status_no_request=="PPKD" || data.user_requesting_role=="VIP_User" && data.status_no_request=="PPKD" || data.user_requesting_role=="NonVIP_User" && data.status_no_request=="PPKD-CONFIRMED" || data.user_requesting_role=="VIP_User" && data.status_no_request=="PPKD-CONFIRMED"}).length > 0 ?
                                                                        <div>
                                                                        {this.state.driver_trip_list.map((data,index)=>{
                                                                            return (
                                                                                <div key={"key"+index} onClick={()=>{
                                                                                    $(".preloader").fadeIn(1000);
                                                                                    this.setState({dataInbox:[data]});
                                                                                    setTimeout(()=>{
                                                                                        $(".preloader").fadeOut(2000);
                                                                                    },2000);
                                                                                }}> 
                                                                                    <div className="left-menu-content active d-flex justify-content-between" style={{flexDirection: 'column'}}>
                                                                                        <div className="py-2">
                                                                                            <p>{data.type_request=="OWT" ? "One Way Trip" : data.type_request=="ONT" ? "Overnight Trip": data.type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</p>
                                                                                            <p>{data.user_requesting_id}</p>
                                                                                            <p>{(data.status_no_request).split("-").length>1?"["+(data.status_no_request).split("-")[1]+"]":""} {(data.status_no_request).split("-")[0]} No.{data.no_request}</p>
                                                                                        </div>
                                                                                        <div className="d-flex align-items-end">
                                                                                            <span className="transactionListsText">{moment(data.created_at, "YYYY-MM-DD HH:mm").format("DD MMMM YYYY HH:mm")}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                        </div>
                                                                    :
                                                                        <div style={{
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            display: 'flex',
                                                                            color: '#1f79be',
                                                                            position:'absolute',
                                                                            height:'100%',
                                                                            width:'100%'
                                                                        }}>No Data was Found</div>
                                                                    }
                                                                    </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9" style={{padding:0}}>
                                        <div className="row panel-wrapper">
                                            {console.log(this.state.dataInbox),
                                                this.state.dataInbox.length > 0 &&
                                                <div className="col-lg-10 generalList">
                                                    <div className="card" style={{overflow: 'hidden'}}>
                                                        <div className="card-body" style={{overflowX: 'hidden'}}>
                                                            <div >
                                                                <div className="mb-4">
                                                                    <div className="header-title">
                                                                        <p>{moment(this.state.dataInbox[0].created_at, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</p>
                                                                    </div>
                                                                    <div className="d-lg-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <img src={TEMPLATES_ASSETS+"images/company-logo.png"} className="img-fluid mb-4 mt-2" width="40%" />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            {(this.state.dataInbox[0].status_no_request=="PPKD-CONFIRMED") &&
                                                                                <div>
                                                                                    <div>Status Trip:</div>
                                                                                    <button className="btn btn-primary" ><i className="fas fa-clock"></i> {this.state.dataInbox[0].status_trip} </button>
                                                                                </div>
                                                                            }
                                                                            {(this.state.dataInbox[0].status_no_request=="PPKD") &&
                                                                                <button className="btn btn-primary" onClick={()=>{
                                                                                    $('.preloader').fadeIn(1000);
                                                                                    firestoreDB.collection("request_trips").doc(this.state.dataInbox[0].id).update({
                                                                                        status_no_request:"PPKD-CONFIRMED"
                                                                                    })
                                                                                    .then((docRef)=>{
                                                                                        $(".preloader").fadeOut(2000);
                                                                                        Swal.fire({
                                                                                            type: 'success',
                                                                                            title: 'PPKD Status!',
                                                                                            text: 'Status PPKD was Changed to Confirmed !'
                                                                                        });
                                                                                        this.setState({dataInbox:[], form_spk_fppkd_driver_id:''});
                                                                                    });
                                                                                }}><i className="fas fa-file-alt"></i> Confirm & Schedule</button>
                                                                            }
                                                                            
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="border-form">
                                                                            <h5>{this.state.dataInbox[0].type_request=="OWT" ? "One Way Trip" : this.state.dataInbox[0].type_request=="ONT" ? "Overnight Trip": this.state.dataInbox[0].type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</h5>
                                                                            <h5 className="font-weight-bold">{(this.state.dataInbox[0].status_no_request).split("-").length>1?"["+(this.state.dataInbox[0].status_no_request).split("-")[1]+"]":""} {(this.state.dataInbox[0].status_no_request).split("-")[0]} NO. {this.state.dataInbox[0].no_request}</h5>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="row">
                                                                        <div className="col-lg-12 col-12 mb-3" style={{display:'flex',justifyContent:'center'}}>
                                                                            <h2>Driver Detail</h2>
                                                                        </div>
                                                                        <div className="col-lg-12 col-12 mb-2" style={{display:'flex',justifyContent:'center'}}>
                                                                            <img src={this.state.dataInbox[0].driver_avatar} style={{borderRadius:'50%',width:200}}/>
                                                                        </div>
                                                                        <div className="col-lg-12 col-12 mb-3" style={{display:'flex',justifyContent:'center'}}>
                                                                            <center><h3>{this.state.dataInbox[0].driver_id}</h3></center>
                                                                        </div>
                                                                        <div className="col-lg-8 col-12">
                                                                            <label for="passengger_name">Driver Name</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].driver_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="mobile_number">Contact Person</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].driver_mobilephone}
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-lg-8 col-12">
                                                                            <label for="passengger_name">Vehicle Type</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].driver_vehicle_type}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="mobile_number">Vehicle Number</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].driver_vehicle_number}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 col-12 mb-3 mt-3" style={{display:'flex',justifyContent:'center'}}>
                                                                            <h2>Order Detail</h2>
                                                                        </div>
                                                                        <div className="col-lg-8 col-12">
                                                                            <label for="passengger_name">Passenger Name</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="mobile_number">Mobile Number</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_mobilephone}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <label for="passengger_id">Passenger ID</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].user_requesting_id}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-8">
                                                                            <label for="duty_purpose">Duty Purpose</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].purpose}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <label for="duty_status">Duty Status</label>
                                                                            <div className="form-no-input mb-2" style={{background:"#000",color:'#FFF',fontSize:12,fontWeight:'bold'}}>
                                                                                {this.state.dataInbox[0].type_request=="OWT" ? "One Way Trip" : this.state.dataInbox[0].type_request=="ONT" ? "Overnight Trip": this.state.dataInbox[0].type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}
                                                                            </div>
                                                                            <div className="mini-checkbox d-flex align-items-center">
                                                                                <input type="checkbox" aria-label="Checkbox for following text input" readonly={true} checked={this.state.dataInbox[0].return_at_pickup_location=="Yes" ? true : false}/>
                                                                                <span className="px-2">Return at Pickup Location</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="duty_date">Duty Date</label>
                                                                            <div className="form-no-input">
                                                                                {moment(this.state.dataInbox[0].date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="to">to</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].date_return !== undefined? moment(this.state.dataInbox[0].date_return, "YYYY-MM-DD").format("dddd, DD MMMM YYYY") : moment(this.state.dataInbox[0].date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                            </div>
                                                                        </div>
                                    
                                                                        <div className="col-lg-6">
                                                                            <label for="pickup_time">Pickup Time</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].time_pickup}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <label for="return_time">Return Time</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].time_return!==undefined?this.state.dataInbox[0].time_return:"--:--"}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-9">
                                                                            <label for="pickup_location">Pickup Location</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].pickup_location_name}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3">
                                                                            <label for="passenger">Passenger</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].amount_passenger}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <label for="destinatiom">Destination</label>
                                                                            <div className="form-no-input">
                                                                                {this.state.dataInbox[0].destination_location_name}
                                                                            </div>
                                                                        </div>
                                                                        {this.state.dataInbox[0].status_no_request=="FPPKD" &&
                                                                        <div className="col-lg-12">
                                                                            <label for="driver_request">Drivers that will Duty</label>
                                                                            <div className="form-no-input">
                                                                                <select className="form-control formReadonly account-drivers" style={{border:'none'}} disabled={this.state.readOnlyForm || this.state.readOnlyImportantForm} value={this.state.form_spk_fppkd_driver_id || ""} onChange={(event)=>{this.setState({form_spk_fppkd_driver_id:event.target.value});}}>
                                                                                    <option value="">Choose a Driver for This Request !</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="overlay-blue"></div>
                                        <div className="inbox-gmap">
                                            <Fragment>
                                                <this.CMap
                                                    googleMapURL={this.props.googleMapURL}
                                                    loadingElement={<div style={{ height: `100%` }} />}
                                                    containerElement={<div style={{ height: this.state.dashboardHeight+'px' }} />}
                                                    mapElement={<div style={{ height: `100%` }} />}
                                                >
                                                </this.CMap>
                                            </Fragment>
                                        </div>
                                    </div>
                            </div>
                        }

                        {(this.state.activePage=="schedules" || this.state.activePage=="activity" || this.state.activePage=="history") &&
                            <div className="container-fluid">
                                <div className="mb-5" style={{width:'100%'}}>
                                        <div className="mb-3">
                                            {this.state.activePage=="schedules" ?
                                                <h4>Schedules Confirmed</h4> 
                                            :null} 
                                            {this.state.activePage=="activity" ?
                                                <h4>Order In Progress</h4> 
                                            :null}
                                            {this.state.activePage=="history" ?
                                                <h4>Order Complete</h4> 
                                            :null}
                                        </div>
                                        <div className="row" id="order_data_list">
                                        {this.state.confirmed_trip_list.length==0 ? 
                                            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',width: '100%'}}>
                                                <img src={TEMPLATES_ASSETS+"images/no_data.png"} className="img-fluid mb-4 mt-2" width="40%" />
                                            </div>
                                            :
                                            <div style={{width:'100%'}}>
                                                {this.state.confirmed_trip_list.map((data, index)=>{
                                                    return (
                                                        <div className="col-lg-4 mb-3" style={{height:210,float: 'left'}}>
                                                            <div key={"key"+index} className="col-lg-12 mb-3" style={{height:210,padding:0}}>
                                                                <div className="card">
                                                                    <div className="card-body schedule">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div>
                                                                                <div><h6 className="font-weight-bold m-0">{data.status_no_request}</h6></div>
                                                                                <div style={{fontSize:10}}>{moment(data.created_at, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</div>
                                                                            </div>
                                                                            <div>
                                                                                <button className="btn btn-sm btn-primary" data-toggle="modal" data-target={"#scrollable-modal-"+index}>View Detail</button>
                                                                            </div>
                                                                        </div>
                                                                        <hr/>
                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <div>PPKD ID</div>
                                                                                <div>
                                                                                    <a className="font-weight-bold" style={{fontSize:18}}>#{data.no_request}</a>
                                                                                    <br/>
                                                                                    <a className="" style={{fontSize:12}}>{data.user_requesting_id}</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {data.status_trip == "Cancel" ?
                                                                        <div className="absolute">
                                                                            <div className="d-flex justify-content-center" style={{height:'100%',alignItems:'center',color:'#FFF'}}>
                                                                                <h2 className="font-weight-bold"  style={{color:'#FFF'}}>CANCELED</h2>
                                                                            </div>
                                                                        </div>
                                                                        :null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {this.state.confirmed_trip_list.map((data, index)=>{
                                                    return (
                                                        <div key={"key"+index} className="modal fade" id={"scrollable-modal-"+index} tabIndex="-1" role="dialog" aria-labelledby="scrollableModalTitle" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-scrollable modal-full-width" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title" id="scrollableModalTitle">Detail Information #{data.no_request}</h5>
                                                                        <button type="button" className="close" data-dismiss="modal"
                                                                            aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body" style={{flexDirection:'row',display:'flex'}}>
                                                                        <div className="col-lg-8" style={{height:'100vh'}}>
                                                                            <div >
                                                                                <div className="mb-4">
                                                                                    <div className="header-title">
                                                                                        <p>{moment(data.created_at, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</p>
                                                                                    </div>
                                                                                    <div className="d-lg-flex justify-content-between align-items-center">
                                                                                        <div>
                                                                                            <img src={TEMPLATES_ASSETS+"images/company-logo.png"} className="img-fluid mb-4 mt-2" width="40%" />
                                                                                        </div>
                                                                                        <div className="mb-3">
                                                                                            {(data.status_no_request=="PPKD-CONFIRMED") &&
                                                                                                <div>
                                                                                                    <div>Status Trip:</div>
                                                                                                    <button className="btn btn-primary" ><i className="fas fa-clock"></i> {data.status_trip} </button>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        <div className="border-form">
                                                                                            <h5>{data.type_request=="OWT" ? "One Way Trip" : data.type_request=="ONT" ? "Overnight Trip": data.type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}</h5>
                                                                                            <h5 className="font-weight-bold">{(data.status_no_request).split("-").length>1?"["+(data.status_no_request).split("-")[1]+"]":""} {(data.status_no_request).split("-")[0]} NO. {data.no_request}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <div className="row">
                                                                                        <div className="col-lg-12 col-12 mb-3" style={{display:'flex',justifyContent:'center'}}>
                                                                                            <h2>Driver Detail</h2>
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12 mb-3" style={{display:'flex',justifyContent:'center'}}>
                                                                                            <img src={data.driver_avatar} style={{borderRadius:'50%',width:200}}/>
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12 mb-3" style={{display:'flex',justifyContent:'center'}}>
                                                                                            <center><h3>{data.driver_id}</h3></center>
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12 mb-3" style={{display:'flex',justifyContent:'center'}}>
                                                                                            <center>
                                                                                                {
                                                                                                    data.driver_rating_star_collection.map((rating,index)=>{
                                                                                                        return ( <img src={rating} width={30}/> )
                                                                                                    })
                                                                                                }
                                                                                            </center>
                                                                                        </div>
                                                                                        <div className="col-lg-8 col-12">
                                                                                            <label for="passengger_name">Driver Name</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.driver_name}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-4">
                                                                                            <label for="mobile_number">Contact Person</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.driver_mobilephone}
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="col-lg-8 col-12">
                                                                                            <label for="passengger_name">Vehicle Type</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.driver_vehicle_type}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-4">
                                                                                            <label for="mobile_number">Vehicle Number</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.driver_vehicle_number}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12 mb-3 mt-3" style={{display:'flex',justifyContent:'center'}}>
                                                                                            <h2>Order Detail</h2>
                                                                                        </div>
                                                                                        <div className="col-lg-12 col-12">
                                                                                            <iframe src={"https://www.google.com/maps/embed/v1/directions?key=AIzaSyBjoZcWALEFrYre7Rhyf-SUij4CHDZdLPc&origin="+data.pickup_location_coordinate+"&destination="+data.return_location_coordinate+"&avoid=tolls"} width={'100%'} height={450}></iframe>
                                                                                        </div>
                                                                                        <div className="col-lg-8 col-12">
                                                                                            <label for="passengger_name">Passenger Name</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.user_requesting_name}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-4">
                                                                                            <label for="mobile_number">Mobile Number</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.user_requesting_mobilephone}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-12">
                                                                                            <label for="passengger_id">Passenger ID</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.user_requesting_id}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-8">
                                                                                            <label for="duty_purpose">Duty Purpose</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.purpose}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-4">
                                                                                            <label for="duty_status">Duty Status</label>
                                                                                            <div className="form-no-input mb-2" style={{background:"#000",color:'#FFF',fontSize:12,fontWeight:'bold'}}>
                                                                                                {data.type_request=="OWT" ? "One Way Trip" : data.type_request=="ONT" ? "Overnight Trip": data.type_request=="PRT" ? "Pickup & Return Trip": "Unknown Trip"}
                                                                                            </div>
                                                                                            <div className="mini-checkbox d-flex align-items-center">
                                                                                                <input type="checkbox" aria-label="Checkbox for following text input" readonly={true} checked={data.return_at_pickup_location=="Yes" ? true : false}/>
                                                                                                <span className="px-2">Return at Pickup Location</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <label for="duty_date">Duty Date</label>
                                                                                            <div className="form-no-input">
                                                                                                {moment(data.date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <label for="to">to</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.date_return !== undefined? moment(data.date_return, "YYYY-MM-DD").format("dddd, DD MMMM YYYY") : moment(data.date_pickup, "YYYY-MM-DD").format("dddd, DD MMMM YYYY")}
                                                                                            </div>
                                                                                        </div>
                                                    
                                                                                        <div className="col-lg-6">
                                                                                            <label for="pickup_time">Pickup Time</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.time_pickup}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-6">
                                                                                            <label for="return_time">Return Time</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.time_return!==undefined?data.time_return:"--:--"}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-9">
                                                                                            <label for="pickup_location">Pickup Location</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.pickup_location_name}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-3">
                                                                                            <label for="passenger">Passenger</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.amount_passenger}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-12">
                                                                                            <label for="destinatiom">Destination</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.destination_location_name}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-12">
                                                                                            <label for="destinatiom">Drivers that will Duty</label>
                                                                                            <div className="form-no-input">
                                                                                                {data.driver_name}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-4" style={{height:'100vh'}}>
                                                                            {data.detail_ext_trip.length==0 ? 
                                                                            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',width: '100%'}}>
                                                                                <center><h3>Extra Trips</h3></center>
                                                                                <br/>
                                                                                <img src={TEMPLATES_ASSETS+"images/no_data.png"} className="img-fluid mb-4 mt-2" width="100%" />
                                                                            </div>
                                                                            :
                                                                            <div>
                                                                                <center><h3>Extra Trips</h3></center>
                                                                                { data.detail_ext_trip.map((dataExtra, indexExtra)=>
                                                                                    {
                                                                                        return (
                                                                                            <div className="col-lg-12 mb-3" style={{height:450,padding:0}}>
                                                                                                <div className="card" style={{background:'rgb(234, 234, 234) none repeat scroll 0% 0%'}}>
                                                                                                    <div className="card-body schedule">
                                                                                                        <div className="d-flex justify-content-between">
                                                                                                            <div>
                                                                                                                <div><h6 className="font-weight-bold m-0">Created At</h6></div>
                                                                                                                <div style={{fontSize:10}}>{moment(dataExtra.created_at.stringValue, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</div>
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <button className="btn btn-sm btn-primary">{dataExtra.no_request.stringValue}</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <hr/>
                                                                                                        <iframe src={"https://www.google.com/maps/embed/v1/directions?key=AIzaSyBjoZcWALEFrYre7Rhyf-SUij4CHDZdLPc&origin="+dataExtra.pickup_location_coordinate.stringValue+"&destination="+dataExtra.return_location_coordinate.stringValue+"&avoid=tolls"} width={'100%'} height={200}></iframe>
                                                                                                        <hr/>
                                                                                                        <div className="row">
                                                                                                            <div className="col-12">
                                                                                                                <div>Pickup Location</div>
                                                                                                                <div>
                                                                                                                    <a className="font-weight-bold" style={{fontSize:18}}>{dataExtra.pickup_location_name.stringValue}</a>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="col-12">
                                                                                                                <div>Destination Location</div>
                                                                                                                <div>
                                                                                                                    <a className="font-weight-bold" style={{fontSize:18}}>{dataExtra.destination_location_name.stringValue}</a>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        );
                                                                                    })
                                                                                }
                                                                                {this.state.activePage=="history" ? 
                                                                                <div>
                                                                                    <center><h3>Trip Comment</h3></center>
                                                                                    { data.driver_rating_orders.map((dataRatingComment, indexRatingComment)=>
                                                                                        {
                                                                                            return (
                                                                                                <div className="col-lg-12 mb-3" style={{height:200,padding:0}}>
                                                                                                    <div className="card" style={{background:'rgb(234, 234, 234) none repeat scroll 0% 0%'}}>
                                                                                                        <div className="card-body schedule">
                                                                                                            <div className="d-flex justify-content-between">
                                                                                                                <div>
                                                                                                                    <div><h6 className="font-weight-bold m-0">{dataRatingComment.whenPostedStatus.stringValue=="on_return" ? "Comment after Return Trip" : "Comment after Pickup Trip"}</h6></div>
                                                                                                                    <div style={{fontSize:10}}>{moment(dataRatingComment.created_at.stringValue, "YYYY-MM-DD HH:mm").format("dddd, DD MMMM YYYY HH:mm")}</div>
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                    <button className="btn btn-sm btn-primary">Rate Vote : {dataRatingComment.user_rating.stringValue} Stars</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <hr/>
                                                                                                            <div className="row">
                                                                                                                <div className="col-12">
                                                                                                                    <div>Comment Trip</div>
                                                                                                                    <div>
                                                                                                                        <a className="font-weight-bold" style={{fontSize:12}}>{dataRatingComment.comment_rating.stringValue}</a>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                :null}
                                                                            </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                        </div>
                                </div>
                            </div>
                        }
                        
                    </div>    
                    {/* Container Page */}
                </div>
            </div>
        );
    }
    
}