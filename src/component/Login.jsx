import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {BsGithub} from 'react-icons/bs';
import {MdOutlineEmail} from 'react-icons/md';
import {RiLockPasswordLine} from 'react-icons/ri';
import { useStateContext } from "../context/context";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {Alert} from '.';
const Login=()=>{
    const {userLogin,setUserLogin}=useStateContext();
    const [data,setData]=useState({});
    const [signUpRequest,setSignUpRequest]=useState(null);
    const [modalRes,setModalRes]=useState(false);
    const [msg,setMsg] =useState("signup");
    const [signInRequest,setSignInRequest]=useState(null);
    const handleInput=(e)=>{
        let newInput={[e.target.name]:e.target.value};
        setData({...data,...newInput})
    };
    const CurrentUser=auth.currentUser;
    const handleSubmit=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,data.email,data.password)
        .then((userCredential=>{
            const user =userCredential.user;
           setUserLogin(user)
            console.log(user);
            setSignUpRequest(true);
        }))
        .catch((error)=>{
            console.log(error.message);
            setSignUpRequest(false);
        }
        )
    }
    const handleSubmit2=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,data.email2,data.password2).then((userCredential)=>{
            const user=userCredential.user;
           setUserLogin(user);
           localStorage.setItem('GithutUser',JSON.stringify(user));
           setSignInRequest(true);
        })
        .catch((error)=> {
            console.log(error.message);
            setSignInRequest(false);
        })
    }
    useEffect(()=>{
        console.log(CurrentUser);
    },[CurrentUser]);
    useEffect(()=>{
        setTimeout(()=>{
            setSignUpRequest(null);
        },2000)
    },[signUpRequest]);
    useEffect(()=>{
        setTimeout(()=>{
            setSignInRequest(null);
        },3000)
    },[signInRequest])
 if(userLogin){
    return <Navigate to="/"/>
 }
    return(
        <div className="h-screen flex items-center justify-center relative">
            <div className="flex flex-col items-center">
                <img className="w-[500px] h-auto" src="https://react-search-github-users.netlify.app/static/media/login-img.20a90984.svg" alt="https://react-search-github-users.netlify.app/static/media/login-img.20a90984.svg" />
                <h1 className="text-6xl font-bold my-3">Github User</h1>
                <button className="bg-blue-500 text-gray-50 px-4 py-2 rounded-md cursor-pointer" onClick={()=>setModalRes(true)}>LOG IN / SIGN UP</button>
            </div>
        {modalRes && (
            <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
                <div className="bg-white w-[300px]  rounded-md overflow-hidden">
                        <div className="flex flex-col items-center gap-3 bg-gradient-to-t from-gray-200 to-gray-100 py-3">
                            <BsGithub className="text-5xl"/>
                            <h2 className="text-2xl font-semibold">Github Users</h2>
                        </div>
                        <div className="grid grid-cols-2 text-center   text-[#ccc] font-thin">
                            <p onClick={()=> setMsg("login")} className={`${msg === "login" ? "border-[#000] border-b-2 text-[#333]" :"border-gray-300 border-b-2"} py-2  drop-shadow-sm`}>Log In</p>
                            <p onClick={()=> setMsg('signup')} className={`${msg === "signup" ? "border-[#000] border-b-2 text-[#333]" : "border-gray-300 border-b-2"} py-2  drop-shadow-sm`}>Sign Up</p>
                        </div>
                        {msg==="signup" && (
                           
                            <div> 
                                {signUpRequest && <Alert type="success" msg="Sign up successfully" /> }
                                {signUpRequest === false && <Alert type="error" msg="Sign up error" />}
                            <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-3 mt-3">
                            <div className="h-[40px] w-full relative rounded-sm overflow-hidden mx-2">
                                
                                <div className="absolute h-full left-0 top-0 w-[40px] flex items-center justify-center bg-gray-200 text-gray-800">
                                     <MdOutlineEmail />
                                </div>
                           
                            <input type="email" placeholder="your@example.com"  name="email" onChange={(e)=>handleInput(e)} className="border-none outline-none w-full h-full pl-[70px]"/>
                            </div>
                            <div className="h-[40px] w-full relative rounded-sm overflow-hidden mx-2">
                                 <div className="absolute h-full left-0 top-0 w-[40px] flex items-center justify-center bg-gray-200 text-gray-800">
                                    <RiLockPasswordLine />
                                 </div>
                                <input type="password" placeholder="your password" name="password" onChange={(e)=> handleInput(e)} className="border-none outline-none w-full h-full pl-[70px]"/>
                            </div>
                            <button type="submit" className="bg-red-600 w-full cursor-pointer h-[50px] text-white mt-3">SIGN UP</button>
                            </form> 
                            </div>
                        )}
                        {msg==="login" && (
                            <div>
                                 {signInRequest && <Alert type="success" msg="Sign In successfully" /> }
                                {signInRequest === false && <Alert type="error" msg="Sign In error" />}  
                            <form onSubmit={(e)=>handleSubmit2(e)} className="flex flex-col gap-3 mt-3">
                            <div className="h-[40px] w-full relative rounded-sm overflow-hidden mx-2">
                                
                                <div className="absolute h-full left-0 top-0 w-[40px] flex items-center justify-center bg-gray-200 text-gray-800">
                                     <MdOutlineEmail />
                                </div>
                           
                            <input type="email" placeholder="your@example.com" name="email2" onChange={(e)=>handleInput(e)} className="border-none outline-none w-full h-full pl-[70px]"/>
                            </div>
                            <div className="h-[40px] w-full relative rounded-sm overflow-hidden mx-2">
                                 <div className="absolute h-full left-0 top-0 w-[40px] flex items-center justify-center bg-gray-200 text-gray-800">
                                    <RiLockPasswordLine />
                                 </div>
                                <input type="password" placeholder="your password" name="password2" onChange={(e)=> handleInput(e)} className="border-none outline-none w-full h-full pl-[70px]"/>
                            </div>
                            <button type="submit" className="bg-red-600 w-full cursor-pointer h-[50px] text-white mt-3">LOG IN</button>
                            </form> 
                            </div>
                        )}
                </div>
            </div>
        )}
           
        </div>
    )
}
export default Login;