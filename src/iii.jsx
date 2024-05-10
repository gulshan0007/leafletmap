// Index.js
import React, { Suspense, useEffect, useState } from 'react';

import SearchBar from './components/widget/Searchbar';
import Widget from './components/widget/Widget';



import Base from './base';



function Iii(){
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className='min-h-screen overflow-x-hidden'>
            <div className="hero bg-cover h-max bg-[url('/img/index/herobg.png')] bg-fixed relative">
                <div className='bg-[rgba(0,0,0,0.1)] pt-10 px-10  h-screen '>
                   
                    <div className='flex justify-between'>
                        <div className=''>
                            <div className='flex flex-col'>
                                <Base/>
                            </div>

                        </div>
                        <di v className='flex flex-col justify-around relative'>
                            <div className='flex justify-center items-center w-full mx-auto h-20 relative top-20 text-white origin-bottom'>
                                <SearchBar setSelectedOption={setSelectedOption} />
                            </div>
                            <div className='flex justify-center items-center w-full mx-auto relative text-white scale-[.85]
                             origin-cenetr'>
                                    <Widget selectedOption={selectedOption} />
                            </div>  
                        </di>
                    </div>
                    

                </div>

            </div>
            
            
        </div>
    )
}



export default Iii;
