import React from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import iss from '../iss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import {Animated} from "react-animated-css";

export const IssMap = (props) =>{
    //Define a custom marker for the map
    const customMarker = L.icon({ 
        iconUrl: require('../images/tie-fighter.svg'),
        iconAnchor: [32, 32],
        popupAnchor: [10, -44],
        iconSize: [64, 64],
    });


    //When click a location over the map
    const handleClick = async (e) => {
        //Start card loaing
        props.onPredictionLoading();
        //Scroll to iss info card
        let element = document.getElementById("home-card");
        let bodyRect = document.body.getBoundingClientRect();
        let elemRect = element.getBoundingClientRect();
        let offset   = elemRect.top - bodyRect.top;

        window.scrollTo({top: offset, left: 0, behavior: 'smooth' });

        //Adjast the longitude position to prevent api error out of -180/ 180
        let latlng = e.latlng;
        if(latlng.lng > 180)
            latlng.lng-= Math.floor(latlng.lng/180)*180;
        else if(latlng.lng < -180)
            latlng.lng+= Math.ceil(Math.abs(latlng.lng)/180)*180;

        //Get predictions
        await iss.getPreditcionList(latlng.lat, latlng.lng).then(res => {
            props.onMapClick(res, latlng);
        }).catch((e) => {
            props.onMapClick(null);
        });
    }

    if(props.issPos && props.issPos[0])
        return (
            <div className="" id="main_map">
                <Animated animationIn="bounceInDown">
                    <Map 
                        className="leaf_map w-100"
                        center={props.issInitPos} 
                        zoom={4} 
                        minZoom={3}
                        onClick={handleClick}
                    >
                        <Marker
                            position={props.issPos}
                            icon={customMarker}
                        >
                            <Popup>
                                Greeting from the Empire from <br /><b>Lat:</b> {props.issPos[0]}, <b>Long:</b> {props.issPos[1]}!
                            </Popup>
                        </Marker>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </Map>
                    <div 
                        className="shadow position-absolute button rounded px-2 pt-2 pb-1 bg-light ml-2 text-dark cursor-pointer" 
                        id="center-map" 
                        onClick={props.centerMap} 
                        title="Center view"
                    >
                        <FontAwesomeIcon icon={faLocationArrow} />
                    </div>
                </Animated>
            </div>
        )
    
    return null;
}