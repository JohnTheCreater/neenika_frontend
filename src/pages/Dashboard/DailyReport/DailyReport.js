import React from 'react'

function DailyReport({day,date,month,year}) {
  return (
    <div className=' flex shadow-xl rounded-box w-40 h-[100%]  border justify-center  '>
       
        <div className="border  m-0 w-[100%] p-5 h-full  bg-neutral text-white rounded-box backdrop-blur-2xl glass  ">
                    <a href="#" className='' data-page="dashboard/report/report.html" >
                       <div className='flex min-w-5 justify-between text-2xl '>
                            <span className='min-w-5 '>{day}</span>
                            <div className="font-bold "><span className='min-w-10 w-10 '>{date}</span></div>
                        </div>
                        <div className='flex justify-between'>
                        <span className=''>{month}</span>
                        <span className=''>{year}</span>
                          </div>                                            
                        
                    </a>
                </div>
          </div>
    
  )
}

export default DailyReport
