import React, { Suspense, useEffect, useState } from 'react';

import SearchBar from './components/widget/Searchbar';
import Widget from './components/widget/Widget';



import Base from './base';

function Iii({selectedOption}){
    useEffect(() => {
        console.log('selectedOption:', selectedOption);
    } , [selectedOption]);
    return (
     <Widget selectedOption={selectedOption} />
    )
}

export default Iii;
