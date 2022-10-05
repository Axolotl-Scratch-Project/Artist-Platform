import { Box } from "@mui/system"
import { TextField } from "@mui/material";
import { useState, react } from 'react';
import { Typography, Button } from "@mui/joy";

const ArtistBio = (props) => {
    const [bio, setBio] = useState('Artist Bio')

    const submitBio = (event) =>{
        
    }
    const updateBio = (event) =>{
        
    }
    return (
        <Typography
            sx={{
                display: 'flex',
                justifyContent: 'center',
                h5: 'h5'
            }}
        >
            {bio}
        </Typography>
        
    )
}
export default ArtistBio;