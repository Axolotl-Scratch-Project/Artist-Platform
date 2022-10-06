import { useState } from 'react';
import { Grid , Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import { useNavigate, redirect, Link } from "react-router-dom";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import axios from 'axios';


const defaultField = {
  displayName: '',
  loc: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Signup = () => {
  const paperStyle = {padding: '30px 20px', width: '350px', margin: '20px auto'};
  const headerStyle = {margin: '10px'};
  const avatarStyle = {backgroundColor: '#2979ff'};
  const userStyle = {margin: '18px auto'};

  const [formField, setFormField] = useState(defaultField);
  const { displayName, loc, email, password, confirmPassword } = formField;
  const [ userType, setUserType] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if(userType === 'Artist') {
      axios.post('/api/saveArtist', formField).then(res => {
        //need to redirect to diff home page based on user type- waiting on Raymond's main page
        navigate("/signup/redirect");
      })
    }
    if (userType === 'Individual') {
      axios.post('api/saveUser', formField).then(res => {
        //need to redirect to diff home page based on user type- waiting on Raymond's main page
        navigate("/signup/redirect");
      })
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value })
  }

  const userHandler = (event) => {
    setUserType(event.target.value);
    // console.log(event.target.value);
  }



  return (
    <Grid style = {{margin: '100px auto'}}>
      <Paper elevation = {20} style = {paperStyle}>
        <Grid align = 'center'>
          <Avatar style = {avatarStyle}><PersonAddAlt1OutlinedIcon /></Avatar>
          <h2 style = {headerStyle} > Don't have an account?</h2>
          <Typography variant = 'caption' gutterBottom>Sign up with your email and password</Typography>
      </Grid>
      <form align = 'center' onSubmit = {submitHandler}>
        <TextField fullWidth
          variant = 'standard'
          label = 'Display Name'
          required
          onChange = {changeHandler}
          name = 'displayName'
          value = {displayName}
        />
        <TextField fullWidth
          variant = 'standard'
          label = 'Location'
          required
          onChange = {changeHandler}
          name = 'loc'
          value = {loc}
        />
        <TextField fullWidth
          variant = 'standard'
          label = 'Email'
          required
          onChange = {changeHandler}
          name = 'email'
          value = {email}
        />
        <TextField fullWidth
          variant = 'standard'
          label = 'Password'
          required
          onChange = {changeHandler}
          name = 'password'
          value = {password}
        />
        <TextField fullWidth
          variant = 'standard'
          label = 'Confirm Password'
          required
          onChange = {changeHandler}
          name = 'confirmPassword'
          value = {confirmPassword}
        />
        <Grid style = {userStyle} onChange = {(event) => userHandler(event)}>
          <input type = 'radio' value='Artist' name = 'user type' /><Typography variant = 'caption' style = {{marginRight: '24px'}}>Artist</Typography>
          <input type = 'radio' value='Individual' name = 'user type' /><Typography variant = 'caption'>Individual</Typography>
        </Grid>
        <Button type = 'submit' variant = 'contained'>Sign Up</Button>
      </form>
      </Paper>
    </Grid>
  )
}

export default Signup;