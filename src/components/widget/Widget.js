import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { fetchAllData } from '../../utils/widgetAPI';

export default function Widget({ selectedOption, width, height }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (selectedOption) {
            fetchAllData(selectedOption.id)
                .then(data => setData(data))
                .catch(error => console.error('Error fetching station data:', error));
        }

    }, [selectedOption]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <hr/>
        <div className='relative text-xl bg-black bg-opacity-40 h-max text-slate-800 mx-auto flex flex-col p-10 shadow-lg z-10 ' style={{ width, height }}>
        <h3 className='text-center'>MRDM STATION</h3>
        <hr className='mb-6'/>
            <div className='relative flex justify-evenly'> 
                <div className='w-1/3 flex justify-evenly'>
                    <div className='flex flex-col text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47a0ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-droplets"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
                        {data.data.humidity}
                    </div>
                    <div className='flex flex-col text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#47a0ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-wind"><path d="M12 4V2m0 20v-2m8-8h-2m-16 0H4m16-8l-2-2m0 16 2-2m-2-8H4"/></svg>
                        {data.data.windSpeed} overflow-hidden'
                    </div>
                </div>
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
            <div className='flex align-bottom justify-center h-max relative'>
                <RainfallChartMap Data={data.rainfall} />
            </div>
            <div className='flex align-bottom justify-center h-max'>
                <HumidityChartMap Data={data.humidity} />
            </div>
            
            {/* <div>
                <span>Min: 18 Max: 36</span>
                <span>Latest updated: 21min ago</span>
            </div> */}
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
    title: "Temprature Over Time",
    hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Temprature (°C)", minValue: 0 },
    chartArea: { width: "80%", height: "100%"   },
};

export function HumidityChartMap({ Data}) {
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

export function TempratureChartMap({ Data}) {

    if (!Data) {
        return <div>No temprature data available</div>;
    }
    
    const chartData = [["Time", "Temprature"]];
        Data.forEach((entry) => {
        chartData.push([new Date(entry.time), entry.temprature]);
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

export function RainfallChartMap({ Data}) {
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
