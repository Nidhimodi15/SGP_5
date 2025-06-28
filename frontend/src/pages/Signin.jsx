import React from 'react'
import axios from 'axios'
import { GoogleLogin } from "@react-oauth/google";


const Signin = () => {

  const handleLogin = async(credentialResponse)=>{
        try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        token: credentialResponse.credential,
      },
    {
      withCredentials:true
    });

    //   localStorage.setItem("token", res.data.data.refreshToken);
      console.log("User Info:", res.data.data.User);
    //   alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  
  return (
    <div>
        <h3>Login with google</h3>
        <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  )
}

export default Signin