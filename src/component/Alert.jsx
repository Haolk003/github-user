import React from 'react'
import  Alert  from '@mui/material/Alert';
const Alerts = ({type,msg}) => {
  return (
    <div className='fixed top-0 left-0 flex justify-center w-full '>
        <Alert className='w-[500px]  text-center' severity={type}>{msg}</Alert>
    </div>
  )
}

export default Alerts;