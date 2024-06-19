import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

import Drop from "../Dashboard/Report/layout/Drop";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from 'dayjs'
import { API_URL } from "../../config";

const AddRaw = ({ setIsAddRaw, setIsError }) => {
  const [selected, setSelected] = useState(0);
  const list = ["sesame", "groundnut", "coconut"];
  const [rawData, setRawData] = useState({ type: selected, value: 0 });
  const [date, setDate] = useState(new Date());
  const [isCalendarOpen,setIsCalendarOpen]=useState(false)
  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== 0) setRawData({ type: selected, value: value,date:date });
    else e.target.value = "";
  };
  useEffect(()=>{
    console.log(rawData)
  },[rawData])
  useEffect(()=>{
    setIsCalendarOpen(false)

  },[date])

  const handleSubmit = () => {
    if (rawData.value) {
      axios
        .post(`${API_URL}/api/setProductionRawStack`, {
          rawData: rawData,
        })
        .then((result) => {
          console.log(result);
          setIsAddRaw(false);
        });
    } else {
      setIsError({
        message: "you have no value! please enter a value!",
        value: true,
      });
    }
  };

  return (
    <div className="min-w-[20rem] rounded-[.4rem] border border-gray-600 p-4 min-h-[10rem] bg-white">
      {}
      <div className="md:flex justify-between max-w-[95%]">
        <Drop list={list} setSelected={setSelected} />
        <button className="btn m-1" onClick={()=>setIsCalendarOpen(true)}>{dayjs(date).format("DD-MM-YYYY")}</button>
        {isCalendarOpen&&  <div className="absolute">
          {" "}
          <Calendar onChange={setDate} value={date} />
        </div>}
      

        <div className="flex items-center">
          {" "}
          <input
            type="number"
            className="max-w-36 m-2 p-1 border border-gray-200 rounded-[.2rem]"
            placeholder="enter value..."
            onChange={handleChange}
          ></input>
          <span className="font-bold">KG</span>
        </div>
      </div>
      <div className="max-w-[80%] flex justify-between items-center mt-10">
        <button
          className="btn bg-red-500 text-white hover:bg-red-600"
          onClick={() => setIsAddRaw(false)}
        >
          <MdOutlineClose />
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

const DoGrind = ({ setIsDoGrind, setIsError }) => {
  const [selected, setSelected] = useState(0);
  const [grindData, setGrindData] = useState({});
  const [date, setDate] = useState(new Date());
  const [isCalendarOpen,setIsCalendarOpen]=useState(false)

  useEffect(()=>{
    setIsCalendarOpen(false)

  },[date])
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== 0) {
      setGrindData({ ...grindData, [name]: value });
    }
  };

  useEffect(() => {
    setGrindData(prevGrindData => ({ ...prevGrindData, oilType: selected, date: date }));
    }, [selected,date]);

  useEffect(() => {
    console.log(grindData);
  }, [selected, grindData]);

  const handleSubmit=()=>{
    if(grindData.used&&grindData.grind&&grindData.producedCake && grindData.producedOil)
    {
      axios
      .post(`${API_URL}/api/doGrind`, {
        grindData:grindData,
      })
      .then((result) => {
        console.log(result);
        setIsDoGrind(false);
      })
      .catch(err=>setIsError({message:"something is wrong!",value:true}))

    }
    else  
      setIsError({message:"please fill all the details!",value:true})
  }

  return (
    <div className="min-w-full md:min-w-[20rem] rounded-[.4rem] border border-gray-600 p-4 min-h-[10rem] bg-white">
      <div className="md:flex justify-between ">
        <Drop
          list={["sesame", "groundnut", "coconut"]}
          setSelected={setSelected}
        />


        <div className="min-w-full mb-1 max-w-full md:min-w-[25%]  md:max-w-[25%] items-center flex justify-between">
          <lable className="font-bold">used</lable>
          <input
            name="used"
            type="number"
            className="max-w-20 p-1 border border-gray-200 rounded-[.2rem]"
            onChange={handleChange}
          ></input>
        </div>
        <div className="min-w-full max-w-full md:min-w-[18%] items-center flex justify-between">
          <lable className="font-bold">grind</lable>
          <input
            name="grind"
            type="number"
            onChange={handleChange}
            className="max-w-20 md:max-w-10 p-1 border border-gray-200 rounded-[.2rem]"
          ></input>
        </div>
      </div>
      <div className="md:flex mt-5 justify-between w-full">
        {" "}
        <div>
          <div className="flex justify-between items-center min-w-[43%] m-1">
            <lable className="font-bold mr-5">produced oil</lable>
            <div>
              <input
                onChange={handleChange}
                name="producedOil"
                type="number"
                className="max-w-10 p-1 border border-gray-200 rounded-[.2rem]"
              ></input>
              <span className="font-bold p-1">ltr</span>
            </div>
          </div>
          <div className="flex justify-between items-center min-w-[43%] m-1">
            <lable className="font-bold mr-5">produced cake</lable>
            <div>
              <input
                onChange={handleChange}
                name="producedCake"
                type="number"
                className="max-w-10 p-1 border border-gray-200 rounded-[.2rem]"
              ></input>
              <span className="font-bold p-1">kg</span>
            </div>
          </div>
          
        </div>
        <div className="flex items-center">
        <button className="btn m-1" onClick={()=>setIsCalendarOpen(true)}>{dayjs(date).format("DD-MM-YYYY")}</button>
        {isCalendarOpen&&  <div className="absolute">
          {" "}
          <Calendar onChange={setDate} value={date} />
        </div>}
        </div>
        <div className="flex justify-between items-center min-w-[30%]">
          <button
            className="btn bg-red-500 text-white hover:bg-red-600"
            onClick={() => setIsDoGrind(false)}
          >
            {" "}
            <MdOutlineClose />
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};

const Production = () => {
  const color = ["red", "yellow", "blue"];
  const t=['name','sesame','groundnut','coconut']
  // const products = ["oil", "cake", "raw"];
  const type=useMemo(()=>["sesame","groundnut","coconut"],[])
  const [isAddRaw, setIsAddRaw] = useState(false);
  const [isDoGrind, setIsDoGrind] = useState(false);
  const [prodInfo, setProdInfo] = useState([]);
  const [list, setList] = useState([]);
  const [loglist,setLoglist]=useState([])
  const [startDate,setStartDate]=useState(new Date())
  const [isStartCalendarOpen,setIsStartCalendarOpen]=useState(false)
  const [isEndCalendarOpen,setIsEndCalendarOpen]=useState(false)


  const date=new Date();
  date.setDate(1)
  date.setHours(0,0,0)
  const [endDate,setEndDate]=useState(date)
  const [isError, setIsError] = useState({ message: "", value: false });
  useEffect(() => {
    axios.get(`${API_URL}/api/getProduction`).then((result) => {
      setProdInfo(result.data);
    });
  }, []);

  useEffect(() => {
    setList(() => {
      const obj = Array.isArray(prodInfo)?prodInfo.reduce((acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = [];
        }
        acc[item.type].push(item.stack);
        return acc;
      }, {})
      :[];

      return Object.entries(obj).map(([type, stack]) => ({ type, stack }));
    });
  }, [prodInfo]);

  useEffect(() => {
    console.log("li", list);
  }, [list]);
  useEffect(()=>{
    console.log(startDate,endDate)
    axios.get(`${API_URL}/api/getLog/${startDate}/${endDate}`)
    .then(result=>
      setLoglist(result.data)
      )
      .catch(err=>console.log(err))

      setIsStartCalendarOpen(false)
      setIsEndCalendarOpen(false)

  },[startDate, endDate])

 

  const [modifiedLogList, setModifiedLogList] = useState([]);

  useEffect(() => {
    const newLogList = Array.isArray(loglist)?loglist.map((item,index) => {
      if (item.used) {
        return {
          ...item,
          message: `${item.used} kg raw ${type[item.oil_type]} used, ${item.grinded} grinds and ${item.produced_oil} ltr ${type[item.oil_type]} oil,${item.produced_cake} kg ${type[item.oil_type]} cake  produced on ${dayjs(item.date).format("DD-MM-YYYY")}! `,
          typ: 2,id2:index
        };
      } else {
        return {
          ...item,
          message: `${item.value} kg  raw ${type[item.oil_type]} added on ${dayjs(item.date).format("DD-MM-YYYY ")}!`,
          typ: 1,id2:index
        };
      }
    }):[];
  
    newLogList.sort((a, b) => new Date(b.date) - new Date(a.date));
    setModifiedLogList(newLogList);
  }, [loglist,type]);
  // const log = [
  //   "30 kg raw coconut credtited ",
  //   "30kg raw coconut used ,2grinds and 50 ltr coconut oil recived!",
  //   "45kg raw groundnut credited!",
  //   "30 kg raw coconut credtited ",
  //   "30kg raw coconut used ,2grinds and 50 ltr coconut oil recived!",
  //   "45kg raw groundnut credited!",
  //   "30 kg raw coconut credtited ",
  // ];
  // const stack = [
  //   { sesame: 20, groundnut: 50, coconut: 3 },
  //   { sesame: 20, groundnut: 50, coconut: 3 },
  //   { sesame: 20, groundnut: 50, coconut: 3 },
  // ];
  const metaInfo=["oil","cake","raw"]


  const handleUndo=(item)=>{

    axios.post(`${API_URL}/api/undo`,{id:item.id,type:item.typ})
    .then(result=>{
      console.log("dini",result)
      const newLog=modifiedLogList.filter(prod=>prod.id2!==item.id2);
    setModifiedLogList(newLog)
    })
    .catch(err=>console.log(err))

    

  }
  return (
    <div className="md:flex rounded-[1rem] glass bg-gray-600 p-4 min-w-full min-h-60">
      {isError.value && (
        <div className="max-w-[20%] rounded-[.3rem] min-w-[20%] min-h-[40%] mx-80 absolute bg-neutral text-neutral-content z-[100] ">
          <div className="flex flex-col items-center  justify-center m-4">
            {" "}
            <div className="text-center  font-bold min-h-[50%] flex items-center justify-center">
              {isError.message}
            </div>
            <button
              className="bg-yellow-500 text-black hover:bg-yellow-400 btn border-black mt-7"
              onClick={() => setIsError({ message: "", value: false })}
            >
              ok
            </button>
          </div>
        </div>
      )}
      {isAddRaw && (
        <div className="  absolute min-w-[20%] md:min-w-[40%]    z-40">
          <AddRaw setIsAddRaw={setIsAddRaw} setIsError={setIsError} />
        </div>
      )}
      {isDoGrind && (
        <div className=" absolute  min-w-[20%]  md:min-w-[40%]    z-40">
          <DoGrind setIsDoGrind={setIsDoGrind} setIsError={setIsError} />
        </div>
      )}
      <div className="w-full md:w-[50%]">
        <table className=" w-full md:min-w-[80%] md:max-w-[80%] table table rounded-[.2rem]">
          <thead>
            <tr>
              <th className="glass"></th>
              <th className="bg-red-500 glass text-white">Sesame</th>
              <th className="bg-yellow-500 glass text-white">Groundnut</th>
              <th className="bg-blue-500 glass text-white">Coconut</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
                <th className="glass min-w-40">stack oil</th>

                {oilList.map(((item,index)=>(
                                    <td className={`bg-${color[index]}-200`}>{item.oil_quantity}</td>

                )))}
              </tr>
              <tr>
              <th className="glass min-w-40">stack cake</th>
              {cakeList.map(((item,index)=>(
                                    <td className={`bg-${color[index]}-200`}>{item.oil_quantity}</td>

                )))}
              </tr> */}
            {list.length!==0?
              list.map((items, index) => {
                return (
                  <tr className={``}>
                    <td className="glass text-neutral font-bold">{metaInfo[index]}</td>
                    {items.stack.map((item,index) => (
                      <td className={`bg-${color[index]}-200`}>{item}</td>
                    ))}
                  </tr>
                );
              }):<tr className="h-36">{t.map(item=><td className="skeleton h-full rounded-[0px]"></td>)}</tr>}
          </tbody>
        </table>
        <div className=" min-w-full md:max-w-[80%] md:min-w-[80%] flex justify-between mt-5">
          <button
            className="btn btn-neutral "
            onClick={() => setIsAddRaw(true)}
          >
            {" "}
            add raw
          </button>
          <button
            className="btn btn-neutral"
            onClick={() => setIsDoGrind(true)}
          >
            {" "}
            do grind
          </button>
        </div>
      </div>
      <div className="mt-10">
      <button className="btn m-1" onClick={()=>setIsStartCalendarOpen(!isStartCalendarOpen)}>{dayjs(startDate).format("DD-MM-YYYY")}</button>
      {isStartCalendarOpen&&  <div className="absolute">
          {" "}
          <Calendar onChange={setStartDate} value={startDate} />
        </div>}
        <button className="btn m-1" onClick={()=>setIsEndCalendarOpen(!isEndCalendarOpen)}>{dayjs(endDate).format("DD-MM-YYYY")}</button>
      {isEndCalendarOpen&&  <div className="absolute">
          {" "}
          <Calendar onChange={setEndDate} value={endDate} />
        </div>}

      </div>
     
      <div className=" p-1 overflow-auto min-h-[40vh] max-h-[40vh]  md:min-w-[40%] md:max-w-[40%] bg-white rounded-[1rem]">
        {modifiedLogList?.map((item,index) => (
          <div key={index} className="text-neutral p-1 border-b border-gray-400">
            {item.message}
            <button className="p-1 text-blue-600" onClick={()=>handleUndo(item)}>undo</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Production;
