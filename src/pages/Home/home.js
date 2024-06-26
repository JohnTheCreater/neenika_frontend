import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import LayOut from "../LayOut/LayOut";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Production from "./Production";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
const Slide = ({ list, shop }) => {
  const oil = ["sesame", "groundnut", "coconut"];
  const volume = ["1 ltr", "1/2 ltr", "200 ml", "100 ml"];
  const color = ["red", "yellow", "blue"];
  const prod = ["bottles", "caps"];
  const shopp = shop === "Madurai" ? 1 : 2;
  const [oilData, setOilData] = useState([]);
  const [oilList, setOilList] = useState([]);
  const [cakeList, setCakeList] = useState([]);

  const splites_list = list.reduce((acc, item) => {
    const productId = item.product_id;
    const stackType = item.stack_type;
    if (!acc[productId]) {
      acc[productId] = {};
    }
    if (!acc[productId][stackType]) acc[productId][stackType] = [];
    acc[productId][stackType].push(item);
    return acc;
  }, {});

  useEffect(() => {
    console.log("splited", list);
  }, [list]);
  useEffect(() => {
    const oil_stack = Array.isArray(oilData)
      ? oilData.reduce((acc, item) => {
          if (item.shop === shopp && item.type === 1) acc.push(item);
          return acc;
        }, [])
      : [];
    console.log(oil_stack);
    setOilList(oil_stack);
    const cake_stack = Array.isArray(oilData)
      ? oilData.reduce((acc, item) => {
          if (item.shop === shopp && item.type === 2) acc.push(item);
          return acc;
        }, [])
      : [];
    setCakeList(cake_stack);
  }, [oilData, shopp]);
  useEffect(() => {
    axios.get(`${API_URL}/api/getOilStack`).then((result) => {
      setOilData(result.data);
      console.log("oil data recived ", result.data);
    });
  }, []);

  return (
    <div className="rounded-[1rem] glass bg-gray-600 p-4 min-w-full min-h-60">
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="h-60 flex flex-col justify-between">
          <div className="min-w-[5%] md:min-w-[20%]">
            <span className="text-2xl text-base-200">{shop} Shop</span>
          </div>
          <table className=" w-full table table-zebra rounded-[.2rem] md:w-[40%]">
            <thead>
              <tr>
                <th className="glass"></th>
                <th className="bg-red-500 glass text-white p-0 md:p-3">
                  Sesame
                </th>
                <th className="bg-yellow-500 glass text-white p-0 md:p-3">
                  Groundnut
                </th>
                <th className="bg-blue-500 glass text-white p-0 md:p-3">
                  Coconut
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="glass  md:min-w-40">stack oil</th>

                {oilList.length !== 0
                  ? oilList.map((item, index) => (
                      <td className={`bg-${color[index]}-200`}>
                        {parseFloat(item.oil_quantity).toFixed(2)}
                      </td>
                    ))
                  : oil.map((item) => (
                      <td className="skeleton rounded-[0px]"></td>
                    ))}
              </tr>
              <tr>
                <th className="glass  md:min-w-40">stack cake</th>
                {cakeList.length !== 0
                  ? cakeList.map((item, index) => (
                      <td className={`bg-${color[index]}-200`}>
                        {parseFloat(item.oil_quantity).toFixed(2)}
                      </td>
                    ))
                  : oil.map((item) => (
                      <td className="skeleton rounded-[0px]"></td>
                    ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="hidden md:flex md:flex-wrap md:justify-between  md:min-w-[50%]">
          {Object.keys(splites_list).length > 0
            ? Object.keys(splites_list).map((key, index) => {
                return (
                  <div className="min-w-[15%] flex  flex-col flex-wrap items-center text-white" key={index}>
                    <h1 className="text-3xl ">{oil[key - 1]}</h1>

                    {Object.keys(splites_list[key]).map((item) => {
                      return (
                        <div>
                          <h1 className="text-xl flex justify-center">
                            {prod[item - 1]}
                          </h1>
                          {splites_list[key][item].map((it) => (
                            <div
                              className={`min-w-40 bg-${
                                color[key - 1]
                              }-400 overflow-hidden text-black rounded-[.2rem]  text-base-200 max-w-60`}
                            >
                              <div className="flex glass p-2 border-b justify-between">
                                <span>{volume[it.volume_id - 1]}</span>
                                <span>{it.stack}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            : Array.from({ length: 6 }).map((_, index) => (
                <div className=" skeleton min-w-[15%] flex flex-col flex-wrap items-center text-gray-700">
                  <h1 className="text-sm">Loading...</h1>
                  {Array.from({ length: Object.keys(splites_list).length }).map(
                    (item) => (
                      <div>
                        <h1 className="text-lg flex justify-center">
                          Loading...
                        </h1>
                        {Array.from({ length: 4 }).map((it) => (
                          <div
                            className={`skeleton min-w-40 overflow-hidden rounded-[.2rem] max-w-60`}
                          >
                            <div className="flex glass p-2 text-sm border-b justify-between">
                              <span>Loading...</span>
                              <span>Loading...</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

function Home() {
  const [data, setData] = useState([]);
  const [maduraiData, setMaduraiData] = useState([]);
  const [karisalData, setKarisalData] = useState([]);
  const nav=useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL}/api/getStack`)
      .then((result) => {
        // console.log("st da",result.data);
        setData(result.data);
        console.log("joshuda", result);
      })
      .catch((err) => console.log(err));
    console.log("er");
  }, []);
  useEffect(() => {
    const madurai_stack = Array.isArray(data)
      ? data.filter((item) => item.shop === 1)
      : [];
    setMaduraiData(madurai_stack);
    const karisal_stack = Array.isArray(data)
      ? data.filter((item) => item.shop === 2)
      : [];
    setKarisalData(karisal_stack);
  }, [data]);

  useEffect(() => {
    console.log("madurai", data, maduraiData);
  }, [data, maduraiData]);

  const settings = {
    dots: true,
    infinite: true,
    cssEase: "ease-in-out",

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <LayOut>
      <div className="p-10">
        <Slider {...settings}>
          <div className="p-2 flex flex-wrap">
            <Slide list={maduraiData} shop={"Madurai"} />
          </div>
          <div className="p-2">
            <Slide list={karisalData} shop={"Karisal"} />
          </div>
        </Slider>
      </div>
      <div className="p-2">
        <Production />
      </div>
      <div className="flex justify-end m-3">
        <button className="btn btn-primary " onClick={()=>nav('/home/products')}>products</button>
      </div>
    </LayOut>
  );
}

export default Home;
