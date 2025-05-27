import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.status === 200) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const deleteItem = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: id });
    await fetchList();
    if(response.status === 200) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return <div className="list add flex-col">
        <p>All foods list</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
            </div>
            {list.map((item, index) => {
                return(
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/` + item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p className="cursor" onClick={()=>{deleteItem(item._id)}}>X</p>
                    </div>
                )
            })}
        </div>
  </div>;
};

export default List;
