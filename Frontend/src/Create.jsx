import React from "react"
import { Button, Card, TextField } from "@mui/material"
import axios from 'axios'
import AppBar from "./AppBar"
import { useNavigate } from "react-router-dom"
import withAuthorization from "./NotAuthorized"

function Create(){
    const navigate=useNavigate()

    const [file, setFile]=React.useState()
    const [preview, setPreview]=React.useState()
    const [description, setDescription]=React.useState('')
    const [imageNotUploaded, setImageNotUploaded]=React.useState(false)

    React.useEffect(()=>{
        if (!file){
            setPreview(undefined)
            return
        }
        const objectUrl=URL.createObjectURL(file)
        setPreview(objectUrl)
        return()=>URL.revokeObjectURL(objectUrl)

    }, [file])
    
    const handleCreate=()=>{
        const formdata=new FormData()
        formdata.append('file', file)
        if (file){
            axios.post('http://localhost:3000/upload', formdata, {headers:{
                'description':description,
                'authorization':'Bearer '+localStorage.getItem('token')
            }}).then((response)=>{
                console.log(response.data.message)
                navigate('/postcreated')

            }).catch((err)=>{
                console.log(err)
            })
        }
        else{
            setImageNotUploaded(true)
        }
    }
    const handleUpload=(e)=>{
        setFile(e.target.files[0])
    }

    return <div className="font">
        <AppBar />
        <div className="align-center create-container">
            <Card className="create-card">
                <div className="align-center create-card-container">
                    <div>
                        <div className="align-center preview">
                            {preview && <div className="image-settings">
                                <img className="image-preview" src={preview} />
                            </div>}
                        </div>
                        <div className="align-center">
                            <label className="choose-file">
                                <input required type="file" onChange={handleUpload} />
                                Upload an image
                            </label>
                        </div>
                        <div className="error align-center create-error">
                            {imageNotUploaded && <div>No image uploaded!</div>}
                        </div>
                        <div className="align-center create-description">
                            <TextField multiline fullWidth onChange={(e)=>setDescription(e.target.value)} id="outlined-basic" label="Caption" variant="outlined" />
                        </div>
                        <div className="create-button align-center">
                            <Button variant="contained" onClick={handleCreate}>Create post</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
}

export default withAuthorization(Create)