const axios = require('axios')

module.exports = {
  fetchPopularRepos: function (language) {
    const encodedUri = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return axios.get(encodedUri)
      .then(response => {
        return response.data.items
      })
  }
}