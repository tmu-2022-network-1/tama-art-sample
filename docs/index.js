import { getData } from './modules/getdata.js';
import { DateTime } from "./modules/luxon.min.js";

const renderEvents = (json) => {

  console.dir(json);

  document.getElementById("content").innerHTML =
    `<ul id="events" class="columns is-multiline"></ul>`;

  const venues = document.getElementById("events");

  for (const event of json.filter(d => d.title !== '')) {
    const startDate = DateTime.fromJSDate(new Date(event.startDate));
    const endDate = DateTime.fromJSDate(new Date(event.endDate));
    const thumbnail = event.thumbnail !== '' ? event.thumbnail : 'images/placeholder.png';

    const venueNode = document.createElement("li");
    venueNode.className = 'column is-one-quarter';
    venueNode.innerHTML = `
      <div class="card">
      <div class="card-content">
          <h3 class="title is-5">
            <a href="event/?id=${event.id}">${event.title}</a>
          </h3>
          <div class="content">
          ${event.venue}
          <div>
          <div class="content is-small">
            ${startDate.setLocale('ja').toFormat('yyyy.MM.dd')} -
            ${endDate.setLocale('ja').toFormat('yyyy.MM.dd')}
          </div>
            <a href="event/?id=${event.id}">
            <figure class="image is-square is-one-quarter poster" style="background-image:url(${thumbnail})">
            <!--<div style="background-image:url(${thumbnail})"></div>-->
            <!--<img class="poster" src="${event.thumbnail}" alt="${event.title}">-->
          </figure>
          </a>
        </div>
      </div>`;
    venues.appendChild(venueNode);
  }
};

getData('events').then((json) => renderEvents(json));
