import React, { useEffect, useState } from 'react';
import './App.css';

const YandexMap = () => {
  const [mapInitiated, setMapInitiated] = useState(false);

  useEffect(() => {
    const apiKey = 'a0325676-108c-4a26-8b08-8ddbcf9ee724'; 

    const initializeMap = () => {
      if (!window.ymaps) {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.onload = () => {
          const mapContainer = document.getElementById('map');
          if (mapContainer && !mapInitiated) {
            mapContainer.innerHTML = ''; 

            window.ymaps.ready(() => {
              const map = new window.ymaps.Map("map", {
                center: [55.76, 37.64], 
                zoom: 10, 
              });
    
              map.controls.add('zoomControl');
              map.controls.add('typeSelector');
              map.controls.remove('searchControl');
              map.controls.remove('trafficControl');
    
    
              setMapInitiated(true);
            });
          }
        };
        document.body.appendChild(script);
      }
    };

    initializeMap();
  }, [mapInitiated]);

  return (
    <div class="body">
      {/* Шапка */}
      <div class="header">
        wadas
      </div>

      {/* Меню */}
      <div class="boss">
        <div class ="map1" id="map"></div>
        <nav>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
          <div class="block"></div>
        </nav>
      </div>

        
      )
    </div>
  );
};

export default YandexMap;
