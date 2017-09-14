const React = require('react')
const { Link } = require('react-router-dom')
const queryString = require('query-string')
const PropTypes = require('prop-types')
const api = require('../utils/api')

function Player (props) {
  return (
    <div>
      <h1 className="label">{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>{props.score}</h3>
      {/* {JSON.stringify(props.profile)} */}
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
        <p>Loading</p> 
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