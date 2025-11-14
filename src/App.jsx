import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import MapPage from './pages/MapPage.jsx';

// Sample places near Bangalore
const SAMPLE_PLACES = [
  {
    id: 1,
    name: "Bangalore Central Library",
    address: "Cubbon Park, Bangalore, Karnataka 560001",
    latitude: 12.9352,
    longitude: 77.5945,
    overall_rating: "accessible",
    has_ramp: "yes",
    has_lift: "yes",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "yes",
    reportCount: 5,
    verified: true,
    confidence_score: 85,
  },
  {
    id: 2,
    name: "Forum Mall Bangalore",
    address: "Koramangala, Bangalore, Karnataka 560034",
    latitude: 12.9352,
    longitude: 77.6245,
    overall_rating: "partially_accessible",
    has_ramp: "yes",
    has_lift: "yes",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "no",
    reportCount: 3,
    verified: true,
    confidence_score: 72,
  },
  {
    id: 3,
    name: "Vidhana Soudha",
    address: "Vidhan Bhavan, Bangalore, Karnataka 560001",
    latitude: 12.9320,
    longitude: 77.5892,
    overall_rating: "accessible",
    has_ramp: "yes",
    has_lift: "yes",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "yes",
    reportCount: 7,
    verified: true,
    confidence_score: 92,
  },
  {
    id: 4,
    name: "Indira Gandhi Rashtriya Manav Sangrahalaya",
    address: "Vasantkunj, Bangalore, Karnataka 560001",
    latitude: 12.9698,
    longitude: 77.5902,
    overall_rating: "partially_accessible",
    has_ramp: "yes",
    has_lift: "no",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "yes",
    reportCount: 2,
    verified: false,
    confidence_score: 65,
  },
  {
    id: 5,
    name: "Bangalore International Airport",
    address: "Devanahalli, Bangalore, Karnataka 560008",
    latitude: 13.1979,
    longitude: 77.7064,
    overall_rating: "accessible",
    has_ramp: "yes",
    has_lift: "yes",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "yes",
    reportCount: 9,
    verified: true,
    confidence_score: 95,
  },
  {
    id: 6,
    name: "St. Mark's Cathedral",
    address: "Whitefield, Bangalore, Karnataka 560066",
    latitude: 12.9716,
    longitude: 77.7404,
    overall_rating: "not_accessible",
    has_ramp: "no",
    has_lift: "no",
    has_accessible_toilet: "no",
    has_accessible_parking: "no",
    has_accessible_entrance: "no",
    reportCount: 1,
    verified: true,
    confidence_score: 50,
  },
  {
    id: 7,
    name: "Lal Bagh Botanical Garden",
    address: "Lal Bagh Road, Bangalore, Karnataka 560004",
    latitude: 12.9450,
    longitude: 77.5850,
    overall_rating: "partially_accessible",
    has_ramp: "yes",
    has_lift: "unknown",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "yes",
    reportCount: 4,
    verified: true,
    confidence_score: 78,
  },
  {
    id: 8,
    name: "Bangalore Metro Station - MG Road",
    address: "MG Road, Bangalore, Karnataka 560001",
    latitude: 12.9352,
    longitude: 77.6021,
    overall_rating: "accessible",
    has_ramp: "yes",
    has_lift: "yes",
    has_accessible_toilet: "yes",
    has_accessible_parking: "yes",
    has_accessible_entrance: "yes",
    reportCount: 6,
    verified: true,
    confidence_score: 88,
  },
];

function App() {
  const [places, setPlaces] = useState(SAMPLE_PLACES);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [defaultCenter, setDefaultCenter] = useState([12.9716, 77.5946]); // Bangalore center
  const defaultZoom = 13;

  // Get user's live location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setDefaultCenter([latitude, longitude]);
          console.log('User location:', latitude, longitude);
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Keep default location if geolocation fails
        }
      );

      // Watch position for live updates
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log('Updated location:', latitude, longitude);
        },
        (error) => {
          console.log('Watch position error:', error);
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleAddReport = (report) => {
    // report contains place_id, latitude, longitude and feature fields
    setPlaces((prev) => {
      const idx = prev.findIndex(p => String(p.id) === String(report.place_id) || String(p.id) === String(report.place_id).replace('custom_', ''));
      if (idx !== -1) {
        const existing = prev[idx];
        const updated = {
          ...existing,
          name: report.place_name || existing.name,
          address: report.address || existing.address,
          latitude: report.latitude ?? existing.latitude,
          longitude: report.longitude ?? existing.longitude,
          has_ramp: report.has_ramp ?? existing.has_ramp,
          has_lift: report.has_lift ?? existing.has_lift,
          has_accessible_toilet: report.has_accessible_toilet ?? existing.has_accessible_toilet,
          has_accessible_parking: report.has_accessible_parking ?? existing.has_accessible_parking,
          has_accessible_entrance: report.has_accessible_entrance ?? existing.has_accessible_entrance,
          overall_rating: report.overall_rating || existing.overall_rating,
          reportCount: (existing.reportCount || 0) + 1,
          confidence_score: report.confidence_score ?? existing.confidence_score,
          userReports: [
            ...(existing.userReports || []),
            { ...report, created_date: new Date().toISOString(), created_by: 'you' }
          ]
        };
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }

      // Add as new place
      const newPlace = {
        id: report.place_id || `custom_${Date.now()}`,
        name: report.place_name || 'Custom Place',
        address: report.address || '',
        latitude: report.latitude || 0,
        longitude: report.longitude || 0,
        has_ramp: report.has_ramp || 'unknown',
        has_lift: report.has_lift || 'unknown',
        has_accessible_toilet: report.has_accessible_toilet || 'unknown',
        has_accessible_parking: report.has_accessible_parking || 'unknown',
        has_accessible_entrance: report.has_accessible_entrance || 'unknown',
        overall_rating: report.overall_rating || 'unknown',
        reportCount: 1,
        verified: false,
        confidence_score: report.confidence_score || 50,
        userReports: [{ ...report, created_date: new Date().toISOString(), created_by: 'you' }]
      };
      return [newPlace, ...prev];
    });
    // after adding report, select the place
    setSelectedPlace(prev => ({ ...(prev || {}), id: report.place_id }));
  };

  const handleMapClick = (latlng) => {
    console.log('Map clicked at:', latlng);
  };

  // Debug: log render
  console.log('App render — selectedPlace:', selectedPlace?.name || 'none');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout 
              currentPageName="Map" 
              places={places}
              selectedPlace={selectedPlace}
              onPlaceSelect={handlePlaceClick}
              onPlaceClose={() => setSelectedPlace(null)}
              userLocation={userLocation}
              onAddReport={handleAddReport}
            >
              <MapPage 
                places={places} 
                center={defaultCenter}
                zoom={defaultZoom}
                onPlaceClick={handlePlaceClick}
                onMapClick={handleMapClick}
                selectedPlaceId={selectedPlace?.id}
                userLocation={userLocation}
              />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
