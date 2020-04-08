import React, {forwardRef, useImperativeHandle, useState, createRef} from 'react';
import {Animated} from "react-animated-css";
import {IssPosition} from './iss-position';
import weather from '../weather';
import { faPooStorm } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

export const IssPositions = forwardRef((props, ref) =>{
    const [issPos, setIssPos] = useState([]);
    const [cardAnimation, setCardAnimation] = useState("flipInY");
    const [isCardVisible, setIsCardVisible] = useState(true);
    const [animationDelay, setAnimationDelay] = useState(1500);
    const infoText = "Place name is as precise as an elephant due to the weather api service";

    const [body, setBody] = useState(
        <React.Fragment>
            <h5 className="text-primary mt-3">welcome</h5>
            <h2>To the ISS Tracking website</h2>
            <p className="mt-4">
                The International Space Station (ISS) is a space station (habitable artificial satellite) in low Earth orbit. 
                The ownership and use of the space station is established by intergovernmental treaties and agreements
            </p>
        </React.Fragment>

    )

    useImperativeHandle(ref, () => ({
        wirePositions(pos, latlng) {
            //Get weather
            weather.getWeather(latlng).then((res) => {
                if(!res)
                    props.showMessage(faPooStorm, "Oooops", "Something has went wrong with weather Api!");
                else{
                    //Add flip in animation
                    setIsCardVisible(false);
                    setAnimationDelay(0);
                    setCardAnimation("fadeOut");
                    setTimeout(function(){
                        setCardAnimation("flipInY");
                        setIsCardVisible(true);

                        //Render positions
                        if(pos.length){
                            const innerObj = {};
                            
                            setBody(
                                <React.Fragment>
                                    <h6 className="text-primary">
                                        Iss next passages over {res[0].title} 
                                        <FontAwesomeIcon 
                                            icon={faInfo} 
                                            className="ml-2 cursor-pointer" 
                                            title={infoText} 
                                            onClick={()=>onInfoClick()}
                                        />
                                    </h6>
                                    {
                                        pos.map((innerPos, key) =>{
                                                //From timestamp to date
                                                const posDate = new Date(innerPos.risetime* 1000);
                                                let dateString = posDate.getDate()  + "/" + (posDate.getMonth()+1) + "/" + posDate.getFullYear();
                                                if(!(dateString in innerObj))
                                                    innerObj[dateString] = {};
                                                    
                                                //Create an object of positions reference and collect all the differents dates
                                                innerObj[dateString][key] = createRef();

                                                return <IssPosition key={key} date={posDate} ref={innerObj[dateString][key]} />
                                            }
                                        )
                                    }
                                </React.Fragment>
                            );
                            
                            //For each unique date call the weather forecast api
                            Object.keys(innerObj).forEach(function(keyName) {
                                const innerDate = keyName.split("/");
                                weather.getDayForecast(res[0].woeid, innerDate[0], innerDate[1], innerDate[2]).then((weatherRes) => {
                                    //Update the positions icons using their references previously stored in the object
                                    Object.keys(innerObj[keyName]).forEach(function(k) {
                                        innerObj[keyName][k].current.setIconWeather(weatherRes[0].weather_state_name);
                                    });
                                });
                            });
                        } else
                            setBody("It seems that ISS will not pass from here very soon...");
                    }, 1000);
                }
            });
        },

        initPosition(pos){
            setIssPos(pos);
        },

        //Show icons loader while fething from api
        isLoading(){
            setBody(
                <div className="lds-dual-ring"></div>
            );
        }
    }));

    //On info icon click render the modal with the info message
    const onInfoClick = () => {
        props.showMessage(faInfo, "Info", infoText);
    }

    return (
        <div className="" id="home-card">
            <Animated animationIn={cardAnimation} isVisible={isCardVisible} animationInDelay ={animationDelay}>
                <header className="bg-secondary shadow">
                    
                </header>
                <main className="bg-white p-4 shadow text-center">
                    {body}
                </main>
                <footer className="bg-primary shadow">
                    <div className="row">
                        <div className="col-6 text-center text-white py-2">
                            <b className="d-block mb-1">Longitude:</b>
                            {issPos[0]}
                        </div>
                        <div className="col-6 text-center text-white border-left py-2">
                            <b className="d-block mb-1">Latitude:</b>
                            {issPos[1]}
                        </div>
                    </div>
                </footer>
            </Animated>
        </div>
    )
});