import React,{Component} from 'react'
import PreReload from '../util/prereload'
import { TEMPLATES_ASSETS, firebaseConfig, BASE_URL } from '../util/constants'

/* Init Firebase */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestoreDB = firebase.firestore();
firebase.analytics();
/* End Init Firebase */

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            help_forgotMyPassword:false
        };
    }
    componentDidMount(){
        
    }
    _forgotMyPasswordWasSentToEmail(){
        Swal.fire({
            type: 'success',
            title: 'Check Your Email to Reset Password',
            text: "Your Link to Reset Password was Sent!"
        });
        auth.sendPasswordResetEmail(this.state.email);
        this.setState({help_forgotMyPassword:false});
    }
    _forgotMyPassword(){
        event.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode=="auth/wrong-password"){
                auth.fetchSignInMethodsForEmail(this.state.email)
                .then((result) => {
                    if(result.length > 0){
                        this._forgotMyPasswordWasSentToEmail();
                    }
                });
            }else{
                Swal.fire({
                    type: 'error',
                    title: errorCode,
                    text: errorMessage,
                });
                this.setState({help_forgotMyPassword:true});
            }
        });
    }
    _signInSuccess(){
        Swal.fire({
            type: 'success',
            title: 'Sign In Success',
            text: "Your account was Found, Click Link Below to Start!",
            footer: '<a href="'+BASE_URL+'app/dashboard">Go to Dashboard</a>',
            showConfirmButton: false
        });
        firestoreDB.collection("detail_users").where("email", "==", this.state.email).get().then((eventsSnapshot)=>{
            eventsSnapshot.forEach(doc => {
                sessionStorage.setItem("avatar_url", doc.data().avatar_url);
                sessionStorage.setItem("display_name", doc.data().display_name);
                sessionStorage.setItem("email", doc.data().email);
                sessionStorage.setItem("role", doc.data().role);
                sessionStorage.setItem("unique_code", doc.data().unique_code);
            });
            setTimeout(()=>{
                window.location=BASE_URL+'app/dashboard';
            },2000);
        });
        this.setState({help_forgotMyPassword:false});
    }
    _signInFailed(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
            type: 'error',
            title: errorCode,
            text: errorMessage,
            footer: 'Need Help? Press Forgot My Password!',
            showConfirmButton: false
        });
        this.setState({help_forgotMyPassword:true});
    }
    _checkSignin(){
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(()=>{this._signInSuccess()}).catch((error)=>{this._signInFailed(error)});
    }
    render(){
        return (
            <div>
                {/* Loading Component */}
                <PreReload></PreReload>
                {/* Loading Component */}
                {/* Container Page */}
                <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={{background: 'url('+TEMPLATES_ASSETS+'images/backgroundcity.jpg) no-repeat center center', backgroundSize: 'cover'}}>
                    <div className="auth-box on-sidebar p-4 bg-white m-0">
                        <div id="loginform">
                            <div className="logo text-center">
                                <img src={TEMPLATES_ASSETS+"images/company-logo.png"}/>
                                <div className="logo-sub-title">
                                    This is transportations Procurement and Monitoring Dashboard for Coordinator transportation unit under PT. SMI 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <form className="form-horizontal mt-3 form-material" id="loginform" action="">
                                        <div className="form-group mb-3">
                                            <div className="col-xs-12">
                                                <input className="form-control" type="text" required placeholder="Email" onChange={(event)=>{this.setState({email : event.target.value})}} />
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <div className="col-xs-12">
                                                <input className="form-control" type="password" required placeholder="Password" onChange={(event)=>{this.setState({password : event.target.value})}} />
                                            </div>
                                        </div>
                                        <div className="form-group text-center mt-3">
                                            <div className="col-xs-12">
                                                <button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit" onClick={()=>{this._checkSignin()}}>Log In</button>
                                            </div>
                                        </div>
                                    </form>
                                    {(this.state.help_forgotMyPassword==true) && 
                                        <div>
                                            <div className="col-xs-12">
                                                <div>Need Help, to recovery my password? <a href="javascript:void(0)" onClick={()=>{this._forgotMyPassword()}}>Forgot My Password !</a></div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <img src={TEMPLATES_ASSETS+"images/poweredSMI.png"} className="powered_on_login"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Container Page */}
            </div>
        );
    }
}