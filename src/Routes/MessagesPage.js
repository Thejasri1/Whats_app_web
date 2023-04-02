import COLORS from "../utils/colors"
import { BsFillMicFill } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { CiMenuKebab } from 'react-icons/ci'
import { ImAttachment } from "react-icons/im"
import { MdOutlineEmojiEmotions, MdSend } from 'react-icons/md'
import { useState, useEffect } from "react"
import { getMessage, postMessage, deleteMessage } from "../API/Messages"
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080")

const MessagesPage = (props) => {
  const { usersInfo } = props
  const [messageSend, setMessageSend] = useState(false)
  const [messagesText, setMessagesText] = useState({ message: "" })
  const [senderMessages, setSenderMessages] = useState("")
  const [messagesRecieverText, setMessagesRecieverText] = useState("")
  const [selectedMsg, setSelectedMsg] = useState("")

  const onChangeMessage = (e) => {
    setMessageSend(true)
    setMessagesText((ps) => ({ ...ps, [e.target.name]: e.target.value }))
  }
  const getAllMessages = async()=> {
    try {
      const res = await getMessage()
      setSenderMessages(res)
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllMessages()
  }, [senderMessages])

  const onSendMessage = async () => {
    try {
      let message = messagesText?.message
      socket.emit("send_message", { message })
      document.getElementById("message").value = ""
      const res = await postMessage(message)
      getAllMessages()
      return res
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessagesRecieverText([data?.message])
    })
    document.getElementById("message").value = ""
  }, [socket])
  const onClickMessageContainer = (msg) => {
    setSelectedMsg(msg._id)
    console.log("msg._id",msg._id)
  }
  const onDeleteMessage = async (msg) => {
    try{
      const res = await deleteMessage(msg._id)
      getAllMessages()
      setSelectedMsg("")
      return res
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className='chartsBgImage'>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: COLORS.CINDER, paddingTop: "5px", height: "50px" }}>
        <div style={{ display: "flex" }}>
          <img src={usersInfo?.image} height={45} width={45} style={{ borderRadius: "45px", marginRight: "20px" }} alt="userImg" />
          <h4 style={{ color: COLORS.WHITE }}>{usersInfo?.name}</h4>
        </div>
        <div >
          <BiSearch size={25} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }} />
          <CiMenuKebab size={25} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", padding: "5px" }}>
        <p style={{ color: COLORS.WHITE, backgroundColor: COLORS.TEAL, padding: "5px 10px 5px 10px", marginLeft: "20px", borderRadius: "5px" }} hidden={messagesRecieverText === undefined || messagesRecieverText === ""}>
          {messagesRecieverText}
        </p>
      </div>
      {
        senderMessages !== "" && senderMessages?.map(x => {
          return (
            <>

              <div style={{ display: "flex", flexDirection: "row", justifyContent: "end" }} >
                <p style={{ color: COLORS.WHITE, backgroundColor: COLORS.TEAL, padding: "5px 10px 5px 10px", marginRight: "20px", borderRadius: "5px", cursor: "pointer" }} hidden={messagesText === undefined} onClick={() => onClickMessageContainer(x)}>
                  {x.message}

                </p>
              </div>
              {selectedMsg === x._id && <div className="messageEditingOptionsContainer">
                <ul style={{ listStyleType: "none" }}>
                  <li><button style={{ border: "none", backgroundColor: COLORS.CINDER, color: COLORS.WHITE, padding: "10px", cursor: "pointer" }}>Forward Message</button></li>
                  <li><button style={{ border: "none", backgroundColor: COLORS.CINDER, color: COLORS.WHITE, padding: "10px", cursor: "pointer" }} onClick={() => onDeleteMessage(x)}>Delete Message</button></li>
                </ul>
              </div>}
            </>
          )
        })
      }
      <div className='flexContainer'>
        <div>
          <MdOutlineEmojiEmotions size={20} color={COLORS.BRIGHT_GREY} />
          <ImAttachment size={20} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }} />
          <input type={"text"} name="message" value={messagesText.message} id="message" placeholder="Type a message" className="searchBarForCharts" onChange={onChangeMessage} />
          {messageSend ? <MdSend size={20} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }} onClick={onSendMessage} /> :
            <BsFillMicFill size={20} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }} />}
        </div>
      </div>

    </div>
  )
}
export default MessagesPage