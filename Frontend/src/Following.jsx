import axios from "axios";
import AppBar from "./AppBar";
import React from "react";
import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";


function Following(){
    const [following, setFollowing]=React.useState([])

    React.useEffect(()=>{
        axios.get('http://localhost:3000/followers', {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setFollowing(response.data)
        })
    }, [])

    return <div>
        <AppBar />
        <div className="align-center following-card">
            <div className="card-width-300">
                {following.map((user)=>{
                    return <CreateCard username={user.username} />
                })}
            </div>
        </div>
    </div>
}

function CreateCard(props){
    const [image, setImage]=React.useState()

    React.useEffect(()=>{
        axios.get(`http://localhost:3000/profileImage/${props.username}`, {headers:{
            'authorization':'Bearer '+localStorage.getItem('token')
        }}).then((response)=>{
            setImage(response.data.image)
        })
    }, [])
    return <Card className="follow-single-card">
        <Link className="profile-link" to={`/userProfile/${props.username}`}>
            <div className="following">
                <div className="follow-container">
                    <div className="follow-image">
                        <img className="explore-profile-image" src={`http://localhost:3000/images/${image}`} />
                    </div>
                    <div className="follow-username">
                        {props.username}
                    </div>
                </div>
            </div>
        </Link>
    </Card>
}

export default Following