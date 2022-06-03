import { getData } from '../modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderVenueList = (json) => {
  document.getElementById("content").innerHTML =
    `<ul id="venues" class="columns is-multiline"></ul>`;

  const venues = document.getElementById("venues");
  for (const venue of json.filter(d => d.name !== '')) {
    const venueNode = document.createElement("li");
    venueNode.className = 'column is-one-quarter';
    venueNode.innerHTML = `
    <div class="card">
      <div class="card-content">
        <h3 class="title is-5">
          <a href="./?id=${venue.id}">${venue.name}</a>
        </h3>
        <div class="content is-small">
          ${venue.address}
        </div>
        <div class="content is-small distance" data-coords="${venue.lon},${venue.lat}">
        </div>
      </div>
    </div>`;
    venues.appendChild(venueNode);
  }
}

const renderVenue = (json) => {
  if (!id) {
    renderVenueList(json);
    return;
  }

  const venue = json.find((d) => d.id === id);
  if (venue) {
    document.title = `${venue.name} | tama.potari`;
    document.getElementById("content").innerHTML = `
    <h1 class="title is-1">${venue.name}</h1>
    ${venue.address}<br>
    <a href="${venue.url}" tareget="_blank">Website</a>`;
    renderMap(venue);
  };
}

const renderMap = (venue) => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic3VnaTIwMDAiLCJhIjoiY2l3anY3cWgzMDAzcTJ0cDJpdG1sZGZ3biJ9.kmev1_-7umt2LZrAMUJiyA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/sugi2000/ckbbk7d4z0bsh1imqz84ac23a', // style URL
    center: [venue.lon, venue.lat], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });
  // Create a new marker.
  const marker = new mapboxgl.Marker()
    .setLngLat([venue.lon, venue.lat])
    .setPopup(new mapboxgl.Popup().setHTML(`<h1>${venue.name}</h1>`)) // add popup
    .addTo(map);
  marker.togglePopup(); // toggle popup open or closed
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');
}

getData().then((json) => renderVenue(json));

// const map = L.map('map').setView([51.505, -0.09], 13);

document.getElementById('get-location').onclick = () => {
  const success = (position) => {
    // alert(position.coords.latitude, position.coords.longitude);
    const from = turf.point([position.coords.longitude, position.coords.latitude]);
    const elements = document.querySelectorAll('.distance');
    for (const element of elements) {
      const to = turf.point(element.getAttribute('data-coords').split(','));
      const distance = turf.distance(from, to);
      element.textContent = `現在地から${distance.toFixed(1)}km`;
    }

  }
  const error = () => {
    console.log('get location error');
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}