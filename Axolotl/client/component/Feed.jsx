import React from 'react'
import Post from './Post'


const data =[{id:'1',
              name:'ray',
              bio:'hello',
              bookingrate:'1'},
          {}]

const Feed = () => {
  return (
    <div>
      <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate}/>
      <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate}/>
      <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate}/>
      <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate}/>
      <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate}/>

      {/* <Post/>
      <Post/>
      <Post/> */}
    </div>
  )
}

export default Feed
