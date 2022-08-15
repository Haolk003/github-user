import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import {RiGitRepositoryLine,RiUserFollowFill,RiUserAddFill} from 'react-icons/ri';
import {GoGist} from 'react-icons/go';
import { useStateContext } from '../context/context';
import { useEffect } from 'react';
import { USer } from '.';
import {Followers} from '.';
import {Lang} from '.';
import {Stars} from '.';
import {StarLang} from '.'
import {Forked} from '.';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {Loading} from '.'
const MainContainer = () => {
  const {data,user,setUser,userLogin,setUserLogin,FeatchUser}=useStateContext();
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(search){
       setUser(search);
       setLoading(true);
    }
   
    console.log(search);
  }
  
  useEffect(()=>{
    FeatchUser();
  },[]);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },4000)
  },[loading])
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.charAt(0).toUpperCase()}`,
    };
  }
  if(!userLogin){
    return <Navigate to="/login" />
  }
  else{

 
  return (
    <div className='w-full'>

     <div className='bg-white w-full h-[100px] flex items-center justify-center gap-3 text-lg'>
        <Avatar {...stringAvatar(userLogin.email)} />
        <p>Welcome<span className='font-bold ml-1'> {userLogin.email}</span></p>
        <p className='ml-3 text-2xl text-gray-600 cursor-pointer' onClick={()=> setUserLogin(null)} >Logout</p>
      </div>
      {loading && <Loading /> }
      {!data && <h1>User does not exist</h1>}
   {!loading && data && <section className='w-[80%] mx-auto pt-[200px]'>
    
    <form onSubmit={(e)=>handleSubmit(e)}>
    <div className='flex items-center bg-white p-2 drop-shadow-sm rounded-lg w-[60%] mx-auto h-14'> 
    <div className='text-xl text-gray-600'><AiOutlineSearch/></div>
        <input type="text" placeholder='Enter Github User' value={search} onChange={(e)=> setSearch(e.target.value)} className='w-full h-full mx-2 placeholder:text-2xl px-3 text-xl' />
        <button type="submit" className='bg-blue-400 tracking-widest font-semibold text-xl text-white px-4 h-full rounded-sm'>Search</button>
    </div>
    </form>
    <div className='w-full grid grid-cols-4 gap-4 mt-5'>
    <div className='flex items-center justify-center   bg-white  h-[100px] drop-shadow-md rounded-md'>
      <div className='mr-10 text-3xl w-[50px] h-[50px] bg-pink-100 text-pink-400 rounded-full flex items-center justify-center'><RiGitRepositoryLine/></div>
      <div className='flex flex-col items-center'>
        <p className='font-bold text-3xl'>{data.public_repos}</p>
        <p className='text-gray-400 text-lg'>Repos</p>
      </div>
    </div>
    <div className='flex items-center justify-center   bg-white  h-[100px] drop-shadow-md rounded-md'>
      <div className='mr-10 text-3xl w-[50px] h-[50px] bg-blue-100 text-blue-400 rounded-full flex items-center justify-center'><RiUserFollowFill /></div>
      <div className='flex flex-col items-center'>
        <p className='font-bold text-3xl'>{data.followers}</p>
        <p  className='text-gray-400 text-lg'>Followers</p>
      </div>
    </div>
    <div className='flex items-center justify-center   bg-white  h-[100px] drop-shadow-md rounded-md'>
      <div className='mr-10 text-3xl w-[50px] h-[50px] bg-purple-100 text-purple-400 rounded-full flex items-center justify-center'><RiUserAddFill /></div>
      <div className='flex flex-col items-center'>
        <p className='font-bold text-3xl'>{data.following}</p>
        <p  className='text-gray-400 text-lg'>Following</p>
      </div>
    </div>
    <div className='flex items-center justify-center   bg-white  h-[100px] drop-shadow-md rounded-md'>
      <div className='mr-10 text-3xl w-[50px] h-[50px] bg-orange-100 text-orange-400 rounded-full flex items-center justify-center'><GoGist /></div>
      <div className='flex flex-col items-center'>
        <p className='font-bold text-3xl'>{data.public_gists}</p>
        <p  className='text-gray-400 text-lg'>Gists</p>
      </div>
    </div>
    </div>
    <div className='mt-10 flex items-center gap-4'>
      <USer />
      <Followers />
    </div>
    <div className='grid grid-cols-2 gap-4 mt-10'>
      <Lang />
      <Stars />
      <StarLang />
      <Forked />
      
    </div>
   </section>
  }
   </div>
  ) 
}
}

export default MainContainer