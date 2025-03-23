import React, { use, useEffect, useState } from 'react'
import {CgNotes} from "react-icons/cg";
import {MdLabelImportant} from 'react-icons/md';
import {FaCheckDouble} from 'react-icons/fa6';
import {TbNotebookOff} from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from "axios";

const Sidebar = () => {

    const [user, setUser]  = useState(null);
    const storedId = localStorage.getItem("id");

    //fetch user details from backend using id
    useEffect(() => {
        if (storedId) {
            console.log("🔍 Stored User ID from localStorage:", storedId); // Debugging log

            axios.get(`http://localhost:1000/api/v1/user/${storedId}`)
                .then(response => {
                    console.log("✅ Fetched user:", response.data); // Debugging log
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("❌ Error fetching user details:", error.response.data || error.message);
                });
        }
    }, [storedId]);

//     //load when sidebar mounts
//     useEffect(() => {
//         fetchUser();
//     },[]);

//     //Listen for custom event "userUpdated" to update Sidebar when login/logout happens
//   useEffect(() => {
//     const handleUserUpdate = () => {
//       fetchUser();
//     };

//     window.addEventListener("userUpdated", handleUserUpdate);
//     return () => {
//       window.removeEventListener("userUpdated", handleUserUpdate);
//     };
//   }, []);

    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: '/',
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant/>,
            link: '/importanttasks',
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />,
            link: '/completedtasks',
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff />,
            link: '/incompletedtasks',
        },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear();
        //notify sidebar that user has logged out
       // window.dispatchEvent(new CustomEvent("userUpdated"));
        navigate("/login");
    }

  return (
    <>
     {/* user info */}
    <div>
      <h2 className='text-xl font-semibold'>{user ? user.username : "Guest"}</h2>
      <h4 className='mb-1 text-gray-200'>{user ? user.email : "guest@example.com"}</h4>
      <hr />
    </div>

      {/* sidebar manu */}
    <div>
        {data.map((items,i) => (
            <Link to={items.link} key={i} className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition:all duration-300 cursor-pointer'>
                {items.icon}&nbsp;
                {items.title}
            </Link>
        ))}
    </div>

      {/* logout button */}
    <div>
        <button className='bg-gray-500 hover:bg-red-600 text-white w-full p-2 rounded cursor-pointer mt-4' onClick={logout}>Log out</button>
    </div>

    </>
  )
}

export default Sidebar
