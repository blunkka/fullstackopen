import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 10
    }
  }

  //komponentin metodi
  componentHandler = () => this.setState({value: 0}) 

  render(){
    const handler = () => this.setState({value: 0})

    const hello = (who) => {
      return () => console.log(who)
    }

    const setToValue = (newValue) => () => { 
      this.setState({ value: newValue })
    }

    return (
      <div>
        {this.state.value}
        <button onClick={handler}>nappi</button>
        <button onClick={this.componentHandler}>nappi</button>
        <button onClick={setToValue(5)}>Aseta arvoksi 5</button>
        <button onClick={hello('Jeppe')}>Hello</button>
        <button onClick={hello('Aku')}>Hello</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)