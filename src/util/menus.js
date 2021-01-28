import React,{Component} from 'react';
import { TEMPLATES_ASSETS } from '../util/constants'
export default class Menus extends Component{
    render(){
        return(
            <aside className="left-sidebar">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="sidebar-item user-profile">
                                <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">
                                    <img src={TEMPLATES_ASSETS+"images/users/profile.png"} alt="user" />
                                    <span className="hide-menu">Steve Jobs </span>
                                </a>
                                <ul aria-expanded="false" className="collapse  first-level">
                                    <li className="sidebar-item">
                                        <a href="javascript:void(0)" className="sidebar-link p-0">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu"> My Profile </span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a href="javascript:void(0)" className="sidebar-link p-0">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu"> My Balance </span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a href="javascript:void(0)" className="sidebar-link p-0">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu"> Inbox </span>
                                        </a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a href="javascript:void(0)" className="sidebar-link p-0">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu"> Logout </span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-small-cap">
                                <i className="mdi mdi-dots-horizontal" />
                                <span className="hide-menu">Personal</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">
                                    <i data-feather="home" className="feather-icon" />
                                    <span className="hide-menu">Dashboard 
                                        <span className="side-badge badge badge-info">1</span>
                                    </span>
                                </a>
                                <ul aria-expanded="false" className="collapse  first-level">
                                    <li className="sidebar-item">
                                        <a href="javascript:void(0)" className="sidebar-link">
                                            <i className="mdi mdi-adjust" />
                                            <span className="hide-menu"> Dashboard</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-small-cap">
                                <i className="mdi mdi-dots-horizontal" />
                                <span className="hide-menu">Apps</span>
                            </li>
                            <li className="sidebar-item">
                                <a className="sidebar-link waves-effect waves-dark sidebar-link" href="javascript:void(0)" aria-expanded="false">
                                    <i data-feather="log-out" className="feather-icon" />
                                    <span className="hide-menu">Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}