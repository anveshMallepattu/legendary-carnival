/** @format */

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({ ...response.data[0] });
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const updateUser = async (data, id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}>
        <label htmlFor='name'>Table Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter Table Name...'
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor='email'>Unique Column</label>
        <input
          type='text'
          id='email'
          name='email'
          placeholder='Enter Unique Column...'
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor='contact'>Column Name</label>
        <input
          type='text'
          id='contact'
          name='contact'
          placeholder='Enter Column Name. ...'
          value={contact}
          onChange={handleInputChange}
        />

        <input type='submit' value={id ? "Update" : "Manual Update"} />
      </form>
    </div>
  );
};

export default AddEdit;
