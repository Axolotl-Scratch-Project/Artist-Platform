import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { Avatar } from '@mui/material';
import React, { useState } from "react";
import ProfilePicture from './profileComponents/ProfilePicture';
import ArtistCollection from './profileComponents/ArtistCollection';
import {Box} from '@mui/system';
import Calendar from './profileComponents/Calendar';
import ArtistBio from './profileComponents/ArtistBio';
import EditProfMenu from './profileComponents/EditProfMenu';

// import editProfMenu from './profileComponents/editProfMenu';
const Profile = (props) => {
    const [ profilePicture, setProfPic ] = useState('');
    const [ showForm, setShowForm] = useState(false);
    const [ bio, setBio] = useState('');
    
    const handleChange = (event) => {
        //sets email and password in state, from user input        
        
        console.log('hello')
        return (
            <div>
            <EditProfMenu/>
            </div>
        )
    }
 

    return(
        <Sheet variant="outlined"
            sx={{
            display: 'flex',
            flexDirection: 'row',  
            height: '100vh',
            width: '100%',
            alignContent: 'stretch',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',

            }}> 
            <Box 
                sx={{
                outline: '1px dashed gray',
                flex: 3,
            }}>
                <Button variant="outlined" onClick={handleChange}>Edit</Button>
                <ProfilePicture/>
                <ArtistBio/>
            </Box>
            <Box
                sx={{
                    flex: 7,

                }}>
                <Calendar/>
                <ArtistCollection/>
            </Box>    
        {showForm ? handleChange(): null}    
        </Sheet>
        
            
        
    )
}

export default Profile;