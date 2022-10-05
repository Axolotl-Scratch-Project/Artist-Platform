import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function valuetext(value) {
  return {value};
}
const SideBar = () => {
  const [value, setValue] = React.useState([0, 120]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200, height:400 }} style={{position: 'fixed', borderRadius:'20px',background:'#febb02', padding:30}}>
      <Box sx={{ width: 200, height:200 }} style={{position: 'fixed', background:'#febb02', borderRadius:'20px'}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Search
        </Typography>
        <Slider
          // style={{padding:30}}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={10}
          max={150}
        />
        {value[1]}
      </Box>
    </Box>
  )
}


export default SideBar
