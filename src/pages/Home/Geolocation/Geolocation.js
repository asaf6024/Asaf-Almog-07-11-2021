import React, { useEffect } from "react";

const Geolocation = (props) => {

    useEffect(() => {

        document.querySelector('#find-me').addEventListener('click', geoFindMe);
        geoFindMe()

    }, [])

    const geoFindMe = () => {

        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');

        mapLink.href = '';
        mapLink.textContent = '';

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            props.setLon(longitude)
            props.setLat(latitude)

            status.textContent = '';
            mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;


        }

        function error() {
            status.textContent = 'Unable to retrieve your location';

            props.setLon(34.781769)
            props.setLat(32.085300)

        }

        if (!navigator.geolocation) {
            // status.textContent = 'Geolocation is not supported by your browser';
            alert('Geolocation is not supported by your browser')
        } else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }



    return (
        <div style={{ display: 'none' }}>
            <button id="find-me">Show my location</button><br />
            <p id="status"></p>
            <a id="map-link" target="_blank" rel="noreferrer"></a>
        </div>
    )
}
export default Geolocation