import { useState, useEffect } from 'react';
import { Grid , Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Navigate } from "react-router-dom";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import axios from 'axios';

const Booking = () => {

  const paperStyle = {padding: '30px 20px', width: 'calc(85% - 5px)', margin: '20px auto', borderradius: '10px'};
  const boxStyle = {padding: '0px 23px'}
  const confirmStyle = {color: '#61d800', display: 'inline', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold', margin: '10px'};
  const iconStyle = { margin:'auto 8px',fontSize: '28px', fontWeight: 'bold'};

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

  // const latestBooking = booking[booking.length - 1];
  // static booking for testing purpose
  const latestBooking ={
    "id": 23,
    "artist_id": 3,
    "amount": 1200,
    "booking_start": "2022-10-07T12:27:00.000Z",
    "booking_end": "2022-10-07T18:27:00.000Z",
    "booker_id": 1,
    "booker_type": "user"
}

  return (
    <Grid style = {{margin: '100px auto'}}>
    {/* <Navbar /> */}
    <Paper elevation = {20} style = {paperStyle}>
      <Box style = {boxStyle}>
        {/* <Avatar style = {avatarStyle}><PersonAddAlt1OutlinedIcon /></Avatar> */}
        <div style = {confirmStyle} >
          <Typography variant="h5">Booking Confirmed  <CheckCircleIcon style = {iconStyle} /></Typography>
        </div>
        <div>
        <Typography variant="h6"> {`You are successfully booked with ${latestBooking['artist_id']}`}</Typography>
        </div>
      </Box>
    </Paper>
    <Paper elevation = {20} style = {paperStyle}>
    <h2  >Your Other Bookings</h2>
    </Paper>
  </Grid>

  )


}

export default Booking;