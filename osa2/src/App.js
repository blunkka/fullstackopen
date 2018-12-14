import React from 'react'
import Note from './components/Note'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      notes: props.notes
    }
  }

  //Tapahtumankäsittelijä kutsuu heti tapahtuman metodia event.preventDefault()
  //jolla se estää lomakkeen lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi
  //mm. sivun uudelleenlatautumisen.
  addNote = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
  }
  
  render() {
    return (
      <div>
        <h1>Muistiinpanot</h1>
        <ul>
          {this.state.notes.map(note=><Note key={note.id} note={note}/>)}
        </ul>
        <form onSubmit={this.addNote}>
          <input />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )    
  }
}

export default App