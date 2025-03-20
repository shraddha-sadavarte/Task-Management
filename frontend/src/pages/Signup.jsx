import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [data,setData]= useState({username:"",email:"",password:""});
  const change = (e) => {
    const {name,value} = e.target;
    setData({...data, [name]: value})
  }

  const navigate = useNavigate();
  const submit = async() => {
    try{
      if(data.username==="" || data.email==="" || data.password===""){
        alert("All fields are required")
      }
      else{
        const response = await axios.post("http://localhost:1000/api/v1/sign-in",data);
        console.log(response);
        setData({username:'',email:'', password:''})
        alert(response.data.message);
        //redirect to login page
        navigate("/login")
      }
    }
    catch(error){
      alert(error.response.data.message)
    }
  }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 bg-gray-800 rounded'>
        <div className='text-2xl font-semibold'>Signup</div>
        <input type='username' 
        placeholder='Username' 
        name='username' 
        value={data.username}
        className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
        onChange={change}
        required
        /> 
        <input type='email' 
        placeholder='Email' 
        name='email' 
        className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
        required
        value={data.email}
        onChange={change}
        /> 
        <input type='password' 
        placeholder='Password' 
        name='password' 
        className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
        required
        value={data.password}
        onChange={change}
        /> 
        <div className='w-full flex items-center justify-between'>
            <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded cursor-pointer' onClick={submit}>Signup</button>
            <Link to="/login" className='text-gray-400 hover:text-gray-200' >Already having an account? Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
