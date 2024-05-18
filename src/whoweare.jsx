import React from 'react';
import './WhoWeAre.css';
import Header from './components/Header';
import iitbLogo from './iitb.png';
import csLogo from '../src/icons/cs.png';
import hdfcLogo from '../src/icons/hdfc.png';
import mcmrLogo from '../src/icons/mcmr.png';

const WhoWeAre = () => {
    return (
        <>
            {/* <Header/> */}
            <div className="who-we-are">
                <h1>WHO WE ARE</h1>
                <div className="content">
                    <div className="left-section">
                        <div className="section">
                            <h2>Implementing Partners</h2>
                            <div className="partners">
                                <img src={iitbLogo} alt="IIT Logo" />
                                <img src={csLogo} alt="Climate Studies Logo" />
                            </div>
                        </div>
                        <div className="section">
                            <h2>Sponsoring Partner</h2>
                            <div className="partners">
                                <img src={hdfcLogo} alt="HDFC Ergo Logo" />
                            </div>
                        </div>
                        {/* <div className="section">
                            <h2>Data Partner</h2>
                            <div className="partners">
                                <img src="path/to/mcgm-logo.png" alt="MCGM Logo" />
                            </div>
                        </div> */}
                        <div className="section">
                            <h2>Project Partners</h2>
                            <div className="partners">
                                <img src={mcmrLogo} alt="MCGM Center Logo" />
                            </div>
                        </div>
                    </div>
                    <div className="right-section">
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
                                Website & App developed by <br/>IIT Bombay students, Deepak <br/>Silaych & Gulshan Kumar
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WhoWeAre;
