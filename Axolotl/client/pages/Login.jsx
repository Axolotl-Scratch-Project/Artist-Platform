import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useState } from 'react';
// import { json } from 'body-parser';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    //sets email and password in state, from user input
    if(event.target.name === 'email'){
      setEmail(event.target.value);
    }
    else{
      setPassword(event.target.value);
    }
  }

  const handleClick = async (event) => {
    //send to backend for auth
    event.preventDefault();
    const reqOptions ={
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    }

    const response = await fetch('http://localhost:3000/api/login', reqOptions)
    const data = await response.json();
    // console.log('data');
  };

  return (
    <CssVarsProvider>
      <Sheet variant="outlined"
        sx={{
          maxWidth: 400,
          mx: 'auto',
          my: 5, // margin top & botom
          py: 3, // padding top & bottom
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
      >
        <div>
          <Typography>
            <h1>Login</h1>
          </Typography>
        </div>
        <TextField
              name="email"
              type="text"
              placeholder='Enter your email'
              label="Email"
              onChange={handleChange}
              value={email}
              />
        <TextField
              name="password"
              type="password"
              placeholder='Enter your password'
              label="Password"
              onChange={handleChange}
              value={password}
              />
        <Button
          sx={{
            mt: 1,
            borderRadius: 'sm',
            boxShadow: 'md'
          }}
          onClick={handleClick}
        >
          Log in
      </Button>
      <Typography
        endDecorator={<Link href="/signup">Sign up</Link>}
        fontSize="sm"
        sx={{ alignSelf: 'center' }}
      >
        Don't have an account?
      </Typography>
      </Sheet>
    </CssVarsProvider>
  )
}

export default Login;