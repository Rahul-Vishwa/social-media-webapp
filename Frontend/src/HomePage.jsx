import { Typography, Card, Grid, TextField, Button } from "@mui/material" 
import "./style.css"
import { Link } from "react-router-dom"
import React from "react"
import axios from "axios"
import Content from "./Content"
import { useNavigate } from "react-router-dom"

function HomePage(){

    const navigate=useNavigate()

    const [fullName, setFullName]=React.useState('')
    const [email, setEmail]=React.useState('')
    const [username, setUsername]=React.useState('')
    const [password, setPassword]=React.useState('')
    const [error, setError]=React.useState(false)
    const [errorMessage, setErrorMessage]=React.useState('')

    return <div className="homepage-container">
        <div className="heading">
            <Typography variant="h3" fontFamily={'Pacifico'}>
                Time waste
            </Typography>
        </div>
        <div className="content">
            <Grid container spacing={2.5} justifyContent={"center"}>
                <Grid item xs={9} sm={9} md={6}>
                    <Content />
                </Grid>
                <Grid item xs={9} sm={6} md={3.2}>
                    <Card className="input-card" style={{backgroundColor:'#f3f2f4'}}>
                            <div className="input-card-item align-center signup">
                                <Typography variant="h4" fontFamily={'Mukta'}> 
                                    Sign up below!
                                </Typography>
                            </div>
                            <div className="input-card-item">
                                <TextField onChange={(e)=>setFullName(e.target.value)} size="small" type="text" fullWidth id="outlined-basic" label="Full Name" variant="outlined" />
                            </div>
                            <div className="input-card-item">
                                <TextField onChange={(e)=>setEmail(e.target.value)} size="small" type="email" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                            </div>
                            <div className="input-card-item">
                                <TextField onChange={(e)=>setUsername(e.target.value)} size="small" type="text" fullWidth id="outlined-basic" label="Username" variant="outlined" />   
                            </div>
                            <div className="input-card-item">
                                <TextField onChange={(e)=>setPassword(e.target.value)} size="small" type="password" fullWidth id="outlined-basic" label="Password" variant="outlined" />   
                            </div>
                            < div className="input-card-item error align-center" >
                               {error && errorMessage}
                            </div>
                            <div className="input-card-item align-center signup signup-button">
                                <Button fullWidth variant="contained" onClick={()=>{
                                    axios.post('http://localhost:3000/signup', {
                                        fullName:fullName,
                                        email:email,
                                        username:username,
                                        password:password
                                    }).then((response)=>{
                                        console.log(response.data)
                                        navigate('/signin')
                                    }).catch((err)=>{
                                        if (err.response.status==409){
                                            setError(true)
                                            setErrorMessage(err.response.data.message)                                     
                                        }
                                        else{
                                            console.log("Error")
                                        }
                                    })
                                }}>Sign up</Button>
                            </div>
                            <div className="input-card-item align-center">
                                Already have an account?&nbsp;<Link className="signin-signup-text" to='/signin'>Sign in</Link>
                            </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    </div>
}


export default HomePage