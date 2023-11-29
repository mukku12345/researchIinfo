import React,{useState,useEffect} from 'react'
import API from './services/ApiServices';
import { ApiEndPoint } from './services/ApiEndPoint';
import {Link}  from 'react-router-dom'

import axios from 'axios';
function Registration() {
  const [countryList,setcountryList] = useState([]);
  const [stateList,setstateList] = useState([]);
  const [citylist,setCitylist] = useState([]);
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[email,setEmail] = useState("");
  const[countryName,setCountryName] = useState("");
  const[stateName,setStateName] = useState("");
  const[cityName,setCityName] = useState("");
  const[gender,setGender] = useState("");
  const[dob,setDob] = useState("");
  const[age,setAge] = useState("");
  const[error,setError] = useState("");
  const[firstNameError,setfirstnameError] = useState("");
  const[lastNameError,setLastError] = useState("");
  const [emailError,setEmailError] = useState("");
  



useEffect(()=>{
  getcountries();

},[])

const getcountries = () => {

  const headers = {
    'Content-Type': 'application/json'
  };

  API.get(ApiEndPoint.Countries , { headers: headers })
    .then((response) => {
       setcountryList(response.data)
    })
    .catch((error) => {
      console.log('error', error);

    })

}

useEffect(()=>{
  getstates();
},[countryName])

const getstates = () => {

  const headers = {
    'Content-Type': 'application/json'
  };

  API.get(ApiEndPoint.States+`?countryName=${countryName}` , { headers: headers })
    .then((response) => {
       setstateList(response.data)
    })
    .catch((error) => {
      console.log('error', error);

    })

}

useEffect(()=>{
  getcities();
},[countryName,stateName])

const getcities = () => {

  const headers = {
    'Content-Type': 'application/json'
  };

  API.get(ApiEndPoint.Cities+`?countryName=${countryName}&stateName=${stateName}` , { headers: headers })
    .then((response) => {
     console.log("data",response.data.state[0].cities)
       setCitylist(response.data.state[0].cities)
    })
    .catch((error) => {
      console.log('error', error);

    })

}

useEffect(()=>{
  if(dob.length> 0){

    calculateAge();
  }
},[dob])
function calculateAge() {
  const currentDate = new Date();
  const selectedDateTime = new Date(dob);
  const ageDiff = currentDate.getFullYear() - selectedDateTime.getFullYear();

  
  if (
    currentDate.getMonth() < selectedDateTime.getMonth() ||
    (currentDate.getMonth() === selectedDateTime.getMonth() &&
      currentDate.getDate() < selectedDateTime.getDate())
  ) {
    setAge(ageDiff - 1);
  } else {
    setAge(ageDiff);
  }
}




const handleSubmit = (e) => {
  e.preventDefault();
 
  if (firstName.trim() === '') {
   setfirstnameError("First Name is required")
  }
  if (lastName.trim() === '') {
    setLastError("Last Name is required")
   }
  //  if (email.trim() === '') {
  //   setEmailError("email  is required")
  //  }
  //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //  if (!emailRegex.test(email)) {
  //   setEmailError("not a valid email")
  // }

  const headers = {
    'Content-Type': 'application/json'
  };

const params = `?firstName=${firstName}&lastName=${lastName}&email=${email}&country=${countryName}&state=${stateName}&city=${cityName}&gender=${gender}&dob=${dob}`

  API.post(ApiEndPoint.Registraion+params , { headers: headers })
    .then((response) => {
     console.log("data",response.data)
      alert("submitted")
      setError("");
      setfirstnameError("")
      setLastError("")
    })
    .catch((error) => {
      console.log('error', error.response.data.message);
          setError(error.response.data.message);
    })
}

  return (
    <div>
    <h2>Registration</h2>

    <form onSubmit={(e)=>{handleSubmit(e)}}>
      {error && <p style={{"color":"red"}}>{error}</p>}
      <label>
        First Name:
        <input type="text" name="firstName" onChange={(e)=>{setFirstName(e.target.value)}}   />
      </label>
      <br />

      <label>
        Last Name:
        <input type="text" name="lastName" onChange={(e)=>{setLastName(e.target.value)} }  />
      </label>
      <br />

      <label>
        Email:
        <input type="email" name="email"  onChange={(e)=>{setEmail(e.target.value)} }  />
      </label>
      <br />

      <label>
        Country:
        <select onChange={(e)=>{setCountryName(e.target.value)}}>
          <option value="">Select</option>
        {
          countryList && countryList.map((item)=>{
            return(
              <>
              <option value={item.country}>{item.country}</option>
              </>
            
              
              )
            })
          }
          </select>
      </label>
     

      <label>
        State:
        <select onChange={(e)=>{setStateName(e.target.value)}}> 
          <option value="">Select</option>
        {
          stateList && stateList.map((item)=>{
            return(
              <>
              <option value={item.name}>{item.name}</option>
              </>
            
              
              )
            })
          }
          </select>
      
      </label>
    

      <label>
        City:
        <select onChange={(e)=>{setCityName(e.target.value)}}> 
          <option value="">Select</option>
        {
          citylist && citylist.map((item)=>{
            return(
              <>
              <option value={item}>{item}</option>
              </>
            
              
              )
            })
          }
          </select>
      </label>
      <br />

      <label>
        Gender *:
        <br/>
       
        <label>
          Male
        <input type='radio'  value="male" onChange={(e)=>{setGender(e.target.value)} } required/>
        </label>
        <label>
          Female
        <input type='radio'   value="female" onChange={(e)=>{setGender(e.target.value)} } required/>
        </label>  <label>
          Other
        <input type='radio' value="other" onChange={(e)=>{setGender(e.target.value)} }  required/>
        </label>
        
      </label>
      <br />

      <label>
        Date of Birth:
        <input type="date" name="dateOfBirth" onChange={(e)=>{setDob(e.target.value)} } required />
      </label>
      <br />

      <label>
        Age:
        <input type="number" name="age" value={age} readOnly />
      </label>
      <br />

      <button type="submit">Save</button>
    </form>
  
<Link to="/users">see the userlist</Link>
    </div>
  )
}

export default Registration