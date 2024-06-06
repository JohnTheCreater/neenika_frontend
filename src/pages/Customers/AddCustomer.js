import { React, useState } from "react";
  import DropdownL from "../Dashboard/DropdownL";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const AddCustomer = ({ isAdd, setIsAdd }) => {
  const genders = ["male", "female", "others"];

  const [formDetails, setFormDetails] = useState({
    fullname: "",
    gender: genders[0],
    email: "",
    mobileno: "",
    address: "",
    city: "",
    state: "Tamil nadu",
    zip: "",
  });
  const [customerList, setCustomerList] = useState([]);
  const [errors, setErrors] = useState({});
  const [userfound,setUserfound]=useState(false)

  const handleChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    setFormDetails({
      ...formDetails,
      [name]: value,
    });
    if (
      ["fullname", "email", "mobileno", "address", "city", "zip"].includes(
        name
      ) &&
      value.length !== 0
    ) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimedName = formDetails.fullname.trim();
    const trimedEmail = formDetails.email.trim();
    const trimedAddress = formDetails.address.trim();
    const trimedMobileNo = formDetails.mobileno.trim();
    const trimedCity = formDetails.city.trim();
    const trimedZip = formDetails.zip.trim();

    if (
      trimedName !== "" &&
      trimedAddress !== "" &&
      trimedEmail !== "" &&
      trimedMobileNo !== "" &&
      trimedCity !== "" &&
      trimedZip !== ""
    ) {
      axios
        .post("https://neenika-backend.onrender.com/api/checkEmail", { email: trimedEmail })
        .then((result) => {
          const updatedFormDetails = {
            ...formDetails,
            fullname: trimedName,
            address: trimedAddress,
            email: trimedEmail,
          };
          setFormDetails(updatedFormDetails);
          setCustomerList((prevCustomerList) => [
            ...prevCustomerList,
            updatedFormDetails,
          ]);

    if (
      trimedName === "" ||
      trimedAddress === "" ||
      trimedMobileNo === "" ||
      trimedEmail === "" ||
      trimedCity === "" ||
      trimedZip === ""
    ) {
      setErrors((prevErrors) => {
        const error_details = { ...prevErrors };

        if (trimedName.length === 0) {
          error_details.fullname = "full name is required!";
        } else {
          error_details.fullname = undefined;
        }

        if (trimedEmail.length === 0) {
          error_details.email = "email is required!";
        } else if (!/\S+@\S+\.\S+/.test(formDetails.email)) {
          error_details.email = "please enter valid email!";
        }

        if (trimedAddress.length === 0) {
          error_details.address = "address is required!";
        } else {
          error_details.address = undefined;
        }
        if (trimedMobileNo.length === 0) {
          error_details.mobileno = "mobile number is required!";
        } else {
          error_details.mobileno = undefined;
        }

        if (trimedCity.length === 0) {
          error_details.city = "city is required!";
        } else {
          error_details.city = undefined;
        }
        if (trimedZip.length === 0) {
          error_details.zip = "zip code is must!";
        } else {
          error_details.zip = undefined;
        }
        return error_details;
      });
    } else {
      setFormDetails({
        fullname: "",
        gender: genders[0],
        email: "",
        mobileno: "",
        address: "",
        city: "",
        state: "Tamil nadu",
        zip: "",
        gst:""
      });
    }
        })
        .catch((err) => {
          console.log("res", err.response.status);
          if (err.response.status === 409) {
            
            setErrors((prevError) => {
              const error_details = { ...prevError };
              error_details.userFound =
                "  Already we have user with this email! please provide new Email.";
              return error_details;
            });
            setUserfound(true);
            return;
          }
        });
        
        
      
    }

    console.log(trimedName);

    console.log(formDetails.fullname);

  };

  const handleGenderChange = (option) => {
    console.log(option);
    setFormDetails({
      ...formDetails,
      gender: option,
    });
  };

  const handleBack = () => {
    setIsAdd(false);
  };

  const handleRemove = (id) => {
    setCustomerList((prevCustomerList) =>
      prevCustomerList.filter((list, i) => i !== id)
    );
  };

  const handleAddList = () => {
    axios
      .post("https://neenika-backend.onrender.com/api/addCustomer", customerList)
      .then((res) => console.log(res));
    setIsAdd(false);
  };
  return (
    <div className="absolute z-50 h-full w-full ">
      <div className="absolute  z-20 bg-primary-content  flex justify-between justify-center border  p-5 min-w-[90%] min-h-[80%] left-[5%] top-[10%] rounded-[1rem] ">
       {userfound&&
        <div className=" bg-white w-[30%] absolute z-20 mx-[34%] flex  flex-col items-center p-3 rounded-box my-[10%] ">
          <div>Already Have This Email!</div>
          <div>{errors?.userFound}</div>
          <div><button onClick={()=>setUserfound(false)}className="btn btn-warning bg-yellow-500 w-10 ">ok</button></div>
        </div>
        }

        <div className="w-[50%] flex ">
          <div className=" ">
            <button
              type="button"
              className="bg-red-500 text-white  p-1 rounded-[0.3rem]"
              onClick={handleBack}
            >
              back
            </button>
          </div>
          <div className="flex min-w-[80%] max-w-[80%] flex-col items-center">
            <div className="m-10 min-w-[100%]  p-5  glass  min-h-80 max-h-80  overflow-auto   rounded-[1rem]">
              <table className="min-w-[100%] ">
                <thead className="bg-neutral text-neutral-content">
                  <th className="p-3 min-w-40 border ">name</th>
                  <th className="p-3 min-w-40 border">email</th>
                  <th className="p-3 min-w-40   border">city</th>
                  <th className="p-3"></th>
                </thead>
                <tbody className="">
                  {customerList.map((list, index) => {
                    return (
                      <tr className="bg-green-100" key={index}>
                        <td className="p-2 border  text-center align-middle  w-[30%] min-w-[5rem] max-w-[5rem] overflow-auto whitespace-normal break-words">
                          {list.fullname}
                        </td>
                        <td className="p-2 border text-center align-middle text-sm w-[30%] min-w-[5rem] max-w-[5rem] overflow-auto whitespace-normal break-words">
                          {list.email}
                        </td>
                        <td className="p-2 border text-center align-middle  w-[30%] min-w-[5rem] max-w-[5rem] overflow-auto whitespace-normal break-words">
                          {list.city}
                        </td>
                        <td className="bg-red-500 text-white">
                          <div className="flex  justify-center items-center">
                            <button
                              className="flex justify-center  items-center"
                              onClick={() => handleRemove(index)}
                            >
                              <IoCloseSharp />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-[0.3rem]"
                onClick={handleAddList}
              >
                submit
              </button>
            </div>
          </div>
        </div>

        <div className="w-[50%]  max-w-[50%] ">
          <div className="glass bg-blue-100  p-5 rounded-[1rem]">
            <form
              className="w-full  flex flex-col items-center max-w-lg "
              onSubmit={handleSubmit}
            >
              <div className="flex gap-4 flex-wrap -mx-3 mb-6">
                <div className="flex ">
                  <div className="w-full   md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Full Name
                    </label>
                    <input
                      className={`appearance-none block w-full bg-gray-200 border ${
                        errors.fullname ? "border-red-500" : ""
                      } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                      id="grid-first-name"
                      type="text"
                      value={formDetails.fullname}
                      placeholder="Jane"
                      name="fullname"
                      onChange={handleChange}
                    />
                    {errors.fullname && (
                      <p className=" absolute text-red-500 text-xs italic">
                        {errors.fullname}
                      </p>
                    )}
                  </div>
                  <div className="w-full  md:w-1/2  px-3">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      for="grid-gender"
                    >
                      Gender
                    </label>
                    <DropdownL
                      options={genders}
                      onSelect={handleGenderChange}
                      current={formDetails.gender}
                      size={"40"}
                      id="grid-gender"
                      textColor={"white"}
                      color={"bg-neutral"}
                    />
                  </div>
                </div>

                <div className="w-full md: px-3">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className={`appearance-none block w-full bg-gray-200 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="grid-email"
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={formDetails.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <p className="absolute text-red-500 text-xs italic">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="w-full md: px-3">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    for="grid-email"
                  >
                    GST number:
                  </label>
                  <input
                    className={`appearance-none block w-full bg-gray-200 border ${
                       "border-gray-200"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="grid-gst"
                    type="text"
                    placeholder="enter gst number"
                    name="gst"
                    value={formDetails.gst}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <p className="absolute text-red-500 text-xs italic">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    for="grid-mobile"
                  >
                    Mobile number
                  </label>
                  <input
                    className={`appearance-none block w-full bg-gray-200 border ${
                      errors.mobileno ? "border-red-500" : "border-gray-200"
                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="grid-mobile"
                    type="tel"
                    value={formDetails.mobileno}
                    name="mobileno"
                    title="Please enter exactly 10 digits"
                    maxLength={10}
                    onChange={handleChange}
                    placeholder="enter 10 digit  mobile no"
                  />
                  {errors.mobileno && (
                    <p className="absolute text-red-500 text-xs italic">
                      {errors.mobileno}
                    </p>
                  )}

                  {/* <p className="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p> */}
                </div>
                
                <div className="w-full px-3">
                  <lable
                    className="block uppercase tracking-wide text-gray=700 text-xs font-bold mb-2"
                    for="address"
                  >
                    {" "}
                    Address
                  </lable>
                  <textarea
                    className={`border max-h-20 min-h-14 p-1 ${
                      errors.address ? "border-red-500" : "border-gray-200"
                    }`}
                    id="address"
                    name="address"
                    rows={"2"}
                    value={formDetails.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="absolute text-red-500 text-xs italic">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    City
                  </label>
                  <input
                    className={`appearance-none block w-full bg-gray-200 border ${
                      errors.city ? "border-red-500" : "border-gray-200"
                    }rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                    id="grid-city"
                    type="text"
                    name="city"
                    value={formDetails.city}
                    placeholder="madurai..."
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <p className="absolute text-red-500 text-xs italic">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 text-black border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      onChange={handleChange}
                      name="state"
                      value={formDetails.state}
                    >
                      <option>Tamil nadu</option>
                      <option>Kerala</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Zip
                  </label>
                  <input
                    onChange={handleChange}
                    className="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    name="zip"
                    placeholder="90210"
                    value={formDetails.zip}
                  />
                  {errors.zip && (
                    <p className=" absolute text-red-500 text-xs italic">
                      {errors.zip}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="bg-green-500 text-white p-2  rounded-[0.3rem]"
                  type="submit"
                  disabled={errors.fullname}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddCustomer;
