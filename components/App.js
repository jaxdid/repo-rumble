const React = require('react')
const ReactRouter = require('react-router-dom');
const { BrowserRouter: Router, Route, Switch } = ReactRouter
const Nav = require('./Nav')
const Home = require('./Home')
const Rumble = require('./Rumble')
const Popular = require('./Popular')
const Results = require('./Results')

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rumble" component={Rumble} />
            <Route path="/rumble/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => {
              return (
                <div className="error-container">
                  <h4 className="error">404</h4>
                  <p>Not found ;(</p>
                </div>
              )
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App