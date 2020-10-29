import React from 'react'
import { BASE_URL } from '../util/constants'

export default function Dashboard () {
    return (
    <div>
        <div className="preloader">
            <div className="lds-ripple">
                <div className="lds-pos" />
                <div className="lds-pos" /></div>
        </div>
        <div id="main-wrapper">
            <header className="topbar">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark">
                    <div className="navbar-header">
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                            <i className="ti-menu ti-close" />
                        </a>
                        <a className="navbar-brand" href="index.html">
                            <b className="logo-icon">
                                <img src="/templates/src/assets/images/company-logo.png" alt="homepage" className="dark-logo" />
                                <img src="/templates/src/assets/images/company-logo.png" alt="homepage" className="light-logo" />
                            </b>
                            <span className="logo-text">
                                <img src="/templates/src/assets/images/main-logo-text.png" alt="homepage" className="dark-logo" />
                                <img src="/templates/src/assets/images/main-logo-light-text.png" className="light-logo" alt="homepage" />
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
                                                        <img src="/templates/src/assets/images/users/1.jpg" alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle online" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Pavan kumar</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">Just see the my admin!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:30 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src="/templates/src/assets/images/users/2.jpg" alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle busy" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Sonu Nigam</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">I've sung a song! See you at</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:10 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src="/templates/src/assets/images/users/3.jpg" alt="user" className="rounded-circle w-100" />
                                                        <span className="profile-status rounded-circle away" /></span>
                                                    <div className="w-75 d-inline-block v-middle pl-2">
                                                        <h5 className="message-title mb-0 mt-1">Arijit Sinh</h5>
                                                        <span className="font-12 text-nowrap d-block time text-truncate">I am a singer!</span>
                                                        <span className="font-12 text-nowrap d-block subtext">9:08 AM</span>
                                                    </div>
                                                </a>
                                                <a href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                                                    <span className="user-img position-relative d-inline-block">
                                                        <img src="/templates/src/assets/images/users/4.jpg" alt="user" className="rounded-circle w-100" />
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
                                    <img src="/templates/src/assets/images/users/1.jpg" alt="user" className="profile-pic rounded-circle" width={30} />
                                </a>
                                <div className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown">
                                    <ul className="dropdown-user list-style-none">
                                        <li>
                                            <div className="dw-user-box p-3 d-flex">
                                                <div className="u-img">
                                                    <img src="/templates/src/assets/images/users/1.jpg" alt="user" className="rounded" width={80} />
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
            <aside className="left-sidebar">
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            <li className="sidebar-item user-profile">
                                <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">
                                    <img src="/templates/src/assets/images/users/profile.png" alt="user" />
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
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="reverse-mode">
                        <div className="left-part bg-light dashboard-right-part fixed-left-part">
                            <a className="ti-menu ti-close btn btn-success show-left-part d-block d-md-none" href="javascript:void(0)" />
                            <div className="scrollable position-relative" style={{height: 'calc(100vh - 50px)'}}>
                                <p style={{padding:10+"px"}}>
                                    <h3>Lorem Ipsum</h3>
                                    <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo orci, finibus pretium erat et, luctus condimentum diam. Sed ultricies erat vel suscipit faucibus. Vestibulum consectetur odio dictum aliquet suscipit. Aliquam auctor ut turpis eget suscipit. Nulla sit amet lobortis tellus, vel iaculis massa. Quisque mollis est at sem aliquam tempor. Cras vel eros sit amet velit congue ultrices quis id nunc.
                                Maecenas suscipit finibus libero vel cursus. Curabitur imperdiet porttitor magna, quis mollis urna scelerisque eu. Integer non volutpat nisl. Nulla sem purus, consequat a orci id, maximus tempus ligula. Praesent rhoncus cursus dapibus. Curabitur at dui nunc. In porta sapien leo, sit amet lobortis augue lobortis sodales.
                                In dui quam, tempor non augue in, sollicitudin ultrices urna. Maecenas viverra sit amet nulla sollicitudin posuere. Phasellus eu neque id purus auctor euismod id sed augue. Ut consequat turpis vel elementum vehicula. Fusce scelerisque massa nec pharetra cursus. Fusce et scelerisque diam, eget vestibulum justo. Sed hendrerit, purus sed fermentum dapibus, diam nunc ultricies lorem, sed iaculis libero nisl quis lacus. Duis tempus a ipsum in hendrerit. Nulla sed pulvinar nisl, egestas mollis velit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur lacinia ipsum ut justo porttitor, ac euismod erat ultrices. Cras tempus tristique lectus non feugiat. Phasellus porta lacinia mauris. Sed efficitur erat risus, non laoreet turpis commodo eu. Nam cursus nibh nec porttitor pellentesque. Fusce posuere urna magna, sit amet malesuada urna molestie sed.
                                Sed sit amet aliquam tortor. Fusce porta, leo at aliquam porttitor, nulla lorem gravida ipsum, id convallis nibh sem eu sem. In ut auctor erat, sit amet finibus tellus. Fusce ac sapien nisl. Quisque dignissim, libero sit amet auctor dignissim, enim nibh blandit tortor, in mollis urna quam sed quam. Quisque maximus volutpat maximus. Quisque at ex tortor. In vel velit sed dolor interdum gravida sed eu mi. Vestibulum ac rutrum turpis, eget suscipit turpis. Phasellus gravida malesuada porttitor. Donec posuere turpis quis diam efficitur, a aliquet tellus consequat. Donec et dui odio. Integer tempor ipsum dui, a faucibus diam pharetra ultricies. Ut id pulvinar orci, eu feugiat leo. Donec volutpat tempus faucibus.
                                Donec viverra neque id mauris imperdiet aliquet. Mauris cursus, lorem eget ultrices aliquet, ligula tortor euismod eros, vitae blandit orci nisl et leo. Ut ac nisi eu felis posuere commodo vitae eget libero. Fusce elementum sed massa et sodales. Vivamus rhoncus eleifend magna, eu facilisis eros egestas et. Suspendisse imperdiet pulvinar tristique. Nam faucibus, nibh quis consectetur vestibulum, urna tortor imperdiet leo, ut condimentum lectus turpis at lacus. Etiam eros nisi, posuere eu ex non, semper aliquam massa. Sed mollis suscipit ante. Integer ut velit id ante rhoncus euismod ac non neque. Praesent nec risus in elit aliquam sollicitudin. 
                            </p>
                                </p>
                            </div>
                        </div>
                        <div className="right-part overflow-auto dashboard-part" style={{height: '100%'}}>
                            <div className="row page-titles">
                                <div className="col-md-5 col-12 align-self-center">
                                    <h3 className="text-themecolor mb-0">Dashboard</h3>
                                </div>
                                <div className="col-md-7 col-12 align-self-center d-none d-md-block">
                                    <ol className="breadcrumb mb-0 p-0 bg-transparent float-right">
                                        <li className="breadcrumb-item">
                                            <a href="javascript:void(0)">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="mr-3 align-self-center">
                                                    <span className="lstick d-inline-block align-middle mr-3" />
                                                    <img src="/templates/src/assets/images/icon/income.png" alt="Income" />
                                                </div>
                                                <div className="align-self-center">
                                                    <h6 className="text-muted mt-2 mb-0">Total Income</h6>
                                                    <h2>953,000</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="mr-3 align-self-center">
                                                    <span className="lstick d-inline-block align-middle mr-3" />
                                                    <img src="/templates/src/assets/images/icon/expense.png" alt="Income" />
                                                </div>
                                                <div className="align-self-center">
                                                    <h6 className="text-muted mt-2 mb-0">Total Expense</h6>
                                                    <h2>236,000</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="mr-3 align-self-center">
                                                    <span className="lstick d-inline-block align-middle mr-3" />
                                                    <img src="/templates/src/assets/images/icon/assets.png" alt="Income" />
                                                </div>
                                                <div className="align-self-center">
                                                    <h6 className="text-muted mt-2 mb-0">Total Assets</h6>
                                                    <h2>987,563</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-md-flex">
                                        <div>
                                            <h4 className="card-title">
                                                <span className="lstick d-inline-block align-middle" />Projects of the Month
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="table-responsive mt-3 no-wrap">
                                        <table className="table v-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="border-0" colSpan={2}>Assigned</th>
                                                    <th className="border-0">Name</th>
                                                    <th className="border-0">Priority</th>
                                                    <th className="border-0">Budget</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{width: '50px'}}>
                                                        <span className="round rounded-circle text-white d-inline-block text-center bg-info">S</span>
                                                    </td>
                                                    <td>
                                                        <h6 className="mb-0 font-weight-medium">Sunil Joshi</h6>
                                                        <small className="text-muted">Web Designer</small>
                                                    </td>
                                                    <td>Elite Admin</td>
                                                    <td>
                                                        <span className="badge badge-success rounded-pill">Low</span>
                                                    </td>
                                                    <td>$3.9K</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}