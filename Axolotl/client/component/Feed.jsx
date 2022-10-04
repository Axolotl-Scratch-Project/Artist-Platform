import React,{useState, useEffect} from 'react'
import Post from './Post'
import Axios from 'axios'
import SideBar2 from '../component/SideBar2'
import { Box,Stack,Grid } from '@mui/material';



const fakedata =[{id:'1',
              name:'ray',
              bio:'hello',
              bookingrate:'130',
              genre:'music'},
              {id:'2',
              name:'ray2',
              bio:'hello2',
              bookingrate:'100',
              genre:'rock'},
          ]

const defaultValues = {
  name: "",
  os: "",
  priceRange: [0,110],
};

const Feed = () => {
  // const [artistInfor, setartistInfor] =useState([])
  const [data, setdata] =useState(fakedata)
  const [value, setValue]=useState(0)


  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  
  function valuetext(formValues) {
    return {formValues};
  }

  // useEffect(() => {
  //   datax.filter(element =>  element.bookingrate > formValues.priceRange[0])
  // },[]);
  
  const clicker = (event) => {
    let newValue = value + 1 
    event.preventDefault();
    setValue(newValue)
    console.log("clicked")
  };

  return (
    <div>
      <button onClick={()=>clicker()}>{value}</button>
      <Grid container spacing={2} columns={10}>
          <Grid item xs={4}>
            <SideBar2 handleInputChange = {handleInputChange} 
                      handleSliderChange = {handleSliderChange}
                      handleSubmit = {handleSubmit}
                      formValues = {formValues}
                      valuetext = {valuetext}/>
          </Grid>
          <Grid item xs={6}>
            {/* {data.filter((element) => {element.bookingrate < 120}).map((element, index) => {
                return <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate} genre ={data[0].genre}/>
            }} */}

            { data.filter(element =>  element.bookingrate > formValues.priceRange[0]).map((element,index) => {
                return <Post key = {index} name = {element.name} bio = {element.bio} bookingrate = {element.bookingrate} genre ={element.genre}/>
            })}

          </Grid>
      </Grid>
    </div>
  )
}

export default Feed

{/* <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate} genre ={data[0].genre}/>
            <Post name = {data[1].name} bio = {data[1].bio} bookingrate = {data[1].bookingrate} genre ={data[1].genre}/>
            {/* <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate} genre ={data[0].genre}/>
            <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate} genre ={data[0].genre}/>
            <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate} genre ={data[0].genre}/>
            <Post name = {data[0].name} bio = {data[0].bio} bookingrate = {data[0].bookingrate} genre ={data[0].genre}/>  */}