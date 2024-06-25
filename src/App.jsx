import { useState } from 'react'
import './App.css'

function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [userAddress, setUserAddress] =  useState()

  const [GPSLatitude, setGPSLatitude] = useState()
  const [GPSLongitude, setGPSLongitude] = useState()

  const geo = navigator.geolocation

  //Get User current location
  geo.getCurrentPosition(userCoords)
  function userCoords(position) {
     let userLatitude = position.coords.latitude
     let userLongitude = position.coords.longitude
     //console.log("Latitude: ", userLatitude);
     //console.log("Longitude: ", userLongitude);

     setLatitude(userLatitude)
     setLongitude(userLongitude)
  }

  const getUserAddress = async () => {
    let url = 'https://api.opencagedata.com/geocode/v1/json?key=f7cb75f26146435384df184e07a831ea&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1'
    const loc = await fetch(url)
    const data = await loc.json()
    console.log("User Address: ", data);
    setUserAddress(data.results[0].formatted)
  }

  const handleGetUserAddress  = () => {
    getUserAddress()
  }

  //Get User GPS current location
  const watchID = geo.watchPosition(userGPSCoords)
  function userGPSCoords(position) {
     let userGPSLatitude = position.coords.latitude
     let userGPSLongitude = position.coords.longitude
     console.log("Latitude: ", userGPSLatitude);
     console.log("Longitude: ", userGPSLongitude);
     setGPSLatitude(userGPSLatitude)
     setGPSLongitude(userGPSLongitude)
  }

  const stopGPS = () => {
    geo.clearWatch(watchID)
  }

  return (
    <>
     <h1>Current Location</h1>
     <h2>latitude- {latitude}</h2>
     <h2>longitude- {longitude}</h2>
     <h2>user Address- {userAddress}</h2>
     <button onClick={handleGetUserAddress}>get User Address</button>
    <hr />
    <h1>GPS Tracking</h1>
    <h2>GPS Latitude- {GPSLatitude}</h2>
    <h2>GPS Longitude- {GPSLongitude}</h2>


    </>
  )
}

export default App
