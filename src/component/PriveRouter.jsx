import React,{useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../context/context';
const PriveRouter = ({children}) => {
    const {userLogin}=useStateContext();
    useEffect(()=>{
        console.log(userLogin);
   },[userLogin])
    if(!userLogin){
        return <Navigate to="/login" />
    }
    else{
        return <Navigate to="/" />
    }
}

export default PriveRouter;