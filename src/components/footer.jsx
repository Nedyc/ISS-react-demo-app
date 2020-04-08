import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";
import { faTablet } from "@fortawesome/free-solid-svg-icons";

export const Footer = () =>{
    return (
        <footer className="fixed-bottom container text-dark p-2 d-none d-lg-block">
            <div className="row">
                <div className="col-12 text-right pb-4">
                    <span className="rounded bg-light">
                        <i className="mr-3">Mobile friendly</i>
                        <FontAwesomeIcon 
                            icon={faMobile} 
                            className="mt-2" 
                            title="Facebook"
                        />
                        <FontAwesomeIcon 
                            icon={faTablet} 
                            className="ml-2" 
                            title="Twitter"
                        />
                        <FontAwesomeIcon 
                            icon={faDesktop} 
                            className="ml-2" 
                            title="Instagram"
                        />
                    </span>
                </div>
            </div>
        </footer>
    )
}