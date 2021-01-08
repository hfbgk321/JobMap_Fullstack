import React, { Fragment,setState,useState,Component, useEffect } from 'react';
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';



const API_KEY=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const GMap=()=>{
  
      const [userLoc,setLoc]=useState({
          lat:0,
          lng:0,
      });
      useEffect(()=>{
          geocode();
      },[])
     
     async function geocode(){
        try {
            const response = await fetch("http://localhost:5000/dashboard",{
            method:"GET",
            headers:{token:localStorage.token}
        });
        
        const parseRes=await response.json()
        
        setLoc({...userLoc,lat:parseRes.address_lat,lng:parseRes.address_long})
        
        
        } catch (error) {
            console.error(error.message)
        }
      }
    return (
     <Fragment>
     <h1 style={{textAlign:"center",color:"white"}}>{userLoc.lat}</h1>
     <h1 style={{ textAlign:"center",color:"white"}}>{userLoc.lng}</h1>
     
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
// export class MapContainer extends Component {
    
//   render() {
//     const mapStyles = {
//         width: '100%',
//         height: '100%'
//       };
//       const state={
//           lat:0,
//           long:0,
//       }
//      async function geocode(){
          
//           try{
//               const location=await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
//                   params:{
//                       address:'2761 Bath Ave',
//                       key:API_KEY
//                   }
//               }).then(async result=>{
                  
//                 // const parseRes=result
//                 // console.log( parseRes.data.results[0].geometry.location)
               
//                 var loc=await result.data.results[0].geometry.location.lat
//                 state.lat=loc
//                 console.log(state.lat)
//               })
             
//           }
//           catch(error){
//               console.log(error);
//           }
//       }
    

    
    
//     geocode()
//     console.log(state.lat)
//     return (
   
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: state.lat,
//             lng: state.long
//           }
//         }
//       />
//     );
//   }
// }

export default GoogleApiWrapper({
  apiKey: API_KEY
})(GMap);
