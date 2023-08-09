import React from "react"
import axios from "axios"
import image from './assets/profile.jpeg'
import { Link } from "react-router-dom"

function ProfileImage(){
    const [profileImage, setProfileImage]=React.useState()

    React.useEffect(()=>{
        axios.get('http://localhost:3000/profileImage', {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            if (response.data.image==null){
                setProfileImage(image)
            }
            else{
                setProfileImage(`http://localhost:3000/images/${response.data.image}`)
            }
        })
    }, [])
    return <Link to={'/updateprofileimage'} state={{image:profileImage}}>
        <img className="profile-image" src={profileImage} alt="profile picture" />
    </Link>
}

export default ProfileImage