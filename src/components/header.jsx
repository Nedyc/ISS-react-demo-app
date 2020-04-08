import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Header = () => {
    return (
        <header className="container p-2">
            <div className="row">
                <div className="col-6">
                    <div id="top-logo" className="float-left"></div>
                    <b className="float-left text-white ml-3 d-none d-sm-block" id="text-logo">
                        <i>ISS React App</i>
                    </b>
                    <div className="clearfix"></div>
                </div>
                <div className="col-6 text-right text-white">
                    <FontAwesomeIcon 
                        icon={faFacebook} 
                        className="mt-2 cursor-pointer" 
                        title="Facebook"
                    />
                    <FontAwesomeIcon 
                        icon={faTwitter} 
                        className="ml-4 mt-2 cursor-pointer" 
                        title="Twitter"
                    />
                    <FontAwesomeIcon 
                        icon={faInstagram} 
                        className="ml-4 mt-2 cursor-pointer" 
                        title="Instagram"
                    />
                </div>
            </div>
        </header>
    )
}