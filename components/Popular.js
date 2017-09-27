const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')
const Loading = require('./Loading')

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
      {languages.map(language => (
        <li
          key={language}
          style={language === selectedLanguage ? { color: '#d0021b' } : null}
          onClick={() => onSelect(language)}
        >
          {language}
        </li>
      ))}
    </ul>
  )
}

LanguageSelector.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const RepoGrid = ({ repos }) => (
  <ul className="popular-list">
    {repos.map(({ name, owner, html_url, stargazers_count }, index) => (
      <li
        key={name}
        className="popular-item"
      >
        <div className="popular-rank">#{index + 1}</div>
        <ul className="space-list-items">
          <li>
            <img
              className="avatar"
              src={owner.avatar_url}
              alt={`Avatar for ${owner.login}`}
            />
          </li>
          <li><a href={html_url}>{name}</a></li>
          <li>@{owner.login}</li>
          <li>{stargazers_count} stars</li>
        </ul>
      </li>
    ))}
  </ul>
)

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
      .then(repos => this.setState({ repos }))
  }

  render () {
    const { selectedLanguage, repos } = this.state

    return (
      <div>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelect={this.selectLanguage}
        />
        {!repos
          ? <Loading message="Fetching" />
          : <RepoGrid repos={repos} />
        }
      </div>
    )
  }
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

module.exports = Popular