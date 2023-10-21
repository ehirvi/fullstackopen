import { useState } from 'react'
import './App.css'


const Filter = ({keyword, changeKeyword}) => (
	<div>
		filter shown with: <input type='text' name='keyword' value={keyword} onChange={changeKeyword} />
	</div>
)


const PersonForm = ({onSubmit, newName, changeName, newNumber, changeNumber}) => (
	<form onSubmit={onSubmit}>
		<div>
			name: <input name='name' value={newName} onChange={changeName} />
		</div>
		<div>
			number: <input name='number' value={newNumber} onChange={changeNumber} />
		</div>
		<div>
			<button type='submit'>add</button>
		</div>
	</form>
)


const PersonLine = ({person}) => (
	<li>{person.name} {person.number}</li>
)


const Persons = ({personList}) => (
	<ul>
		{personList.map(person =>
			<PersonLine key={person.name} person={person} />)}
	</ul>
)



const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [keyword, setKeyword] = useState('');

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const handleKeywordChange = (event) => {
		setKeyword(event.target.value);
	}

	const addName = (event) => {
		event.preventDefault();
		if (persons.filter(person => person.name == newName).length != 0) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			setPersons(persons.concat({ name: newName, number: newNumber }));
			setNewName("");
			setNewNumber("");
		}
	}

	const personList = persons.filter(person =>
		person.name.toLowerCase()
			.includes(keyword));

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter keyword={keyword} changeKeyword={handleKeywordChange} />
			<h2>Add a new</h2>
			<PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange} />
			<h2>Numbers</h2>
			<Persons personList={personList} />
		</div>
	)

}

export default App
