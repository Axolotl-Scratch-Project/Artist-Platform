import React,{useState, useEffect} from 'react'
import Post from './Post'
import Axios from 'axios'
import SideBar2 from '../component/SideBar2'
import { Box,Stack,Grid, Button } from '@mui/material';



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
  category: "",
  priceRange: [0,2000],
};

const Feed = () => {
  // const [artistInfor, setartistInfor] =useState([])
  const [superData, setSuperData] =useState([])

  const [data, setdata] =useState([])
  const [value, setValue]=useState(0)



  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if(name === 'name') {
      let newData = superData.filter(element =>  element.name.toLowerCase().includes(value.toLowerCase()))
      setdata(
        newData
       );
    } else if (name === 'category') {
      console.log(value)
      let newData = superData.filter(element =>  element.categories_array[0].toLowerCase().includes(value.toLowerCase()))
      setdata(
        newData
       );
    }
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    let newData = superData.filter(element =>  element.hourly_rate > formValues.priceRange[0] && element.hourly_rate < formValues.priceRange[1])
    setdata(
      newData
     );
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    let newData = superData.filter(element =>  element.hourly_rate > formValues.priceRange[0] && element.hourly_rate < formValues.priceRange[1])
    setdata(
      newData
     )
  };

  function valuetext(formValues) {
    return {formValues};
  }

  useEffect(()=>{
    Axios.get('http://localhost:8080/api/artists').then((data) => {
      // console.log("feed -> useEffect -> data", data)
      setdata(data.data)
      setSuperData(data.data);
    })
  },[])



  // useEffect(() => {
  //   datax.filter(element =>  element.bookingrate > formValues.priceRange[0])
  // },[]);


  return (
    <div>
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

            { data.map((element,index) => {
                return <Post key = {index} name = {element.name} bio = {element.bio} bookingrate = {element.hourly_rate} genre ={element.categories_array[0]} id = {element.artist_id}/>
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