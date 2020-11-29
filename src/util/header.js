import React, { Component } from 'react';
import { firebaseRestAPI, TEMPLATES_ASSETS, firebaseConfig, BASE_URL } from '../util/constants'
/* Init Firebase */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import moment from 'moment';
export const auth = firebase.auth();
export const firestoreDB = firebase.firestore();
export const firestoreStorage = firebase.storage();
firebase.analytics();
/* End Init Firebase */
export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            avatar_url:sessionStorage.getItem("avatar_url"),
            display_name:sessionStorage.getItem("display_name"),
            email:sessionStorage.getItem("email"),
            role:sessionStorage.getItem("role"),
            unique_code:sessionStorage.getItem("unique_code"),
        }
    }
    componentDidMount(){
        var dateNow=new Date();
        var dateToString=moment(dateNow).format("YYYY-MM-DD");
        var html_no_notif = '<li><div class="border-bottom rounded-top py-3 px-4"><div class="mb-0 font-weight-medium font-16">Todays Notifications</div></div></li>'+
        '<li>'+
            '<div style="padding: 15px;border-bottom: 1px #F2F2F2 solid;">'+
                '<div class="d-inline-block v-middle pl-2">'+
                    '<center>No Notification Today</center>'
                '</div>'+
            '</div>'+
        '</li>';
        var notifCount=0;
        firestoreDB.collection("notifications").orderBy('created_time','desc').limit(5)
        .onSnapshot(function(snapshot) {
            notifCount=0;
            var html_notif='<li><div class="border-bottom rounded-top py-3 px-4"><div class="mb-0 font-weight-medium font-16">Todays Notifications</div></div></li>';
            $("#notifications").html('');
            snapshot.forEach((snap) => {
                if(snap.data().created_at==dateToString){
                    notifCount++;
                    html_notif += '<li>'+
                        '<div style="padding: 15px;border-bottom: 1px #F2F2F2 solid;">'+
                            '<div>'+
                                '<div style="width:100%;margin-bottom:2px;">'+snap.data().message+'</div><small style="width:100%; text-align:right; display:inline-block;font-size:9px;">'+moment(snap.data().created_at, "YYYY-MM-DD").format("DD MMMM YYYY")+" "+snap.data().created_time+'</small>'
                            '</div>'+
                        '</div>'+
                    '</li>';
                    console.log(snap.data());
                }
            });
            $("#notifications").html(html_notif);
            setInterval(()=>{
                if(notifCount==0){
                    $("#notifications").html(html_no_notif);
                }
            },2000);
        });
    }
    render() {
        return (
            <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header">
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                            <i className="ti-menu ti-close" />
                        </a>
                        <a className="navbar-brand" href="javascript:void(0)" id="dashboard">
                            <b className="logo-icon">
                                <b className="dashboardBeforeLogo">Dashboard</b>
                                <div style={{clear:"both"}}></div>
                                <img src={TEMPLATES_ASSETS+"images/company-logo.png"} width="100" alt="homepage" className="dark-logo" />
                            </b>
                        </a>
                        <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="ti-more" />
                        </a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto float-left">
                            <li className="nav-item">
                                <a className="nav-link sidebartoggler d-none d-md-block waves-effect waves-dark" href="javascript:void(0)">
                                    <img src={TEMPLATES_ASSETS+"images/menu.png"} alt="menu" className="menuIcon" />
                                </a>
                            </li>
                        </ul>
                        {this.state.role == "AdminCT" ?
                        <ul className="navbar-nav float-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-dark" href="javascript:void(0);" id={2} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-email" />
                                    <div className="notify">
                                        <span className="heartbit" />
                                        <span className="point" />
                                    </div>
                                </a>
                                <div className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown" style={{paddingBottom: 0}} aria-labelledby={2}>
                                    <ul className="list-style-none" id="notifications">
                                        <li>
                                            <div className="border-bottom rounded-top py-3 px-4">
                                                <div className="mb-0 font-weight-medium font-16">Today's Notifications</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        :null}
                    </div>
                </nav>
            </header>
        );
    }
}