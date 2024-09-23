import * as React from 'react';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

// Improved Google Maps container style
const containerStyle = {
  width: '100%',
  height: '50vh', // Set height dynamically for responsiveness
  margin: '20px auto', // Center the map with margin
  borderRadius: '10px', // Round edges of the map
  overflow: 'hidden', // Prevent overflow
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for a modern look
  transition: 'height 0.3s ease', // Smooth transition when opening/closing
};

const center = {
  lat: 0,
  lng: 0,
};

// Helper function to parse coordinates
const parseCoordinates = (coordinate) => {
  const [lat, lng] = coordinate.split(',').map(Number);
  return { lat, lng };
};

export default function MediaCard() {
  // Retrieve cases array from Redux store
  const cases = useSelector((state) => state.Newcase.cases);

  // State to handle map display
  const [openMap, setOpenMap] = useState(false);
  const [coordinates, setCoordinates] = useState(center);

  // Expanded card state
  const [expandedCase, setExpandedCase] = useState(null);

  // Toggle Learn More
  const handleLearnMore = useCallback(
    (id) => {
      setExpandedCase((prevExpandedCase) => (prevExpandedCase === id ? null : id));
    },
    []
  );

 // Show location on the map
const handleShowLocation = useCallback((coordinate) => {
  const { lat, lng } = parseCoordinates(coordinate);
     //setOpenMap(true);
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}, []);


  // Close the map dialog
  const handleCloseMap = useCallback(() => {
    setOpenMap(false);
  }, []);

  return (
    <Grid container spacing={2}>
      {cases.map((singleCase) => (
        <Grid item key={singleCase.id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={singleCase.picture || "https://via.placeholder.com/100"}
              title={singleCase.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {singleCase.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Designation: {singleCase.designation}
              </Typography>

              {/* Show mobile number when Learn More is clicked */}
              {expandedCase === singleCase.id && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Mobile: {singleCase.mobileno}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleLearnMore(singleCase.id)}>
                {expandedCase === singleCase.id ? 'Hide Details' : 'Learn More'}
              </Button>
              <Button size="small" onClick={() => handleShowLocation(singleCase.cordinate)}>
                Show Location
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}

      {/* Map Dialog */}
      <Dialog open={openMap} onClose={handleCloseMap} fullWidth maxWidth="md">
        <DialogTitle>Location Coordinates</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            {`Coordinates: Latitude ${coordinates.lat.toFixed(6)}, Longitude ${coordinates.lng.toFixed(6)}`}
          </Typography>
          <LoadScript googleMapsApiKey="AIzaSyDPTg-kMHMwwU1rNdwb6ZzYEs0x_yeOL9E">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coordinates.lat && coordinates.lng ? coordinates : center}
              zoom={10}
            >
              {/* Marker only shown when valid coordinates are set */}
              <Marker position={coordinates} />
            </GoogleMap>
          </LoadScript>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}   