import React, { useState } from 'react';

export const Clima = () => {
    const diffKelvin = 273;
    const [select, setSelect] = useState(true);
    const [data, setData] = useState(null);
    const [lugar, setLugar] = useState("");
    const [error, setError] = useState(null);

    const APIKEY = "992251154fcbeb3e46859b7c0aac61a3";
    const urlBase = "https://api.openweathermap.org/data/2.5";

    const handleChange = (evt) => {
        setLugar(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleClick();
    };

    const handleClick = async () => {
        if (!lugar.trim()) {
            setError("Introduce una ciudad válida");
            setSelect(false);
            return;
        }

        try {
            const response = await fetch(`${urlBase}/weather?q=${lugar}&appid=${APIKEY}`);
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            const data = await response.json();
            setData(data);
            setSelect(true);
            setError(null);
        } catch (error) {
            setError(error.message);
            setSelect(false);
        }
        setLugar("")
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="formulario">
                <input
                    className="buscador"
                    type="text"
                    placeholder="Introduce la ciudad"
                    value={lugar}
                    onChange={handleChange}
                />
                <button type="submit">Buscar</button>
            </form>
            {select ? (
                data && (
                    <div className="containerResults">
                        <h2>{data.name}, {data.sys.country}</h2>
                        <p>La temperatura es {parseInt(data.main.temp - diffKelvin)}°C</p>
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                        <p>{data.weather[0].description}</p>
                    </div>
                )
            ) : (
                <div className="containerError">
                    <p>{error}</p>
                </div>
            )}
        </>
    );
};
