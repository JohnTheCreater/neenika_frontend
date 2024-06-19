
import { React, useEffect, useState } from "react";
import axios from "axios";
import LayOut from "../LayOut/LayOut";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { API_URL } from "../../config";
export default function Customers() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [list, setList] = useState([]);

  const get_list = () => {
    axios
      .post(`${API_URL}/api/getCustomer`)
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  useEffect(() => {
    get_list();
  }, [isAdd,isEdit]);

  return (
    <>
      {isEdit && (
        <div className="absolute z-40 w-full h-full">
          <EditCustomer setIsEdit={setIsEdit} />
        </div>
      )}
      {isAdd && <AddCustomer isAdd={isAdd} setIsAdd={setIsAdd} />}

      <LayOut>
        <div className="h-full w-full items-center  p-2">
          <div className=" m-10 border bg-white  rounded-[1rem] overflow-auto min-h-[60vh] max-h-[60vh]">
            <table className="w-[100%] bg-white border-1 shadow-xl   rounded-[1rem] ">
              <thead className="sticky top-0 bg-white border-1 z-10">
                <tr className="border border-2 border-gray-100  sticky top-0 bg-neutral text-neutral-content">
                  <th>user id</th>

                  <th className="min-w-[10vw]  p-3">name</th>
                  <th>address</th>
                  <th>mobile no</th>
                  <th>city</th>
                  <th>zip</th>
                </tr>
              </thead>
              <tbody className="  ">
                {[...list].reverse().map((user) => (
                  <tr className="border border-2 border-gray-100">
                    <td className="text-center p-2">{user.user_id}</td>
                    <td className="text-center p-2">{user.full_name}</td>
                    <td className="text-center p-2">{user.address}</td>
                    <td className="text-center p-2">{user.mobile_no}</td>
                    <td className="text-center p-2">{user.city}</td>
                    <td className="text-center p-2">{user.zip_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-between items-center w-[80%]">
              <button
                className="btn btn-neutral"
                onClick={() => setIsEdit(true)}
              >
                edit user
              </button>
              <button
                onClick={() => {
                  setIsAdd(true);
                }}
                type="button"
                className="btn btn-neutral "
              >
                Add customer
              </button>
            </div>
          </div>
        </div>
      </LayOut>
    </>
  );
}
