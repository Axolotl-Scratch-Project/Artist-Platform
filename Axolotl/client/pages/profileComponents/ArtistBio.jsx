import { Box } from "@mui/system"
import { TextField } from "@mui/material";
import { useState, react } from 'react';
import { Typography, Button } from "@mui/joy";

const ArtistBio = (props) => {
    // const {bio} = useState(props.bio);

   

    const submitBio = (event) =>{
        
    }
    const updateBio = (event) =>{
        
    }
    return (
        <Typography
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '100%',
                background: 'grey',
                padding: '10px 10px 10px 10px'
                // h5: 'h5'
            }}
        >
            <h4>Bio:  </h4>   
            {props.bio}
        </Typography>
        
    )
}
export default ArtistBio;