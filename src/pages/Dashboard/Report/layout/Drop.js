import React, { useState } from 'react'

const Drop = ({list,setSelected}) => {
    const [active,setActive]=useState(0)
    const [isOpen,setIsOpen]=useState(false)
    const handleClick=(index,event)=>{
        event.stopPropagation();
        setActive(index);
        setIsOpen(false)
        setSelected(index)
    }
    const handleSummaryClick = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }
  return (
    <div>
      <details className="dropdown" open={isOpen} >
      <summary className="m-1 btn min-w-40" onClick={handleSummaryClick}>{list[active]}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        {list.map((item,index)=>(
                             <li className={`${index==active?'bg-gray-300  rounded-[.5rem]':''}`} onClick={(event)=>handleClick(index,event)}>
                             <a>{item}</a>
                           </li>

                        ))}
                     
                     
                    </ul>
                  </details>
    </div>
  )
}

export default Drop
