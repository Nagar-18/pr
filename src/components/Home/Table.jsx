// src/UserTable.js
import React, { useState, useEffect } from 'react';
// import { Button } from 'tailwindcss-react';
import DateRangePicker from './DateRangePicker';
import { Firestore, deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../firebase2';

const UserTable = () => {
  const [users, setUsers] = useState([]);
   const [flag, setFlag] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dateFilter, setDateFilter] = useState({ startDate: null, endDate: null });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  useEffect(() => {
    
    const fetchUser = async () => {
    const URL = 'https://pritam-37b23-default-rtdb.firebaseio.com/UserData.json'
    
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Object.entries(data)?.map(([id, data]) => ({
  id,
  ...data,
}));
      
      setUsers(dataArray);
      
       
      })
      .catch((err) => {
        console.log(err);
       
      });
  };
fetchUser();
  },[flag]);

  useEffect(() => {
    // Apply filters and sorting when users or filters change
    let filteredUsersData = [...users];

    // Filter by date range
    if (dateFilter.startDate && dateFilter.endDate) {
      filteredUsersData = filteredUsersData.filter((user) =>
        user.addedDate >= dateFilter.startDate && user.addedDate <= dateFilter.endDate
      );
    }

    // Sort by column
    if (sortConfig.key) {
      filteredUsersData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filteredUsersData);
  }, [users, dateFilter, sortConfig]);

  const handleDeleteUser = async(userId) => {
     try{
        const response = await fetch(`https://pritam-37b23-default-rtdb.firebaseio.com/UserData.json/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.ok) {
      console.log(`User with ID ${userId} deleted successfully`);
    } else {
      console.error('Error deleting user:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }




  setFlag((v)=>v);
  };

  const handleAddUser = async() => {
      try {
      
      const res = await fetch("https://pritam-37b23-default-rtdb.firebaseio.com/UserData.json",{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',

        },
        body:JSON.stringify({
          name:values.name,
          email:values.email,
          status:"active",
          date:new Date()
        })
      })
     } catch (error) {
      console.log(error);
     }
     setFlag(!flag)
  };

  const handleChangeStatus = async(userId,status) => {
    status=(status==="active"?"unactive":"active")
 try{
    const response = await fetch(`https://pritam-37b23-default-rtdb.firebaseio.com/UserData.json/${userId}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        // Include any additional headers if needed, such as authorization headers
      },
      body: JSON.stringify({ status: status }), // Fields to update
    });

    if (response.ok) {
      console.log(`User with ID ${userId} updated successfully`);
    } else {
      console.error('Error updating user:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  };

  const handleSort = (key) => {
    // Toggle sort direction if the same key is clicked again, otherwise set direction to 'asc'
    setSortConfig({
      key,
      direction: key === sortConfig.key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };
  const open=()=>{
    setFlag(!flag);
  }



  return (
    <div className="p-4 flex flex-col justify-between self-center align-middle bg-slate-400">
      <DateRangePicker value={dateFilter} onChange={(value) => setDateFilter(value)} />

      <table className="table-auto  gap-80 w-full border-collapse">
        <thead>
          <tr>
            <th onClick={() => handleSort('username')}>Username</th>
            <th onClick={() => handleSort('addedDate')}>Added Date</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users&&users.map((user) =>  (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.date}</td>
              <td>{user.status}</td>
              <td className='flex justify-center'>
                
                <button type='button'  className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  rounded-lg text-sm px-2 py-1 text-center me-2 mb-2" onClick={() => handleChangeStatus(user.id,user.status)}>Change Status</button>
                <button   className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  rounded-lg text-sm px-2 py-1 text-center me-2 mb-2" onClick={() => handleDeleteUser(user.id)} variant="danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button  className="text-white bg-gradient-to-r w-1/2 from-rose-500 via-rose-600 to-rose-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  rounded-lg text-sm px-2 py-1text-center me-2 mb-2" onClick={open} >Add User</button>
      {
        flag&&<><div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
   
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input  onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          } class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
       Email
      </label>
      <input  onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          } class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter email here"/>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input  onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          } class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
      <p class="text-red-500 text-xs italic">Please choose a password for user.</p>
    </div>
    <div class="flex items-center justify-between">
      <button onClick={handleAddUser} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Submit
      </button>
     
    </div>
  </form>
 
</div></>
      }
    </div>
  );
};

export default UserTable;

