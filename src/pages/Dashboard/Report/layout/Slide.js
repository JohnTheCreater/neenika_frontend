import React, { useState } from 'react';

const Slide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleModal} className="px-4 py-2 bg-blue-500 text-white rounded">
        Toggle Modal
      </button>
      <div className={`fixed top-0 left-0 w-64 h-full bg-white transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={toggleModal} className="px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
        {/* Modal content goes here */}
      </div>
    </div>
  );
};

export default Slide;