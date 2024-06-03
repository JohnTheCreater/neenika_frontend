import React from "react";
import DateContext from '../Dashboard/DateContext'; // Replace './DateContext' with the actual path to your DateContext file
import { useState } from 'react';

import Header from "../../components/header/header";

function LayOut({children}){

  return(
      <div className="h-screen  p-0 m-0">
        <div className="flex-none fixed z-40 w-full m-0 p-0"><Header/></div> 
        <div className="flex-grow bg-gray-100  m-0 p-0 min-h-full pt-20 ">{children}</div>
      </div>
  );
}

export default LayOut;