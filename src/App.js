import React, { useEffect } from 'react';
import { MainContainer } from './component';
import { useStateContext } from './context/context';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Login,PriveRoute,Error} from './component';
const App = () => {
   
  return (
    <main className='bg-gray-200 h-full '>
    <Router>
      <Routes>
        <Route path='/' element={
          <MainContainer />
         } />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
     
    </main>
  )
}

export default App