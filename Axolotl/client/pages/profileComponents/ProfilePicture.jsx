import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const ProfilePicture = (props) => {
    const [profilePic, setProfilePic] = useState('');
    const [edit, setEdit] = useState(false);

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
        mx: 'auto',
        my: 5, // margin top & botom
        py: 3, // padding top & bottom
        px: 2
    }}>
        <Avatar 
            sx={{
                width: 150,
                height: 150
            }}
            alt="Profile picture" 
            // src={profilePic} 
            onClick={() => setEdit(true)}

        />
        {edit ? getUrl(): null}
    </Box> 
    )
};

export default ProfilePicture;