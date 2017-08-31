const React = require('react')
const PropTypes = require('prop-types')

class PlayerInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  render () {
    return (
      <form action=""></form>
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

    this.handleSubmit.bind(this)
  }

  handleSubmit (id, username) {
    this.setState(() => {
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

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

module.exports = Rumble