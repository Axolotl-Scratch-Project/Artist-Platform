import React,{useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import Axios  from 'axios';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';

var rightNow = new Date();
var res = rightNow.toISOString().slice(0,16)


const Post = (props) => {
  let navigate = useNavigate()

  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(!showText);
  const [startTime, setstartTime] = useState(res);
  const [endTime, setendTime] = useState(res);
  const [startPrice, setstartPrice] = useState(0);

  const handleStartChange = (e) => {
    setstartTime(e.target.value);
  };
  const handleEndChange = (e) => {
    setendTime(e.target.value);
  };

  const onclick = async (e) => {
    e.preventDefault()
    const amount = Math.round((new Date(endTime) - new Date(startTime)) / 3600000 * props.bookingrate);    // setstartPrice(amount)
    setstartPrice(amount)
    if(!localStorage.getItem('userType')) {
      navigate('/signup')
    } else if (localStorage.getItem('userType')){
      let infor = {artistID:props.id,
        bookerId:localStorage.getItem('userId'),
        bookerType:localStorage.getItem('userType'),
        bookingsStart:startTime,
        bookingsEnd:endTime,
        hourly_rate:props.bookingrate}

        window.localStorage.setItem('bookerId', localStorage.getItem('userId'));
        window.localStorage.setItem('bookerType', localStorage.getItem('userType'));
    await Axios.post("http://localhost:8080/api/checkout",{infor})
    }
  };


  return (
    <div>
    <Card sx={{ maxWidth: 420, m:1}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://i.natgeofe.com/n/de94c416-6d23-45f5-9708-e8d56289268e/naturepl_01132178.jpg?w=636&h=631"
      />
      <CardContent>
        <Box style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        {/* <Typography gutterBottom variant="h7" component="div">
        {props.genre}
        </Typography> */}
        <Stack direction="row" spacing={1}>
          {props.category.map((element,index) => <Chip key = {index} label={element} size="small"/>)}
        </Stack>

        </Box>
        <Typography variant="body2" color="text.secondary">
          {props.bio}
        </Typography>
      </CardContent>
      <CardContent style={{paddingTop:5, paddingBottom:0, display: 'flex', alignItems: 'center'}}>
        <AttachMoneyIcon/>
        <Typography variant="body2" color="text.secondary">
        {props.bookingrate}
        </Typography>
      </CardContent>

      <CardActions>
        <Button style={{minWidth:'32px'}}><EventAvailableSharpIcon color="primary" /></Button>
        <Button onClick= {onClick} style= {{ marginLeft:'0px'}} size="small">Book Now</Button>
        <p>|</p>
        <Button style={{minWidth:'32px',marginLeft:'0px'}}><AddCircleIcon color="primary" /></Button>
        <Button style= {{ marginLeft:'0px'}} size="small">View Full Profile</Button>
      </CardActions>

      <Box style={{display:'flex',justifyContent:'space-between',alignContent:'center'}}>
        <Box>
          {showText && <Stack component="form" noValidate spacing={1} style={{marginBottom:'8px'}}>
              <TextField
                id="datetime-local"
                label="Start Date"
                type="datetime-local"
                defaultValue={startTime}
                sx={{ width: 250 }}
                onChange={handleStartChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>}
            {showText && <Stack component="form" noValidate spacing={1}>
              <TextField
                id="datetime-local"
                label="End Date"
                type="datetime-local"
                defaultValue={endTime}
                sx={{ width: 250 }}
                onChange={handleEndChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Stack>}
          </Box >
          <Box style={{marginTop:'10px'}}>
            {showText && <Button onClick={onclick}>confirm</Button>}
            {showText && <p>
              TotalPrice: ${startPrice}
            </p>}
          </Box>
        </Box>
    </Card>
    </div>
  )
}

export default Post
