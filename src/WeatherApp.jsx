import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp(){

    const [weatherInfo, setWeatherInfo]=useState({
        city:"Delhi",
        temp: 30.05,
        tempMax: 30.05,
        tempMin: 30.05,
        feelsLike: 31.28,
        humidity: 51,
        weather: "haze"
    });

    let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    };

    return (
        <>
            <h1 style={{textAlign:"center",textDecoration:"underline"}}><b>*Weather App by Irshad*</b></h1>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </>
    )
}