import React from 'react'
import {MdWorkOutline} from 'react-icons/md';
import {BiMap} from 'react-icons/bi';
import {MdLink} from 'react-icons/md';
import { useStateContext } from '../context/context';
const User = () => {
    const {data}=useStateContext();
  return (
    <div className='relative w-[50%] bg-white h-[300px] p-5 after:content-["User"] after:absolute after:-top-7 after:text-gray-500 after:tracking-wider  after:left-0 after:text-lg after:bg-white after:p-1 after:px-3'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img src={data.avatar_url} alt='' className='w-[70px] h-[70px] object-contain rounded-full' />
                <div className='flex flex-col items-left  ml-3 rounded-md'>
                    <h4 className='font-semibold text-xl tracking-wide'>{data.name}</h4>
                    <p className='text-gray-500'>@{data.login}</p>
                </div>
            </div>
            <button className='bg-transparent rounded-full border-blue-400 text-blue-400 transition-all duration-200 px-4 py-1 tracking-wide text-xl border-2 hover:bg-blue-400 hover:text-white'><a href={data.html_url}>Follow</a></button>
        </div>
        <p className='my-5 text-sm'>{data.bio}</p>
        <div className='flex items-center gap-2 text-lg text-[#336699]'><MdWorkOutline/>{data.company}</div>
        <div className='flex items-center gap-2 text-lg my-2 text-[#336699]'><BiMap />{data.location}</div>
        <div className='flex items-center gap-2 text-lg text-[#336699]'><MdLink /><a href={`https://${data.blog}`}>{data.blog}</a></div>
    </div>
  )
}

export default User