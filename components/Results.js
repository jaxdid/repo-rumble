const React = require('react')
const queryString = require('query-string')
const api = require('../utils/api')

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

    return (
      <div>Results</div>
    )
  }
}

module.exports = Results