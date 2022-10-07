import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import React, { useState, useEffect } from "react";
import ProfilePicture from './profileComponents/ProfilePicture';
import ArtistCollection from './profileComponents/ArtistCollection';
import EditProfMenu from './profileComponents/EditProfMenu';
import {Box} from '@mui/system';
import Calendar from './profileComponents/Calendar';
import ArtistBio from './profileComponents/ArtistBio';
import Axios from 'axios';
import NavBar from '../component/Navbar';
import { Modal } from '@mui/material';




// import editProfMenu from './profileComponents/editProfMenu';
const Profile = (props) => {
    const [ profilePic, setProfilePic ] = useState();
    const [bio, setBio] = useState('artistBio');
    const [isOpen, setIsOpen] = useState(false);
    const [artistName ,setArtistName] = useState();
    const [collection, setCollection] = useState();
    useEffect( () =>{
        Axios.get('http://localhost:3000/api/artists').then((data) => {
            // console.log("Artist Data:", data.data[2]);
            let artist = data.data[2];
            setBio(artist.bio);
            setProfilePic(artist.profile_image_url)
            setArtistName(artist.name)
        })
        // const loadPage = async () =>{
        //    const reqOptions ={
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
        //   }
        // const response = await fetch('http://localhost:3000/api/profile/artist', reqOptions)
        // const data = await response.json();
        // console.log(data); 
        // }
        // loadPage();
    }, []);
    
    

    return(
        <div>
            <NavBar/>
            <Sheet 
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
                    outline: '10px black',
                    flex: 3,
                }}>
                    <Button onClick={() => setIsOpen(true)}>Edit</Button>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <EditProfMenu/>
                    </Modal >
                    <ProfilePicture profilePic={profilePic} artistName={artistName}/>
                    <ArtistBio bio={bio}/>
                </Box>
                <Box
                    sx={{
                        flex: 7,
                    }}>
                    <Calendar/>
                    <ArtistCollection/>
                </Box>    
            {/* {showForm ? handleChange(): null}     */}
            </Sheet>
        </div>
            
        
    )
}

export default Profile;