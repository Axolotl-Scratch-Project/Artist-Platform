import { Button } from "@mui/joy";
import * as React from 'react';
import { useState } from "react";


const EditProfMenu = (props) => {
    const [bio, setBio] = useState()

  

    return (
        <div>
            <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
            />
            <h1>edit menu</h1>
        </div>
    )
}
export default EditProfMenu;