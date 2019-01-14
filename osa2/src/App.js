import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      newNote: 'uusi muistiinpano...',
      showAll: true,
      error: null
    }
  }

  componentDidMount() {    
    noteService
      .getAll()
      .then(response => {
        this.setState({
          notes: response
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
      important: Math.random() > 0.5
    }

    noteService
    .create(noteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      })
  }

  handleNoteChange = (event) => {
    this.setState({newNote: event.target.value})
  }

  toggleShowAll = () => {
    this.setState({showAll: !this.state.showAll})
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
      .update(id, changedNote)
      .then(changedNoteResponse => {
        this.setState({
          notes: this.state.notes.map(note => note.id !== id ? note : changedNoteResponse)
        })
      })
      .catch(error => {
        
        this.setState(
          {
            error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
            notes: this.state.notes.filter(n => n.id !== id) 
          })
          setTimeout(() => {
            this.setState({error: null})
          }, 5000)
      })
    }
  }
  
  render() {

    const notesToShow = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important)
    const lable = this.state.showAll ? 'only important notes' : 'all notes' 

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <Notification message={this.state.error}/>
        <div>
          <button onClick={this.toggleShowAll}>Show {lable}</button>
        </div>
        <ul>
          {notesToShow.map(note =>
          <Note 
            key={note.id}
            note={note}
            toggleImportance={this.toggleImportanceOf(note.id)}
          />)}
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