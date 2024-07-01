import React, { useEffect } from "react";
import { useState } from "react";
//
import Search from "../../Search";
import DropdownL from "../../DropdownL";
import ToggleButton from "./ToggleButton";
import { TiMinusOutline } from "react-icons/ti";
import { TiPlusOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../config";

// const InputEx = () => (
//   <Input icon="users" iconPosition="left" placeholder="Search users..." />
// );
const MoneyBox = ({ lend, paid }) => {
  return (
    <div className="bg-neutral  text-neutral-content w-[60%] p-3 rounded-box ">
      <div className="flex justify-between  p-1">
        <span className="flex justify-center items-center">unpaid</span>
        <div className="p-1 border bg-white text-black rounded-md flex items-center justify-center w-20">
          {lend}
        </div>
      </div>
      <div className="flex justify-between p-1">
        <span className="flex justify-center items-center">Recived</span>
        <div className="p-1 border text-black bg-white rounded-md flex items-center justify-center w-20">
          {paid}
        </div>
      </div>
    </div>
  );
};

const Edit = ({ setEditMode, date, list1, userList, shop }) => {
  const colorClasses = {
    red: "bg-red-500 text-white",
    yellow: "bg-yellow-500 ",
    blue: "bg-primary text-white",
  };
  const color = ["red", "yellow", "blue"];

  const options = ["1 ltr", "1/2 ltr", "200 ml", "100 ml", "cake"];
  const oil_options = ["Sesame", "Groundnut", "Coconut"];
  // const shop_options = ["madurai", "karisal"];
  const [selectedName, setSelectedName] = useState("");
  const [size, setSize] = useState(options[0]);
  const [sizeIndex, setSizeIndex] = useState(1);

  const [oil, setOil] = useState(oil_options[0]);
  const [oilIndex, setOilIndex] = useState(1);

  const [quantity, setQuantity] = useState("1");
  const [key, setKey] = useState(color[0]);
  const [list, setList] = useState([]);
  const [noName, setNoName] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [isSubmitClicked,setIsSubmitClicked]=useState(false)
  const [error,setError]=useState({message:"",state:false})
  const [isAdd,setIsAdd]=useState(false);
  useEffect(() => {
    setList(list1);
    console.log("new list", list1);
    // setSizeIndex(list1.)
    //       set
  }, [list1]);

  const insertSales = () => {
    console.log("list  hehe", list);
    setIsSubmitClicked(true)

    axios
      .post(`${API_URL}/api/insertSales`, { list, date, shop })
      .then((res) => {
        console.log("res", res);
        setEditMode(false);
      });
  };

  useEffect(() => {
    // console.log("user list", userList);
    setData(userList.map((user) => user.full_name));
  }, [userList]);

  const handleSelect = (name) => {
    // console.log(name);
    setSelectedName(name);
    let user = userList.find((user) => user.full_name === name);
    setUserId(user.user_id);
    // console.log("user id", userId);
    setNoName(false);
  };

  const handleSelectSize = (option) => {
    let size_index = options.indexOf(option) + 1;
    setSizeIndex(size_index);
    setSize(option);
  };

  const handleSelectOil = (option) => {
    setOil(option);
    const keyValue = oil_options.indexOf(option) + 1;
    setOilIndex(keyValue);
    setKey(color[keyValue - 1]);
    // console.log(keyValue);
  };

  const handleSubmit = () => {
    if (selectedName === "") {
      setNoName(true);
    } else {
      const newList = [
        ...list,
        {
          selectedName,
          user_id: userId,
          size,
          volume_id: sizeIndex,
          oil,
          product_id: oilIndex,
          quantity,
          key,
          isChecked,
          shop,
        },
      ];
      if(list.find((item)=>item.user_id===userId&&item.volume_id===sizeIndex&&item.product_id===oilIndex))
      {
        setError({message:"already have this user with this produuct! kindly update quantity!",state:true})
      }
      else{
        setList(newList);
        setIsAdd(false);
      }
        setUserId("");
        setSelectedName("");
        setSize(options[0]);
        setOil(oil_options[0]);
        setQuantity(1);
        setIsChecked(false);
        setKey(color[0]);
        setNoName(true);

      
    
    }
  };
  const handleMinus = (item) => {
    if (item.quantity > 1) {
      const newList = [...list];
      const index = newList.indexOf(item);
      newList[index] = { ...item, quantity: Number(item.quantity) - 1 };
      setList(newList);
    }
  };
  const handlePlus = (item) => {
    // console.log(item);
    const newList = [...list];
    const index = newList.indexOf(item);
    newList[index] = { ...item, quantity: Number(item.quantity) + 1 };
    setList(newList);
  };
  const handleRemove = (item) => {
    const newList = list.filter((currentItem) => currentItem !== item);
    setList(newList);
  };
  // useEffect(() => {
  //   const newList = list.map(item => {
  //     const user = userList.find(user => user.user_id == item.user_id);
  //     return {
  //       selectedName: user?.full_name,
  //       userId: item.user_id,
  //       sizeIndex: item.volume_id,
  //       oil: oil_options[item.product_id - 1],
  //       oilIndex: item.product_id,
  //       quantity: item.quantity,
  //       key: color[item.product_id - 1],
  //       isChecked: item.purchase_type,
  //     };
  //   });
  //   setList(newList);
  //   console.log('jjjjjj',list)
  // }, []);

  return (
    <div className="absolute glass  bg-opacity-50 text-white flex-col z-20 flex  p-4 rounded-[1rem] md:h-[80%] h-full w-full ">
           <div>
          <button
            onClick={() => {
              setEditMode(false);
            }}
            type="button"
            className="w-20 btn hover:bg-red-700 text-white bg-red-500"
          >
            back
          </button>
          </div>
      <div className="h-full w-full flex flex-col md:flex-row md:justify-between">
   
        {
          error.state&&<div className="absolute rounded-[.3rem] mx-[30%] text-black z-50 bg-white  border">
            <div className="flex flex-col">
            <div className="p-4 max-w-60 font-bold">{error.message}</div>
            <button className="btn bg-yellow-500 hover:bg-yellow-600 btn-warning" onClick={()=>setError({message:"",state:false})}>ok</button>
            </div>
            
          </div>
        }
        <div className="flex mt-2 md:w-[50%] h-full flex-col justify-center items-center ">
          <div className="bg-gray-200 min-w-[80%] min-h-[50%] max-h-[50%] h-[50%] text-black md:w-[35vw] w-full overflow-auto  rounded-2xl ">
            <div className="">
              {list?list.map((item, index) => {
                const user = userList.find(
                  (user) => user.user_id === item.user_id
                );

                return (
                  <div
                    className={`m-5 ${
                      colorClasses[color[item.product_id - 1]]
                    } rounded-[1rem] flex  items-center justify-center justify-between p-4 `}
                  >
                    <div className="min-w-[30%] text-xl font-bold max-w-[30%]">
                      <p>{user?.full_name}</p>
                      <div className=" text-sm ">
                        <p>{oil_options[item.product_id - 1]}</p>
                      </div>
                    </div>

                    <div className="text-2xl">
                      <p>{options[item.volume_id - 1]}</p>
                    </div>
                    <div className="flex gap-2 justify-between">
                      <button
                        className="rounded-[100%] w-5 flex justify-center items-center  bg-black"
                        onClick={() => handleMinus(item)}
                      >
                        <TiMinusOutline color="yellow" />
                      </button>
                      <div className="flex justify-center  items-center min-w-8 rounded-[.3rem] bg-white text-black">
                        {" "}
                        <p>{item.quantity}</p>
                      </div>
                      <button
                        className="rounded-[100%] w-5 flex justify-center items-center  bg-black"
                        onClick={() => handlePlus(item)}
                      >
                        <TiPlusOutline color="yellow" />
                      </button>
                    </div>
                    <div className="">
                      <button onClick={() => handleRemove(item)}>
                        <ImCross />
                      </button>
                    </div>
                  </div>
                );
              }):<div className="text-black">no data!</div>}
            </div>
          </div>
          <div className="mt-4 ">
            <button className="btn btn-success  " onClick={insertSales}>
              {isSubmitClicked?<span className="loading loading-spinner text-success"></span>
:"submit"}
            </button>
          </div>
          <div className="flex w-full justify-end">
          <button className="btn  bg-green-500 hover:bg-green-700 text-white " onClick={()=>setIsAdd(true)}>add</button>
          </div>
        </div>

       {isAdd&& <div className={` md:p-0 w-full absolute md:mx-[50%]  md:z-0 my-10 md:flex  md:my-[-5%] md:w-[50%] md:flex md:flex-col   md:justify-center md:items-center h-[100%] `}>
          <div className="border flex gap-6 h-full rounded-[1rem] flex-col bg-white text-black p-10  w-[80%] h-[80%]">
            <div className="flex flex-shrink justify-between items-center   z-40 h-[15%] w-[100%] ">
              <span className="flex items-center justify-center text-xl ">
                name:
              </span>
              <Search
                key={selectedName}
                selectedName={selectedName}
                data={data}
                onNameSelect={handleSelect}
                setNoName={setNoName}
                setSelectedName={setSelectedName}
                size={"[50%] "}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex     min-h-[8vh] w-[100%] ">
                <DropdownL
                  options={oil_options}
                  current={oil}
                  onSelect={handleSelectOil}
                  color={"bg-blue-500 z-40"}
                  hoverColor={"bg-red-500"}
                  size={"40  "}
                  textColor={"white"}
                />
              </div>
              <div className="flex     min-h-[8vh] w-[100%] ">
                <DropdownL
                  options={options}
                  current={size}
                  onSelect={handleSelectSize}
                  color={"bg-blue-500"}
                  hoverColor={"bg-red-500"}
                  size={"40"}
                  textColor={"white"}
                  
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between ">
                <span className="flex items-center justify-center text-xl">
                  quantity:
                </span>
                <div className="flex justify-center ">
                  <input
                    value={quantity}
                    onChange={(e) => {
                      if (
                        Number(e.target.value) >= 1 ||
                        e.target.value === ""
                      ) {
                        setQuantity(e.target.value);
                      }
                    }}
                    type="number"
                    className=" p-1 border rounded-[0.4rem] w-[30%] no-arrows"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between ">
              <span className="flex items-center justify-center text-xl">
                payment:
              </span>
              <ToggleButton isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>
            {/* <div className="flex justify-between ">
              <span className="flex items-center justify-center text-xl">
                shop:
              </span>
              <DropdownL
                  options={shop_options}
                  current={shop}
                  onSelect={handleSelectShop}
                  color={"bg-blue-500"}
                  hoverColor={"bg-red-500"}
                  size={"40"}
                  textColor={"white"}
                />
            </div> */}
            <div className=" flex justify-center   bottom-4">
              <button
                type="submit"
                className={`btn  bg-green-500 hover:bg-green-600 text-black  ${
                  noName ? "bg-opacity-50" : ""
                } `}
                disabled={noName}
                onClick={handleSubmit}
              >
                add
              </button>
            </div>
            <button className=" btn bg-red-400 hover:bg-red-600 text-white" onClick={()=>setIsAdd(false)}> back</button>
          </div>
        </div>}

      </div>
    </div>
  );
};

const DayReport = ({ products, columns, sums, date, shop }) => {
  const type = ["Sesame", "Groundnut", "Coconut"];
  const color = ["red", "yellow", "blue"];

  const colorClasses = {
    red: "bg-red-200 text-black",
    blue: "bg-blue-200 text-black",
    yellow: "bg-yellow-200 text-black",
  };
  const colorClassesTitle = {
    red: "bg-red-400 text-white",
    blue: "bg-blue-400 text-white",
    yellow: "bg-yellow-400",
  };
  const nav = useNavigate();

  const navAddStack = () => {
    nav(`/addstack/${date}/${shop}`);
  };

  return (
    <div className="flex gap-3 md:h-80 md:mr-40 md:ml-10 mt-0 flex-col items-center">
      <div>
        <span className="text-2xl flex justify-center">day's Report</span>
      </div>

      <div className="flex gap-6 p-1 mb-2 flex-col md:flex-row justify-center items-center q border glass bg-neutral rounded-box shadow-xl w-[100%]">
        {products.map((product, index) => {
          return (
            <div
              className={`flex border  glass ${
                colorClasses[color[index % color.length]]
              } rounded-box flex-col  justify-between w-[50%] p-1`}
            >
              <div
                className={`flex justify-center rounded-box text-lg ${
                  colorClassesTitle[color[index % color.length]]
                }`}
              >
                {type[index]}
              </div>
              {Object.keys(columns).map((item) => {
                return (
                  <div className={`flex p-1`}>
                    <span className="w-36 m-1">{columns[item]}</span>
                    <div className="  p-1 w-[40%] flex justify-center text-black  bg-white rounded-md flex items-center justify-center  items-center">
                      <span className="min-w-full min-h-5 flex justify-center">
                        {sums[index + 1] && sums[index + 1][item]
                          ? sums[index + 1][item].size
                          : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="w-[95%] flex justify-between ">
        <div></div>
        <div>
          <button
            className="btn btn-neutral "
            onClick={navAddStack}
            type="button"
          >
            add stack
          </button>
        </div>
      </div>
    </div>
  );
};

function ReportLayOut({ products, columns, date, shop }) {
  const [editMode, setEditMode] = useState(false);
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [lend, setLend] = useState(0);
  const [paid, setPaid] = useState(0);
  useEffect(() => {
    let totalPaid = 0;
    let totalLend = 0;
    list.forEach((item) => {
      if (item.isChecked) totalPaid += parseInt(item.total_price);
      else totalLend += parseInt(item.total_price);
    });
    setPaid(totalPaid);
    setLend(totalLend);
  }, [list]);

  const colorClasses = {
    1: "bg-red-400 text-white",
    2: "bg-yellow-400",
    3: " bg-primary text-white",
  };

  const oil_options = ["sesame", "groundnut", "coconut"];
  const size_options = ["1 ltr", "1/2 ltr", "200ml", "100ml", "cake"];
  useEffect(() => {
    axios
      .post(`${API_URL}/api/getSales`, { date, shop })
      .then((res) => {
        setList(res.data);
        get_list();
      });
  }, [editMode, shop,date]);
  const get_list = () => {
    axios
      .post(`${API_URL}/api/getCustomer`)
      .then((res) => {
        setUserList(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  if (!Array.isArray(products)) {
    // Return a message or render an empty state if products is not an array
    return <p>No products available</p>;
  }

  const sums = list.reduce((arr, item) => {
    if (!arr[item.product_id]) {
      arr[item.product_id] = {};
    }
    if (!arr[item.product_id][item.volume_id]) {
      arr[item.product_id][item.volume_id] = { size: 0 };
    }
    arr[item.product_id][item.volume_id].size += item.quantity;
    return arr;
  }, {});

  return (
    <>
      <div className=" relative  h-full w-full   ">
        <div className=" z-40">
          {editMode && (
            <Edit
              setEditMode={setEditMode}
              date={date}
              list1={list}
              userList={userList}
              shop={shop}
            />
          )}
        </div>

        <div className="flex justify-end md:mr-10 w-full"></div>
        <div className="md:flex justify-between  md:pl-20 gap-20 h-[100%] w-[100%] ">
          <div className=" w-[100%] h-[100%] flex flex-col  items-center gap-5">
            <h1 className="flex     text-2xl">sold products</h1>
            <div className="border overflow-auto glass bg-neutral w-full md:w-[25vw] md:min-h-[50%] md:max-h-[50%] min-h-[50%] max-h-[50%]  rounded-box ">
              <div className="overflow-auto m-3">
                {list.map((item, index) => {
                  const user = userList.find(
                    (user) => user.user_id === item.user_id
                  );

                  return (
                    <div
                      className={`m-3 ${
                        colorClasses[item.product_id]
                      } rounded-[1rem] flex  items-center justify-center justify-between p-4 `}
                    >
                      <div className="min-w-[30%] max-w-[60%]">
                        <div className="w-full h-full">
                          {
                            user? <p>{user.full_name}</p>:<div className="skeleton min-w-full h-full w-full min-h-full glass  flex justify-center items-center text-sm">loading..</div>
                          }
                         
                        </div>
                        <div className="min-w-[30%] max-w-[30%] text-sm">
                          <p>{oil_options[item.product_id - 1]}</p>
                        </div>
                      </div>

                      <div className="bg-white text-black p-2 rounded-box">
                        <p>{size_options[item.volume_id - 1]}</p>
                      </div>
                      <div className="bg-neutral text-white rounded-[8rem] p-2">
                        <p className="min-w-6 flex items-center justify-center">
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" w-[95%] flex  justify-between ">
              <div>
                <button
                  className="btn btn-neutral  flex justify-center items-center"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  edit
                </button>
              </div>
              <MoneyBox lend={lend} paid={paid} />
            </div>
          </div>
          <DayReport
            products={products}
            columns={columns}
            sums={sums}
            date={date}
            shop={shop === "Madurai" ? 1 : 2}
          />
        </div>
      </div>
    </>
  );
}

export default ReportLayOut;
