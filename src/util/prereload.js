import React, {Component} from 'react'
export default class PreReload extends Component{
    render(){
        return(
            <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos" />
                    <div className="lds-pos" />
                </div>
            </div>
        );
    }
}