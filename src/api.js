import axios from "axios"

// const URL = "http://localhost:8080"
var URL;
if (process.env.NODE_ENV !== "production") {
    URL = "http://localhost:8080"
} 
var headers = (process.env.NODE_ENV ==="production")?{}:{  'Access-Control-Allow-Origin' : '*',
'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE','Access-Control-Allow-Headers': 'Content-Type'}
//get all user details
const getUsersData = async () => {
    try {
        const res = await axios.get(URL ,{headers})
        return res
    } catch (e) {
        console.log("e", e)
    }
}

//post user details
 const postUserData = async (data) => {
    try {
        const res = await axios.post(URL + "/addUser",data)
        res.set('Access-Control-Allow-Origin', '*')
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

//update user details
const updateUserData = async (id,data) => {
    try {
        const res = await axios.patch(URL + `/updateUser/${id}`,data)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}
//delete user details
const deleteUser = async (id) => {
    try {
        const res = await axios.delete(URL + `/deleteUser/${id}`)
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

export {postUserData,getUsersData,updateUserData,deleteUser}