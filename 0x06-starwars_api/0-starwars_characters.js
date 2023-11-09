#!/usr/bin/node
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

      console.log(`Characters in ${movieData.title}:`);
      
      // Fetch and print character names
      charactersUrl.forEach((characterUrl, index) => {
        request(characterUrl, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const characterData = JSON.parse(body);
            console.log(`${index + 1}. ${characterData.name}`);
          } else {
            console.error(`Error fetching character data: ${error}`);
          }
        });
      });
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
  console.log('Please provide a movie ID as a command line argument (e.g., node script.js 3)');
}
