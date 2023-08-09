import { Card, Button } from "@mui/material";
import AppBar from "./AppBar";
import { useLocation, useNavigate } from "react-router-dom";
import withAuthorization from "./NotAuthorized";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function SinglePost(props){
    const navigate=useNavigate()

    const location=useLocation()
    const propsData =location.state
    
    return <div>
        <AppBar />
        <div className="align-center">
            <Card className="align-center singlepost-card">
                <div>
                    <img className="singlepost-img" src={`http://localhost:3000/images/${propsData.image}`} />
                    <div className="align-center singlepost-desc">
                        {propsData.description}   
                    </div>
                    <div className="align-center delete-icon-container">
                        <Button size="large" onClick={()=>{
                            axios.delete('http://localhost:3000/deletePost', {headers:{
                                'authorization':'Bearer '+localStorage.getItem('token'),
                                'image':propsData.image
                            }}).then((response)=>{
                                navigate('/profile')
                            })
                        }}>
                            <DeleteIcon className="delete-icon"/>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
}

export default withAuthorization(SinglePost)