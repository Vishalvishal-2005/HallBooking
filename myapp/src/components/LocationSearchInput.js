import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';

const libraries = ['places'];
const mapContainerStyle = {
  height: '400px',
  width: '100%'
};
const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

function LocationSearchInput() {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const searchBox = useRef(null);

  const handlePlacesChanged = () => {
    const places = searchBox.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    setSelectedLocation(location);
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation}
        zoom={15}
      >
        <StandaloneSearchBox
          onLoad={ref => (searchBox.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            type="text"
            placeholder="Search for a location"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipsis',
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px'
            }}
          />
        </StandaloneSearchBox>
        <Marker position={selectedLocation} />
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationSearchInput;
