import React, {forwardRef, useImperativeHandle, useState} from 'react';

export const Loader = forwardRef((props, ref) =>{
    const [isShown, setIsShown] =  useState(true);

    useImperativeHandle(ref, () => ({
        //Hide loader
        hideLoader() {
            setIsShown(false);
        }
    }));

    if(isShown)
        return (
            <div className="black-bg-opacity d-flex h-100 fixed-top">
                <div className="container justify-content-center align-self-center">
                    <div className="row text-center text-white">
                        <div className="mx-auto">
                            <p>
                                Loading, please wait...
                            </p>
                            <div className="lds-dual-ring"></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    return null;
});