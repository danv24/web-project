// import axios from "axios"
// axios.defaults.withCredentials = true

//  export const axiosApi = axios.create();
//  axiosApi.defaults.withCredentials = true
// // Response interceptor for API calls
// axiosApi.interceptors.response.use(null, async function (error) {
// const originalRequest = error.config;

// if (error.response.status === 403 && !originalRequest._retry) {
//   originalRequest._retry = true;
//   const access_token = await refresh(); 
//   return axiosApi(originalRequest);
// }
// return Promise.reject(error);
// });



// axiosApi.interceptors.request.use(
//   async (config) => {
//     let currentDate = new Date();
//     const decodedToken = jwt_decode(user.accessToken);
//     if (decodedToken.exp * 1000 < currentDate.getTime()) {
//       const data = await refreshToken();
//       config.headers["authorization"] = "Bearer " + data.accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const refreshToken = async ()=>{
// try{
//     const res = await axiosApi.get("http://localhost:3001/auth/refresh")
//      }catch(err){
//          console.log(err)
//      }
// }

