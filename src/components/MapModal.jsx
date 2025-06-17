import React, { useEffect, useRef } from 'react';
import './MapModal.css';

const MapModal = ({ coordinates, onClose }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (window.L && mapRef.current && !mapInstance.current) {
      mapInstance.current = window.L.map(mapRef.current).setView(coordinates, 13);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      window.L.marker(coordinates)
        .addTo(mapInstance.current)
        .bindPopup('Appointment Location')
        .openPopup();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [coordinates]);

  return (
    <div className="map-modal-backdrop">
      <div className="map-modal-box">
        <h3 className="map-modal-title">Appointment Location</h3>
        <div ref={mapRef} className="map-container"></div>
        <button onClick={onClose} className="map-close-button">
          &times;
        </button>
      </div>
    </div>
  );
};

export default MapModal;
