import { Box } from "@mui/system"
import { getCalendarOrClockPickerUtilityClass } from "@mui/x-date-pickers/internals/components/CalendarOrClockPicker/calendarOrClockPickerClasses";

const ArtistCollection = (props) => {
    const gallery = props.collection;
    return (
            <Box
                sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '50%'
                }}>
                    
                <h1>Artist Collection</h1>
                <Box sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems: 'row',
                    height: '150px',
                    width: '150px',
                    }}
                >
                    <img src={gallery}></img>
                    {/* {gallery.map((img) => {
                        <img src={img}></img>
                    })}                     */}
                </Box>
            </Box>
        
    )
}
export default ArtistCollection;