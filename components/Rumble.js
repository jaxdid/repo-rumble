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
    this.setState(() => ({ username: value }))
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(this.props.id, this.state.username)
  }

  render () {
    const { username } = this.state
    const { label } = this.props

    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          id="username"
          type="text"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!username}
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
    this.setState(() => ({
      [`${id}Name`]: username,
      [`${id}Avatar`]: `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset (id) {
    this.setState(() => ({
      [`${id}Name`]: '',
      [`${id}Avatar`]: null
    }))
  }

  render () {
    const { url } = this.props.match
    const {
      playerOneName,
      playerTwoName,
      playerOneAvatar,
      playerTwoAvatar
    } = this.state
    
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
                onClick={() => this.handleReset('playerOne')}
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
                onClick={() => this.handleReset('playerTwo')}
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