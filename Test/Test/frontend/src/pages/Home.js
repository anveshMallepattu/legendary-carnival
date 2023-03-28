/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  const [cityEdit, setCityEdit] = useState({});
  console.log("cityEdit:", cityEdit);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const onDeleteUser = async (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that user record")
    ) {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        getUsers();
      }
    }
  };

  console.log("data=>", data);

  const handleEditInput = (e, id) => {
    setCityEdit({ name: e.target.value, id: id });
  };
  const submitEdit = () => {
    const arr = data;
    const updatingObj = arr.find((item, index) => item.id === cityEdit.id);
    updatingObj.contact = cityEdit.name;
    setData([...arr]);
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className='styled-table' border='2px'>
        <thead>
          <tr>
            <th style={{ textAlign: "center", backgroundColor: "yellow" }}>
              No.
            </th>
            <th style={{ textAlign: "center", backgroundColor: "yellow" }}>
              Table Name
            </th>
            <th style={{ textAlign: "center", backgroundColor: "yellow" }}>
              Column Name
            </th>
            <th style={{ textAlign: "center", backgroundColor: "#45a049" }}>
              Distinct Value
            </th>
            <th style={{ textAlign: "center", backgroundColor: "orange" }}>
              Action
            </th>
            <th style={{ textAlign: "center", backgroundColor: "orange" }}>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.contact}</td>
                  <td>{item.email}</td>
                  <td>
                    <input
                      type='text'
                      id='editInput'
                      name='editInput'
                      placeholder='Edit city name here ...'
                      onChange={(e) => {
                        handleEditInput(e, item.id);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className='btn btn-delete'
                      onClick={() => onDeleteUser(item.id)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <br />
      <br />
      <button id='update' onClick={submitEdit}>
        Update
      </button>
    </div>
  );
};

export default Home;
