import React from "react";

import Header from "../../components/header/header";
import LayOut from "../LayOut/LayOut";
import { useState, useEffect } from "react";
import DropdownL from "../Dashboard/DropdownL";
import axios from "axios";
import dayjs from "dayjs";
import { FaBell } from "react-icons/fa";
import Calendar from "react-calendar";

function Sales() {
  const options = ["Madurai", "Karisal"];
  const [current, setCurrent] = useState(options[0]);
  const [list, setList] = useState([]);
  const [userIdList, setUserIdList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [products, setProducts] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const date=new Date()
  date.setDate(1)
  const [startDate,setStartDate]=useState(new Date())
  const [endDate,setEndDate]=useState(date)
  const [isStartCalendarOpen,setIsStartCalendarOpen]=useState(false)
  const [isEndCalendarOpen,setIsEndCalendarOpen]=useState(false)
  const handleSelect = (option) => {
    setCurrent(option);
  };
  useEffect(() => {
    axios
      .post("https://neenika-backend.onrender.com/api/getSales", { shop: current,startDate:startDate,endDate:endDate })
      .then((res) => {
        setList(res.data);
        const userIds = res.data.map((user) => user.user_id);
        setUserIdList(userIds);
        return axios
          .post("https://neenika-backend.onrender.com/api/getCustomer", { list: userIds })
          .then((res) => {
            setUserList(res.data);
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("hi"));
      setIsStartCalendarOpen(false)
      setIsEndCalendarOpen(false)
  }, [current, buttonClicked,startDate,endDate]);
  useEffect(() => {
    axios
      .post(`https://neenika-backend.onrender.com/api/get`, { tableName: "product" })
      .then((result) => {
        console.log("res", result.data);
        setProducts(result.data);
        return axios
          .post(`https://neenika-backend.onrender.com/api/get`, { tableName: "volume" })
          .then((result) => {
            setVolumes(result.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [current]);
  const handlePurchaseChange = (isChecked, saleId) => {
    isChecked = isChecked ? 0 : 1;
    setButtonClicked(true);
    axios
      .post("https://neenika-backend.onrender.com/api/setPurchaseType", { isChecked, saleId })
      .then((result) => {
        console.log(result);
        setButtonClicked(false);
      })
      .catch((err) => console.log(err));
  };
  const handleNotify = (user_id) => {
    axios
      .post("https://neenika-backend.onrender.com/api/sendNotification", { user_id })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  const sendBill = (userId, date) => {
    axios
      .post("https://neenika-backend.onrender.com/api/sendBill", { userId, date })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <LayOut>
      <div className=" h-full space-y-10 p-2 md:p-5">
        <div className="flex"> 
        <div className="flex justify-center items-center">    <DropdownL
          options={options}
          current={current}
          onSelect={handleSelect}
          size={"40"}
          color={"bg-neutral"}
          textColor={"white"}
        />
        </div>
        <div>
        
          <button className="btn " onClick={()=>setIsEndCalendarOpen(!isEndCalendarOpen)}>{dayjs(endDate).format("DD-MM-YYYY")}</button>
          {isEndCalendarOpen&&  <div className="absolute z-40">
          {" "}
          <Calendar onChange={setEndDate} value={endDate} />
        </div>}
        <button className="btn " onClick={()=>setIsStartCalendarOpen(!isStartCalendarOpen)}>{dayjs(startDate).format("DD-MM-YYYY")}</button>
          {isStartCalendarOpen&&  <div className="absolute z-40">
          {" "}
          <Calendar onChange={setStartDate} value={startDate} />
        </div>}

        </div></div>
       
        {/* <button className="btn m-1" onClick={()=>setIsEndCalendarOpen(!isEndCalendarOpen)}>{dayjs(endDate).format("DD-MM-YYYY")}</button> */}
    
   

        <div className="overflow-auto" style={{ maxHeight: '500px' }}>
          <table className="w-[100%] border-1 shadow-xl bg-white   ">
            <thead className="  bg-base sticky top-0">
              <tr className="border bg-white">
                <th className="p-3 ">date</th>
                <th className="p-3 ">customer name</th>
                <th className="p-3 ">product</th>
                <th className="p-3 ">details</th>
                <th className="p-3 ">quantity</th>
                <th className="p-3 ">price</th>
                <th className="  p-3 ">purchase type</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => {
                const dateIST = dayjs(item.date).format("YYYY-MM-DD");
                const purchase_type = item.isChecked ? "paid" : "unpaid";
                const user = userList.find(
                  (user) => user.user_id == item.user_id
                );
                const product = products.find(
                  (product) => product.product_id == item.product_id
                );
                const volume = volumes.find(
                  (volume) => volume.volume_id == item.volume_id
                );
                console.log(volume);
                return (
                  <tr className="border">
                    <td className="p-2 text-center">{dateIST}</td>
                    <td className="p-2 text-center">{user?.full_name}</td>
                    <td className="p-2 text-center">{product?.product_name}</td>
                    <td className="p-2 text-center">{volume?.volume_type}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-center">
                      {parseInt(item.total_price)}
                    </td>
                    <td
                      className={`max-w-80 flex justify-between p-1 text-center bg-white `}
                    >
                      <div className=" min-w-60  flex justify-between">
                        <div
                          className={` p-2 w-full flex justify-between items-center ${
                            item.isChecked
                              ? "text-green-500 border border-green-500"
                              : "text-red-500  border border-red-500"
                          }`}
                        >
                          <div></div>
                          {purchase_type}
                          <div>
                            {!item.isChecked && (
                              <button
                                onClick={() => handleNotify(item.user_id)}
                              >
                                <FaBell />
                              </button>
                            )}
                          </div>
                        </div>
                      
                      <div>
                        <button
                          className="btn btn-outline btn-primary"
                          onClick={() =>
                            handlePurchaseChange(item.isChecked, item.sale_id)
                          }
                        >
                          change
                        </button>
                      </div>
                      </div>
                      {item.isChecked?  <button
                      onClick={() => sendBill(item.user_id, item.date)}
                      className="btn"
                    >
                      send bill
                    </button>:null}
                    
                    </td>
                    {/* <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button> */}
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </LayOut>
  );
}

export default Sales;
