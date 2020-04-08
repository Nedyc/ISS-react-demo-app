import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import {Animated} from "react-animated-css";

export const InfoBlock = () =>{
    return (
        <Animated animationIn="fadeInDown" animationInDelay ={1000}>
            <div id="info-block" className="p-3 bg-light my-2">
                <div className="row">
                    <div className="col-2 text-center mt-2">
                        <div className="container d-flex w-100 h-100">
                            <div className="row justify-content-center align-self-center mx-auto">
                                <FontAwesomeIcon icon={faInfo} className="text-primary fa-2x" />
                            </div>
                        </div>
                    </div>
                    <div className="col-10 text-dark mx-auto">
                        <span className="d-inline d-lg-none">Tap </span>
                        <span className="d-none d-lg-inline">Click </span> 
                        anywhere on the map to see the next ISS passages with weather forecasts!
                    </div>
                </div>
            </div>
        </Animated>
    )
}