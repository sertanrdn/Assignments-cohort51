/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-5-using-the-vscode-debugger

Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);

  if (
    birth &&
    birth.date &&
    birth.place &&
    birth.place.locationString &&
    birth.place.locationString.en
  ) {
    console.log(`Birth: ${birth.date}, ${birth.place.locationString.en}`);
  } else {
    console.log('Birth information is not available');
  }

  if (
    death &&
    death.date &&
    death.place &&
    death.place.locationString &&
    death.place.locationString.en
  ) {
    console.log(`Death: ${death.date}, ${death.place.locationString.en}`);
  } else {
    console.log('Death information is not available');
  }
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );

    renderLaureates(data.laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();
