import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchAllData } from '../../utils/widgetAPI';

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
    console.log(weatherData);
    return {
        temperature: weatherData.main.temp,
        date: currentDate,
        time: currentTime
    };
};

export default function Widget({ selectedOption }) {
    const [data, setData] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        if (selectedOption) {
            fetchAllData(selectedOption.id)
                .then(data => setData(data))
                .catch(error => console.error('Error fetching station data:', error));

            // Fetch current weather data
            fetchCurrentWeather(selectedOption.latitude, selectedOption.longitude)
                .then(weather => setCurrentWeather(weather))
                .catch(error => console.error('Error fetching current weather:', error));
        }
    }, [selectedOption]);

    if (!data || !currentWeather) {
        return <div>Loading...</div>;
    }

    return (
        <div className='relative text-xl w-max bg-black bg-opacity-40 rounded-xl text-white h-max text-slate-800 mx-auto flex flex-col p-10 shadow-lg z-10'>
            <div className='relative flex justify-evenly'>
                {/* Display current date, time, and temperature */}
                <div className='w-1/3 flex justify-evenly'>
                    <div className='flex flex-col text-center'>
                        <span style={{ fontSize: '2rem', color: '#ff4500' }}>{currentWeather.temperature}°C</span>
                        <span>{currentWeather.date}</span>
                        
                    </div>
                </div>
                {/* Keep other sections as it is */}
                <div className='w-1/3 flex justify-evenly flex-col text-center'>
                    <span className='mx-auto'>                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    {data.station.name}
                </div>
                <div className='w-1/3 flex justify-evenly'>
                    <div className='flex flex-col text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47a0ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-droplets"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
                        {data.data.humidity}
                    </div>
                    <div className='flex flex-col text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47a0ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-barometer"><path d="M12 20V10m0 10a8 8 0 0 0 8-8 8 8 0 0 0-16 0 8 8 0 0 0 8 8Z"/></svg>
                        {data.data.pressure}
                    </div>
                </div>
            </div>
            {/* Keep the chart components as it is */}
            <div className='flex align-bottom justify-center h-max relative'>
                <RainfallChartMap Data={data.rainfall} />
            </div>
            <div className='flex align-bottom justify-center h-max'>
                <HumidityChartMap Data={data.humidity} />
            </div>
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
    chartArea: { width: "80%", height: "40%" },
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
            width="50%"
            height="100px"
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
            height="100px"
            data={chartData}
            options={rainfalloptions}
        />
    );
}
