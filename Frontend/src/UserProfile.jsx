import axios from "axios"
import React from "react"
import AppBar from "./AppBar"
import { Card, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import ProfileImageWithoutLink from "./ProfileImageWithoutLink"
import ShowPostsWithoutDelete from "./ShowPostsWithoutDelete"

function userProfile(){
    const navigate=useNavigate()

    const username=useParams().username
    const [fullName, setFullName]=React.useState('')
    const [posts, setPosts]=React.useState([])
    const [notFollow, setNotFollow]=React.useState(true)

    const headers={headers:{
        'authorization':'Bearer '+localStorage.getItem('token')
    }}

    React.useEffect(()=>{
        
        axios.get('http://localhost:3000/getUser', headers).then((response)=>{
            if (response.data.username==username){
                navigate('/profile')
            }
        })
        axios.get(`http://localhost:3000/profileDetails/${username}`, headers).then((response)=>{
            setFullName(response.data.fullName)
        })
        axios.get(`http://localhost:3000/getPosts/${username}`, headers).then((response)=>{
            setPosts(response.data)
        })
        axios.get('http://localhost:3000/followers', headers).then((response)=>{
            const following=response.data
            following.map((user)=>{
                if (user.username===username){
                    setNotFollow(false)
                }
            })
        })
    }, [])

    return <div>
        <AppBar />
        <div className="align-center font">
            <div className="profile-container">
                <Card className="profile-details-container">
                    <div className="profile-details">
                        <div className="profile-image-container">
                            <ProfileImageWithoutLink username={username} />
                        </div>
                        <div className="username-fullname user-name-margin">
                            <div className="profile-username">{username}</div>
                            <div className="profile-fullname">{fullName}</div>
                            {
                            notFollow && <div>
                                <Button className="follow-button" size="small" variant="contained" onClick={()=>{
                                    axios.post('http://localhost:3000/follow', null, {headers:{
                                        'authorization':'Bearer '+localStorage.getItem('token'),
                                        'username':username
                                    }})
                                    setNotFollow(false)                                 
                                }}>follow</Button>
                                </div>
                            }
                            {
                            !notFollow && <div>
                                <Button className="follow-button" size="small" variant="contained" onClick={()=>{
                                    axios.delete(`http://localhost:3000/unfollow/${username}`, headers).then((response)=>{
                                        console.log(response.data.message)
                                        setNotFollow(true)
                                    })
                                }}>unfollow</Button>
                            </div>
                            }
                        </div>
                    </div>
                </Card>
                <Card className="posts-following">
                    <div className="your-posts">
                        Posts
                    </div>
                    {/* <div className="following">
                        <Button size="small" variant="contained">following</Button>
                    </div> */}
                </Card>
                <ShowPostsWithoutDelete posts={posts}/>
            </div>
        </div>
    </div>
}
export default userProfile