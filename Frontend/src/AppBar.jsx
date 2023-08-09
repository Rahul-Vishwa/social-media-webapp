import { Typography, Button } from "@mui/material"
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function AppBar(){
    
    const navigate=useNavigate()
    const [username, setUsername]=React.useState('')
    

    React.useEffect(()=>{
        axios.get('http://localhost:3000/getUserDetails', {headers:{
            'authorization': 'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setUsername(response.data.username)
        })
    },[])

    return <div className="appbar">
    <div className="appbar-container">
        <div className="appname-buttons">
            <div className="appbar-appname">
                <Typography className="typo-appname" fontFamily={'Pacifico'}>
                    Time waste
                </Typography>
            </div>
            <div className="appbar-buttons">
                <Button size="medium" className="appbar-button" onClick={()=>navigate('/explore')}>Explore</Button>
                <Button size="medium" className="appbar-button" onClick={()=>navigate('/create')}>Create</Button>
                <Button size="medium" className="appbar-button" onClick={()=>navigate('/feed')}>Feeds</Button>
            </div>
        </div>
        <div className="profile">
            <Button size="medium" className="appbar-button" onClick={()=>{
                navigate('/profile')
            }}>{username}</Button>
            <Button size="medium" className="appbar-button" onClick={()=>{
                localStorage.removeItem('token')
                navigate('/signin')
            }}>Logout</Button>
        </div>
    </div>
    </div>
}

export default AppBar