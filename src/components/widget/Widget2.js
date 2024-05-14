import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
// import { fetchAllData } from '../../utils/widgetAPI';

export default function Widget2({ selectedOption, width, height }) {

    const [data, setData] = useState({ station: { name: '' }, rainfall: [], humidity: [], temperature: [] });

    useEffect(() => {
        setData(generateData());
    }, [selectedOption]);

    return (
        <>
        <hr/>
        <div className='relative text-xl bg-white h-max text-slate-800 mx-auto flex flex-col p-10 shadow-lg z-10 ' style={{ width, height }}>
            <h5 className='text-center'>CLIMATE STATION</h5>
            <hr className='mb-6'/>
            <div className='relative flex justify-evenly'> 

                <div className='w-1/3 flex justify-evenly flex-col text-center text-xs'>
                    <span className='mx-auto'>                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    {String(selectedOption.name).toUpperCase()} 
                </div>
                
            </div>
            <div className='flex align-bottom justify-center h-max relative'>
                <RainfallChartMap Data={data.rainfall} />
            </div>
            <div className='flex align-bottom justify-center h-max'>
                <HumidityChartMap Data={data.humidity} />
            </div>
            <div className='flex align-bottom justify-center h-max'>
                {/* <TempratureChartMap Data={data.temperature} /> */}
            </div>
        </div>  
        </>
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

export const tempratureoptions = {
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

export function TempratureChartMap({ Data }) {
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
        options={tempratureoptions}
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
        const temperature = Math.random() * 30; // Adjust this range based on your temperature data
  
        data.rainfall.push({ time: time.toISOString(), rainfall });
        data.humidity.push({ time: time.toISOString(), humidity });
        data.temperature.push({ time: time.toISOString(), temperature });
    }
  
    return data;
}
