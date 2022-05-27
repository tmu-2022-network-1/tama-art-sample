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
    document.getElementById("title").textContent = venue.name;
    document.getElementById("content").innerHTML = `
    ${venue.address}`;
  };
}

getData().then((json) => renderVenue(json));

const map = L.map('map').setView([51.505, -0.09], 13);