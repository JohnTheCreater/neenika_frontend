import React from 'react';

const ToggleButton = ({isChecked,setIsChecked}) => {

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="hidden" checked={isChecked} onChange={toggleCheck} />
        <div className={`toggle__line w-10 h-6 rounded-full shadow-inner ${isChecked ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
        <div className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 ${isChecked && 'left-full transform -translate-x-full'}`}></div>
      </div>
      <div className={`ml-3 min-w-36 font-medium ${isChecked?'text-green-500':'text-red-500'}`}>
        {isChecked ? 'Received' : 'Not Received'}
      </div>
    </label>
  );
};

export default ToggleButton;