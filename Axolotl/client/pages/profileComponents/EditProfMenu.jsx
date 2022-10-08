import { Button } from "@mui/joy";
import * as React from 'react';
import { useState } from "react";
import TextField from "@mui/joy";
const style = {
    // position: 'fixed',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // backgroundColor: '#FFF',
    // padding: '50px',
}
const EditProfMenu = ({children, open, onClose}) => {
    const [bio, setBio] = useState()
    if(!open) return null
  

    return (
        <div style={style}>
            <h1>edit menu</h1>
            <Button onClick={onClose}>Submit</Button>
        </div>
    )
}
export default EditProfMenu;