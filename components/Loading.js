const React = require('react')
const PropTypes = require('prop-types')
const styles = {
  message: {
    textAlign: 'center',
    fontSize: 35
  }
}


class Loading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: props.message
    }
  }
  
  componentDidMount () {
    const stopper = `${this.props.message}...`

    this.interval = window.setInterval(function () {
      this.state.message === stopper
      ? this.setState({ message: this.props.message })
      : this.setState(prev => {
        return { message: `${prev.message}.` }
      })
    }.bind(this), this.props.animationSpeed)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  render () {
    return (
      <p style={styles.message}>
        {this.state.message}
      </p>
    )
  }
}

Loading.defaultProps = {
  message: 'Loading',
  animationSpeed: 300
}

Loading.propTypes = {
  message: PropTypes.string.isRequired,
  animationSpeed: PropTypes.number.isRequired
}

module.exports = Loading