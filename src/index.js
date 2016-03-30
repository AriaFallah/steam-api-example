import fetch from 'node-fetch'
import inquirer from 'inquirer'
import { APIKEY } from '../auth.json'

const baseURL = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/'

inquirer.prompt([{
  type: 'input',
  name: 'steamid',
  message: 'Enter SteamID of user'
}], ({ steamid }) => {
  const queryParams = makeQueryParams({ key: APIKEY, steamid, format: 'json' })
  fetch(`${baseURL}?${queryParams}`)
    .then(parseJSON)
    .then((data) => {
      for (const game of data.response.games) {
        console.log(game)
      }
    })
})

function makeQueryParams(obj) {
  const params = []
  Object.keys(obj).forEach((key) => params.push(`${key}=${obj[key]}`))
  return params.join('&')
}

function parseJSON(data) {
  return data.json()
}
