import React, { Fragment,setState,useState,Component, useEffect } from 'react';
import { Map, GoogleApiWrapper ,InfoWindow,Marker} from 'google-maps-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const API_KEY=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const GMap=()=>{
  
    // stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
    //         {latitude: 47.359423, longitude: -122.021071},
    //         {latitude: 47.2052192687988, longitude: -121.988426208496},
    //         {latitude: 47.6307081, longitude: -122.1434325},
    //         {latitude: 47.3084488, longitude: -122.2140121},
    //         {latitude: 47.5524695, longitude: -122.0425407}]
  
const displayMarkers = () => {
  return userLoc.stores.map((store, index) => {
    return <Marker  onClick={()=>openEmployer(store.employername)} key={index} id={index} position={{
     lat: store.latitude,
     lng: store.longitude
   }}
  />
  })
}
const openEmployer =(str)=>{
    document.getElementById("employerName").innerHTML=str;
    document.getElementById("employerName").style.display="block";
}
      const [userLoc,setLoc]=useState({
          lat:0,
          lng:0,
          orgLat:0,
          orgLng:0,
          stores:[]
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
        const res=await fetch("http://localhost:5000/dashboard/employerlocs",{
          method:"GET",
          headers:{token:localStorage.token}
        });
        const empLoc=await res.json()
        var empList=[]
        for(let i=0;i<empLoc.length;i++){
          empList.push({employername:empLoc[i].user_name,latitude:empLoc[i].address_lat,longitude:empLoc[i].address_long})
        }
        setLoc({...userLoc,lat:parseRes.address_lat,lng:parseRes.address_long,orgLat:parseRes.address_lat,orgLng:parseRes.address_long,stores:empList})
       
        
       
        } catch (error) {
            console.error(error.message)
        }
      }
      console.log(userLoc)
    return (
     <Fragment>
     <h1 style={{textAlign:"center",color:"white"}}>{userLoc.lat}</h1>
     <h1 style={{ textAlign:"center",color:"white"}}>{userLoc.lng}</h1>
     <h1 id="employerName"style={{display:"none", textAlign:"center",color:"white"}}>{userLoc.lng}</h1>
     
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
        <Marker  position={{ lat:userLoc.lat, lng:userLoc.lng}} /> 
        {displayMarkers()}       
      </Map>
      </div>
      </Fragment>
    );
}


export default GoogleApiWrapper({
  apiKey: API_KEY
})(GMap);
