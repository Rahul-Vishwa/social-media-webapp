import { Typography, Card, Grid } from "@mui/material" 
import image1 from './assets/mountain23.jpg'
import image2 from './assets/painting2.jpg'
import image3 from './assets/laptop2.jpg'
import "./style.css"

function Content(){
    return <Card className="details-card" style={{backgroundColor:'#f3f2f4'}}>
        <div className="images">
            <Grid container spacing={0}>
                    <Grid item xs={4}>
                        <div className="image-container">
                            <img src={image2} className="image"></img>
                                <Typography className="text1 content-text" variant="h3" fontWeight={700} fontFamily={'Merriweather Sans'}>
                                    Create    
                                </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div className="image-container">
                        <img src={image1} className="image"></img>
                        <Typography className="text2 content-text" variant="h3" fontWeight={700} fontFamily={'Merriweather Sans'}>
                            Explore
                        </Typography>
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <div className="image-container">
                        <img src={image3} className="image"></img>
                        <Typography className="text3 content-text" variant="h3" fontWeight={700} fontFamily={'Merriweather Sans'}>
                            Share
                        </Typography>
                    </div>
                    </Grid>
            </Grid>
        </div>
    </Card>
}

export default Content