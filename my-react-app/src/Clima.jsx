// 20.27714270816421, -97.95799473972353
import React, { useEffect, useState } from "react";

function Clima() {
    const [clima, setClima] = useState(null);
    const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const lat = 20.27714270816421;
    const lng = -97.95799473972353;
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`)
        .then((res)=> res.json())
        .then((data) => {
            console.log(data);
            setClima(data);
        })
        .catch((error) => console.error("Error:", error)); 
       
    }, []);    
    
    if (!clima) return <p>Cargando clima...</p>; // Asegúrate de que clima no sea null o undefined

    const { main, weather, name } = clima; // Desestructuración del objeto

    return (
        <div className="divClima">
            <h2>Clima en {name}</h2>
            <p>Temperatura: {main.temp} °C</p>
            <p>Descripción: {weather[0]?.description}</p>
            <p>Estado: {weather[0]?.main}</p>
            <p>Presión: {main.pressure} hPa</p>
            <p>Humedad: {main.humidity} %</p>
        </div>
    );
}

export default Clima;