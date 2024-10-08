import "./SearchBox.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";

export default function SearchBox({updateInfo}){

    let [city, setCity]=useState("");
    let [error, setError]=useState(false);

    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="36bdf247dea2c75cde8fc59ba95dc8e6";

    let getWeatherInfo= async()=>{
        try{
            let response = await fetch(
                `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                // If the response status is not 200, an error occurred
                if (response.status === 404) {
                    setError(true); // Set error for an invalid city
                }
                throw new Error("Invalid response");
            }
            let jsonResponse = await response.json();
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handleChange=(event)=>{
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setError(false); // Reset error state before each submission
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            // No need to set the error here since we handle it in getWeatherInfo()
            console.error(err);
        }
    };

    return (
    <div className="SearchBox">
        <h3 style={{color: "#20948B"}}>Search for the weather</h3>
        <form onSubmit={handleSubmit}>
            <TextField
                id="city"
                label="City-Name"
                variant="outlined"
                required
                value={city}
                onChange={handleChange}
            />
            <br></br><br></br>
            <Button
                variant="contained"
                type="submit"
            >
                Search
            </Button>
            {error && <p style={{color: "red"}}>No such place exist</p>}
        </form>
    </div>
    )
}
