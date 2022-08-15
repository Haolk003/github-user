import React from 'react'
import { Link } from 'react-router-dom';
const Error = () => {
    return (
      
          <div className='flex items-center justify-center text-center'>
            <div >
            <h1>404</h1>
            <h3>sorry, the page you tried cannot be found</h3>
            <Link to='/' className='btn'>
              back home
            </Link>
            </div>
          </div>
       
      );
}

export default Error