import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="h-20 mx-auto shadow-xl bg-white z-20 flex flex-col justify-center">
            <div className="h-full flex justify-evenly text-center w-11/12">
                <div className='h-full flex gap-5 mt-[.5rem]'>
                    <img src="/img/hdfcergo.png" alt="logo" style={{height: '4rem'}} />
                    <img src="/img/iitb.png" alt="logo" className='' 
                    style={{ height: '4rem' }}
                    />
                </div>
                <h1 className='font-bold text-2xl flex flex-col justify-center'>Mumbai Flood Warning System</h1>
                <ul className="flex space-x-5 h-full">
                    <li>
                        <Link to="/" className="hover:underline h-full bold text-lg flex flex-col justify-center hover:text-violet-500">Home</Link>
                    </li>
                    <li>
                        <Link to="/train" className="hover:underline h-full bold text-lg flex flex-col justify-center hover:text-violet-500">Train</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:underline h-full bold text-lg flex flex-col justify-center hover:text-violet-500">Past Data</Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:underline h-full bold text-lg flex flex-col justify-center hover:text-violet-500">About</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
