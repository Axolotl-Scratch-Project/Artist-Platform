import { useState, useEffect } from 'react';
import { Grid , Paper, Avatar, Typography, TextField, Button, Box } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Navigate } from "react-router-dom";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import axios from 'axios';
import UserViewNav from '../component/UserViewNav'
import BookingTable from '../component/BookingTable'


const Booking = () => {

  const paperStyle = {padding: '25px 20px', width: 'calc(95% - 5px)', margin: '20px auto', borderradius: '10px'};
  const boxStyle = {padding: '0px 23px'}
  const confirmStyle = {color: '#4caf50', display: 'inline', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold'};
  const currentStyle = {fontSize: '16px', fontFamily: 'Arial',};
  const iconStyle = { margin:'auto 8px',fontSize: '28px', fontWeight: 'bold'};
  const tableStyle = {padding: '20px 20px'};
  const activeStyle = {fontSize: '23px', color: '#4caf50', fontFamily: 'Arial'}


  //formate date- talk to Peter about adding to create booking and get booking controller
  const formatDate = (dateString) => {
    const newDate = dateString.slice(0, dateString.length-1) + dateString[dateString.length-1];
    const options = { year: "numeric", month: "long", day: "numeric" }
    const time = new Date(dateString).toLocaleTimeString(undefined, options)
    return time
  };


  // const bookingInfo = {
  //   bookerId: 82,
  //   bookerType: 'user'
  // }

  // const bookingInfo = {
  //   bookerId: JSON.parse(window.localStorage.getItem('userId')),
  //   bookerType: JSON.parse(window.localStorage.getItem('userType'))
  // }
  const bookingInfo = {
    bookerId: window.localStorage.getItem('userId'),
    bookerType: window.localStorage.getItem('userType').replace(/\"/g, "")
    // bookerType = bookerType.replace(/\"/g, "");
  }

  const [bookings, setBookings] = useState([]);
  const [bizBookings, setBizBookings] = useState([]);
  const [latestBooking, setLatestBooking] = useState({});


  useEffect(() => {
    console.log(bookingInfo);
    axios.post('/api/getBooking', bookingInfo).then(res => {
      // localstorage
      // create a variable
      console.log(res.data);

      const reformatPersonalBooking = res.data.bookings.personalBookings.map(booking => {
        booking.booking_start = formatDate(booking.booking_start);
        booking.booking_end =  formatDate(booking.booking_end);
        return booking;
      });
      let reformatArtistBusinessBooking;
      if (bookingInfo.bookerType === 'artist') {
        reformatArtistBusinessBooking = res.data.bookings.businessBookings.map(booking => {
          booking.booking_start = formatDate(booking.booking_start);
          booking.booking_end =  formatDate(booking.booking_end);
          return booking;
        });
      }
      // const reformatBooking = res.data.bookingsByUser.map(booking => {
      //   booking.booking_start = formatDate(booking.booking_start);
      //   booking.booking_end =  formatDate(booking.booking_end);
      //   return booking;
      // })
      // setBookings(res.data.bookingsByUser);
      setBookings(reformatPersonalBooking);
      setLatestBooking(reformatPersonalBooking[reformatPersonalBooking.length - 1]);
      setBizBookings(reformatArtistBusinessBooking);
    })
  }, []);

  return (
    <Grid>
    <UserViewNav />
    <Grid style = {{margin: '40px auto'}}>
    {/* <Navbar /> */}
    <Paper elevation = {20} style = {paperStyle}>
      <Box style = {boxStyle}>
        <div style = {confirmStyle} >
          <Typography variant="h5">Booking Confirmed  <CheckCircleIcon style = {iconStyle} /></Typography>
        </div>
        <div style = {currentStyle}>
        <p variant="h6"> {`Hi ${latestBooking.booker_name}, you are successfully booked with ${latestBooking.artist_name}!`}</p>
        <p variant="h6"> {` Get excited for your session at ${latestBooking.booking_start}!`}</p>
        </div>
      </Box>
      <Box style = {tableStyle}>
        <p style = {activeStyle} variant="h5">Your Active Personal Bookings </p>
        <BookingTable bookings = {bookings} />
      </Box>
      <Box style = {tableStyle}>
        {bookingInfo.bookerType === 'artist' ? 'Show': 'Hide'}
        <p style = {activeStyle} variant="h5">Your Active Business Bookings </p>
        <BookingTable bookings = {bizBookings} />
      </Box>
      </Paper>


    {/* </Paper> */}
  </Grid>
  </Grid>

  )


}

export default Booking;

