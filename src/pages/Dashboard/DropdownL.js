import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';




function DropdownL({ options,current, onSelect,size,color,textColor,hoverColor,mx,padding }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`rounded-[10rem] mx-${mx} w-${size} text-${textColor?textColor:'black'} flex items-center justify-center flex-col   ${color}  ${isDropdownOpen ? 'bg-blue-100' : ''}  z-20`}
    >
      <button type='button' className={`flex p-${padding?padding:'1'} gap-4`} onClick={handleToggleDropdown}>
        <div className=''>{current}</div>
        <div className='mt-1'>
          {isDropdownOpen ? <HiChevronUp /> : <HiChevronDown />}
        </div>
      </button>
      <div className={`w-${size} `}>
      {isDropdownOpen && (  
        <div className={`absolute ${color} w-${size}  border border-indigo-900 rounded-[1rem] p-${padding?padding:'1'}   justify-center items-center z-20`}>
          {/* Additional elements go here */}
          {options.map((option, index) => (
            <button
            type='button'
            className={`flex   flex-col justify-center items-center p-${padding?padding:'1'} w-full hover:bg-red-500 hover:rounded-lg`}
            key={index}
              onClick={() => {
                onSelect(option);
                handleToggleDropdown(); // Close the dropdown after selecting an option
              }}
            ><div className='z-50'>{option}</div>
              
            </button>
            
          ))}
        </div>
      )}
      </div>


    </div>
  );
}

export default DropdownL;