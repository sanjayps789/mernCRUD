import React, {  useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { deleteUserAPI, updateUserAPI } from '../services/allAPI'
import { useNavigate, useParams } from 'react-router-dom'

function Profile() {
    let {id} = useParams()
    console.log(id);
const navigate = useNavigate()
    const [editData,setEditData] = useState({
        name:"",password:""
    })
    const handleProfileUpdate = async(e,) =>{
       e.preventDefault()
        const {name,password} = editData
        if(!name || !password){
            toast.info("please fill the form completely")
        }
        const token = sessionStorage.getItem("token")
        if(token){
          const reqHeader = {
            "Content-Type":"application/json",
            "x-access-token":`${token}`
          }
          // api call
          try{
            const result = await updateUserAPI(reqHeader)
            if(result.status ===200){
              setEditData(result.data)
              toast.success("Profile Updated Successfully")
            }else{
              console.log(result);
            }
          }catch(err){
            console.log(err);
          }
        }
    }
    console.log(editData);

    const handleDeleteUser =async(e,id)=>{
            e.preventDefault()
            const token = sessionStorage.getItem("token")
            if(token){
                const reqHeader = {
                    "Content-Type":"application/json",
                    "x-access-token":`${token}`
                  }
                  try{
                        const result = await deleteUserAPI(id,token)
                        console.log(result);
                        window.confirm("Are you sure?")
                        navigate('/register')
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
            <h1 className='text-[40px] font-semibold'>Profile</h1>
            <div>
              <input onChange={e=>setEditData({...editData,name:e.target.value})} value={editData.name}  className='border w-[50%] p-3 outline-2 outline-black' type="text" placeholder='name' />
            </div>
            <div className=''>
              <input  value={editData.password} onChange={e=>setEditData({...editData,password:e.target.value})}  className='border w-[50%] p-3 outline-2 outline-black' type="password" placeholder='password' />
            </div>
              <div className='text-center'>
                <button onClick={handleProfileUpdate}  className="px-12 py-3 rounded-lg text-black font-semibold bg-white">Update</button>
              </div> 
              <div>
                <button onClick={()=>handleDeleteUser(id)} className="px-12 py-3 rounded-lg text-white font-semibold bg-red-600">Delete
                </button>
              </div>
          </div>
        </form>
      </section>
      <ToastContainer  autoClose={3000} />
    </section>
  )
}
export default Profile