import '../../assets/css/Map.css';
import React from "react";
import { Card, Nav, Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { Typography, InputAdornment, Stack, Container, TextField, Tooltip } from '@mui/material';
import { NavigationBar, SearchBar, SearchIcon, CustomSlider, GreenButton, RestartAltIcon, GoogleMapReact, LocationOnIcon, LocationSearchingIcon, DataTable, CustomGreenTableStyle, conditionalRowStyles } from '../../utils';
import { API_KEY } from "../../constants/GoogleMapAPI";
import { parkingspaceData, columns} from "../../constants/ParkingSpaceData";
import Autocomplete from './Autocomplete';
import { CustomTooltip } from '../../components/CustomTooltip';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 34.0224,
            longitude: -118.2851,
            parkingspaces: [],
            selectedParkingId: null,
            markerClicked: false,
            searchText: false,
            distance: .2,
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
            searched: false,
            filteredParkingSpaces: []
        }
    }

    componentDidMount = () => {

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    parkingspaces:parkingspaceData
                })  
                console.log(this.state.latitude, this.state.longitude)
            })
        }
        else {
            console.log('Waiting for location');
        }
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
        
    };

    getDistanceFromLatLonInMiles = (lat1, lon1, lat2, lon2) => {
            
        const deg2rad = (deg) => {return deg * (Math.PI/180)}

        var R = 3958.8; //radius of earth in miles
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2-lon1);
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = (R*c) ///1.609; //distance in KM converted to miles
        console.log(lat1, lon1, lat2, lon2, d)
        return d
     
    }

    handleSearch = () => { 
        parkingspaceData.forEach((parking) =>
        {
            parking.dist = this.getDistanceFromLatLonInMiles(this.state.latitude, this.state.longitude, Number(parking.latitude), Number(parking.longitude))
        })
        let filteredParkingLots = parkingspaceData.filter(
            g => 
        //     g.name.toLowerCase().includes(this.state.searchText.toLowerCase())
        // &&
        (g.dist < this.state.distance)
        &&
        (g.output==1)
        )

        this.setState({
            filteredParkingSpaces: filteredParkingLots
        })
    }

    handleSlider = (event) => {
        this.setState({distance: event.target.value });

        if (this.state.filteredParkingSpaces.length > 0)
        {
            let filteredParkingLots = parkingspaceData.filter(g => (g.dist < this.state.distance) && (g.output==1))
            this.setState({
                filteredParkingSpaces: filteredParkingLots
                })
        } 
        
    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    addPlace = (place) => {     
        this.setState({
            places: place.name,
            latitude: place.geometry.viewport.Va.hi,
            longitude: place.geometry.viewport.Ha.hi,
            searched: true,
            searchText: true
        }, () => { this.handleSearch(); });   
    };


    map = () => {
       
        const clickedOutside = (x, y, lat, lng, event) => {
            if(this.state.markerClicked === true) {
                this.setState({
                    selectedParkingId: null,
                    markerClicked: false
                })
            }
            else{
                console.log("Clicked on map")
            }
            
        }

        const resetAll = () => {
            this.setState({
                    parkingspaces: parkingspaceData,
                    distance: 0.2,
                    searchText: false,
                    searched: false
                })
            
                
        }

        const handleParkingLotClick = (parkinglot) => {
            window.location.replace("/location/" + parkinglot.SpaceID)
        }

        const   {
            places, mapApiLoaded, mapInstance, mapApi, searchText
        } = this.state;

        
        return (
            <Stack spacing={2}>
                <Stack direction='row' justifyContent='space-between' sx={{padding:'10px'}}>
                    {mapApiLoaded && (
                            <div>
                                <Autocomplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                            </div>
                            
                    )}

                        <Stack id='slider'>
                            <Typography id='slider-text' gutterBottom>
                                    <b>Distance (miles)</b> 
                            </Typography>
                            <CustomSlider 
                                    valueLabelDisplay="auto"
                                    value={this.state.distance}
                                    min={0}
                                    max={.5}
                                    step={0.1}
                                    defaultValue={0.2}
                                    onChange={this.handleSlider}
                            />
                        </Stack>

                        <GreenButton variant="contained" startIcon={ <RestartAltIcon /> } onClick={resetAll} >
                            Reset
                        </GreenButton> 

                </Stack>

                <Stack direction='row' spacing={2}>
                    <div className="map-card">
                    <GoogleMapReact onClick={clickedOutside}
                                    bootstrapURLKeys={{ key: API_KEY, libraries: ['places', 'geometry'], }}
                                    yesIWantToUseGoogleMapApiInternals
                                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                                    defaultCenter={{
                                        lat: 34.0224,
                                        lng: -118.2851
                                    }}
                                    defaultZoom={15}
                                    center = {
                                        {lat: this.state.latitude,
                                        lng: this.state.longitude}
                                    }
                                    onChange={this._onChange}
                            
                        >
                            {
                                
                                this.state.filteredParkingSpaces.map((parking) =>{
                                    return (
                                        <CustomTooltip  
                                            lat={parking.latitude}
                                            lng={parking.longitude}
                                            key={parking.SpaceID} 
                                            title={parking.SpaceID}
                                        >
                                            <LocationOnIcon 
                                                color={"secondary"}
                                                onClick={() => {handleParkingLotClick(parking)}}
                                            >
                                            </LocationOnIcon>
                                        </CustomTooltip>
                                        
                                    );
                                    
                                })
                            }
                            <LocationSearchingIcon 
                            color={"primary"} 
                            lat= {this.state.latitude} 
                            lng= {this.state.longitude}
                            >
                                
                            </LocationSearchingIcon>
                    </GoogleMapReact>
                    </div>
                    
                <div className='info-card'>
                
                    { this.state.searched? (this.suggestions()) : (<div></div>) }
                
                </div>
                </Stack>
               
                
            
                
                
                
            </Stack>
        );
    }

    suggestions = () => {
        if (this.state.filteredParkingSpaces.length > 0)
            {
                let data = this.state.filteredParkingSpaces.map((parking) =>
                {
                    return ({
                        SpaceID: parking.SpaceID,
                        BlockFace: parking.BlockFace,
                        MeteredTimeLimit: parking.MeteredTimeLimit,
                        RateRange: parking.RateRange,
                        band: parking.band
                    });
                })
                
                return (
                    <div>
                        <DataTable
                            columns={columns}
                            data={data}
                            customStyles={CustomGreenTableStyle}
                            conditionalRowStyles={conditionalRowStyles}
                            fixedHeader pagination
                        >
                        </DataTable>
                    </div>
                )

                
            }
       
    }


    render() {
        
        return (
            <div className='main-body'>
                <NavigationBar />

                <div className='content'>
                    <Container maxWidth='xl'>
                        <Card>
                            <Card.Body>
                                <Container>
                                            <div>
                                                {this.map()}
                                            </div>
                                
                                   
                                </Container>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        );

    }
}

export default MapContainer;