import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const YandexMap = () => {
    const [mapInitiated, setMapInitiated] = useState(false);
  
    useEffect(() => {
      const apiKey = 'a0325676-108c-4a26-8b08-8ddbcf9ee724';
      const gasStationsUrl = '/api/gasStations';
  
      const initializeMap = () => {
        if (!window.ymaps) {
          const script = document.createElement('script');
          script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
          script.onload = () => {
            if (window.ymaps && window.ymaps.Map && window.ymaps.Placemark) {
              const mapContainer = document.getElementById('map');
              if (mapContainer && !mapInitiated) {
                mapContainer.innerHTML = '';
  
                axios.get(gasStationsUrl)
                  .then(response => {
                    const data = response.data;
                    const map = new window.ymaps.Map("map", {
                      center: [55.76, 37.64],
                      zoom: 10,
                    });
  
                    data.forEach((station) => {
                      const placemark = new window.ymaps.Placemark(
                        [station.lat, station.lon],
                        {
                          hintContent: station.name,
                        },
                        {
                          preset: 'islands#blueGasStationIcon',
                        }
                      );
                      map.geoObjects.add(placemark);
                    });
  
                    map.controls.add('zoomControl');
                    map.controls.add('typeSelector');
                    map.controls.remove('searchControl');
                    map.controls.remove('trafficControl');
  
                    setMapInitiated(true);
                  })
                  .catch(error => {
                    console.error('Error fetching gas stations:', error);
                  });
              }
            }
          };
          document.body.appendChild(script);
        }
      };
  
      initializeMap();
    }, [mapInitiated]);
  
  
    return (
      <div className="body">
        {/* Шапка */}
        <div className="header">
          ШАПКА
        </div>
        {/* Меню */}
        <div className="map1" id="map"></div>
      </div>
    );
  };
  export default YandexMap;




