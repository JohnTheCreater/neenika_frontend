import React, {  useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import DailyReport from "./DailyReport/DailyReport";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";

function Dashboard() {
  const [newDate, setNewDate] = useState(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isActive, setIsActive] = useState({ index: 0, key: newDate });
  const [isActiveYear, setIsActiveYear] = useState(new Date().getFullYear());
  const [isActiveMonth, setIsActiveMonth] = useState(new Date().getMonth());
  // const [dateInfo, setDateInfo] = useState({
  //   date: new Date().getDate(),
  //   month: new Date().getMonth() + 1,
  //   year: new Date().getFullYear(),
  // });
  // const {setDateInfo}=useContext(DateContext)

  const [dates, setDates] = useState({});
  const getMonths = () => {
    const months = [];
    for (let i = 0; i < 3 ; i++) {
      const prevMonth = new Date(newDate);
      console.log("dada:",newDate)
      if(i!=0&&months[i-1]=="jan")
      {
        break;
      }
      prevMonth.setDate(1);
      prevMonth.setMonth(newDate.getMonth() - i);
      console.log(newDate.getMonth() - i);
      const month = prevMonth
        .toLocaleString("default", { month: "short" })
        .toLowerCase();
      months.push(month);
      console.log(months);
      if (prevMonth.getMonth() === 0) {
        setIsActiveYear(isActiveYear);
      }
     
    
    }
    return months;
  };
  const getYears = () => {
    const years = [];
    for (let i = 0; i < 3; i++) {
      const prevYearDate = new Date();
      prevYearDate.setFullYear(year - i);
      const prevYear = prevYearDate.getFullYear();
      years.push(prevYear);

      if (prevYear == 2022) {
        break;
      }
    }
    console.log(years);
    return years;
  };

  const handleNextYear = () => {
    if (year > 2021) {
      setYear(year - 3);
    }
  };

  const handlePrevYear = () => {
    if (year < new Date().getFullYear()) {
      setYear(year + 3);
    }
  };
  const [months, setMonths] = useState([]);

  useEffect(() => {
    setMonths(getMonths());
  }, [newDate]);

  const handlePrevMonth = () => {
    console.log("prev", newDate.getMonth());
    if (newDate.getMonth()>2) {
      const currentDate = new Date(newDate);
      currentDate.setMonth(newDate.getMonth() - 3);
      setNewDate(currentDate);
      setIsActiveMonth(currentDate.getMonth())
      setIsActive({index:0,key:currentDate})
    }
  };
  const handleNextMonth = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (newDate<today&&newDate.getMonth()!=11) {
      const currentDate = new Date(newDate);
      
      currentDate.setMonth(newDate.getMonth() + 3);
      setNewDate(currentDate);
      setIsActiveMonth(currentDate.getMonth());
      setIsActive({index:0,key:currentDate})

    }
  };

  const getDates = (month) => {
    const dates = [];
    const endOfMonth = new Date(isActiveYear, month + 1, 0);
    console.log("month:", month, "year:", isActiveYear);
    // endOfMonth.setHours(0,0,0,0);
    console.log(endOfMonth);
    const today = new Date();
    const startOfMonth = new Date(
      endOfMonth.getFullYear(),
      endOfMonth.getMonth(),
      1
    );
    for (
      let date = startOfMonth;
      date <= endOfMonth;
      date.setDate(date.getDate() + 1)
    ) {
      if (date == today) {
        break;
      }
      dates.push(new Date(date));
    }
    return dates;
  };

  return (
      <LayOut>
        <div className="">
         
         <div className=" rounded-box p-5 md:ml-14 mt-5 md:flex  w-[80%]  h-full md:flex-wrap  ">
            {getDates(isActive.key.getMonth()).map((date, index) => (
               <div
               className="flex  mr-20 mb-10   w-[10%]  gap-2  "
             >
              <NavLink
                to={`/dashboard/report/${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}
                key={index}
                // onClick={() =>
                //   setDateInfo({
                //     date: date.getDate(),
                //     month: date.getMonth() + 1,
                //     year: date.getFullYear(),
                //   })
                // }
              >
                <DailyReport
                  day={date
                    .toLocaleString("default", { weekday: "short" })
                    .toLowerCase()}
                  date={date.getDate()}
                  month={date
                    .toLocaleString("default", { month: "short" })
                    .toLowerCase()}
                  year={date.getFullYear()}
                />
              </NavLink>
              </div>

            ))}
            </div>
          <div className="fixed shadow-left flex flex-col right-0 md:w-[22%] h-[100%] top-20    bg-white">
            <div className="flex justify-center items-center">Year</div>
            {getYears().map((year,index) => (
              <button
              key={index}
                onClick={() => {
                  setIsActiveYear(year);
                  let prevYear;
                  if(year!=new Date().getFullYear())
                    prevYear = new Date(year,2);
                  else
                    prevYear = new Date();

                  setNewDate(prevYear);
                  setIsActiveMonth(prevYear.getMonth())
                  setIsActive({index:0,key:prevYear})
                  
                }}
                className={`btn  m-5 btn-neutral ${
                  year == isActiveYear ? "" : "btn-outline"
                }`}
              >
                {year}
              </button>
            ))}
            <div className="flex justify-between">
              <button className="btn btn-neutral m-1" onClick={handlePrevYear}>
                next{" "}
              </button>
              <button className="btn btn-neutral m-1" onClick={handleNextYear}>
                prev{" "}
              </button>
            </div>
          </div>
          <div className="flex  glass md:justify-center items-center fixed bottom-0 w-[100%] ">
            <div className="flex p-1 gap-2 rounded-box justify-between list-none justify-center w-[20%]">
              <button className="text-2xl" onClick={handleNextMonth}>
                <SlArrowLeftCircle />
              </button>
              <div role="tablist" className="tabs flex tabs-boxed">
                {months.map((month, index) => {
                  return (
                    <button
                      onClick={() => {
                        const currentDate = new Date();
                        console.log("in,", index, month);
                        currentDate.setDate(1);
                        currentDate.setMonth(isActiveMonth - index);
                        currentDate.setFullYear(isActiveYear);
                        console.log("current date:", currentDate);
                        setIsActive({ index: index, key: currentDate });
                        // setIsActiveMonth(currentDate.getMonth())
                        setIsActiveYear(currentDate.getFullYear());
                      }}
                    >
                      <li
                        role="tab"
                        className={`tab rounded-box  ${
                          isActive.index === index ? "text-neutral-content bg-neutral" : ""
                        }`}
                      >
                        <p className="min-w-7">{month}</p>
                      </li>
                    </button>
                  );
                })}
              </div>

              <button className="text-2xl" onClick={handlePrevMonth}>
                <SlArrowRightCircle />
              </button>
            </div>
          </div>
        </div>
      </LayOut>
  );
}

export default Dashboard;
