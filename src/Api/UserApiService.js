import { apiClient } from './ApiClient'

export const registerUser
    = (firstName,lastName,email,phone,password,role) => apiClient.post(`/user/register`,{firstName,lastName,email,phone,password,role})

export const loginUser
    = (email,password) => apiClient.post(`/user/login`,{email,password})

export const getUserDetails
    = (email) => apiClient.get(`/user/${email}/getUserDetails`)

export const getAllProperties
    = () => apiClient.get("/seller/properties")

export const getSellerPosts
    = (id) => apiClient.get(`/seller/${id}/properties`)

