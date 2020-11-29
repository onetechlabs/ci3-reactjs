import React,{Component} from 'react';
import { BASE_URL, TEMPLATES_ASSETS } from '../util/constants'
export default class Menus extends Component{
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
    _signOut(){
        Swal.fire({
            type: 'success',
            title: 'See you Soon!',
            text: "Your account was Sign Out."
        }).then(()=>{
            sessionStorage.clear();
            setTimeout(()=>{
                window.location=BASE_URL;
            },2000);
        });
    }
    render(){
        return(
            <aside className="left-sidebar">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <i className="mdi mdi-dots-horizontal" />
                                <span className="hide-menu">Navigation</span>
                            </li>
                            <li className="sidebar-item user-profile">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="javascript:void(0)" aria-expanded="false">
                                    <img src={this.state.avatar_url} alt="user" />
                                    <span className="hide-menu">
                                        {this.state.display_name} <br/> 
                                        <div className="afterNameSideMenu">{this.state.unique_code}</div>
                                        <div className="afterNameSideMenuSignOut" onClick={()=>{this._signOut()}}>Sign Out</div>
                                    </span>
                                </a>
                            </li>
                            {this.state.role == "AdminCT" ?
                            <li className="sidebar-item">
                                <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">
                                    <img className="sidebar-link-icon" src={TEMPLATES_ASSETS+"images/icon-pen-book.svg"} alt="home" />
                                    <span className="hide-menu">To-Do 
                                        <span className="side-badge badge badge-info">2</span>
                                    </span>
                                </a>
                                <ul aria-expanded="false" className="collapse  first-level">
                                    <li className="sidebar-item" id="newAccount">
                                        <a href="javascript:void(0)" className="sidebar-link">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu">+Account</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item" id="allAccount">
                                        <a href="javascript:void(0)" className="sidebar-link">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu">All Account</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            :null}
                            {this.state.role == "AdminCT" ?
                            <li className="sidebar-item">
                                <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">
                                    <img className="sidebar-link-icon" src={TEMPLATES_ASSETS+"images/icon-inbox.svg"} alt="inbox" />
                                    <span className="hide-menu">Inbox 
                                        <span className="side-badge badge badge-info">3</span>
                                    </span>
                                </a>
                                <ul aria-expanded="false" className="collapse  first-level">
                                    <li className="sidebar-item" id="inboxDirector">
                                        <a href="javascript:void(0)" className="sidebar-link">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu">Director</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item" id="inboxStaff">
                                        <a href="javascript:void(0)" className="sidebar-link">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu">Staff</span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item" id="inboxDriver">
                                        <a href="javascript:void(0)" className="sidebar-link">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu">Vendor</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            :null}
                            {this.state.role == "AdminCT" ?
                            <li className="sidebar-item" id="schedules">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="javascript:void(0)" aria-expanded="false">
                                    <img className="sidebar-link-icon" src={TEMPLATES_ASSETS+"images/icon-schedule.svg"} alt="schedule" />
                                    <span className="hide-menu">Schedule</span>
                                </a>
                            </li>
                            :null}
                            {this.state.role == "AdminCT" ?
                            <li className="sidebar-item" id="activity">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="javascript:void(0)" aria-expanded="false">
                                    <img className="sidebar-link-icon" src={TEMPLATES_ASSETS+"images/icon-activity.svg"} alt="schedule" />
                                    <span className="hide-menu">Activity</span>
                                </a>
                            </li>
                            :null}
                            {this.state.role == "AdminCT" ?
                            <li className="sidebar-item" id="history">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="javascript:void(0)" aria-expanded="false">
                                    <img className="sidebar-link-icon" src={TEMPLATES_ASSETS+"images/icon-history.svg"} alt="schedule" />
                                    <span className="hide-menu">History</span>
                                </a>
                            </li>
                            :null}
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}