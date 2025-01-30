/*
Full description at:https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-6-using-the-browser-debugger
*/

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  return response.json();
}

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function addTableRow(table, label, value) {
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: label });
  createAndAppend('td', tr, { text: value });
}

function renderLaureate(ul, { knownName, birth, death }) {
  const li = createAndAppend('li', ul);
  const table = createAndAppend('table', li);
  addTableRow(table, 'Name', knownName.en);

  const birthDate = birth && birth.date ? birth.date : 'Unknown birth date';
  const birthPlace =
    birth && birth.place && birth.place.locationString
      ? birth.place.locationString.en
      : 'Unknown birth place';
  addTableRow(table, 'Birth', `${birthDate}, ${birthPlace}`);

  const deathDate = death && death.date ? death.date : 'Unknown death date';
  const deathPlace =
    death && death.place && death.place.locationString
      ? death.place.locationString.en
      : 'Unknown death place';
  addTableRow(table, 'Death', `${deathDate}, ${deathPlace}`);
}

function renderLaureates(laureates) {
  const ul = createAndAppend('ul', document.body);
  laureates.forEach((laureate) => renderLaureate(ul, laureate));
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'https://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(data.laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

window.addEventListener('load', fetchAndRender);
