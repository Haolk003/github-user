import React from 'react'
import { useStateContext } from '../context/context'
const Followers = () => {
    const {followers} =useStateContext();
  return (
    <div className='w-[50%] h-[300px] relative px-3   bg-white after:content-["Followers"] after:absolute after:-top-7 after:text-gray-500 after:tracking-wider  after:left-0 after:text-lg after:bg-white after:p-1 after:px-3'>
     <div className='h-[300px] overflow-y-auto'>
        {followers.map((item)=>{
            return(
                <div key={item.id} className="flex items-center my-5 ">
                    <img src={item.avatar_url} alt={item.avatar_url} className="h-[50px] w-[50px] rounded-full mr-3 "/>
                    <div>
                    <p className='font-semibold capitalize text-lg'>{item.login}</p>
                    <a href={item.html_url}>{item.html_url}</a>    
                    </div> 
                </div>
            )
        })}
       </div>
    </div>
  )
}

export default Followers