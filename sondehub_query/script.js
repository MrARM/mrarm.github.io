const IgroundSonde = L.icon({
  iconUrl: "https://sondehub.org/img/markers/payload-green.png",
  iconSize: [14, 16]
});

const IgroundPredSonde = L.icon({
  iconUrl: "https://sondehub.org/img/markers/payload-yellow.png",
  iconSize: [14, 16]
});

const IflySonde = L.icon({
  iconUrl: "https://sondehub.org/img/markers/payload-recovered.png",
  iconSize: [14, 16]
});

const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};

const heatMapper = data => {
    const sondeMap = [];
    const cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        radius: .15,
        maxOpacity: .7,
        // scales the radius based on map zoom
        scaleRadius: true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        useLocalExtrema: false,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
    };

    const heatmapLayer = new HeatmapOverlay(cfg);


    // Create dataset for heatmap plugin
    for(const [ser, dat] of Object.entries(data)){
        const sondeData = {
            lat: dat.lat,
            lng: dat.lon,
            count: 1
        };
        sondeMap.push(sondeData);
    }

    // Display
    console.log(sondeMap);
    heatmapLayer.setData({
        max: 2,
        data: sondeMap
    });
    map.addLayer(heatmapLayer);
};

const query = (heatmap) => {
  // Reset State
  map.eachLayer((layer) => {
    // Don't remove the tiles
    if (layer.getPopup() !== undefined) {
      layer.remove();
    }
  });

  const sondesToPredict = [];

  const lat = parseFloat(document.getElementById("lat").value);
  const lon = parseFloat(document.getElementById("lon").value);
  const dist = parseInt(document.getElementById("distance").value) * 1000; // SH uses meters.
  const time = parseInt(document.getElementById("days").value) * 86400; // SH uses seconds.
  fetch(
    `https://api.v2.sondehub.org/sondes?lat=${lat}&lon=${lon}&distance=${dist}&last=${time}`
  )
    .then((response) => response.json())
    .then((data) => {
      map.flyTo([lat, lon], 9);

      console.log(`Sonde count: ${Object.entries(data).length}`);
      if(heatmap){
          return heatMapper(data); // Easier to reuse a query
      }
      for (const [ser, dat] of Object.entries(data)) {
        // ~~SH seems to return anything, I only want things nearish the ground~~ Changed to show predictions
        //if (dat.alt > 5000) {
          //continue;
        //}
        console.log(`Adding ${ser}`);
        const d = new Date(dat.time_received);

        console.log(`${dat.type}:${ser}<br>${dat.alt}m<br>${d}`);
        const marker = L.marker([dat.lat, dat.lon]).addTo(map);
        if (dat.alt < 1500) {
          // Likely on the ground, show green icon
          marker.setIcon(IgroundSonde);
        } else {
          marker.setIcon(IflySonde);
          sondesToPredict.push(dat); // Put sonde in prediction list
        }
        marker.bindPopup(
          `${dat.type}:${ser}<br>${dat.alt}m<br>${d.toLocaleTimeString(
            "en-us",
            options
          )}<br><a href="https://www.google.com/maps/?q=${dat.lat},${
            dat.lon
          }&z=15">Google Maps</a>`
        );
      }

      // Run predictions on every sonde around
      const queryVar = sondesToPredict.map(sonde=>sonde.serial).join(',');
      fetch(`https://api.v2.sondehub.org/predictions?vehicles=${queryVar}`)
          .then((response) => response.json())
          .then((data) => {
            for(const prediction of data){
              // Match prediction to sonde
              const originalPos = sondesToPredict.filter(sonde=>sonde.serial === prediction.vehicle)[0];
              // Only show predictions if the altitude changes by 20 meters
              // It looks like a lot of orphaned predictions otherwise.
              //console.log(`${prediction.altitude + 20} > ${originalPos.alt}`);
              if(prediction.altitude + 20 > originalPos.alt){
                continue;
              }

              // Marker
              const marker = L.marker([prediction.latitude, prediction.longitude], {
                icon: IgroundPredSonde
              }).addTo(map);
              const d = new Date(prediction.time);
              marker.bindPopup(
                  `${prediction.vehicle}<br>${prediction.altitude}m<br>${d.toLocaleTimeString(
                      "en-us",
                      options
                  )}<br><a href="https://www.google.com/maps/?q=${prediction.latitude},${
                      prediction.longitude
                  }&z=15">Google Maps</a>`
              );

              // Line to original position
              const posArr = [
                  [prediction.latitude, prediction.longitude],
                  [originalPos.lat, originalPos.lon]
              ];
              const line = L.polyline(posArr, {color: 'red', opacity: 0.4}).addTo(map);
            }
          });
    });
};

const map = L.map("map").setView([39, -94], 9);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibXJhcm0iLCJhIjoiY2tyMnY2OTJ2MGllbzJ2cGRicjMzZ3dxOSJ9.LccqGxXDaEnyCJicGBo81Q"
  }
).addTo(map);