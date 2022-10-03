import React from 'react'
import Feed from '../component/Feed'
import Navbar from '../component/Navbar'
import SideBar from '../component/SideBar'
import SideBar2 from '../component/SideBar2'

import { Box , Stack,Grid } from '@mui/material';
import { Category, PriceChange } from '@mui/icons-material';

const Home = () => {
  return (
      <Box>
        <Navbar/>
        {/* <Stack direction='row' justifyContent='space-between'>
          <SideBar/>
          <Feed/>
        </Stack> */}
        <Grid container spacing={2} columns={10}>
          <Grid item xs={4}>
          <SideBar2/>
            </Grid>
          <Grid item xs={6}>
          <Feed/>
            </Grid>
          </Grid>
      </Box>
  )
}

export default Home;