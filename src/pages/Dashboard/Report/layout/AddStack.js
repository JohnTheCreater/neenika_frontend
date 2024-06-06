import React, { useState } from "react";
import LayOut from "../../../LayOut/LayOut";
import { useNavigate, useParams } from "react-router-dom";
import Drop from "./Drop";
import { FiPlus } from "react-icons/fi";
import dayjs from "dayjs";
import axios from "axios";

const AddStack = () => {
  const [SelectedOil, setSelectedOil] = useState(0);
  const [SelectedOil1, setSelectedOil1] = useState(0);

  const [selectedType, setSelectedType] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [selectedProductType, setSelectedProductType] = useState(0);
  const [oilAndCakeValue, setOilAndCakeValue] = useState("");
  const [bottleAndCapsValue, setBottleAndCapsValue] = useState("");
  const [oilAndCakeList, setOilAndCakeList] = useState([]);
  const [bottleAndCapsList, setBottleAndCapsList] = useState([]);
  const [valueError, setValueError] = useState(false);
  const oil = ["sesame", "groundnut", "coconut"];
  const volume = ["1 ltr", "1/2 ltr", "200 ml", "100 ml"];
  const product = ["oil", "cake"];
  const bottle_product = ["bottle", "cap"];
  const { shop, date } = useParams();
  const nav = useNavigate();
  const handleBack = () => {
    nav(`/dashboard`);
  };
  const handleOilAndCakeChange = (e) => {
    setOilAndCakeValue(e.target.value);
    console.log("hi", oilAndCakeValue);
  };
  const handleBottleAndCapsChange = (e) => {
    setBottleAndCapsValue(e.target.value);
  };
  const handleOilCakeAdd = () => {
    if (oilAndCakeValue > 0) {
      setOilAndCakeList([
        ...oilAndCakeList,
        {
          oil_name: SelectedOil,
          product_type: selectedType,
          quantity: oilAndCakeValue,
          selectedType: selectedType ,
        },
      ]);
    } else {
      setValueError(true);
    }
  };

  const handleBottleAndCapsAdd = () => {
    if (bottleAndCapsValue > 0) {
      setBottleAndCapsList([
        ...bottleAndCapsList,
        {
          oil_name: SelectedOil1,
          volume_type: selectedVolume,
          product_type:selectedProductType,
          quantity: bottleAndCapsValue,
        },
      ]);
    } else {
      setValueError(true);
    }
  };

  const doSubmit=()=>{
    axios.post('https://neenika-backend.onrender.com/api/stackUpdate',{oilAndCake:oilAndCakeList,shop:shop})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
  }

  return (
    <LayOut>
      <div className="p-6 bg-white min-h-[100%] h-full">
        {valueError && (
          <div className=" absolute items-center z-20 mx-[35%] my-[10%]  p-5 bg-white border border-yellow-600 rounded-[.5rem] w-60">
            <div className="flex flex-col p-1">
              <h1 className="text-xl font-medium m-3">wrong value!</h1>
              <h1>Please enter a valid value to add!</h1>
              <button
                onClick={() => setValueError(false)}
                className="btn bg-yellow-500 hover:bg-yellow-600 text-black m-2"
              >
                ok
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center gap-10">
          <div className="p-2 rounded-[.2rem] bg-primary text-white"> {shop === 1 ? "Madurai" : "Karisal"}</div>
          <div className=" btn">{dayjs(date).format("DD-MM-YYYY")}</div>
          
        </div>
        <div className="flex justify-between min-h-[80%] ">
          <div>
            <button
              className="btn  bg-red-500 text-white rounded-[.2rem]"
              onClick={handleBack}
            >
              back
            </button>
          </div>

          <div className="min-w-[90%] min-h-[80vh] flex flex-col gap-2">
            <div className="flex items-center justify-between h-[30vh] ">
              {" "}
              <div>
                <div className="">
                  <h1 className="text-xl font-bold">oil & cake</h1>
                  <div className="flex w-full  items-center justify-between">
                    <Drop list={oil} setSelected={setSelectedOil} />
                    {/*  */}
                    <Drop list={product} setSelected={setSelectedType} />
                    <div>
                      <input
                        type="number"
                        onChange={handleOilAndCakeChange}
                        className="p-2 max-w-20 rounded-[.5rem]  border border-gray-300"
                        title="stack_info"
                        value={oilAndCakeValue}
                      ></input>
                      <label className="text-xl font-medium">
                        {selectedType === 0 ? " ltr" : " kg"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn bg-green-500 hover:bg-green-600 rounded-[.5rem]"
                  onClick={handleOilCakeAdd}
                >
                  {" "}
                  <FiPlus color="white" size={25} />
                </button>
              </div>{" "}
              <div className="min-w-60 max-w-60 h-full  overflow-auto  bg-gray-100 rounded-[.5rem] p-2">
                {oilAndCakeList.map((item) => (
                  <div className=" p-1">
                    <li className="flex justify-between  bg-red-100 rounded-[.5rem]">
                      <div className="font-bold p-2">
                        {product[item.product_type]}
                        <div className="font-medium text-sm">
                          {oil[item.oil_name]}
                        </div>
                      </div>
                      <div className="text-2xl  p-5 font-bold">
                        {item.quantity}
                        {item.selectedType=== 0 ? " ltr" : " kg"}
                      </div>
                    </li>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between h-[30vh]">
              <div>
                <h1 className="text-xl font-bold">Bottles & Caps</h1>
                <div className="flex items-center justify-between">
                  <Drop list={oil} setSelected={setSelectedOil1} />
                  {/*  */}
                  <Drop list={volume} setSelected={setSelectedVolume} />
                  <Drop
                    list={bottle_product}
                    setSelected={setSelectedProductType}
                  />

                  <div>
                    <input
                      type="number"
                      className="p-2 max-w-20 rounded-[.5rem]  border border-gray-300"
                      title="stack_info"
                      onChange={handleBottleAndCapsChange}
                      value={bottleAndCapsValue}
                    ></input>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleBottleAndCapsAdd}
                  className="btn bg-green-500 hover:bg-green-600 rounded-[.5rem]"
                >
                  {" "}
                  <FiPlus color="white" size={25} />
                </button>
              </div>
              <div className="min-w-60 max-w-60 bg-gray-100 overflow-auto rounded-[.5rem] h-full p-3">
                {bottleAndCapsList.map((item) => (
                  <div className=" p-1">
                    <li className="flex justify-between  bg-red-100 rounded-[.5rem]">
                      <div className="flex min-w-[70%] max-w-[70%] items-center justify-between font-bold p-2">
                        <div>
                          {bottle_product[item.product_type]}
                          <div className="font-medium text-sm">
                            {oil[item.oil_name]}
                          </div>
                        </div>

                        <div>{volume[item.volume_type]}</div>
                      </div>
                      <div className="text-2xl  min-w-[30%] flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </li>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-60 mr-60 flex justify-center ">
              <button className="btn bg-green-500 text-white hover:bg-green-600"
              onClick={doSubmit}>
                submit
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </LayOut>
  );
};

export default AddStack;
