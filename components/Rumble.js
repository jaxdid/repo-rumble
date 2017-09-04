const React = require('react')
const PropTypes = require('prop-types')

function PlayerPreview (props) {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={`Avatar for ${props.username}`}
        />
        <h2 className="username">@{props.username}</h2>
      </div>
      <button
        className="reset"
        onClick={props.onReset.bind(null, id)}
      >
        reset
      </button>
    </div>
  )
}

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
  }

  handleSubmit (id, username) {
    this.setState(function () {
      const newState = {}
      newState[`${id}Name`] = username
      newState[`${id}Avatar`] = `https://github.com/${username}.png?size=200`
      return newState
    })
  }

  render () {
    const playerOneName = this.state.playerOneName
    const playerTwoName = this.state.playerTwoName
    
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
          {!playerTwoName &&
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          }
        </div>
      </div>
    )
  }
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

module.exports = Rumble