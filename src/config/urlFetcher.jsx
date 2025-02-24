import axios from "axios"
import store from "../redux/store";

const baseUrl = import.meta.env.VITE_BASE_API_URL
const token = localStorage.getItem("token")

 const UrlFetcher = axios.create({
    baseURL:baseUrl,
    headers: {
      'Accept': 'application/json',
      'X-Requested-with':'XMLHttpRequest',
   },
    withCredentials:true,
    withXSRFToken:true
 });

 export default UrlFetcher;

 

 export const AuthenticatedUserUrl = axios.create({
    baseURL:baseUrl,
    headers: {
      'Accept': 'application/json',
      'X-Requested-with':'XMLHttpRequest'
   },
    withCredentials:true,
    withXSRFToken:true
 });

 //This is to add a new and valid token that is stored in our redux
 AuthenticatedUserUrl.interceptors.request.use(
   (config) => {
      const state = store.getState();
      const token = state.authorizer.value.token;

      if(token){
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error)
   }
 )

 export const StudentAuthenticatedUserUrl = axios.create({
   baseURL:baseUrl,
   headers: {
     'Accept': 'application/json',
     'X-Requested-with':'XMLHttpRequest'
  },
   withCredentials:true,
   withXSRFToken:true
});

//This is to add a new and valid student token that is stored in our redux
StudentAuthenticatedUserUrl.interceptors.request.use(
  (config) => {
     const state = store.getState();
     const token = state.studentAuthorizer.value.studToken;

     if(token){
        config.headers.Authorization = `Bearer ${token}`;
     }

     return config;
  },
  (error) => {
     return Promise.reject(error)
  }
)