import React, { useEffect, useState } from 'react'
import { getProductsAPI } from '../services/allAPI'
import Header from '../components/Header'

function Home() {
  const [allProducts,setAllProducts] = useState([])

 const getAllProducts = async()=>{
  try{
    const token = sessionStorage.getItem("token")
    if(token){
     const reqHeader = {
      "Content-Type":"application/json",
      "x-access-token":`${token}`
     }
     const result = await getProductsAPI(reqHeader)
     if(result.status==200){
      setAllProducts(result.data)
     }
    }
  }catch(err){
    console.log(err);
  }
 }
  console.log(allProducts);

  useEffect(()=>{
    getAllProducts()
  },[])
 
  return (
    <>
    <Header/>
      <div className='w-[100%]  flex items-center justify-center py-[100px] flex-col'>
        <div><h1 className='text-[30px] text-black font-semibold py-10'>ALL PRODUCTS</h1></div>
        <section className='wrapper  grid lg:grid-cols-3 gap-2'>
          {allProducts?.length>0 ?
          allProducts.map((product,index)=>(
            <div key={index} className=''>
            <div className='w-[18rem] border shadow-lg mb-5'>
              <img className='w-[100%] h-[250px]' src={product?.image} alt="" />
              <h1 className="text-center font-bold text-[20px]">{product?.title.slice(0,18)}...</h1>
            </div>
          </div>
          )):<div>Nothing to display</div>
          }
        </section>
      </div>
    </>
  )
}

export default Home