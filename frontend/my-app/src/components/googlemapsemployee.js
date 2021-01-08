import React, { Fragment,setState,useState,Component, useEffect } from 'react';
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';
import axios from 'axios';


const API_KEY=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const GMap=()=>{
    
      const [userLoc,setLoc]=useState({
          lat:0,
          lng:0,
          orgLat:0,
          orgLng:0
      });
      useEffect(()=>{
          geocode();
      },[])
      const updateLoc =async(e) =>{
          e.preventDefault()
          try {
              const newAdd=document.getElementById("newAddress").value
              const promise= await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                  params:{
                      address:newAdd,
                      key:API_KEY
                  }
              });
            const loc=promise.data
            const coords=loc.results[0].geometry.location
            setLoc({...userLoc,lat:coords.lat,lng:coords.lng})

          } catch (error) {

              console.error(error.message)
          }
      }
    const resetAddress=() =>{
        setLoc({...userLoc,lat:userLoc.orgLat,lng:userLoc.orgLng})
        
        //setLoc({...userLoc,lat:orgLat,lng:orgLng})
    }
     async function geocode(){
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
            method:"GET",
            headers:{token:localStorage.token}
        });
        
        const parseRes=await response.json()
        
        setLoc({...userLoc,lat:parseRes.address_lat,lng:parseRes.address_long,orgLat:parseRes.address_lat,orgLng:parseRes.address_long})
        
        
        } catch (error) {
            console.error(error.message)
        }
      }
    return (
     <Fragment>
     <h1 style={{textAlign:"center",color:"white"}}>{userLoc.lat}</h1>
     <h1 style={{ textAlign:"center",color:"white"}}>{userLoc.lng}</h1>
     <form onSubmit={updateLoc}>
     <input id="newAddress" type="text" name="newAddress" placeholder="Enter New Address"></input>
     <button style={{width:"10%",border:"0"}} className="btn btn-primary  mx-auto d-block">Search</button>
     </form>
     <button onClick={resetAddress} style={{width:"10%",border:"0"}} className="btn btn-primary  mx-auto d-block">Reset</button>
     <div style={{
        
    alignItems: 'center',
    justifyContent: 'center',
    }}>
      <Map
        id="test"
        google={window.google}
        style={{width: '500px',
        height: '500px'}}
        zoom={15}
        center={
          {
            lat: userLoc.lat,
            lng: userLoc.lng
          }
        }
      >
        <Marker position={{ lat:userLoc.lat, lng:userLoc.lng}} />     
      </Map>
      </div>
      </Fragment>
    );
}


export default GoogleApiWrapper({
  apiKey: API_KEY
})(GMap);
