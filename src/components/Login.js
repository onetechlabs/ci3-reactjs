import React from 'react'
import PreReload from '../util/prereload'
import { TEMPLATES_ASSETS } from '../util/constants'

export default function Login () {
    return (
        <div>
            {/* Loading Component */}
            <PreReload></PreReload>
            {/* Loading Component */}
            {/* Container Page */}
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={{background: 'url('+TEMPLATES_ASSETS+'images/background/login-register.jpg) no-repeat center center', backgroundSize: 'cover'}}>
                <div className="auth-box on-sidebar p-4 bg-white m-0">
                    <div id="loginform">
                        <div className="logo text-center">
                            <span className="db">
                                <img src={TEMPLATES_ASSETS+"images/company-logo.png"}/>
                                <br />
                                <img src={TEMPLATES_ASSETS+"images/main-logo-text.png"}/>
                            </span>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form className="form-horizontal mt-3 form-material" id="loginform" action="/app/dashboard">
                                    <div className="form-group mb-3">
                                        <div className="col-xs-12">
                                            <input className="form-control" type="text" required placeholder="Username" />
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="col-xs-12">
                                            <input className="form-control" type="password" required placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="form-group text-center mt-3">
                                        <div className="col-xs-12">
                                            <button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Container Page */}
        </div>
    );
}