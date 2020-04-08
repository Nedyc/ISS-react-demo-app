import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Modal = forwardRef((props, ref) => {
    const [modal, setModal] =  useState(null);
    const [buttons, setButtons] =  useState(null);

    useImperativeHandle(ref, () => ({
        //Show and fill the modal
        changeModal(icon, title, content, buttons) {
            setModal({
                title: title,
                content: content,
                isVisible: true,
                icon: icon
            });
            //If modal has buttons render them with callback
            if(buttons)
                setButtons(buttons.map((button, key) =>
                    <button 
                        key={key} 
                        className={"mt-4 mr-2 text-white btn bg-"+button.color}
                        onClick={()=>{
                            if(typeof button.callback === "string" && button.callback === "close")
                                onModalHide();
                            else
                                button.callback();
                        }}
                    >
                        {button.label}
                    </button>
                ));
        }
    }));

    //On modal hide
    const onModalHide = () => {
        let innerState = {...modal};
        innerState.isVisible = false;
        setModal(innerState);
    }

    if(modal && modal.isVisible)
        return (
            <div className="black-bg-opacity d-flex h-100 fixed-top">
                <div className="container justify-content-center align-self-center">
                    <div className="row text-center">

                        <Animated animationIn="bounceInDown" className="bg-light col-xs-12 col-md-10 col-lg-8 mx-auto text-left">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 bg-secondary">
                                    <div className="d-flex h-100">
                                        <div className="container justify-content-center align-self-center">
                                            <div className="row text-center text-white py-5">
                                                <FontAwesomeIcon icon={modal.icon} className="fa-7x mx-auto" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 p-4">
                                    <header className="border-bottom pb-3 mb-4">
                                        <div className="float-left">
                                            {modal.title}
                                        </div>
                                        <div className="float-right">
                                            <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={()=>onModalHide()} />
                                        </div>
                                        <div className="clearfix"></div>
                                    </header>

                                    {modal.content}

                                    <div>
                                        {buttons}
                                    </div>
                                            
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </div>
        );
    
    return null;
});