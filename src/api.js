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
        return res.data
    } catch (e) {
        console.log("e", e)
    }
}

export {getUsersData}