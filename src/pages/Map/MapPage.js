import '../../assets/css/Map.css';
import React from "react";
import { Card, Nav, Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { Typography, InputAdornment, Stack, Container, TextField } from '@mui/material';
import { NavigationBar, SearchBar, SearchIcon, CustomSlider, GreenButton, RestartAltIcon, GoogleMapReact, LocationOnIcon, LocationSearchingIcon, DataTable, CustomGreenTableStyle, conditionalRowStyles } from '../../utils';
import { API_KEY } from "../../constants/GoogleMapAPI";
import { parkingspaceData, columns, data } from "../../constants/ParkingSpaceData";
import Autocomplete from './Autocomplete';

export default class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 34.0224,
            longitude: -118.2851,
            parkingspaces: [],
            selectedParkingId: null,
            markerClicked: false,
            searchText: "",
            distance:.2,
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
            searched: false
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
            })
        }
        else {
            console.log('Waiting for location');
        }
    }
    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }
    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });
        
    };

    addPlace = (place) => {
        this.setState({
            places: [place],
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        });
        
    };

    getDistanceFromLatLonInMiles = (lat1, lon1, lat2, lon2) => {
            
        const deg2rad = (deg) => {return deg * (Math.PI/180)}

        var R = 6371; //radius of earth in km
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2-lon1);
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R*c/1.609; //distance in KM converted to miles
        // console.log(d)
        return d
    }

    handleSearch = () => { 
        let filteredParkingLots = parkingspaceData.filter(
            g => 
        //     g.name.toLowerCase().includes(this.state.searchText.toLowerCase())
        // &&
        (this.getDistanceFromLatLonInMiles(this.state.latitude, this.state.longitude, g.latitude, g.longitude) < this.state.distance)
        &&
        (g.output==1)
        )
        this.setState({
            parkingspaces: filteredParkingLots
        })
    }

    header = () => {
        

        const resetAll = () => {
            this.setState({
                    parkingspaces: parkingspaceData,
                    distance: 0.2,
                    searchText: "",
                    searched: false
                })
                console.log(this.state.searched)
        }

        return (
            <Stack direction='row' spacing={20}>
                <Stack id='slider'>
                    <Typography id='slider-text' gutterBottom>
                            <b>Distance (miles)</b> 
                    </Typography>
                    <CustomSlider 
                            valueLabelDisplay="auto"
                            value={this.state.distance}
                            min={0}
                            max={2}
                            defaultValue={1}
                            onChange={(event,value) => {this.setState({distance:value})}}
                    />
                </Stack>

                <GreenButton variant="contained" startIcon={ <RestartAltIcon /> } onClick={resetAll} >
                        Reset
                </GreenButton> 
            </Stack>
        );
    }
 
    map = () => {

        

        const handleParkingLotClick = (parkinglot) => {
            window.location.replace("/location/" + parkinglot.SpaceID)
        }
        
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

        const   {
                    places, mapApiLoaded, mapInstance, mapApi,
                } = this.state;

        return(
            <Stack spacing={2} sx={{height:'100%'}}>
                {mapApiLoaded && (
                        <div>
                            <Autocomplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                            
                        </div>
                        
                    )}
                
                <GoogleMapReact onClick={clickedOutside}
                            bootstrapURLKeys={{ key: API_KEY, libraries: ['places', 'geometry'], }}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                            defaultCenter={{
                                lat: 34.0224,
                                lng: -118.2851
                            }}
                            defaultZoom={11}
                            center = {
                                {lat: this.state.latitude,
                                lng: this.state.longitude}
                            }
                            onChange={this._onChange}
            >
               {
                    this.state.parkingspaces.map((parking) => {
                        // console.log(this.state.places);
                        if(this.state.places.length >= 1){
                            this.state.searched = true;
                            this.handleSearch();
                            return (
                                        <LocationOnIcon color={"secondary"}
                                                lat={parking.latitude}
                                                lng={parking.longitude}
                                                onClick={() => {this.setState({selectedParkingId: parking.SpaceID, markerClicked:true})}}
                                        ></LocationOnIcon>
                                    );
                        }
                        })
                }

                 {
                        this.state.parkingspaces.map((parking) => {
                                if(this.state.selectedParkingId === parking.id) {
                                        return(
                                            <div lat={parking.latitude}
                                                        lng={parking.longitude}
                                                        onClick = {() => {handleParkingLotClick(parking)}}
                                                        style={{backgroundColor: "white", padding:10, borderRadius: 20, width: 100}}
                                            >
                                                    <Typography style = {{textAlign: "center"}}>
                                                        {parking.name}
                                                    </Typography>
                                            </div>
                                        );
                                    }
                                else {
                                        return null
                                    }
                        })
                }

                <LocationSearchingIcon color={"primary"} lat= {this.state.latitude} lng= {this.state.longitude}></LocationSearchingIcon>

            
            </GoogleMapReact>
            </Stack>
            
        );
    }

    suggestions = () => {
        if(this.state.searched == true){
        return (
            <div className="container-mt-5">
                <DataTable
                    columns={columns}
                    data = {data}
                    customStyles={CustomGreenTableStyle}
                    conditionalRowStyles={conditionalRowStyles}
                    fixedHeader pagination>
                </DataTable>    
            </div>        
        );
        }
        else{
            return (
                <div >
                    <Box
                        sx={{
                            height: 400,
                            maxWidth: '100%',
                        }}>
                    <p>Make a search to start</p>
                    </Box>
                </div>
            );
        }
        
    }

    render() {
        return(
            <div id='main-body'>
                <NavigationBar />

                <div id='content'>
                    <Container maxWidth='xl'>
                        <Card>
                            <Card.Header>
                                { this.header() }
                            </Card.Header>

                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Card className="map-card">
                                                <Card.Body>
                                                    {this.map()}    
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col>
                                            <Card className="info-card">
                                                <Card.Body>
                                                    {this.suggestions()}    
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        );
    }

}