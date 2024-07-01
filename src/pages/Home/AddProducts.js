import axios from "axios";
import React, {  useState } from "react";
import { API_URL } from "../../config";

const AddProducts = () => {
  // const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState({ pname: "", price: "" });
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [error, setError] = useState({ value: false, message: "" });
  const onValueChange = (e) => {
    const { value, name } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setError({ value: false, message: "" });
  };

  const add = () => {
    setIsSubmitClicked(true)
    if (product.pname === "" || product.price === "") {
      setError({ value: true, message: "Please fill All the field!" });
          setIsSubmitClicked(false)

      return;
    }
    axios.post(`${API_URL}/api/addProducts`, {
      pname: product.pname,
      price: product.price,
    })
    .then(res=>{
      if(res.status===200)
        console.log("added");
      else
        console.log("not added");
    });
    setProduct({ pname: "", price: "" });
    setIsSubmitClicked(false)
  };

  return (
    <div className="flex flex-col justify-center items-center md:w-[50%] rounded-[.3rem] p-4 bg-gray-100">
      <div className="m-10 w-full">
        <div className="flex justify-center">
          <span className="text-[2rem] ">Add lists</span>
        </div>

        <div className="m-4 flex  flex-col w-full">
          <div className="flex m-3 md:min-w-[50%] w-full  ">
            <div></div>
            <lable className="text-[1.3rem] font-bold">Product:</lable>
            <input
              type="text"
              className="rounded-[5px] w-[50%] ml-10 border border-gray-200"
              name="pname"
              onChange={onValueChange}
              value={product.pname}
            />
          </div>
          <div className="flex m-3  min-w-[50%] ">
            <div></div>
            <lable className="text-[1.3rem] font-bold">Price:</lable>
            <input
              type="number"
              className="rounded-[5px] w-[25%] ml-16 border border-gray-200"
              name="price"
              onChange={onValueChange}
              value={product.price}
            />
          </div>
         
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="btn bg-green-500 hover:bg-green-700 text-white"
          onClick={add}
        >
          {isSubmitClicked?<div className="loading loading-spinner"></div>:<div>add</div>}
        </button>
      </div>
      <div className="flex items-end justify-start p-2  w-full">
            {error.value && (
              <span className="absolute z-2 font-bold text-sm text-red-500">
                {error.message}
              </span>
            )}
          </div>
    </div>
  );
};

export default AddProducts;
