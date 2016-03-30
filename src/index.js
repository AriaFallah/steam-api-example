// The dependencies for the application

import fetch from 'node-fetch' // used to make AJAX requests according to fetch spec
import inquirer from 'inquirer' // used to query the person running the script
import { APIKEY } from '../auth.json' // get the API key from the json file

// The URL we're going to be querying
const baseURL = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'

// Prompt the user for the steamid
inquirer.prompt([{
  type: 'input',
  name: 'steamid',
  message: 'Enter SteamID of user'
}], ({ steamid }) => {
  // Get our query params
  const queryParams = makeQueryParams({ key: APIKEY, steamid, format: 'json' })

  // Make an ajax request to the url with the query params
  fetch(`${baseURL}?${queryParams}`)
    .then(parseJSON) // get the JSON response
    .then((data) => {
      // For each loop for array of returned games
      for (const game of data.response.games) {
        console.log(game)
      }
    })
})

// Turn an obj {} into a query string in the form key=1&key2=2&key3=3
function makeQueryParams(obj) {
  const params = []
  Object.keys(obj).forEach((key) => params.push(`${key}=${obj[key]}`))
  return params.join('&')
}

// Get JSON response from fetch call
function parseJSON(data) {
  return data.json()
}
