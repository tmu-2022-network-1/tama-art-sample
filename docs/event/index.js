import { getData } from '../modules/getdata.js';
import { DateTime } from "../modules/luxon.min.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderEventList = (json) => {
  document.getElementById("content").innerHTML =
    `<ul id="events" class="columns is-multiline"></ul>`;

  const events = document.getElementById("events");
  for (const event of json.filter(d => d.name !== '')) {
    const startDate = DateTime.fromJSDate(new Date(event.startDate));
    const endDate = DateTime.fromJSDate(new Date(event.endDate));
    const thumbnail = event.thumbnail !== '' ? event.thumbnail : '../images/placeholder.png';
    const item = document.createElement("li");
    item.className = 'column is-one-quarter';
    item.innerHTML = `
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
          <a href="event/?id=${event.id}" class="event-link">
            <figure class="image is-square is-one-quarter poster" style="background-image:url(${thumbnail})">
            </figure>
          </a>
        </div>
      </div>`;
    events.appendChild(item);
  }
}

const renderEvent = (json) => {
  if (!id) {
    renderEventList(json);
    const eventLinks = document.querySelectorAll('.event-link');
    for (const eventLink of eventLinks) {
      eventLink.onmouseover = (e) => {
        document.querySelector('.preview').style.backgroundImage = e.target.style.backgroundImage;
      };
    }
    return;
  }
  const event = json.find((d) => d.id === id);
  if (event) {
    document.title = `${event.title} | tama.potari`;
    document.getElementById("content").innerHTML = `
      <h1>${event.title}</h1>
      <a href="../venue/?id=${event.venueId}">${event.venue}</a>
      <figure>
        <img src="${event.thumbnail}" alt="${event.title}">
      </figure>`;
  }
};

getData('events').then((json) => renderEvent(json));
