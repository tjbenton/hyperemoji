const emojilib = require('emojilib')

let term

exports.decorateTerm = (Term, { React }) => class extends React.Component {
  render() {
    return React.createElement(Term, Object.assign({}, this.props, {
      onTerminal: t => 
        term = t
    }))
  }
}

exports.middleware = (store) => (next) => (action) => {
  if([ 'SESSION_ADD_DATA', 'SESSION_PTY_DATA' ].includes(action.type)){
    action.data = action.data.replace(/:([a-z0-9_+-]+):/ig, (match, emoji) => {
      // if the emoji exist and has a char then use it, else return the original match
      return (emojilib.lib[emoji.toLowerCase()] || {}).char || match
    })
  }

  next(action)
}
