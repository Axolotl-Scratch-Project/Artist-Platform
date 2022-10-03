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

const Post = (props) => {

  const [showText, setShowText] = useState(false);
  const onClick = () => setShowText(!showText);

  return (
    <div>
    <Card sx={{ maxWidth: 345, m:1}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://i.natgeofe.com/n/de94c416-6d23-45f5-9708-e8d56289268e/naturepl_01132178.jpg?w=636&h=631"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
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

      {showText && <Stack component="form" noValidate spacing={1} style={{marginBottom:'8px'}}>
          <TextField
            id="datetime-local"
            label="Start Date"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            sx={{ width: 250 }}
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
            defaultValue="2017-05-24T10:30"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>}
    </Card>
    </div>
  )
}

export default Post
