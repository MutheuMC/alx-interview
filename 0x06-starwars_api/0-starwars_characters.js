const request = require('request');

// Base URL for the Star Wars API
const baseUrl = 'https://swapi.dev/api';

// Function to fetch characters from a specific movie
function fetchCharactersFromMovie(movieId) {
  const movieUrl = `${baseUrl}/films/${movieId}/`;

  request(movieUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const movieData = JSON.parse(body);
      const charactersUrl = movieData.characters;

      // Function to fetch character data and print names
      function fetchCharacterData(index) {
        if (index >= charactersUrl.length) {
          // All characters have been fetched and printed
          return;
        }
        const characterUrl = charactersUrl[index];
        request(characterUrl, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const characterData = JSON.parse(body);
            console.log(characterData.name);
            // Fetch the next character
            fetchCharacterData(index + 1);
          } else {
            console.error(`Error fetching character data: ${error}`);
          }
        });
      }
      fetchCharacterData(0);
    } else {
      console.error(`Error fetching movie data: ${error}`);
    }
  });
}

// Command line argument for movie ID
const movieId = process.argv[2];

if (movieId) {
  fetchCharactersFromMovie(movieId);
} else {
  console.log('Please provide a movie ID as a command line argument ');
}
