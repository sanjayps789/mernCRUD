import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"

// register API
export const regiserAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/api/register`,user,"")
}


// login API
export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/api/login`,user,"")
}

// get all products
export const getProductsAPI = async(reqHeader) =>{
    return await commonAPI("GET",`${SERVER_URL}/api/items`,"",reqHeader)
  }

//   update user
export const updateUserAPI = async(id,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/api/update-user`,id,reqHeader)
}

//   delete user
export const deleteUserAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/update-user`,id,reqHeader)
}