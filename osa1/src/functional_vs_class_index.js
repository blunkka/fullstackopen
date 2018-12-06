import React from 'react';
import ReactDOM from 'react-dom';

/* funkitionaalinen komponentti
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}
*/

/* Luokkasyntaksinen komponentti */
class Hello extends React.Component {

  render() {
    const {name, age} = this.props
    const bornYear = () => new Date().getFullYear() - age
    return (
      <div>
        <p>
          Hello {name}, you are {age} years old <br />
          So you were probably born {bornYear()}
        </p>
      </div>
    )
  }
}
const App = () => {
  const ika = 13
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Jeppe" age="26" />
      <Hello name="foobaa" age={ika} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
