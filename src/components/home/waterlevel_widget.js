import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const API_KEY = '4761a28e4582cafbc812853a09da0b61'; // Replace with your OpenWeatherMap API key

// Function to fetch current weather data
const fetchCurrentWeather = async (latitude, longitude) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            lat: latitude,
            lon: longitude,
            units: 'metric',
            appid: API_KEY
        }
    });
    const weatherData = response.data;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    return {
        temperature: weatherData.main.temp,
        date: currentDate,
        time: currentTime
    };
};

export default function Widget2({ selectedOption, width, height }) {
    const [data, setData] = useState({ station: { name: '' }, rainfall: [], humidity: [], temperature: [] });
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        setData(generateData());
        if (selectedOption) {
            fetchCurrentWeather(selectedOption.latitude, selectedOption.longitude)
                .then(weather => setCurrentWeather(weather))
                .catch(error => console.error('Error fetching current weather:', error));
        }
    }, [selectedOption]);

    return (
        <div className='relative text-xl bg-black bg-opacity-40 rounded-xl text-white h-max text-slate-800 mx-auto flex flex-col p-10 shadow-lg z-10' style={{ width, height }}>
            {currentWeather ? (
                <>
                    <div className='relative flex justify-evenly'>
                        <div className='w-1/3 flex justify-evenly flex-col text-center'>
                            <div className='flex flex-col text-center'>
                                <span>{currentWeather.temperature}°C</span>
                                <span>{currentWeather.date}</span>
                                <span>{currentWeather.time}</span>
                            </div>
                        </div>
                        <div className='w-2/3 flex justify-evenly flex-col text-center text-xs'>
                            <span className='mx-auto'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </span>
                            {selectedOption ? String(selectedOption.name) : 'Station Name'}
                        </div>
                    </div>
                    <div className='flex align-bottom justify-center h-max relative'>
                        <RainfallChartMap Data={data.rainfall} />
                    </div>
                    <div className='flex align-bottom justify-center h-max'>
                        <HumidityChartMap Data={data.humidity} />
                    </div>
                    <div className='flex align-bottom justify-center h-max'>
                        <TemperatureChartMap Data={data.temperature} />
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export const options = {
    title: "Rainfall Over Time",
    hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Rainfall (mm)", minValue: 0 },
    chartArea: { width: "80%", height: "40%" },
};

export const rainfalloptions = {
    title: "Rainfall Over Time",
    hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Rainfall (mm)", minValue: 0 },
    chartArea: { width: "80%", height: "40%"},
};

export const humidityoptions = {
    title: "Humidity Over Time",
    hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Humidity (%)", minValue: 0 },
    chartArea: { width: "80%", height: "40%" },
};

export const temperatureoptions = {
    title: "Temperature Over Time",
    hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Temperature (°C)", minValue: 0 },
    chartArea: { width: "80%", height: "100%" },
};

export function HumidityChartMap({ Data }) {
    if (!Data) {
        return <div>No humidity data available</div>;
    }

    const chartData = [["Time", "Humidity"]];
    Data.forEach((entry) => {
        chartData.push([new Date(entry.time), entry.humidity]);
    });

    return (
        <Chart
            chartType="AreaChart"
            width="100%"
            data={chartData}
            options={humidityoptions}
        />
    );
}

export function TemperatureChartMap({ Data }) {
    if (!Data) {
        return <div>No temperature data available</div>;
    }

    const chartData = [["Time", "Temperature"]];
    Data.forEach((entry) => {
        chartData.push([new Date(entry.time), entry.temperature]);
    });

    return (
        <Chart
            chartType="AreaChart"
            width="100%"
            data={chartData}
            options={temperatureoptions}
        />
    );
}

export function RainfallChartMap({ Data }) {
    if (!Data) {
        return <div>No rainfall data available</div>;
    }

    const chartData = [["Time", "Rainfall"]];
    Data.forEach((entry) => {
        chartData.push([new Date(entry.time), entry.rainfall]);
    });

    return (
        <Chart
            chartType="AreaChart"
            width="100%"
            data={chartData}
            options={rainfalloptions}
        />
    );
}

function generateData() {
    const data = {
        station: {
            name: `Station ${Math.floor(Math.random() * 100)}`,
        },
        rainfall: [],
        humidity: [],
        temperature: [],
    };
  
    for (let i = 0; i < 24; i++) {
        const time = new Date();
        time.setHours(time.getHours() - i);
  
        const rainfall = Math.random() * 10;
        const humidity = Math.random() * 100;
        const temperature = Math.random() * 30; 
  
        data.rainfall.push({ time: time.toISOString(), rainfall });
        data.humidity.push({ time: time.toISOString(), humidity });
        data.temperature.push({ time: time.toISOString(), temperature });
    }
  
    return data;
}
