const React = require('react')
const { Link } = require('react-router-dom')

class Home extends React.Component {
  render () {
    return (
      <div className="home-container">
        <h1>Repo Rumble</h1>
        <h2>Battle your friends and browse popular repos.</h2>
        <Link className="button" to="/rumble">
          Rumble!
        </Link>
      </div>
    )
  }
}

module.exports = Home