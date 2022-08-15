import React ,{useContext,createContext,useState,useEffect} from "react";
import axios from 'axios';
const StateContext=createContext();
const rootUrl='https://api.github.com';
export const ContextProvider=({children})=>{
const [user,setUser]=useState('john-smilga');
const [data,setData]=useState([]);
const [repos,setRepos]=useState([]);
const [userLogin,setUserLogin]=useState(null);
const [followers,setFollowers]=useState([]);
const featchApi=async ()=>{
try{   
const response=await axios.get(`${rootUrl}/users/${user}`); 
setData(response.data);
const {repos_url,followers_url}=response.data;
 await Promise.allSettled([
    await axios.get(`${repos_url}?per_page=100`),
    await axios.get(`${followers_url}?per_page=100`)
 ]).then((results)=>{
  const [reposs,followers]=results;
  if(reposs.status==="fulfilled"){
setRepos(reposs.value.data)
  }
  if(followers.status==="fulfilled"){
    setFollowers(followers.value.data);
  }
 }).catch((error)=>{
    console.log(error);
 })
}
catch(error){
console.log(error.messenger);
}
}
  const FeatchUser=()=>{
    setUserLogin(JSON.parse(localStorage.getItem("GithutUser")));
  }

useEffect(()=>{
 featchApi()   
},[user]);
return(
    <StateContext.Provider value={{data,followers,repos,user,setUser,userLogin,setUserLogin,FeatchUser}}>
        {children}
    </StateContext.Provider>
)
}
export const useStateContext=()=>useContext(StateContext);