import axios from "axios"
import { URL, headers } from './Integrations'

const getMessage = async (id) => {
    try {
        const res = await axios.get(URL + `/messages`, { headers })
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

const postMessage = async ( message) => {
    try {
        const res = await axios.post(URL + `/messages/addMessage`,  {message} )
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}

const deleteMessage = async (id) => {
    try {
        const res = await axios.delete(URL + `/messages/removeMessage/${id}`)
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}
export { getMessage, postMessage, deleteMessage }