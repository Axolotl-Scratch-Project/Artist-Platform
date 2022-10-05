//booking button logic (exist on main page and artist dashboard)
//fetch artist hourly rate in the database, navigate to booking page, passing hourly rate as prop

// button.addEventListener('click', () => {
//   axios.get('/rate:artistId').then(res => {
//     res.body.hourlyRate...
//   })
// })

// https://reactrouter.com/en/main/hooks/use-navigate

// import { useNavigate } from "@reach/router"
// const main = (props) => {
//   const navigate = useNavigate();
//   <button onSubmit={() => navigate('/something', { replace: true, state: {hourlyRate} })}>
// }

button.addEventListener('click', () => {
  fetch('http://localhost:3000/api/checkout', {
    method: 'POST',
    headers: {
      'Content Type': 'application/json'
    },
    body: JSON.stringify({
      artistId: {artistId},
      //do we want frontend to query here?
      bookerId: {bookerId},
      bookerType: {bookerType},
      artistId: {artistId},
      bookingStart: {bookingStart},
      bookingsEnd: {bookingsEnds},
    })
  }).then(res => {
    if(res.ok) return res.json()
    //response will return a redirect url
    return res.json().then(json => Promise.reject(json))
  }).then(({ url }) => {
    window.location = url
  }).catch( e=> {
    console.error(e.error)
  })
})