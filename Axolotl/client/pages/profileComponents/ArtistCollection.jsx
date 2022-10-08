import { CardMedia } from "@mui/material";
import { Box } from "@mui/system"
import { getCalendarOrClockPickerUtilityClass } from "@mui/x-date-pickers/internals/components/CalendarOrClockPicker/calendarOrClockPickerClasses";

const ArtistCollection = (props) => {
    const gallery = props.collection;
    console.log('props.collection', props.collection)

    const boxes = [];
    for (let i = 0; i < gallery.length; i++) {
        const newBox = (
            <div key={`div${i}`}>
                <img src={gallery[i].url} 
                    width='auto' 
                    height='250px' 
                    key={`img${i}`} 
                    style={{borderRadius: '10%'}}>
                </img>
                <p key={`h2${i}`} 
                    style={{
                        textAlign: 'center', 
                        fontFamily: 'Arial',
                        fontSize: '1.25em',
                        marginTop: '5px'
                    }}>
                    {gallery[i].text}</p>
            </div>
        )
        boxes.push(newBox)
    }
    
    // const boxes = [<img src={gallery} width='200px' height='auto' ></img>, <img src={gallery}></img>, <img src={gallery}></img>, <img src={gallery}></img>, <img src={gallery}></img>];
    
    return (
            <Box
                sx={{
                    display: 'flex',
                    // // justifyContent: 'center',
                    // alignItems: 'center',
                    flexDirection: 'column',
                    margin: 5
                    // height: '50%'
                }}>
                    
                <h1>Artist Collection</h1>
                <Box sx={{
                    display:'flex',
                    justifyContent:'left',
                    // alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 5,
                    marginTop: 4,
                    // height: '150px',
                    // width: '150px',
                    // objectFit: "cover",
                    // objectPosition: 'center -30px's
                    }}
                >
        

                    {/* <img src={gallery && gallery[0]}></img> */}
                    {/* {gallery.map((img) => {
                        <img src={gallery}></img>
                    })}                     */}
                    {boxes}

                </Box>
            </Box>
        
    )
}
export default ArtistCollection;