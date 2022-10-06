import React from 'react';
import { Switch, Route, Routes, Link, Navigate } from "react-router-dom";
import { render } from 'react-dom';
import  Home  from './pages/Home.jsx';
import  Signup  from './pages/Signup.jsx';
import  Login  from './pages/Login.jsx'
import Profile from './pages/Profile.jsx';
// import UserPage from './pages/UserPage.jsx';
import Booking from './pages/Booking.jsx';

const code = new URLSearchParams(window.location.search).get('code');
console.log(code)

const App = () => {
  return <Routes>
    <Route path = "/" exact element = {<Home/>}/>
    <Route path = "/signup" exact element = {<Signup/>}/>
    <Route path = "/login" exact element = {<Login/>}/>
    <Route path = "/booking" exact element = {<Booking/>}/>
    <Route path = "/profile" exact element = {<Profile/>}/>
    {/* <Route path = "/userView" exact element = {<UserPage/>}/> */}
    {/* signup redirect page, potentially need to be redirect to different main pages */}
    <Route path = "/signup/redirect" element = {<Navigate to = "/"/>} />

  </Routes>
};

export default App;