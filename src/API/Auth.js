import axios from "axios"
import {URL,headers}  from './Integrations'

//get all Auth details
const getAuthData = async () => {
    try {
        const res = await axios.get(URL+`/auth` ,{headers})
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

//get all Auth details
const postAuthData = async (authData) => {
    try {
        const res = await axios.post(URL+`/auth/auth`,authData)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}
//update all Auth details
const updateAuthData = async (id,authData) => {
    try {
        const res = await axios.patch(URL+`/auth/updateAuth/${id}`,authData)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}
//delete all Auth details
const deleteAuthData = async (id) => {
    try {
        const res = await axios.delete(URL+`/auth/deleteAuth/${id}`)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

export {getAuthData,postAuthData,updateAuthData,deleteAuthData}