import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import { Card } from "@mui/material"
import AppBar from "./AppBar"

function Feed(){
    const [posts, setPosts]=React.useState()
    const [loading, setLoading]=React.useState(true)

    React.useEffect(()=>{
        setInterval(() => {
            axios.get('http://localhost:3000/feedPosts', {headers:{
                'authorization':'Bearer '+localStorage.getItem('token')
            }}).then((response)=>{
                setPosts(response.data)
                setLoading(false)
            })
        }, 2000);
    },[])

    return <div>
        <AppBar />
    <div className="align-center explore-margin">
        <div>
            { loading?(
                <div>Loading...</div>
                ):(
                    posts.map((post)=>{
                        return <div>
                        <CreatePostCard username={post.username} fullName={post.fullName} profileImage={post.profileImage} image={post.image} description={post.description} />
                    </div>
                })
                )
            }
        </div>
    </div>
                </div>
}

function CreatePostCard({username, fullName, profileImage, image, description}){
    return <Card className="card-width-700 align-center font explore-card">
        <div className="explore-container">
            <div className="explore-image-user">
                <Link className="userprofile-link" to={`/userProfile/${username}`}>
                    <div className="align-center">

                    <div>
                        <img className="explore-profile-image" src={`http://localhost:3000/images/${profileImage}`} />
                    </div>
                    <div className="align-vertically pro-user">
                        <div className="explore-username">
                            {username}
                        </div>
                        <div className="explore-fullname">
                            {fullName}
                        </div>
                    </div>
                    </div>
                </Link>
            </div>
            <div>
                <img className="explore-image" src={`http://localhost:3000/images/${image}`} />
            </div>
            <div className="explore-caption">
                {description}
            </div>
        </div>
    </Card>
}

export default Feed