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
        <div className='relative text-xl w-[30rem] bg-black bg-opacity-20 rounded-xl h-max mx-0 my-0 flex flex-col p-2 shadow-lg z-10'>
            <div className='relative flex justify-center '>
                {/* Display current date, time, and temperature */}
                
                
                <div className='w-1/3 flex justify-evenly mx-0'>
                    <div className='flex flex-col text-center'>
                        <img src={clou} alt="IIT Logo" width="20" height="20" align="center"/>
                        <span className='text-black text-lg'>{data.data.temperature}°C</span>                        
                    </div>
                </div>
                <div className='w-1/3 flex justify-evenly text-sm text-black flex-col text-center'>
                    <span className='mx-auto'>                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    {data.station.name}
                </div>
                <div className='w-1/3 flex justify-evenly mx-0 my-1'>
                    <div className='flex flex-col text-center'>
                        <button className="alert-button" onClick={() => alert('Report Flood')}>
                            Report Flood
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-col align-bottom justify-center h-max relative'>
                <RainfallBarChart />
            </div>
            <div className='flex-col align-bottom justify-center h-max'>
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
    titleTextStyle: { color: "#fff", fontSize: 14, bold: true, alignment: 'center' },
    
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "black", fontSize: 10 },
        slantedText: true,
        slantedTextAngle: 90,
    },
    vAxis: { 
        title: "Rainfall (mm)",
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "black", fontSize: 10 }, 
        minValue: 0,
        gridlines: { count: 6, color: '#ccc' }, // Add 6 horizontal reference lines
    },
    chartArea: { width: "90%", height: "50%" },
    backgroundColor: 'transparent',
    legend: { position: 'bottom', alignment: 'center', textStyle: { color: '#fff' } },
    colors: ['#D4D4D4', '#ff4500'],
    isStacked: true,
};

const dailyPredictionOptions = {
    title: "Daily Rainfall Forecast",
    titleTextStyle: { color: "#fff", fontSize: 14, bold: true },
    hAxis: { 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedTextAngle: 0,
        textStyle: { color: "#fff" }, fontSize: 8,
    },
    vAxis: { 
        title: "Rainfall (mm)",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff" }, fontSize: 8,
        minValue: 0,
        gridlines: { color: 'none' } 
    },
    chartArea: { width: "90%", height: "50%" },
    backgroundColor: 'transparent',
    // legend: { position: 'down', alignment: 'end', textStyle: { color: '#fff' } }, 
    // series: {
    //     0: { color: 'green', labelInLegend: '0 to 7 mm' },
    //     1: { color: 'yellow', labelInLegend: '7 to 36 mm' },
    //     2: { color: 'orange', labelInLegend: '36 to 124 mm' },
    //     3: { color: 'red', labelInLegend: 'above 124 mm' },
    // },
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

// Dummy data for daily prediction chart with color
const dailyPredictionChartData = [
    ["Day", "Rainfall", { role: "style" }],
    ["2 Days Ago", 1.5, "#00215E"], // Green
    ["Day Before Yesterday", 2, "#00215E"], // Green
    ["Yesterday", 50, "#00215E"], // Red
    ["Today", 150, getColor(150)], // Orange
    ["Tomorrow", 20, getColor(20)], // Orange
    ["Day After Tomorrow", 3.5, getColor(3.5)] // Yellow
];

// Function to determine color based on rainfall value
function getColor(rainfall) {
    if (rainfall > 124) {
        return "#FF0000"; // Red
    } else if (rainfall >= 36 && rainfall <= 124) {
        return "#FFA500"; // Orange
    } else if (rainfall >= 7 && rainfall < 36) {
        return "#FFFF00"; // Yellow
    } else {
        return "green"; // Green
    }
}

function RainfallBarChart() {
    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="200px"
            data={rainfallBarChartData}
            options={barChartOptions}
            className='bg-black bg-opacity-20 rounded-xl m-0 font-roboto text-sm'
        />
    );
}

function DailyPredictionChart() {
    return (
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="150px"
            data={dailyPredictionChartData}
            options={dailyPredictionOptions}
            flex="column"
            className='bg-black bg-opacity-20 rounded-xl mt-2'
        />
    );
}

// Add this CSS for the button animation
const styles = `
<style>
    .alert-button {
        background-color: red;
        color: white;
        font-size: 20px;
        padding: 5px;
        border: none;
        border-radius: 10px;
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);
