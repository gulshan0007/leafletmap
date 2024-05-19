import React from 'react';

function TrainFlood() {
  return (
    <div className="flex h-screen">
      <iframe
        src="trainflood.html"
        title="Train HTML"
        className="w-2/3 h-full"
      ></iframe>
      <div className="w-1/3 h-full p-4">
        {/* Information related to the iframe */}
        <h1 className="text-3xl font-bold">Train Flood Information</h1>
        <p className="mt-4">
          The content of the "trainflood.html" file can be displayed here or any other
          related information about the train flood situation.
        </p>
        <ul className="list-disc ml-5 mt-4">
          <li>Current status of the flood</li>
          <li>Affected areas</li>
          <li>Rescue operations underway</li>
          <li>Contact information for help</li>
          <li>Preventive measures</li>
        </ul>
      </div>
    </div>
  );
}

export default TrainFlood;
