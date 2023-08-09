import React from "react"
import axios from "axios"
import image from './assets/profile.jpeg'
import { Link } from "react-router-dom"

function ProfileImageWithoutLink({username}){
    const [profileImage, setProfileImage]=React.useState()

    React.useEffect(()=>{
        axios.get(`http://localhost:3000/profileImage/${username}`, {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            if (response.data.image==null){
                setProfileImage(`http://localhost:3000/images/default.png`)
            }
            else{
                setProfileImage(`http://localhost:3000/images/${response.data.image}`)
            }
        })
    }, [])
    return <img className="profile-image" src={profileImage} alt="profile picture" />
}

export default ProfileImageWithoutLink