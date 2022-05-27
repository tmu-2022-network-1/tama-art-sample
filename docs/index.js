import { getData } from './modules/getdata.js';

const renderVenues = (json) => {
  // document.getElementById("response").value = JSON.stringify(json, null, 2);

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
            <a href="venue/?id=${venue.id}">${venue.name}</a>
          </h3>
          <div class="content is-small">
            ${venue.address}
          </div>
        </div>
      </div>`;
    venues.appendChild(venueNode);
  }
};

getData().then((json) => renderVenues(json));
