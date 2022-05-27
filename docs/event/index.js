import { getData } from '../modules/getdata.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const renderEventList = (json) => {
  document.getElementById("content").innerHTML =
    `<ul id="events" class="columns is-multiline"></ul>`;

  const events = document.getElementById("events");
  for (const event of json.filter(d => d.name !== '')) {
    const item = document.createElement("li");
    item.className = 'column is-one-quarter';
    item.innerHTML = `
    <div class="card">
      <div class="card-content">
        <h3 class="title is-5">
          <a href="./?id=${event.id}">${event.title}</a>
        </h3>
        <div class="content is-small">
          ${event.startDate} –
          ${event.endDate}
        </div>
      </div>
    </div>`;
    events.appendChild(item);
  }
}

const renderEvent = (json) => {
  if (!id) {
    renderEventList(json);
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
