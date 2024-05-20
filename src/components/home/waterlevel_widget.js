import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
// import { fetchAllData } from '../../utils/widgetAPI';

export default function WaterlevelWidget({ selectedOption, width, height }) {

    const [data, setData] = useState({ station: { name: '' }, rainfall: [], humidity: [], temperature: [], waterLevel: [] });
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        setData(generateData());
    }, [selectedOption]);

    const handleStationClick = (stationIndex) => {
        setSelectedStation(stationIndex);
    };

    return (
        <div className='relative text-xl w-max bg-black rounded-xl bg-opacity-40 text-white h-max mx-auto flex flex-col p-10 shadow-lg z-10 ' style={{ width, height }}>
            <h5 className='text-center'>CLIMATE STATION</h5>
            <hr className='mb-6'/>
            <div className='relative flex justify-evenly'> 
                <div className='w-1/3 flex justify-evenly flex-col text-center text-xs'>
                    <span className='mx-auto'>                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    {selectedOption ? String(selectedOption.name) : 'Station Name'} 
                </div>
                
            </div>
            <div className='flex align-bottom justify-center h-max relative'>
                <WaterLevelChart data={data.waterLevel} selectedStation={selectedStation} onStationClick={handleStationClick} />
            </div>
        </div>  
    );
}

const waterLevelOptions = {
    title: "Water Level of 9 Stations",
    titleTextStyle: { color: "red", fontSize: 16, bold: true, align: 'center' },
    hAxis: { 
        title: "Stations", 
        titleTextStyle: { color: "#fff" }, 
        textStyle: { color: "#fff" },
        slantedText: true,
        slantedTextAngle: 45 
    },
    vAxis: { 
        title: "Water Level",  
        titleTextStyle: { color: "#fff" },
        textStyle: { color: "#fff" }, fontSize: 16,
        minValue: 0 
    },
    chartArea: { width: "80%", height: "70%" },
    backgroundColor: 'transparent',
    legend: { position: 'none' },
    animation: {
        duration: 1000,
        easing: 'out',
        startup: true,
    },
    selectionMode: 'multiple',
    colors: ['#76A7FA', '#76A7FA', '#76A7FA', '#76A7FA', '#76A7FA', '#76A7FA', '#76A7FA', '#76A7FA', '#76A7FA'],
};

export function WaterLevelChart({ data, selectedStation, onStationClick }) {
    if (!data) {
        return <div>No water level data available</div>;
    }

    const chartData = [["Station", "Water Level"]];
    data.forEach((entry, index) => {
        chartData.push([`Station ${index + 1}`, entry]);
    });

    const chartEvents = [
        {
            eventName: 'select',
            callback({ chartWrapper }) {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                const stationIndex = selection[0].row - 1; // Subtract 1 to adjust for header row
                onStationClick(stationIndex);
            },
        },
    ];
    
    return (
        <Chart
            chartType="ColumnChart"
            width="150%"
            height="400px"
            data={chartData}
            options={waterLevelOptions}
            chartEvents={chartEvents}
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
        waterLevel: [],
    };

    // Dummy data for water level of 9 stations
    for (let i = 0; i < 9; i++) {
        data.waterLevel.push(Math.floor(Math.random() * 100)); // Random water level values
    }
  
    return data;
}
