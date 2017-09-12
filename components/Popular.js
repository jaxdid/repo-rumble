const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')

const LanguageSelector = ({ selectedLanguage, onSelect }) => {
  const languages = [
    'All',
    'JavaScript',
    'Ruby',
    'Java',
    'CSS',
    'Python'
  ]

  return (
    <ul className="languages">
      {languages.map(language => {
        return (
          <li
            key={language}
            style={language === selectedLanguage ? { color: '#d0021b' } : null}
            onClick={onSelect.bind(null, language)}
          >
            {language}
          </li>
        )
      })}
    </ul>
  )
}

LanguageSelector.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const RepoGrid = ({ repos }) => {
  return (
    <ul className="popular-list">
      {repos.map((repo, index) => {
        return (
          <li
            key={repo.id}
            className="popular-item"
          >
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.selectLanguage = this.selectLanguage.bind(this)
  }

  componentDidMount () {
    this.selectLanguage(this.state.selectedLanguage)
  }

  selectLanguage (language) {
    this.setState({
      selectedLanguage: language,
      repos: null
    })

    api.fetchPopularRepos(language)
      .then(repos => {
        this.setState({
          repos
        })
      })
  }

  render () {
    return (
    <div>
      <LanguageSelector
        selectedLanguage={this.state.selectedLanguage}
        onSelect={this.selectLanguage}
      />
      {!this.state.repos
        ? <p>LOADING ...</p>
        : <RepoGrid repos={this.state.repos} />
      }
    </div>
    )
  }
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

module.exports = Popular