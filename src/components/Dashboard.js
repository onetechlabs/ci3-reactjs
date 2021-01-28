import React from 'react'
import Menus from '../util/menus'
import Header from '../util/header'
import PreReload from '../util/prereload'
import { TEMPLATES_ASSETS } from '../util/constants'

export default function Dashboard () {
    return (
    <div>
        
        {/* Loading Component */}
        <PreReload></PreReload>
        {/* Loading Component */}

        <div id="main-wrapper">

            {/* Header */}
            <Header></Header>
            {/* Header */}
            
            {/* Side Menus */}
            <Menus></Menus>
            {/* End Side Menus */}

            {/* Container Page */}
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
                                                    <img src={TEMPLATES_ASSETS+"images/icon/income.png"} alt="Income" />
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
                                                    <img src={TEMPLATES_ASSETS+"images/icon/expense.png"} alt="Income" />
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
                                                    <img src={TEMPLATES_ASSETS+"images/icon/assets.png"} alt="Income" />
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
            {/* Container Page */}
            
        </div>
    </div>
    )
}