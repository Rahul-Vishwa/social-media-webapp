import { Card, Button } from "@mui/material"
import AppBar from "./AppBar"
import { useLocation } from "react-router-dom"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function UpdateProfileImage(props){
    const location=useLocation()
    const propsData=location.state

    const navigate=useNavigate()

    const [file, setFile]=React.useState()
    const [preview, setPreview]=React.useState()
    const [imageNotUploaded, setImageNotUploaded]=React.useState(false)
    const [image, setImage]=React.useState(propsData.image)

    React.useEffect(()=>{
        if (!file){
            setPreview(undefined)
            return
        }
        const objectUrl=URL.createObjectURL(file)
        setPreview(objectUrl)
        return()=>URL.revokeObjectURL(objectUrl)

    }, [file])

    const handleUpload=()=>{
        const formdata=new FormData()
        formdata.append('file', file)
        if (file){
            axios.post('http://localhost:3000/profileImage', formdata, {headers:{
                'authorization':'Bearer '+localStorage.getItem('token')
            }}).then((response)=>{
                console.log(response.data.message)
                setImage(`http://localhost:3000/images/${response.data.image}`)
                navigate('/profile')
            }).catch((err)=>{
                console.log(err)
            })
        }
        else{
            setImageNotUploaded(true)
        }
    }

    return <div>
        <AppBar />
        <div className="align-center">
            <Card className="card-width-700 card-margin">
                <div className="align-center update-image">
                    <div>
                        <div className="align-center pic-label">
                            Current Profile pic
                        </div>
                        <img className="update-img-preview" src={image} />
                    </div>
                </div>
                <div>
                        <div className="align-center preview">
                            {preview && <div className="image-settings-update">
                                <div className="align-center pic-label">
                                    New Profile pic
                                </div>
                                <img src={preview} />
                            </div>}
                        </div>
                        <div className="align-center">
                            <label className="choose-file">
                                <input required type="file" onChange={e=>setFile(e.target.files[0])} />
                                Upload an image
                            </label>
                        </div>
                        <div className="error align-center create-error">
                            {imageNotUploaded && <div>No image uploaded!</div>}
                        </div>
                        <div className="create-button align-center margin-bottom-button">
                            <Button size="large" className="update-pic" variant="contained" onClick={handleUpload}>Update Profile pic</Button>
                        </div>
                    </div>
            </Card>
        </div>
    </div>
}

export default UpdateProfileImage