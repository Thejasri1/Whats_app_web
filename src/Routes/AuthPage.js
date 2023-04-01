import { useEffect, useState } from "react"
import COLORS from "../utils/colors"
import { AiOutlineArrowLeft, AiOutlineCheck } from "react-icons/ai"
import { IoMdCamera } from "react-icons/io"
import { HiPencil } from "react-icons/hi"
import { RxCross2 } from "react-icons/rx"
import { updateAuthData } from "../API/Auth"
import { TiCamera } from "react-icons/ti"
import { Link } from "react-router-dom"
import FileResizer from "react-image-file-resizer"
import "../index.css"

const AuthPage = (props) => {
    const { auth } = props
    const [authData, setAuthData] = useState(auth)
    const [visibleOptions, setVisibleOptions] = useState("")
    const [updateText, setUpdateText] = useState(true)
    const [updateStatusText, setUpdateStatusText] = useState(true)
    const [selectedOptions, setSelectedOptions] = useState("")
    const [displayModel, setDisplayModel] = useState(false)
    const [displayTakePhotoContainer, setDisplayTakePhotoContainer] = useState(false)


    //on display profile options like take photo,upload photo,delete photo,view photo 
    const onClickProfilePhoto = (userData) => {
        setVisibleOptions(userData)
    }
    useEffect(() => {
        setUpdateText(true)
        setUpdateStatusText(true)
    }, [])
    const resizeFile = (file,authInfo) => new Promise(resolve => {
        FileResizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
        uri => {
          resolve(uri);
          const updatedData = { _id: authInfo?._id, image: uri, name: authInfo?.name, status: authInfo?.status }
                const res = updateAuthData(authInfo._id, updatedData)
                setAuthData(res)
                window.location.replace('/?profile')
        }, 'base64' );
    });
    
    const onTakeBaseURL = async(e,authInfo) => {
        const fr = new FileReader()
        const file = e.target.files[0];
        const image = await resizeFile(file,authInfo);
    }

    const onDisplayOptions = (userData) => {
        return (
            <div style={{ backgroundColor: COLORS.CINDER, width: "200px", padding: "10px" }}>
                <button style={{ backgroundColor: COLORS.CINDER, border: "none", color: "white", fontSize: "14px", position: "relative", left: "40px", top: "-8px", marginBottom: "15px", marginTop: "15px" }} hidden={authData.image === ""} onClick={() => setSelectedOptions("View Photo")}>View Photo</button>
                <br />
                <button style={{ backgroundColor: COLORS.CINDER, border: "none", color: "white", fontSize: "14px", position: "relative", left: "40px", top: "-8px", marginBottom: "15px" }} onClick={() => setDisplayTakePhotoContainer(true)}>Take Photo</button>
                <br />
                <button style={{ backgroundColor: COLORS.CINDER, border: "none", color: "white", fontSize: "14px", position: "relative", left: "40px", top: "-8px", marginBottom: "15px" }} hidden={authData.image === ""} onClick={() => setDisplayModel(true)}>Remove Photo</button>
                <br />
                <input type="file" id="selectedFile" style={{ display: "none" }} accept="image/jpeg,image/png,image/jpg" onChange={(e)=>onTakeBaseURL(e,authData)} />
                <input type="button" value="Upload Photo" onClick={() => document.getElementById('selectedFile').click()} style={{ backgroundColor: COLORS.CINDER, border: "none", color: "white", fontSize: "14px", position: "relative", left: "35px", top: "-8px", marginBottom: "15px" }} />
            </div>
        )
    }

    const onChangeAuthName = (e, authInfo) => {
        let value = e.target.value
        const updatedData = { _id: authInfo._id, image: authInfo.image, name: value, status: authInfo.status }
        setAuthData(updatedData)
    }
    const onChangeAuthStatus = (e, authInfo) => {
        let value = e.target.value
        const updatedData = { _id: authInfo._id, image: authInfo.image, name: authInfo.name, status: value }
        setAuthData(updatedData)

    }


    //update call
    const onSaveUpdatedData = async (data) => {
        try {
            setUpdateText(true)
            setUpdateStatusText(true)
            const res = await updateAuthData(data._id, data)
            setAuthData(res)
        }
        catch (e) {
            console.log(e)
        }
    }
    const onFormSubmit = (e) => {
        e.preventDefault()
    }
    const onCallingViewPhotoContainer = (authData) => {
        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: COLORS.CINDER, padding: "5px" }}>
                    <h5 style={{ color: COLORS.WHITE }}>{authData?.name}</h5>
                    <RxCross2 size={25} color={COLORS.WHITE} onClick={onClickGoBack} />
                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", position: "relative", top: "100px" }}>
                    <img src={authData?.image} alt={authData?.name} height={400} width={400} />
                </div>
            </>
        )
    }

    const onClickGoBack = () => {
        window.location.replace("/")
    }
    const onCancelRemovePhoto = () => {
        setDisplayModel(false)
    }
    const onRemoveRemovePhoto = async (authValue) => {
        try {
            const updatedRes = { _id: authValue._id, image: "", name: authValue.name, status: authValue.status }
            const res = updateAuthData(authValue._id, updatedRes)
            setAuthData(res)
            setDisplayModel(false)
            window.location.replace('/?profile')
        }
        catch (e) {
            console.log(e)
        }
    }
    const onCallingTakePhotoContainer = (authData) => {
        setDisplayModel(false)

    }

    //web cam access to take photos for upload
    const openCam = () => {
        let All_mediaDevices = navigator.mediaDevices
        if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
            console.log("getUserMedia() not supported.");
            return;
        }
        All_mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
            .then(function (vidStream) {
                var video = document.getElementById('webCam');
                if ("srcObject" in video) {
                    video.srcObject = vidStream;
                } else {
                    video.src = window.URL.createObjectURL(vidStream);
                }
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            })
            .catch(function (e) {
                console.log(e.name + ": " + e.message);
            });
    }
    //on click take photo for capturing
    const onTakePhoto = () => {
        try {
            const webCamElement = document.getElementById("webCam")
            const canvasElement = document.getElementById("canvas")
            canvasElement.getContext('2d').drawImage(webCamElement, 0, 0, canvasElement.width, canvasElement.height);
            let image_data_url = canvasElement.toDataURL('image/jpeg');
            console.log("image_data_url ",image_data_url )
            const updatedData = { _id: authData._id, image: image_data_url, name: authData.name, status: authData.status }
            const res = updateAuthData(authData._id, updatedData)
            setAuthData(res)
            window.location.replace('/?profile')
        }
        catch (e) {
            console.log(e)
        }
    }
    const option = selectedOptions.toLocaleLowerCase()
    return (
        <>
            {
                option === "View Photo".toLocaleLowerCase() ? <div key={authData?.id}>
                    {onCallingViewPhotoContainer(authData)}
                </div> : option === "Take Photo".toLocaleLowerCase() ?
                    <div>
                        {onCallingTakePhotoContainer(authData)}
                    </div> :
                    <form onSubmit={onFormSubmit}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: COLORS.CINDER, height: "50px", padding: "10px" }} >
                            <Link to="/"  > <AiOutlineArrowLeft size={25} color={COLORS.WHITE} onClick={onClickGoBack} /></Link>
                            <h4 style={{ color: COLORS.WHITE }}>Profile</h4>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} className="container" onClick={() => onClickProfilePhoto(authData)} >
                            {
                                authData.image === "" ? <img src="https://www.clipartmax.com/png/small/214-2143742_individuals-whatsapp-profile-picture-icon.png" alt="" className="authIamge" /> :
                                    <img src={authData?.image} alt={authData.name} className="authIamge" />
                            }
                            <div className="middle">
                                <div className="text">
                                    <IoMdCamera size={25} color={COLORS.WHITE} style={{ cursor: "pointer" }} />
                                    <h5 style={{ fontWeight: "600" }}>
                                        {
                                            authData.image === "" ? "ADD PROFILE PHOTO" : "CHANGE PROFILE PHOTO"
                                        }
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="flexingOptionsContainer">
                            {visibleOptions !== "" && onDisplayOptions(visibleOptions)}
                        </div>
                        <div style={{ padding: "20px" }}>
                            <p style={{ color: COLORS.TEAL }}>Your name</p>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                {updateText &&
                                    <h4 style={{ color: COLORS.WHITE }}>
                                        {authData?.name}
                                    </h4>
                                }
                                {!updateText &&
                                    <input type="text" name="name" value={authData.name} className="authInput" onChange={(e) => onChangeAuthName(e, authData)} />
                                }
                                {
                                    updateText &&
                                    <HiPencil size={25} color={COLORS.WHITE} onClick={() => { setUpdateText(false) }} style={{ cursor: "pointer" }} />
                                }
                                {!updateText &&
                                    <AiOutlineCheck size={25} color={COLORS.WHITE} style={{ cursor: "pointer" }} onClick={() => onSaveUpdatedData(authData)} />}
                            </div>
                            <p style={{ color: COLORS.WHITE }}>
                                This is not user name or pin.This name will be visible to your whats app contacts
                            </p>
                            <p style={{ color: COLORS.TEAL }}>
                                Status
                            </p>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                {updateStatusText &&
                                    <h4 style={{ color: COLORS.WHITE }}>
                                        {authData?.status}
                                    </h4>}
                                {!updateStatusText &&
                                    <input type="text" value={authData.status} name="status" className="authInput" onChange={(e) => onChangeAuthStatus(e, authData)} />
                                }
                                {
                                    updateStatusText &&
                                    <HiPencil size={25} color={COLORS.WHITE} style={{ cursor: "pointer" }} onClick={() => { setUpdateStatusText(false) }} />}
                                {
                                    !updateStatusText && <AiOutlineCheck size={25} color={COLORS.WHITE} style={{ cursor: "pointer" }} onClick={() => onSaveUpdatedData(authData)} />
                                }
                            </div>
                        </div>
                    </form>

            }
            {
                displayModel && <div className="removeContainer">
                    <h4 style={{ color: COLORS.WHITE }}>Remove your profile photo ?</h4>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
                        <button onClick={onCancelRemovePhoto} style={{ border: "1px solid #2a3942", backgroundColor: COLORS.CINDER, color: COLORS.TEAL, padding: "10px", cursor: "pointer" }}>CANCEL</button>
                        <button onClick={() => onRemoveRemovePhoto(authData)} style={{ border: "1px solid #2a3942", backgroundColor: COLORS.TEAL, color: COLORS.CINDER, padding: "10px", cursor: "pointer", marginLeft: "20px" }}>REMOVE</button>
                    </div>
                </div>
            }
            {displayTakePhotoContainer && <div className="takePhotoContainer">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "Space-between", backgroundColor: COLORS.LIGHT_GREY, paddingLeft: "15px" }}>
                    <button style={{ color: "white", backgroundColor: COLORS.TEAL, border: "none", margin: "10px", padding: "10px", cursor: "pointer", borderRadius: "5px" }} onClick={openCam}>Click to Allow Webcam</button>
                    <RxCross2 size={30} color={COLORS.WHITE} onClick={() => setDisplayTakePhotoContainer(false)} />
                </div>
                <div>
                    <video id="webCam" style={{ width: "500px", height: "300px" }} autoPlay playsInline></video>
                    <canvas id="canvas" hidden={true}></canvas>

                </div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: COLORS.LIGHT_GREY, padding: "20px" }}>
                    <button style={{ borderRadius: "50px", border: "none" }}>
                        <a download onClick={() => onTakePhoto()}>
                            <TiCamera size={30} color={COLORS.TEAL} />
                        </a>
                    </button>
                </div>
            </div>

            }
        </>
    )
}
export default AuthPage