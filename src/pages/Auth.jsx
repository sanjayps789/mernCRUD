import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, regiserAPI } from '../services/allAPI';


function Auth({ insideRegister }) {
  const navigate = useNavigate()
  const [inputData, setInputData] = useState({
    name: "", email: "", password: ""
  })
  console.log(inputData);

  const handleRegister = async (e) => {
    e.preventDefault()
    const {name,email,password} = inputData
    if(!name || !email || !password){
      toast.warning("Please fill the form completely")
    }else{
      // proceed to api call
      const result = await regiserAPI(inputData)
      // if(result.statu)
      console.log(result);
      try{
        if(result.status===200){
          toast.success(`Welcome ${result.name}...Please Login to explore our site!!!`)
          setInputData({name:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          },2000)
        }else{
          toast.error(result.response.data)

        }
      }catch(err){
        console.log(err);
      }
    }
  }

  // function to handle login
  const handleLogin = async(e) =>{
    e.preventDefault()
  const {email,password} = inputData
  if(!email || !password){
    toast.info("Please fill the form completely!!!")
  }else{
    // proceed to api call
    try{
      const result = await loginAPI({email,password})
      // console.log(result);
      if(result.status==200){
        toast.success("Login Successfull")
        setInputData({email:"",password:""})
        sessionStorage.setItem("token",result.data.token)
        console.log(result);
        // navigate to landing page
       setTimeout(()=>{
        navigate("/")
       },2000)
      }else{
        toast.error(result.response.data)
      }
    }catch(err){
      console.log(err);
    }
  }
  }
  return (
    <section className='flex items-center justify-content-center w-[100%] h-[100vh] bg-slate-400'>
      <section className='wrapper '>
        <form className='text-center'>
          <div className='border grid gap-5 p-5 '>
            <h1 className='text-[40px] font-semibold'>{insideRegister ? "Register Form" : "Login Form"}</h1>
            {insideRegister && <div>
              <input value={inputData.username} onChange={e => setInputData({ ...inputData, name: e.target.value })} className='border w-[50%] p-3 outline-2 outline-black' type="text" placeholder='name' />
            </div>}
            <div>
              <input value={inputData.email} onChange={e => setInputData({ ...inputData, email: e.target.value })} className='border w-[50%] p-3 outline-2 outline-black' type="email" placeholder='email' />
            </div>
            <div className=''>
              <input value={inputData.password} onChange={e => setInputData({ ...inputData, password: e.target.value })} className='border w-[50%] p-3 outline-2 outline-black' type="password" placeholder='password' />
            </div>
            {insideRegister ?
              <div className='text-center'>
                <button onClick={handleRegister} className="px-12 py-3 rounded-lg text-black font-semibold bg-white mb-3">Register</button>
                <p>Already have an Account? Click here to <Link className='text-red-700 font-semibold' to={'/login'}>Login</Link></p>
              </div> :
              <div>
                <button onClick={handleLogin} className="px-12 py-3 rounded-lg text-black font-semibold bg-white mb-3">Login
                </button>
                <p className='text-light'>New User? Click here to <Link className='text-red-700 font-semibold' to={'/register'}>Register</Link></p>
              </div>}
          </div>
        </form>
      </section>
      <ToastContainer  autoClose={3000} />
    </section>
  )
}

export default Auth