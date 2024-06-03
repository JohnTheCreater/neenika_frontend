import React, { useContext, useState } from "react";
import LayOut from "../../LayOut/LayOut";
import DropdownL from "../DropdownL";
import DateContext from "../DateContext"; // Import the context

import LayoutR from "./layout/LayoutR";
import { useLocation, useParams } from "react-router-dom";

function Report() {
  const options = ["Madurai", "Karisal", "Production"];

  const [selectedLocationKey, setSelectedLocationKey] = useState({
    key: options[0],
    index: 0,
  });

  const columns = [
    { 1: "1 ltr", 2: "1/2 ltr", 3: "200 ml", 4: "100 ml", 5: "oil cake" },
    { 1: "1 ltr", 2: "1/2 ltr", 3: "200 ml", 4: "100 ml", 5: "oil cake" },
    {
      1: "credited",
      2: "used",
      3: "grinded",
      4: "produced",
      5: "oil cake",
      6: "saled oil",
      7: "saled oil cake",
    },
  ];

  const locationData = {
    Madurai: [
      { ltr: 1, half_ltr: 4, ml_200: 80, ml_100: 10, o_cake: 20 },
      { ltr: 0, half_ltr: 2, ml_200: 0, ml_100: 0, o_cake: 20 },
      { ltr: 12, half_ltr: 20, ml_200: 5, ml_100: 2, o_cake: 20 },
    ],
    Karisal: [
      { ltr: 0, half_ltr: 3, ml_200: 0, ml_100: 10, o_cake: 20 },
      { ltr: 0, half_ltr: 2, ml_200: 0, ml_100: 0, o_cake: 20 },
      { ltr: 0, half_ltr: 2, ml_200: 5, ml_100: 9, o_cake: 20 },
    ],
    Production: [
      {
        credited: 10,
        used: 20,
        grinded: 2,
        produced: 10,
        punnaku: 30,
        saled_oil: 30,
        saled_punnaku: 40,
      },
      {
        credited: 10,
        used: 20,
        grinded: 2,
        produced: 10,
        punnaku: 30,
        saled_oil: 30,
        saled_punnaku: 40,
      },
      {
        credited: 10,
        used: 20,
        grinded: 2,
        produced: 10,
        punnaku: 30,
        saled_oil: 30,
        saled_punnaku: 40,
      },
    ],
  };

  const handleLocationChange = (locationKey) => {
    const index = options.indexOf(locationKey);
    setSelectedLocationKey({ key: locationKey, index: index });
  };

  console.log(
    "Selected location key:",
    selectedLocationKey.index,
    Object.keys(locationData)
  );

  const { date, month, year } = useParams();
  return (
    <LayOut>
      <div className="h-[calc(100vh-5rem)]  p-2  ">
        <div className="flex justify-between m-5 ">
          <DropdownL
            className=""
            mx={"0"}
            options={Object.keys(locationData)}
            current={selectedLocationKey.key}
            onSelect={handleLocationChange}
            color={"bg-neutral"}
            textColor={"white"}
            size={"40"}
          />
          <div className=""></div>
          <div className="border min-w-40 max-w-40 flex justify-center rounded-box bg-neutral text-white  p-2">
            {date} / {month} / {year}
          </div>
        </div>
        <LayoutR
          products={locationData[selectedLocationKey.key]}
          shop={selectedLocationKey.key}
          columns={columns[selectedLocationKey.index]}
          date={`${year}-${month}-${date}`}
        />
      </div>
    </LayOut>
  );
}

export default Report;
