const React = require('react')
const PropTypes = require('prop-types')
const { Link } = require('react-router-dom')
const PlayerPreview = require('./PlayerPreview')

class PlayerInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const value = event.target.value
    this.setState(function () {
      return {
        username: value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.props.id, this.state.username)
  }

  render () {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          type="text"
          placeholder="github username"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          READY
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Rumble extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneAvatar: null,
      playerTwoAvatar: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit (id, username) {
    this.setState(() => {
      const newState = {}
      newState[`${id}Name`] = username
      newState[`${id}Avatar`] = `https://github.com/${username}.png?size=200`
      return newState
    })
  }

  handleReset (id) {
    this.setState(() => {
      const newState = {}
      newState[`${id}Name`] = ''
      newState[`${id}Avatar`] = null
      return newState
    })
  }

  render () {
    const { url } = this.props.match
    const playerOneName = this.state.playerOneName
    const playerTwoName = this.state.playerTwoName
    const playerOneAvatar = this.state.playerOneAvatar
    const playerTwoAvatar = this.state.playerTwoAvatar
    
    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          }
          
          {playerOneAvatar !== null &&
            <PlayerPreview
              avatar={playerOneAvatar}
              username={playerOneName}
            >
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerOne')}
              >
                reset
              </button>
            </PlayerPreview>
          }
          
          {!playerTwoName &&
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          }

          {playerTwoAvatar !== null &&
            <PlayerPreview
              avatar={playerTwoAvatar}
              username={playerTwoName}
            >
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerTwo')}
              >
                reset
              </button>
            </PlayerPreview>
          }
        </div>

        {playerOneAvatar && playerTwoAvatar &&
          <Link
            className="button"
            to={{
              pathname: `${url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}
          >
            Rumble!
          </Link>
        }
      </div>
    )
  }
}

module.exports = Rumble