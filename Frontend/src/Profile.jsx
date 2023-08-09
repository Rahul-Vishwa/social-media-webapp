import { Button, Card, Typography } from "@mui/material"
import React from "react"
import axios from "axios"
import profileImage from './assets/profile.jpeg'
import ShowPosts from "./ShowPosts"
import AppBar from './AppBar'
import withAuthorization from "./NotAuthorized"
import {Link, useNavigate} from "react-router-dom"
import ProfileImage from "./ProfileImage"

function Profile(){
    const navigate=useNavigate()

    const [username, setUsername]=React.useState('')
    const [fullName, setFullName]=React.useState('')
    const [email, setEmail]=React.useState('')
    const [posts, setPosts]=React.useState([])

    React.useEffect(()=>{
        axios.get('http://localhost:3000/getUserDetails', {headers:{
            'authorization': 'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setUsername(response.data.username)
            setFullName(response.data.fullName)
            setEmail(response.data.email)
        })
        axios.get(`http://localhost:3000/getPosts`, {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setPosts(response.data)
        })
    },[])

    return <div>
        <AppBar />
        <div className="align-center font">
            <div className="profile-container">
                <Card className="profile-details-container">
                    <div className="profile-details">
                        <div className="profile-image-container">
                                <ProfileImage />
                        </div>
                        <div className="username-fullname">
                            <div className="profile-username">{username}</div>
                            <div className="profile-fullname">{fullName}</div>
                            <Link to={'/editprofile'} state={{
                                username:username,
                                fullName:fullName,
                                email:email
                            }}>
                                <Button className="profile-button" variant="contained">Edit profile</Button>
                            </Link>
                        </div>
                    </div>
                </Card>
                <Card className="posts-following">
                    <div className="your-posts">
                        Your posts
                    </div>
                    <div className="following">
                        <Button size="small" variant="contained" onClick={()=>{
                            navigate('/following')
                        }}>following</Button>
                    </div>
                </Card>
                <ShowPosts posts={posts}/>
            </div>
        </div>
    </div>
}

export default withAuthorization(Profile)