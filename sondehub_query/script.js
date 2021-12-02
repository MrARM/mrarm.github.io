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

const query = () => {
  // Reset State
  map.eachLayer((layer) => {
    // Don't remove the tiles
    if (layer.getPopup() !== undefined) {
      layer.remove();
    }
  });

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
      for (const [ser, dat] of Object.entries(data)) {
        // SH seems to return anything, I only want things nearish the ground.
        if (dat.alt > 5000) {
          continue;
        }
        console.log(`Adding ${ser}`);
        const d = new Date(dat.time_received);

        console.log(`${dat.type}:${ser}<br>${dat.alt}m<br>${d}`);
        const marker = L.marker([dat.lat, dat.lon]).addTo(map);
        if (dat.alt < 1500) {
          // Likely on the ground, show green icon
          marker.setIcon(IgroundSonde);
        } else {
          marker.setIcon(IflySonde);
        }
        marker.bindPopup(
          `${dat.type}:${ser}<br>${dat.alt}m<br>${d.toLocaleTimeString(
            "en-us",
            options
          )}<br><a href="https://www.google.com/maps/?q=${dat.lat},${
            dat.lon
          }&z=15">Google Maps</a><br><button onClick="genPred(${ser})">Predict</button>`
        );
      }
    });
};

const genPred = (sondeId) => {
  fetch(`https://api.v2.sondehub.org/predictions?vehicles=${sondeId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // Check to make sure the sonde exists
        const sonde = data[0];
        const marker = L.marker([sonde.latitude, sonde.longitude], {
          icon: IgroundPredSonde
        }).addTo(map);
        const d = new Date(sonde.time);
        marker.bindPopup(
          `${sondeId}<br>${sonde.altitude}m<br>${d.toLocaleTimeString(
            "en-us",
            options
          )}<br><a href="https://www.google.com/maps/?q=${sonde.latitude},${
            sonde.longitude
          }&z=15">Google Maps</a>`
        );
      }
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