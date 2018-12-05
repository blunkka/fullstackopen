import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
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
