import React, {useState, useEffect, useRef} from 'react';
import { IssMap } from './iss-map';
import iss from '../iss';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import { IssPositions } from './iss-positions';
import { InfoBlock } from './info-block';

export const IssContainer = (props) =>{
    /**********ISS API**********/
    const refresh_rate = 5000;

    const [issPos, setIssPos] = useState();
    const [issInitPos, setIssInitPos] = useState();
    const issPosList = useRef();

    //Call api each 5 seconds to get the iis position
    const getIssPosition = () =>{
        setInterval(async () => {
            pollApi();
        }, refresh_rate);
    }

    async function pollApi(isFirstCall){
        //Get iss position
        await iss.getPosition().then((val) => {
            issPosList.current.initPosition(val);
            setIssPos(val);

            //If it's the first time I call the api set the initial iss position
            if(isFirstCall){
                //Remove Loading
                setIssInitPos(val);
                props.onLoadEnd();
            }
        });
    } 

    //Reset map pos
    const centerMap = () => {
        setIssInitPos(issPos);
    }

    //When user clicks over the map
    const onMapClick = (res, latlng) =>{
        if(!res)
            showMessage(faMeteor, "Ooops", "Something has went wrong with ISS Api!");
        else
            issPosList.current.wirePositions(res, latlng);
    }

    //Show basic modal message
    const showMessage = (icon, title, text) => {
        props.onModalShow(icon, title, text, [
            {
                label: "Darn!",
                color: "primary",
                callback: "close"
            }
        ]);
    }

    //When predicions are loading show the card loader
    const onPredictionLoading = () =>{
        issPosList.current.isLoading();
    }
    /**********ISS API END**********/


    useEffect(() => {
        //Start getting the iss position
        if(typeof issPos == "undefined"){
            pollApi(true).then((val)=>{
                getIssPosition();
            }).catch((error) => {  
                showMessage(faMeteor, "Oooops", "Something has went wrong with ISS Api!");
            });
        }
    }); 

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 text-center text-white mb-5">
                    <h1 className="pb-4">
                        <i>ISS React demo web app</i>
                    </h1>
                </div>
                <div className="col-xs-12 col-lg-6 mb-4">
                    <IssMap 
                        issPos = {issPos} 
                        issInitPos = {issInitPos} 
                        centerMap = {centerMap} 
                        onMapClick = {onMapClick}
                        onPredictionLoading = {onPredictionLoading}
                    />
                    <InfoBlock />
                </div>
                <div className="col-xs-12 col-lg-6 mb-4">
                    <IssPositions ref={issPosList} showMessage={showMessage} />
                </div>
            </div>
        </div>
    )
}