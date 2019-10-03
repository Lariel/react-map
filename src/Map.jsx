import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';

import predio from './img/predio.png';
import logogtit from './img/logogtit.png';

const style = {
    width: '100%',
    height: '100%'
}

const google = window.google = window.google ? window.google : {}

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                style={style}
                initialCenter={{
                    lat: -30.061156,
                    lng: -51.1709409
                }}
                zoom={16}
                onClick={this.onMapClicked}>
                <Marker
                    onClick={this.onMarkerClick}
                    title={'Gerência de tecnologia da informação e telecomunicações'}
                    name={'Prédio 91A - GTIT'}
                    position={{ lat: -30.061068, lng: -51.170338 }}
                    icon={{
                        url: `${predio}`,
                        anchor: new google.maps.Point(20, 0),
                        scaledSize: new google.maps.Size(19,19)
                      }} />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <h4>{this.state.selectedPlace.title}</h4>
                        <img src={logogtit} alt='GTIT'></img>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyC4vVpapb6jFUb9psfNrq3oesXzGdoywa8')
})(MapContainer)