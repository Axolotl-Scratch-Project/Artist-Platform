import { Textarea } from '@mui/joy';
import { Avatar, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const ProfilePicture = (props) => {

    const getUrl = () => {
        
            // return(
            //     <Typography
            //         // sx={{
            //         //         display: 'flex',
            //         //         justifyContent: 'center',
            //         //         maxWidth: "25%",
            //         //         whiteSpace: 'nowrap'
            //         //     }}
            //     >
            //         <TextField
            //             value={profilePic}
            //             name="profile picture"
            //             type="text"
            //             placeholder='Enter a new url for your profile picture'
            //             label="profile picture"
            //             // onChange={handleChange}
            //             // onSubmit={setEdit(false)}
            //         >
            //         </TextField>
            //         <Button
            //             sx={{
            //                  mt: 1,
                             
            //             }}>
            //             Submit
            //         </Button>
            //     </Typography>
            // );
        }

return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100%',
        mx: 'auto',
        my: 5, 
        py: 5, 
        px: 2,
        pb: 15,
        borderBottom: 1
    }}>
        <h2>{props.artistName}</h2>
        <Avatar 
            sx={{
                width: 150,
                height: 150,
            }}
            alt="Profile picture" 
            src={props.profilePic} 
            // onClick={() => setEdit(true)}

        />
    </Box> 
    )
};

export default ProfilePicture;