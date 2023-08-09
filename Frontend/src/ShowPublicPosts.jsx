import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
import { Card, Button, TextField } from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

function ShowPublicPosts(){
    const [posts, setPosts]=React.useState()
    const [loading, setLoading]=React.useState(true)

    React.useEffect(()=>{
        setInterval(() => {
            axios.get('http://localhost:3000/publicPosts', {headers:{
                'authorization':'Bearer '+localStorage.getItem('token')
            }}).then((response)=>{
                setPosts(response.data)
                setLoading(false)
            })
        }, 2000);
    },[])

    return <div className="align-center explore-margin">
        <div>
            { loading?(
                <div>Loading...</div>
                ):(
                    posts.map((post)=>{
                        return <div>
                        <CreatePostCard likes={post.noOfLikes} id={post._id} username={post.username} fullName={post.fullName} profileImage={post.profileImage} image={post.image} description={post.description} />
                    </div>
                })
                )
            }
        </div>
    </div>
}
  
function CreatePostCard({likes, id, username, fullName, profileImage, image, description}){
    
    const [liked, setLiked]=React.useState()
    const [commentsVisibility, setCommentsVisibility]= React.useState(false)
    const [comment, setComment]=React.useState()
    const [comments, setComments]=React.useState([])
    const [currentUser, setCurrentUser]=React.useState()

    React.useEffect(()=>{
        axios.get(`http://localhost:3000/liked/${id}`, {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setLiked(response.data.liked)
        })
        axios.get('http://localhost:3000/getUser', {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setCurrentUser(response.data)
        })
    }, [])


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
            <div className="align-center delete-icon-container">
                <div className="likes">
                    {
                        (likes>0) && likes
                    }
                </div>
                <Button className="button-cont" size="large" onClick={()=>{
                    axios.post(`http://localhost:3000/like/${id}`, null, {headers:{
                        'authorization':'Bearer '+localStorage.getItem('token')
                    }}).then((response)=>{
                        if (response.data.message==='like removed'){
                            setLiked(false)
                        }
                        else{
                            setLiked(true)
                        }
                    })
                }}>
                    {
                        liked && <ThumbUpIcon className="like-button delete-icon"/>
                    }
                    {
                        !liked && <ThumbUpIcon className="delete-icon"/>
                    }   
                </Button>
                <Button className="button-cont" size="large" onClick={()=>{
                    axios.get(`http://localhost:3000/comments/${id}`, {headers:{
                        'authorization':'Bearer '+localStorage.getItem('token')
                    }}).then((response)=>{
                        setComments(response.data)
                    })
                    if (commentsVisibility){
                        setCommentsVisibility(false)
                    }
                    else{
                        setCommentsVisibility(true)
                    }
                }}>
                    <CommentIcon className="delete-icon"/>
                </Button>
            </div>
            {commentsVisibility && 
            <div>

                <div className="align-center">
                    <div className="align-vertically">
                        <div className="comment-box">
                                <TextField className="comment-field" onChange={e=>setComment(e.target.value)} label="Comment" multiline maxRows={4} />
                                <div className="align-center">
                                    <Button className="upload-button" onClick={()=>{
                                        axios.post(`http://localhost:3000/comment/${id}`, {comment}, {headers:{
                                            'authorization':'Bearer '+localStorage.getItem('token')
                                        }}).then((response)=>{
                                            console.log(response.data)
                                        }) 
                                    }}>
                                        <KeyboardDoubleArrowDownIcon className="arrow"/>
                                    </Button>
                                </div>
                        </div>
                    </div>
                </div>
                    <div>
                        {/* <Comments comments={comments} setComments={setComments} id={id} /> */}
                        {Object.keys(comments).map((key, value)=>{
                            axios.get(`http://localhost:3000/comments/${id}`, {headers:{
                                'authorization':'Bearer '+localStorage.getItem('token')
                            }}).then((response)=>{
                                setComments(response.data)
                            })
                            return <Comments comment={comments[key]} currentUser={currentUser} />
                        })}
                    </div>
            </div>
            }
        </div>
    </Card>
}

function Comments({comment, currentUser}){
    const [showDeleteButton, setShowDeleteButton]=React.useState(false)
    React.useEffect(()=>{
        if (comment.username===currentUser.username){
            setShowDeleteButton(true)
        }
        else{
            setShowDeleteButton(false)
        }
    }, [])
    return <div className="comment-container">
                    <div className="comment">
                        <Link className="comment-link" to={`/userProfile/${comment.username}`}>
                            <img className="explore-profile-image comment-image" src={`http://localhost:3000/images/${comment.profileImage}`} />
                        </Link>
                        <div className="comment-username">
                            <Link className="comment-link" to={`/userProfile/${comment.username}`}>
                                <div className="comment-username-bold">
                                    {comment.username}
                                </div>
                            </Link>         
                            <div>
                                {comment.comment}
                            </div>
                        </div>
                    </div> 
            {showDeleteButton && <DeleteIcon />}
        </div>
}

export default ShowPublicPosts