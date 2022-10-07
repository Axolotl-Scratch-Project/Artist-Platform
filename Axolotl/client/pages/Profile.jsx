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
import { shadows } from '@mui/system';



// import editProfMenu from './profileComponents/editProfMenu';
const Profile = (props) => {
    const [ profilePic, setProfilePic ] = useState();
    const [bio, setBio] = useState('artistBio');
    const [isOpen, setIsOpen] = useState(false);
    const [artistName ,setArtistName] = useState();
    const [collection, setCollection] = useState();
    useEffect( () =>{
        
        Axios.get('http://localhost:3000/api/profile/artist?id=2').then((data) => {
            // console.log(data.data.artistGalleryLinks);
            const artist = data.data.artistProfile;
            const gallery = data.data.artistGalleryLinks;
            setBio(artist.bio);
            setProfilePic(artist.profile_image_url);
            setArtistName(artist.name);
            setCollection(gallery[0].gallerypiece_url);
            // console.log(collection);
        })
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
                    backgroundColor: '#FFFFF',
                    borderRight: 1,
                    boxShadow: 1
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
                    <ArtistCollection collection={collection}/>
                </Box>    
            </Sheet>
        </div>
            
        
    )
}

export default Profile;