const axios = require('axios')

function getProfile (username) {
  return axios.get(`https://api.github.com/users/${username}`)
    .then(user => {
      return user.data
    })
}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
}

function getStarCount ({ data }) {
  return data.reduce((count, repo) => {
    return count + repo.stargazers_count
  }, 0)
}

function calculateScore ({ followers }, repos) {
  return (followers * 3) + getStarCount(repos)
}

function handleError (error) {
  console.error(error)
  return null
}

function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(response => {
    const profile = response[0]
    const repos = response[1]

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort((playerOne, playerTwo) => {
    return playerTwo.score - playerOne.score
  })
}

module.exports = {
  fetchPopularRepos: function (language) {
    const encodedUri = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return axios.get(encodedUri)
      .then(response => {
        return response.data.items
      })
  },
  rumble: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  }
}