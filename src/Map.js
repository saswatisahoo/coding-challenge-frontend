import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends React.Component  {

  state={showingInfoWindow: "False",
    activeMarker: {}, 
    selectedPlace: {}
  }
  onMarkerClick = (props, marker, e) => 
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: "True"
    });
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: "False",
          activeMarker: "None"
        });
      }
    };

   render() {
    const mapStyles = {
      width: "40%",
      height: "40%",

    };

      return (
        <div>

            <div>
              Name : {this.props.UserName}
              <br/>
              lat : {this.props.lat} &nbsp;
              lng : {this.props.lng}
            </div>
            
            {/* <Map 
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
            > */}

<Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: this.props.lat, lng: this.props.lng 
          }
        }
      >

            <Marker
          onClick={this.onMarkerClick}
          name={this.props.UserName}
           />
           <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
      </div>      
      );
   }
}
export default GoogleApiWrapper({
       apiKey: ('AIzaSyCURvYpsgq7mbBy7QA9_aJ_5kpAjgiHw_A')
})(MapContainer)