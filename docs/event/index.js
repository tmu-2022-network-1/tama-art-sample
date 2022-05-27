const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getData = async () => {
  const endpoint =
    "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec?sheet=events";
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
};

const renderEvent = (json) => {
  if (id) {
    const event = json.find((d) => d.id === id);
    if (event) {
      document.getElementById("title").textContent = event.title;
    }
    document.getElementById("response").value = JSON.stringify(event, null, 2);

    document.getElementById("content").innerHTML = `
    ${event.venue}`;
  } else {
    document.getElementById("response").value = JSON.stringify(json, null, 2);
  }
};

getData().then((json) => renderEvent(json));
