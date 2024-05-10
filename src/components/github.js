import React, { useState } from 'react';
import dayjs from 'dayjs';

const GithubCalendar = ({ dataAr }) => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleHover = (e) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const lastTwoMonths = Array.from({ length: 61 }, (_, i) => ({
    date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
    count: 0,
  }));

  const data = lastTwoMonths.map(day => {
    const dataDate = dataAr.find(d => d.date === day.date);
    return dataDate ? dataDate : day;
  });

  const getColor = (count) => {
    if (count === 0) return 'bg-gray-200';
    if (count < 3) return 'bg-green-200';
    if (count < 6) return 'bg-green-400';
    return 'bg-green-600';
  };

  return (
    <div className="github-calendar grid gap-1 w-full max-w-2xl mx-auto" onMouseMove={handleHover}>
      {data.reverse().map((data, index) => (
        <div
          key={index}
          className={`hover-key w-full h-3 rounded ${getColor(data.count)} hover:bg-blue-500`}
          style={{ gridColumn: Math.floor(index /4) + 1 , gridRow: (index % 4)  + 1 }}
        >
          <div className="hover-target fixed duration-75 bg-white border p-2 rounded shadow-lg" style={{ top: hoverPosition.y, left: hoverPosition.x }}>
            <p>Date: {data.date}</p>
            <p>Count: {data.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GithubCalendar;
