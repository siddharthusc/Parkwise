import React from "react";
import { parkingspaceData } from "../../constants/ParkingSpaceData";
import { NavigationBar } from "../../utils";
import {Container, Typography} from '@mui/material';
import { Card } from 'react-bootstrap';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parkingLotName: "",
        }
    }
    componentDidMount = () => {
        let parkingLotID = window.location.href.split("/").pop()
        let selectedParkingLot = parkingspaceData.filter(g => g.SpaceID === parkingLotID)[0]
        this.setState({parkingLotName: selectedParkingLot.BlockFace})
    }
    render () {
        
        return (
            <div className="main-body">
                <NavigationBar />

                <div className="content">
                    <Container  maxWidth='xl'>
                        <Card>
                            <Card.Header>
                                <Typography>
                                    { this.state.parkingLotName }
                                </Typography>
                            </Card.Header>
                        </Card>
                        
                    </Container>
                </div>

            </div>
            
        );
    }
}
        
    


export default Location;

