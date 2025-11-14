import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons for different accessibility levels
const createCustomIcon = (rating) => {
  const colors = {
    accessible: "#10b981", // green
    partially_accessible: "#f59e0b", // yellow
    not_accessible: "#ef4444", // red
    unknown: "#9ca3af" // gray
  };

  const patterns = {
    accessible: "✓",
    partially_accessible: "~",
    not_accessible: "✗",
    unknown: "?"
  };

  const color = colors[rating] || colors.unknown;
  const pattern = patterns[rating] || patterns.unknown;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
        font-size: 16px;
        font-weight: bold;
        color: white;
      ">
        ${pattern}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Component to handle map center updates
function MapController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, zoom, map]);

  return null;
}

// Component to automatically center map on selected place or user location
function MapAutoCenter({ places, selectedPlaceId, userLocation, defaultCenter, defaultZoom }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlaceId) {
      const place = places.find((p) => String(p.id) === String(selectedPlaceId));
      if (place) {
        map.setView([place.latitude, place.longitude], Math.max(defaultZoom, 17), { animate: true });
        return;
      }
    }

    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], Math.max(defaultZoom, 15), { animate: true });
      return;
    }

    if (defaultCenter) {
      map.setView(defaultCenter, defaultZoom || 13, { animate: false });
    }
  }, [places, selectedPlaceId, userLocation, defaultCenter, defaultZoom, map]);

  return null;
}

// Component to handle map click events
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

export default function MapPage({ 
  places, 
  center, 
  zoom, 
  onPlaceClick, 
  onMapClick,
  selectedPlaceId,
  userLocation 
}) {
  const mapRef = useRef(null);

  // Create user location icon
  const userLocationIcon = L.divIcon({
    className: "user-location-marker",
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.6), inset 0 0 0 2px #3b82f6;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <div className="w-full h-full" role="application" aria-label="Interactive accessibility map">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={center} zoom={zoom} />
        <MapAutoCenter
          places={places}
          selectedPlaceId={selectedPlaceId}
          userLocation={userLocation}
          defaultCenter={center}
          defaultZoom={zoom}
        />
        <MapClickHandler onMapClick={onMapClick} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userLocationIcon}
            aria-label="Your current location"
          >
            <Popup>
              <div className="text-sm font-medium">Your Location</div>
            </Popup>
          </Marker>
        )}

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={createCustomIcon(place.overall_rating)}
            eventHandlers={{
              click: () => {
                if (onPlaceClick) {
                  onPlaceClick(place);
                }
              },
            }}
            aria-label={`${place.name}, ${place.overall_rating.replace('_', ' ')}`}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-1">{place.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{place.address}</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: 
                        place.overall_rating === 'accessible' ? '#10b981' :
                        place.overall_rating === 'partially_accessible' ? '#f59e0b' :
                        place.overall_rating === 'not_accessible' ? '#ef4444' :
                        '#9ca3af'
                    }}
                  />
                  <span className="text-xs font-medium capitalize">
                    {place.overall_rating.replace('_', ' ')}
                  </span>
                </div>
                {place.reportCount > 0 && (
                  <p className="text-xs text-blue-600 mt-2">
                    {place.reportCount} user report{place.reportCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}