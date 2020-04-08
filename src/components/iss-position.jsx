import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';

export const IssPosition = forwardRef((props, ref) => {
    const [weather, setWeather] = useState(<div className="small lds-dual-ring"></div>);
    const d = props.date;
    
    //Basic weather icons mapping object
    const weatherIcons = {
        "Snow": faSnowflake,
        "Sleet": faSnowflake,
        "Hail": faSnowflake,
        "Thunderstorm": faCloudRain,
        "Heavy Rain": faCloudRain,
        "Light Rain":	faCloudRain,
        "Showers":	faCloudRain,
        "Heavy Cloud": faCloudSun,
        "Light Cloud": faCloudSun,
        "Clear": faSun
    }

    //Pad numbers
    const padNumber = (n) =>{
        return (n.toString().length === 1) ? "0"+n : n;
    }

    useImperativeHandle(ref, () => ({
        //Set icons based on the weather api
        setIconWeather(weather){
            setWeather(
                <FontAwesomeIcon icon={weatherIcons[weather]} title={weather} />
            );
        }
    }));

    return(
        <div className="row">
            <div className="col-6">
                <b>{padNumber(d.getDate())  + "/" + padNumber(d.getMonth()+1) + "/" + d.getFullYear()}</b>
                <span className="ml-2">{padNumber(d.getHours()) + ":" + padNumber(d.getMinutes())}</span>
            </div>
            <div className="col-6 text-right">
                {weather}
            </div>
        </div>
    )
});