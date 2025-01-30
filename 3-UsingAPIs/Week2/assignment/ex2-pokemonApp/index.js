/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    // Fetching the response and turning to json
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  } catch (error) {
    // In case of fetch error
    console.error(`Fetch error from ${url}:`, error);
    throw error;
  }
}

async function fetchAndPopulatePokemons() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // Set the url
  try {
    const data = await fetchData(url);
    const selectElement = document.createElement('select'); // creating the select element
    selectElement.id = 'pokemon-select';
    document.body.appendChild(selectElement);

    // Iterate through data and adding the pokemon as options
    data.results.forEach((pokemon) => {
      // Creating option element and setting the value and textContent according to the pokemon
      const option = document.createElement('option');
      option.value = pokemon.url;
      option.textContent = pokemon.name;
      selectElement.appendChild(option);
    });

    // Adding an event to selectElement
    selectElement.addEventListener('change', (e) => {
      const selectedUrl = e.target.value;
      fetchImage(selectedUrl);
    });
  } catch (error) {
    console.error('Error populating pokemon list:', error);
  }
}

async function fetchImage(url) {
  try {
    const data = await fetchData(url);
    const imageUrl = data.sprites.front_default; // setting the image url based on the data

    // Checking for existing imageElement
    let imageElement = document.getElementById('pokemon-image');

    // If it exist clear the previous image
    if (imageElement) {
      imageElement.remove();
    }

    // If it is not exist create the image and set the properties
    imageElement = document.createElement('img');
    imageElement.id = 'pokemon-image';
    imageElement.src = imageUrl;
    imageElement.alt = data.name;
    document.body.appendChild(imageElement);
  } catch (error) {
    console.error('Error fetching pokemon image:', error);
  }
}

async function main() {
  try {
    await fetchAndPopulatePokemons();
  } catch (error) {
    console.error('Error loading pokemon data:', error);
  }
}

window.addEventListener('load', main);
