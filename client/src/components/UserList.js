import React,{useState,useEffect} from 'react'
import API from './services/ApiServices';
import { ApiEndPoint } from './services/ApiEndPoint';
function UserList() {
const[userList ,setUserList] =  useState([]);


  useEffect(()=>{
    getuserList();
  },[])
  
  const getuserList = () => {
  
    const headers = {
      'Content-Type': 'application/json'
    };
  
    API.get(ApiEndPoint.Getuserlist , { headers: headers })
      .then((response) => {
        console.log(response.data)
        setUserList(response.data)
      })
      .catch((error) => {
        console.log('error', error);
  
      })
  
  }

  return (
    <div>
      <h1>UserList</h1>
          <table>
  <tr>
    <th>Name</th>
    <th>Gender</th>
    <th>Email</th>
    <th>Country</th>
    <th>State</th>
    <th>City</th>
    <th>Date of birth</th>
  </tr>
{
  userList.map((item,index)=>{
    return(
      <>
  
  <tr>
    <td>{item.firstName}  {item.lastName}</td>
    <td>{item.gender}</td>
    <td>{item.email}</td>
    <td>{item.country}</td>
    <td>{item.state}</td>
    <td>{item.city}</td>
    <td>{item.dob}</td>

  </tr>
  

      </>
    )
  })
}
</table>

    </div>
  )
}

export default UserList