import { Box } from "@mui/system"

const ArtistCollection = (props) => {
    const gallery = props.collection;
    console.log(gallery);
    return (
        
            <Box
                sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '50%',

                }}>
                    
                <h1>Artist Gallery</h1>
                <Box sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems: 'row',
                    height: '100px',
                    width: '100px',
                    }}
                >
                    <img src={gallery}></img>
                </Box>
            </Box>
        
    )
}
export default ArtistCollection;