import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import personService from './services/persons'


const Filter = ({ keyword, changeKeyword }) => (
	<div>
		filter shown with: <input type='text' name='keyword' value={keyword} onChange={changeKeyword} />
	</div>
)


const PersonForm = ({ onSubmit, newName, changeName, newNumber, changeNumber }) => (
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


const PersonLine = ({ person }) => (
	<li>{person.name} {person.number}</li>
)


const Persons = ({ personList }) => (
	<ul>
		{personList.map(person =>
			<PersonLine key={person.name} person={person} />)}
	</ul>
)



const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		personService
			.getAll()
			.then(allPersons => {
				setPersons(allPersons)
			})
	}, [])


	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const handleKeywordChange = (event) => {
		setKeyword(event.target.value);
	}

	const addPerson = (event) => {
		event.preventDefault();
		if (persons.filter(person => person.name == newName).length != 0) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			personService
				.create({ name: newName, number: newNumber })
				.then(newPerson => {
					setPersons(persons.concat(newPerson)),
						setNewName(""),
						setNewNumber("")
				});
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
			<PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange} />
			<h2>Numbers</h2>
			<Persons personList={personList} />
		</div>
	)

}

export default App
