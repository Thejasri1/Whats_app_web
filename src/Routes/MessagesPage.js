import COLORS from "../utils/colors"
import { BsFillMicFill } from "react-icons/bs"
import { BiSearch } from "react-icons/bi"
import { CiMenuKebab } from 'react-icons/ci'
import {ImAttachment} from "react-icons/im"
import {MdOutlineEmojiEmotions} from 'react-icons/md'

const MessagesPage = (props)=>{
    const {usersInfo} = props
    return(
        <div className='chartsBgImage'>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: COLORS.CINDER,paddingTop:"5px",height:"50px" }}>
          <div style={{display:"flex"}}>
            <img src={usersInfo.image} height={45} width={45} style={{ borderRadius: "45px" ,marginRight:"20px"}} alt="userImg" />
            <h4 style={{color:COLORS.WHITE}}>{usersInfo.name}</h4>
          </div>
          <div >
            <BiSearch size={25} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }}/>
            <CiMenuKebab size={25} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }} />
          </div>
        </div>
        <div className='flexContainer'>
        <div>
          <MdOutlineEmojiEmotions size={20} color={COLORS.BRIGHT_GREY} />
          <ImAttachment  size={20} color={COLORS.BRIGHT_GREY}style={{ marginLeft: "20px" }}/>
          <input type={"text"} placeholder="Type a message" className="searchBarForCharts"/>
          <BsFillMicFill size={20} color={COLORS.BRIGHT_GREY} style={{ marginLeft: "20px" }}/>
        </div>
        </div>
      </div>
    )
}
export default MessagesPage