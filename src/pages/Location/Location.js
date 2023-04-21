import React from "react";
import Typography from '@mui/material/Typography';
import { parkingspaceData } from "../../constants/ParkingSpaceData";

export default class Location extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            parkingLotName: "",
        }
    }

    componentDidMount = () => {
        let parkingLotID = window.location.href.split("/").pop()
        let selectedParkingLot = parkingspaceData.filter(g => g.id === parkingLotID)[0]
        this.setState({parkingLotName: selectedParkingLot.name})
    }

    render() {
    
        return  
            (
                <div>
                    <h1>
                        Location: {this.state.parkingLotName}
                    </h1>
                    
                </div>
            );

        }
}
