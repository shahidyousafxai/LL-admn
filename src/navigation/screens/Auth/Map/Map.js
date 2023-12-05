// Library Imports
import React, { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// Local Imports
import AssetsImages from "../../../../assets";
import { mapApiKey } from "../../../../utils/network/constants";
import ApiController from "../../../../utils/network/api";
import { primaryColor, white } from "../../../../utils/style/GlobalVariables";


// Initializing Map & Custom Styling
function initMap() {
    // Styles a map in night mode.
    const map = new window.google.maps.Map(
        document.getElementById("map"),
        {
            center: { lat: 40.50, lng: -112.35 },
            zoom: 6,
            disableDefaultUI: true,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            gestureHandling: "none",
            styles: [
                {
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#2A2928',
                        },
                    ],
                },
                {
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#8D8D8D',
                        },
                    ],
                },
                {
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#2A2928',
                        },
                    ],
                },
                {
                    'featureType': 'administrative',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'administrative.country',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#8D8D8D',
                        },
                    ],
                },
                {
                    'featureType': 'administrative.locality',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#bdbdbd',
                        },
                    ],
                },
                {
                    'featureType': 'poi',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'poi',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#8D8D8D',
                        },
                    ],
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#181818',
                        },
                    ],
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#616161',
                        },
                    ],
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#1b1b1b',
                        },
                    ],
                },
                {
                    'featureType': 'road',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'road',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#2c2c2c',
                        },
                    ],
                },
                {
                    'featureType': 'road',
                    'elementType': 'labels.icon',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'road',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#8a8a8a',
                        },
                    ],
                },


                {
                    'featureType': 'road.arterial',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'road.local',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'transit',
                    'stylers': [
                        {
                            'visibility': 'off',
                        },
                    ],
                },
                {
                    'featureType': 'water',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#141515',
                        },
                    ],
                },
                {
                    'featureType': 'water',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#3d3d3d',
                        },
                    ],
                },
            ],
        }
    );

    setMarkers(map);
}



// For Setting Markers on Map
function setMarkers(map) {

    ApiController.fetchLocationsCall((response) => {
        // response success
        if (response.success) {
            // marker image
            const image = {
                url: AssetsImages.pin,
                // This marker is 20 pixels wide by 32 pixels high.
                size: new window.google.maps.Size(40, 40),
                // The origin for this image is (0, 0).
                origin: new window.google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new window.google.maps.Point(0, 32),
            };

            for (let i = 0; i < response?.data.length; i++) {
                const location = response?.data[i];
                new window.google.maps.Marker({
                    position: { lat: location.lat, lng: location.lng },
                    map,
                    icon: image,
                    title: location.name,
                });
            }
        }

    })

}

// Render For Map Container
const render = (status) => {
    if (status === Status.LOADING) return <div style={{
        backgroundColor: primaryColor, color: white,
    }} >
        {status} ..</div >;
    if (status === Status.FAILURE) return <div style={{
        backgroundColor: primaryColor, color: white,
    }} >
        {status} ...</div >;
    return null;
};

// Compponent To Display Map
function MyMapComponent() {
    const ref = useRef();

    useEffect(() => {
        initMap()
    });

    return <div style={{ height: "100%", width: "100%" }} ref={ref} id="map" />;
}

// Wrapping Map Component
const Map = () => {

    return (
        <Wrapper apiKey={mapApiKey} render={render}>
            <MyMapComponent >
            </MyMapComponent>
        </Wrapper>
    );
}

export default Map;

