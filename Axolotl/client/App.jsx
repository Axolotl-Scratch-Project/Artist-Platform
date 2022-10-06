import React from 'react';
import { Switch, Route, Routes, Link } from "react-router-dom";
import { render } from 'react-dom';
import  Home  from './pages/Home.jsx';
import  Signup  from './pages/Signup.jsx';
import  Login  from './pages/Login.jsx'
import Profile from './pages/Profile.jsx';
import UserPage from './pages/UserPage.jsx';

const code = new URLSearchParams(window.location.search).get('code');
console.log(code)

const App = () => {
  return <Routes>
    <Route path = "/" exact element = {<Home/>}/>
    <Route path = "/signup" exact element = {<Signup/>}/>
    <Route path = "/login" exact element = {<Login/>}/>
    <Route path = "/profile" exact element = {<Profile/>}/>
    <Route path = "/userView" exact element = {<UserPage/>}/>
  </Routes>
};

export default App;