import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { fetchAllData } from '../../utils/widgetAPI';
import clou from '../../icons/cloudy.png';
import img1 from '../../icons/download.png'; // Add your image imports here
import img2 from '../../icons/download.png';
import img3 from '../../icons/download.png';

export default function RainfallWidget({ selectedOption }) {
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (selectedOption) {
            console.log('rainfal', selectedOption);
            fetchAllData(selectedOption.id)
                .then(data => setData(data))
                .catch(error => console.error('Error fetching station data:', error));
        }
    }, [selectedOption]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='relative text-xl w-max bg-black bg-opacity-40 rounded-xl text-white h-max mx-2 my-0 flex flex-col p-10 shadow-lg z-10'>
            <div className='relative flex justify-evenly'>
                {/* Display current date, time, and temperature */}
                <div className='w-1/3 flex justify-evenly'>
                    <div className='flex flex-col text-center'>
                        <img src={clou} alt="IIT Logo" width="48" height="48" align="center"/>
                        <span style={{ fontSize: '2rem', color: '#ff4500', marginTop: '5px' }}>{data.data.temperature}°C</span>                        
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
            {/* New charts */}
            <br></br>
            <div className='flex align-bottom justify-center h-max relative'>
                <RainfallBarChart />
            </div>
            <div className='flex align-bottom justify-center h-max'>
                <DailyPredictionChart />
            </div>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => setModalOpen(true)}
            >
                View Past Rainfall
            </button>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative">
                        <button 
                            className="absolute top-2 right-2 text-gray-500 hover:text-black-700"
                            onClick={() => setModalOpen(false)}
                        >
                            &times;
                        </button>
                        <div className="flex flex-row items-center">
                            <img src={img1} alt="Image 1" className="mb-4 w-1/3"/>
                            <img src={img2} alt="Image 2" className="mb-4 w-1/3"/>
                            <img src={img3} alt="Image 3" className="mb-4 w-1/3"/>
                        </div>
                    </div>
                </div>
            )}
        </div>  
    );
}

// Options for the new charts
const barChartOptions = {
    title: "Hourly Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 14, bold: true },
    hAxis: { 
        title: "Time", 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedText: true,
        slantedTextAngle: 45 
    },
    vAxis: { 
        title: "Rainfall (mm)",
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff" }, 
        minValue: 0 
    },
    chartArea: { width: "90%", height: "70%" },
    backgroundColor: 'transparent',
    colors: ['#76A7FA', '#ff4500'],
    isStacked: true,
};

const dailyPredictionOptions = {
    title: "Daily Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 16, bold: true, align: 'center' },
    hAxis: { 
        title: "Day", 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" } 
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff" }, fontSize: 16,
        minValue: 0 
    },
    chartArea: { width: "80%", height: "70%" },
    backgroundColor: 'transparent',
};

// Dummy data for the new charts
const rainfallBarChartData = [
    ["Time", "Rainfall (Past 6 hrs)", "Rainfall (Next 24 hrs)"],
    ["10 AM", 1.5, 0],
    ["11 AM", 2, 0],
    ["12 PM", 0.5, 0],
    ["1 PM", 1, 0],
    ["2 PM", 3, 0],
    ["3 PM", 2.5, 0],
    ["4 PM", 0, 3],
    ["5 PM", 0, 4.5],
    ["6 PM", 0, 5],
    ["7 PM", 0, 3],
    ["8 PM", 0, 4.5],
    ["9 PM", 0, 5],
    ["10 PM", 0, 3.5],
    ["11 PM", 0, 2.5],
    ["12 AM", 0, 3],
    ["1 AM", 0, 4],
    ["2 AM", 0, 3.5],
    ["3 AM", 0, 3],
    ["4 AM", 0, 2.5],
    ["5 AM", 0, 4],
    ["6 AM", 0, 3],
    ["7 AM", 0, 2.5],
    ["8 AM", 0, 4],
    ["9 AM", 0, 3.5],
    ["10 AM", 0, 2],
    ["11 AM", 0, 4],
    ["12 PM", 0, 3],
    ["1 PM", 0, 3.5],
    ["2 PM", 0, 4],
    ["3 PM", 0, 5],
];

const dailyPredictionChartData = [
    ["Day", "Rainfall"],
    ["2 Days Ago", 1.5],
    ["Day Before Yesterday", 2],
    ["Yesterday", 2.5],
    ["Today", 3],
    ["Tomorrow", 2],
    ["Day After Tomorrow", 3.5]
];

function RainfallBarChart() {
    return (
        
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="300px"
                    data={rainfallBarChartData}
                    options={barChartOptions}
                />
            
    );
}

function DailyPredictionChart() {
    return (
        <Chart
            chartType="ColumnChart"
            width="110%"
            height="250px"
            data={dailyPredictionChartData}
            options={dailyPredictionOptions}
        />
    );
}
