import { Card, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import React from "react"
import withAuthorization from "./NotAuthorized"

function ShowPosts(props){
    return <Card className="align-center post-card-container"> 
            <Grid container spacing={0.8} className="grid">
                {props.posts.map((post)=>{
                    return <Grid item xs={4} sm={4} md={4}>
                        <CreateCard post={post} />
                    </Grid>
                })}
            </Grid>
    </Card>
}

function CreateCard(props){
    const [post, setPost]=React.useState()
    React.useEffect(()=>{
        setPost(props.post)
    }, [])

    return <div className="profile-posts">
            <Link to={`/post/${props.post._id}`} state={post}>
                <img src={"http://localhost:3000/images/"+props.post.image} />
            </Link>
        </div>
}

export default ShowPosts