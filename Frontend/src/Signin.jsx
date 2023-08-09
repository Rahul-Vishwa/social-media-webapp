import { Typography, Card, Grid, TextField, Button } from "@mui/material" 
import "./style.css"
import { Link } from "react-router-dom"
import React from "react"
import axios from "axios"
import Content from "./Content"
import { useNavigate } from "react-router-dom"


function Signin(){
    const navigate=useNavigate()
  
    const [emailOrUsername, setEmailOrUsername]=React.useState('')
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
            <Grid container flexGrow={1} spacing={2.5} justifyContent={"center"}>
                <Grid item xs={9} sm={9} md={6}>
                    <Content />
                </Grid>
                <Grid item xs={9} sm={6} md={3.2}>
                    <Card className="input-card" style={{backgroundColor:'#f3f2f4'}}>   
                            <div className="input-card-item align-center signin">
                                <Typography variant="h4" fontFamily={'Mukta'}> 
                                    Sign in below!
                                </Typography>
                            </div>
                            <div className="input-card-item">
                                <TextField onChange={(e)=>setEmailOrUsername(e.target.value)} size="small" type="text" fullWidth id="outlined-basic" label="Email / Username" variant="outlined" />
                            </div>
                            <div className="input-card-item">
                                <TextField onChange={(e)=>setPassword(e.target.value)} size="small" type="password" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                            </div>
                            < div className="input-card-item error align-center" >
                               {error && errorMessage}
                            </div>
                            <div className="input-card-item align-center signup signup-button">
                                <Button onClick={()=>{
                                    axios.post('http://localhost:3000/signin', {
                                        emailOrUsername:emailOrUsername,
                                        password:password
                                    }).then((response)=>{
                                        localStorage.setItem('token', response.data.token)
                                        console.log(response.data.message)
                                        navigate('/explore')
                                    }).catch((err)=>{
                                        if (err.response.status==401 || err.response.status==409){
                                            setError(true)
                                            setErrorMessage(err.response.data.message)
                                        }
                                        else{
                                            console.log('Error')
                                        }
                                    })
                                }} fullWidth variant="contained">Sign in</Button>
                            </div>
                            <div className="input-card-item align-center">
                                Don't have an account?&nbsp;<Link className="signin-signup-text" to='/'>Sign up</Link>
                            </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    </div>
}


export default Signin