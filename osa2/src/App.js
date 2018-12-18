import React from 'react'
import Note from './components/Note'
import axios from 'axios'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      newNote: 'uusi muistiinpano...',
      showAll: true
    }
  }

  componentDidMount() {    
    axios.get('http://localhost:3001/notes').then(response => {
      const notes = response.data
      this.setState({
        notes: notes
      })
    })
  }

  //Tapahtumankäsittelijä kutsuu heti tapahtuman metodia event.preventDefault()
  //jolla se estää lomakkeen lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi
  //mm. sivun uudelleenlatautumisen.
  addNote = (event) => {
    event.preventDefault()
    console.log('nappia painettu')

    const noteObject = {
      content: this.state.newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
      id: this.state.notes.length + 1
    }

    const notes = this.state.notes.concat(noteObject)

    this.setState({
      notes: notes,
      newNote: ''
    })

    console.log(event.target)
  }

  handleNoteChange = (event) => {
    console.log('handleNoteChange: ' + event.target.value)
    this.setState({newNote: event.target.value})
  }

  toggleShowAll = () => {
    this.setState({showAll: !this.state.showAll})
  }
  
  render() {

    const notesToShow = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important)
    const lable = this.state.showAll ? 'only important notes' : 'all notes' 

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <div>
          <button onClick={this.toggleShowAll}>Show {lable}</button>
        </div>
        <ul>
          {notesToShow.map(note=><Note key={note.id} note={note}/>)}
        </ul>
        <form onSubmit={this.addNote}>
          <input value={this.state.newNote} onChange={this.handleNoteChange}/>
          <button type="submit">tallenna</button>
        </form>
      </div>
    )    
  }
}

export default App