const React = require('react')
const Nav = require('./Nav')
const Home = require('./Home')
const Rumble = require('./Rumble')
const Popular = require('./Popular')
const ReactRouter = require('react-router-dom');
const { BrowserRouter: Router, Route, Switch } = ReactRouter

class App extends React.Component {
  render () {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/rumble" component={Rumble} />
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