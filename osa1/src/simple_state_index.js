import React from 'react';
import ReactDOM from 'react-dom';

const Display = ({counter}) => <div>{counter}</div>
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 1
    }
  }

  kasvataYhdella = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1
    }));
  }

  nollaa = () => {
    this.setState((prevState) => ({
      counter: 0
    }));
  }

  //currying-tekniikka
  asetaArvoon = (arvo) => {
    return () => {
      this.setState({ counter: arvo })
    }
  }

  render() {
    return (
      <div>
        <Display counter={this.state.counter} />
        <Button handleClick={this.kasvataYhdella} text={'Push tha button'} />
        <button onClick={this.nollaa}>
          nollaa
        </button>
        <button onClick={this.asetaArvoon(this.state.counter + 1)}>
            Plus
          </button>
        <button onClick={this.asetaArvoon(10)}>
          asenta arvoon 10
        </button>
      </div>
      
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)