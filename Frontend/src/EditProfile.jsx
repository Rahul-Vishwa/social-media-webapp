import AppBar from "./AppBar"
import { Card, TextField, Button } from "@mui/material"
import axios from "axios"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

function EditProfile(props){
    const navigate=useNavigate()

    const location=useLocation()
    const propsData=location.state

    const [newFullName, setNewFullName]=React.useState('')
    const [newUsername, setNewUsername]=React.useState('')
    const [newEmail, setNewEmail]=React.useState('')

    return <div>
        <AppBar />
        <div className="align-center edit-container">
            <Card className="card-width-700 align-center">
                    <div className="align-vertically"> 
                        <TextField className="edit-textfield edit-top" onChange={e=>setNewFullName(e.target.value)} defaultValue={propsData.fullName} id="outlined-basic" label="Full Name" variant="outlined" />
                        <TextField className="edit-textfield" onChange={e=>setNewUsername(e.target.value)} defaultValue={propsData.username} id="outlined-basic" label="Username" variant="outlined" />
                        <TextField className="edit-textfield" onChange={e=>setNewEmail(e.target.value)} defaultValue={propsData.email} id="outlined-basic" label="Email" variant="outlined" />
                        <Button className="edit-button" size="large" variant="contained" onClick={()=>{
                            axios.put('http://localhost:3000/updateUser', {
                                fullName:newFullName,
                                username:newUsername,
                                email:newEmail
                            }, {headers:{
                                'authorization':'Bearer '+localStorage.getItem('token')
                            }}).then((response)=>{
                                localStorage.setItem('token', response.data.token)
                                window.location.href='/profile'
                            })
                        }}>Update</Button>
                    </div>
            </Card>
        </div>
    </div>
}
export default EditProfile