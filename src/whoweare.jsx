import React from 'react';
import './WhoWeAre.css';

const WhoWeAre = () => {
    return (
        <div className="who-we-are">
            <h1>WHO WE ARE</h1>
            <div className="section">
                <h2>Implementing Partners</h2>
                <div className="partners">
                    <img src="path/to/iit-logo.png" alt="IIT Logo" />
                    <img src="path/to/climate-studies-logo.png" alt="Climate Studies Logo" />
                </div>
            </div>
            <div className="section">
                <h2>Sponsoring Partner</h2>
                <div className="partners">
                    <img src="path/to/hdfc-logo.png" alt="HDFC Ergo Logo" />
                </div>
            </div>
            <div className="section">
                <h2>Data Partner</h2>
                <div className="partners">
                    <img src="path/to/mcgm-logo.png" alt="MCGM Logo" />
                </div>
            </div>
            <div className="section">
                <h2>Project Partners</h2>
                <div className="partners">
                    <img src="path/to/mcgm-center-logo.png" alt="MCGM Center Logo" />
                </div>
            </div>
            <div className="iit-team">
                <h2>IIT Bombay Team</h2>
                <ul>
                    <li>Prof. Subimal Ghosh</li>
                    <li>Prof. Raghu Murtugudde</li>
                    <li>Dr. Aniket Navalkar</li>
                    <li>Dr. Mayank Gupta</li>
                    <li>Dr. Sanghita Basu</li>
                    <li>Puja Tripathy</li>
                </ul>
                <p>
                    Website & App developed by IIT Bombay students, Deepak Silaych & Gulshan Kumar
                </p>
            </div>
        </div>
    );
};

export default WhoWeAre;
