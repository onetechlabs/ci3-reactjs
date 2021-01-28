import React, { Component } from 'react';
import { TEMPLATES_ASSETS } from '../util/constants'
export default class Header extends Component {
    render() {
        return (
            <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header">
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                            <i className="ti-menu ti-close" />
                        </a>
                        <a className="navbar-brand" href="javascript:void(0)">
                            <b className="logo-icon">
                                <img src={TEMPLATES_ASSETS+"images/company-logo.png"} alt="homepage" className="dark-logo" />
                                <img src={TEMPLATES_ASSETS+"images/company-logo.png"} alt="homepage" className="light-logo" />
                            </b>
                            <span className="logo-text">
                                <img src={TEMPLATES_ASSETS+"images/main-logo-text.png"} alt="homepage" className="dark-logo" />
                                <img src={TEMPLATES_ASSETS+"images/main-logo-light-text.png"} className="light-logo" alt="homepage" />
                            </span>
                        </a>
                        <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="ti-more" />
                        </a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto float-left">
                            <li className="nav-item">
                                <a className="nav-link sidebartoggler d-none d-md-block waves-effect waves-dark" href="javascript:void(0)">
                                    <i className="ti-menu" />
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav float-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-dark" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-message" />
                                    <div className="notify">
                                        <span className="heartbit" />
                                        <span className="point" />
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                    <ul className="list-style-none">
                                        <li>
                                            <div className="border-bottom rounded-top py-3 px-4">
                                                <div className="mb-0 font-weight-medium font-16">Notifications</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="message-center notifications position-relative" style={{height: '250px'}}>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-danger rounded-circle btn-circle">
                                                        <i className="fa fa-link" />
                                                    </span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Luanch Admin</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">Just see the my new admin!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:30 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-success rounded-circle btn-circle">
                                                        <i className="ti-calendar" />
                                                    </span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Event today</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">Just a reminder that you have event</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:10 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-info rounded-circle btn-circle">
                                                        <i className="ti-settings" />
                                                    </span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Settings</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">You can customize this template as you want</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:08 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="btn btn-primary rounded-circle btn-circle">
                                                        <i className="ti-user" />
                                                    </span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Pavan kumar</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">Just see the my admin!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:02 AM</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link border-top text-center text-dark pt-3" href="javascript:void(0);">
                                                <strong>Check all notifications</strong>
                                                <i className="fa fa-angle-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-dark" href="javascript:void(0);" id={2} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="mdi mdi-email" />
                                    <div className="notify">
                                        <span className="heartbit" />
                                        <span className="point" />
                                    </div>
                                </a>
                                <div className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown" aria-labelledby={2}>
                                    <ul className="list-style-none">
                                        <li>
                                            <div className="border-bottom rounded-top py-3 px-4">
                                                <div className="mb-0 font-weight-medium font-16">You have 4 new messages</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="message-center message-body position-relative" style={{height: '250px'}}>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src={TEMPLATES_ASSETS+"images/users/1.jpg"} alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle online" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Pavan kumar</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">Just see the my admin!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:30 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src={TEMPLATES_ASSETS+"images/users/2.jpg"} alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle busy" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Sonu Nigam</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">I've sung a song! See you at</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:10 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src={TEMPLATES_ASSETS+"images/users/3.jpg"} alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle away" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Arijit Sinh</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">I am a singer!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:08 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src={TEMPLATES_ASSETS+"images/users/4.jpg"} alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle offline" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Pavan kumar</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">Just see the my admin!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:02 AM</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a className="nav-link border-top text-center text-dark pt-3" href="javascript:void(0);">
                                                <b>See all e-Mails</b>
                                                <i className="fa fa-angle-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="flag-icon flag-icon-us" />
                                </a>
                                <div className="dropdown-menu dropdown-menu-right animated bounceInDown">
                                    <a className="dropdown-item" href="#">
                                        <i className="flag-icon flag-icon-in" /> India
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="flag-icon flag-icon-fr" /> French
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="flag-icon flag-icon-cn" /> China
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        <i className="flag-icon flag-icon-de" /> Dutch
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle waves-effect waves-dark" href="javascript:void(0);" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={TEMPLATES_ASSETS+"images/users/1.jpg"} alt="user" className="profile-pic rounded-circle" width={30} />
                                </a>
                                <div className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown">
                                    <ul className="dropdown-user list-style-none">
                                        <li>
                                            <div className="dw-user-box p-3 d-flex">
                                                <div className="u-img">
                                                    <img src={TEMPLATES_ASSETS+"images/users/1.jpg"} alt="user" className="rounded" width={80} />
                                                </div>
                                                <div className="u-text ml-2">
                                                    <h4 className="mb-0">Steave Jobs</h4>
                                                    <p className="text-muted mb-1 font-14">varun@gmail.com</p>
                                                    <a href="pages-profile.html" className="btn btn-rounded btn-danger btn-sm text-white d-inline-block">View
                                    Profile</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li role="separator" className="dropdown-divider" />
                                        <li className="user-list">
                                            <a className="px-3 py-2" href="#">
                                                <i className="ti-user" /> My Profile
                                            </a>
                                        </li>
                                        <li className="user-list">
                                            <a className="px-3 py-2" href="#">
                                                <i className="ti-wallet" /> My Balance
                                            </a>
                                        </li>
                                        <li className="user-list">
                                            <a className="px-3 py-2" href="#">
                                                <i className="ti-email" /> Inbox
                                            </a>
                                        </li>
                                        <li role="separator" className="dropdown-divider" />
                                        <li className="user-list">
                                            <a className="px-3 py-2" href="#">
                                                <i className="ti-settings" /> Account Setting
                                            </a>
                                        </li>
                                        <li role="separator" className="dropdown-divider" />
                                        <li className="user-list">
                                            <a className="px-3 py-2" href="#">
                                                <i className="fa fa-power-off" /> Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}