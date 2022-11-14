import React, { useState,useEffect } from 'react';
import AuthUser from "../auth/AuthUser";

const Dashboard = () => {

  const { http } = AuthUser();
  const [userDetail,setUserDetail] = useState();

  const fetchUserDetail = () => {
    http.post('/me')
      .then((res) => setUserDetail(res.data));
  }

  useEffect(() => {
    fetchUserDetail();
  },[]);

  function renderElement(){
    if(userDetail){
      return (
        <div className='justify-content-center' style={{color:"white"}}>
          <h3>Name:</h3>
          <p> {userDetail.name} </p>
          <h3>Email:</h3>
          <p> {userDetail.email} </p>
        </div>
      )
    }else{
      return <h1 style={{color:"white"}}>Loading...</h1>
    }
  }

  return (
    <div className='register mt-5'>
      {renderElement()}
    </div>
  )
}

export default Dashboard