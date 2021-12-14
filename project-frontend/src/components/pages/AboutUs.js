import React from 'react'
import axios from 'axios'
import { axiosApi } from '../../context/AuthContext'
function AboutUs() {
    axios.defaults.withCredentials = true

//     const axiosLogin = axios.create();
//     // Response interceptor for API calls
// axios.interceptors.response.use(null, async function (error) {
//     const originalRequest = error.config;
   
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const access_token = await refresh(); 
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   });

//   const refresh = async ()=>{
//     try{
//         const res = await axios.get("http://localhost:3001/auth/refresh")
//          }catch(err){
//              console.log(err)
//          }
// }
    const handleClick = async ()=>{
        try{
       const res = await axiosApi.delete("http://localhost:3001/auth/delete/7105dan")
       console.log(res)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
           
            <button onClick={handleClick}>click</button>

        </div>
    )
}

export default AboutUs
