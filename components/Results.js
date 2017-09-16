const React = require('react')
const { Link } = require('react-router-dom')
const queryString = require('query-string')
const PropTypes = require('prop-types')
const api = require('../utils/api')
const PlayerPreview = require('./PlayerPreview')

function Profile ({ info }) {
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        {}
        {}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player (props) {
  return (
    <div className="column">
      <label>{props.label}</label>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired
}

class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount () {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search)

    api.rumble([playerOneName, playerTwoName])
      .then(results => {
        if (results === null) {
          this.setState({
            error: 'Something went wrong. Check that both users exist on GitHub.',
            loading: false
          })
        }

        this.setState({
          winner: results[0],
          loser: results[1],
          error: null,
          loading: false
        })
      })
  }
  
  render () {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return (
        <p>Loading...</p> 
      )
    }

    if (error) {
      return (
        <div>
          <h4>{error}</h4>
          <Link to="/rumble">reset</Link>
        </div>
      )
    }

    return (
      <div className="row">
        <Player
          label="Winner"
          profile={winner.profile}
          score={winner.score}
        />
        <Player
          label="Loser"
          profile={loser.profile}
          score={loser.score}
        />
      </div>
    )
  }
}

module.exports = Results