import React, { Suspense, useEffect, useState } from 'react';

import SearchBar from './components/widget/Searchbar';
import Widget from './components/widget/Widget';



import Base from './base';
import Widget2 from './components/widget/Widget2';

function Iii2({selectedOption}){
    useEffect(() => {
        console.log('selectedOption:', selectedOption);
    } , [selectedOption]);
    return (
        <div className='min-h-screen overflow-x-hidden'>
            <div className="hero h-max bg-fixed relative">
                <div className=' h-screen '>
                   
                    <div className='flex justify-between'>
                        
                        <div v className='flex flex-col justify-around relative'>
                            
                            <div className='flex justify-center items-center w-full mx-auto relative text-white scale-[.85]
                             origin-cenetr'>
                                    <Widget2 selectedOption={selectedOption} />
                            </div>  
                        </div>
                    </div>
                    

                </div>

            </div>
            
            
        </div>
    )
}

export default Iii2;