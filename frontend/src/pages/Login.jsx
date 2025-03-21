import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [data,setData]= useState({username:"",password:""});
  const change = (e) => {
    const {name,value} = e.target;
    setData({...data, [name]: value})
  }

  const navigate = useNavigate();
  const submit = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are required");
        return;
      }
  
      const response = await axios.post("http://localhost:1000/api/v1/login", data);
      
      console.log(response.data); // Debugging: Check API response
      
      // Extract correct data
      const { accessToken, id } = response.data; // correctly access response data
      
      setData({ username: "", password: "" }); //Clear input fields
      
      //alert(`Logged in successfully!\nUser ID: ${id}`); // ✅ Show success message
      
      navigate("/", {state: { message: "Login Successful!"} }); // Redirect to home page
  
    } catch (error) {
      console.error(error); 
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 bg-gray-800 rounded'>
        <div className='text-2xl font-semibold cursor-pointer'>Login</div>
        <input type='text' 
        placeholder='Username' 
        name='username' 
        className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
        onChange={change}
        value={data.username}
        required
        /> 
        <input type='password' 
        placeholder='Password' 
        name='password' 
        className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
        onChange={change}
        value={data.password}
        required
        /> 
        <div className='w-full flex items-center justify-between'>
            <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={submit}>Login</button>
            <Link to="/signup" className='text-gray-400 hover:text-gray-200' >Not having an account? Signup here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
