import '../../assets/css/Map.css';
import React from "react";
import { Container, Card, Nav, Row, Col } from 'react-bootstrap';
import { Typography, InputAdornment, Stack } from '@mui/material';
import { NavigationBar, SearchBar, SearchIcon, CustomSlider, GreenButton, RestartAltIcon, GoogleMapReact, LocationOnIcon, LocationSearchingIcon, DataTable, CustomGreenTableStyle, conditionalRowStyles } from '../../utils';
import { API_KEY } from "../../constants/GoogleMapAPI";
import { parkingspaceData, columns, data } from "../../constants/ParkingSpaceData";


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
            distance:5,
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            places: [],
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


    header = () => {
        const getDistanceFromLatLonInMiles = (lat1, lon1, lat2, lon2) => {
            
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

        const handleSearch = () => { 
            let filteredParkingLots = parkingspaceData.filter(
                g => 
                g.name.toLowerCase().includes(this.state.searchText.toLowerCase())
            &&
            (getDistanceFromLatLonInMiles(this.state.latitude, this.state.longitude, g.latitude, g.longitude) < this.state.distance)
            )
            this.setState({
                parkingspaces: filteredParkingLots
            })
        }

        const resetAll = () => {
            console.log('reset')
            this.setState({
                    parkingspaces: parkingspaceData,
                    distance: 1,
                    searchText: ""

                })
        }

        return (
            <Stack direction='row' spacing={15}>
                <SearchBar id='search-bar'
                               type='search'
                               label='Search'
                               value = {this.state.searchText}
                               onChange = {(event) => {this.setState({searchText: event.target.value})}}
                               InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon onClick={handleSearch} id='searchIcon'/>
                                        </InputAdornment>
                                    ),
                               }}
                />

                <Stack id='slider'>
                    <Typography id='slider-text' gutterBottom>
                            <b>Distance (miles)</b> 
                    </Typography>
                    <CustomSlider 
                            valueLabelDisplay="auto"
                            value={this.state.distance}
                            min={0}
                            max={15}
                            defaultValue={5}
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
            window.location.replace("/location/" + parkinglot.id)
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
        return(
            <GoogleMapReact onClick={clickedOutside}
                            bootstrapURLKeys={{ key: API_KEY }}
                            defaultCenter={{
                                lat: 34.0224,
                                lng: -118.2851
                            }}
                            defaultZoom={11}
                            center = {
                                {lat: this.state.latitude,
                                lng: this.state.longitude}
                            }
            >
               {
                    this.state.parkingspaces.map((parking) => {
                        if(this.state.places.length > 1){
                            return (
                                <LocationOnIcon color={"secondary"}
                                        lat={parking.latitude}
                                        lng={parking.longitude}
                                        onClick={() => {this.setState({selectedParkingId: parking.id, markerClicked:true})}}
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
        );
    }

    suggestions = () => {
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

    render() {
        return(
            <div id='main-body'>
                <NavigationBar />

                <div id='content'>
                    <Container>
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