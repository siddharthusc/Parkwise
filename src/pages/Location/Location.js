import React from "react";
import { parkingspaceData } from "../../constants/ParkingSpaceData";
import { NavigationBar } from "../../utils";
import {Container, Typography} from '@mui/material';
import { Card } from 'react-bootstrap';
import {Chart as ChartJS, BarElement} from 'chart.js'
import { Bar,Pie } from "react-chartjs-2";
import '../../assets/css/Location.css'

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
        // console.log(selectedParkingLot)
        this.setState({parkingLotName: selectedParkingLot.BlockFace,
            data: selectedParkingLot.data,
            labels: selectedParkingLot.labels,
            ticketing_data:selectedParkingLot.data_ticketing,
            pie_labels_crime : selectedParkingLot.pie_labels_crime,
            pie_labels_ticekting : selectedParkingLot.pie_labels_ticketing,
            data_pie_crime : selectedParkingLot.data_pie_crime,
            data_pie_ticketing : selectedParkingLot.data_pie_ticketing
        })
        

    }

    render () {
        const state = {
        labels: this.state.labels,
        datasets: [{
            label: "Crime",
            backgroundColor: "blue",
            borderColor: "yellow",
            borderWidth: 10,
            data: this.state.data

    }]
    }

    const state3 = {
      labels: this.state.labels,
      datasets: [{
          label: "Ticketing",
          backgroundColor: "blue",
          borderColor: "yellow",
          borderWidth: 10,
          data: this.state.ticketing_data
          
  }]
  }
  // console.log(this.state.ticketing_data)

    const state1 = {
      labels: this.state.pie_labels_crime,
      datasets: [{
          label: "Rainfall",
          backgroundColor: ["red","blue","green","yellow","orange"],
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.data_pie_crime
  }]
  }

  const state2 = {
    labels: this.state.pie_labels_ticekting,
    datasets: [{
        label: "Rainfall",
        backgroundColor: ["red","blue","green","yellow","orange","magenta"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: this.state.data_pie_ticketing
}]
}

    const options = {
        legend: {
              display: true,
              position: "bottom",
              labels: {
              fontColor: 'red'
              }
            },
            tooltip: {
                titleFont: { size: 13.2, family: "Yekan" },
                bodyFont: { size: 14.2, family: "Yekan" }
                
              },
            title: {
              text: "Crime Rate in continuous weeks",
              display: true,
              fontSize: 20
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 16, // set the font size of y-axis labels
                  fontColor: "blue",
                  beginAtZero: true
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontSize: 16, // set the font size of x-axis labels
                  fontColor: "blue"
                },
              },
            ],
          },
        }

        const options2 = {
          legend: {
                display: true,
                position: "bottom",
                labels: {
                fontColor: 'red'
                }
              },
              tooltip: {
                  titleFont: { size: 13.2, family: "Yekan" },
                  bodyFont: { size: 14.2, family: "Yekan" }
                  
                },
              title: {
                text: "Ticketing Rate in continuous weeks",
                display: true,
                fontSize: 20
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontSize: 16, // set the font size of y-axis labels
                    fontColor: "blue",
                    beginAtZero: true
                  },
                   beginAtZero:true
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontSize: 16, // set the font size of x-axis labels
                    fontColor: "blue"
                  },
                },
              ],
            },
          }

          const options3 = {
            legend: { display: true },
            title: {
              text: "Most Frequent Crimes",
              display: true,
              fontSize: 20
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        };

        const options4 = {
          legend: { display: true },
          title: {
            text: "Most Frequent Tickets",
            display: true,
            fontSize: 20
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
  

        return (
            <div className="main-body">
                <NavigationBar />

                <div className="content">
                    <Container  maxWidth='xl'>
                        <Card>
                            <Card.Header>
                                <Typography>
                                    { this.state.parkingLotName }
                                    <div>
                                      <div>
                                        <div className="barchart">
                                          <Bar 
                                              data = {state}
                                              options = {options}
                                          />
                                          </div>
                                        <div className="piechart">
                                          <Pie 
                                              data = {state1}
                                              options = {options3}
                                          />
                                          </div>
                                        </div>
                                        <div>
                                        <div className="barchart1">
                                          <Bar 
                                              data = {state3}
                                              options = {options2}
                                          />
                                          </div>
                                        <div className="piechart1">
                                          <Pie 
                                              data = {state2}
                                              options = {options4}
                                          />
                                          </div>
                                        </div>
                                    </div>
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

