import axios from "axios"
import {URL,headers}  from './Integrations'

//get all user details
const getUsersData = async () => {
    try {
        const res = await axios.get(URL ,{headers})
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

export {getUsersData}