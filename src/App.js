import { useEffect, useState } from "react";
import NotesList from "./Components/NotesList";
import { nanoid } from "nanoid";
import Search from "./Search";
import Header from "./Components/Header";
function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "this is my first note",
      date: "13/05/2021",
    },
    {
      id: nanoid(),
      text: "this is my second note",
      date: "14/07/2021",
    },
    {
      id: nanoid(),
      text: "this is my third note",
      date: "20/12/2021",
    },
    {
      id: nanoid(),
      text: "this is my fourth note",
      date: "20/12/2021",
    },
  ]);
  const [searchText, setSearchText] = useState("");
  const [darkmode, setDarkMode] = useState(false);

  useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };
  return (
    <div className={`${darkmode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

export default App;
