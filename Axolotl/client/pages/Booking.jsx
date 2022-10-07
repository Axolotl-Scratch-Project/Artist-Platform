import { useState, useEffect } from 'react';
import { Grid , Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import { Navigate } from "react-router-dom";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import axios from 'axios';

const Booking = () => {
  //get user info from localStoage
  const bookingInfo = {
    bookerId: JSON.parse(window.localStorage.getItem('bookerId')),
    bookerType: JSON.parse(window.localStorage.getItem('bookerType'))
  }

  const [booking, setBooking] = useState([]);

  useEffect(() => {
    axios.post('/api/booking', bookingInfo).then(res => {
      setBooking(res.data.bookingsByUser);
    })
  });

  return (
    <Grid style = {{margin: '100px auto'}}>
    <Paper elevation = {20} style = {paperStyle}>
      <Grid align = 'center'>
        <Avatar style = {avatarStyle}><PersonAddAlt1OutlinedIcon /></Avatar>
        <h2 style = {headerStyle} > Don't have an account?</h2>
        <Typography variant = 'caption' gutterBottom>Sign up with your email and password</Typography>
      </Grid>
      <Grid style = {userStyle} onChange = {(event) => userHandler(event)}>
        <input type = 'radio' value='Artist' name = 'user type' /><Typography variant = 'caption' style = {{marginRight: '24px'}}>Artist</Typography>
        <input type = 'radio' value='Individual' name = 'user type' /><Typography variant = 'caption'>Individual</Typography>
      </Grid>
    </Paper>
  </Grid>

  )


}

export default Booking;