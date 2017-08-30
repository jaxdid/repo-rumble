const React = require('react')

class Popular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLang: 'All'
    }

    this.selectLang = this.selectLang.bind(this)
  }

  selectLang (lang) {
    this.setState({
      selectedLang: lang
    })
  }

  render () {
    const languages = [
      'All',
      'JavaScript',
      'Ruby',
      'Java',
      'CSS',
      'Python'
    ]

    return (
      <ul className='languages'>
        {languages.map(lang => {
          return (
            <li
              key={lang}
              style={lang === this.state.selectedLang ? { color: '#d0021b' } : null}
              onClick={this.selectLang.bind(null, lang)}
            >
              {lang}
            </li>
          )
        })}
      </ul>
    )
  }
}

module.exports = Popular