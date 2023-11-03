import { useEffect, useState } from 'react'
import './App.css'
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


const PersonLine = ({ person, deletePerson }) => (
	<li>{person.name} {person.number}<button onClick={() => deletePerson(person)}>delete</button></li>
)


const Persons = ({ personList, deletePerson }) => (
	<ul>
		{personList.map(person =>
			<PersonLine key={person.name} person={person} deletePerson={deletePerson} />)}
	</ul>
)



const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [keyword, setKeyword] = useState('');

	useEffect(() => getPersonList, []);

	const getPersonList = () => {
		personService
			.getAll()
			.then(allPersons =>
				setPersons(allPersons))
	}


	const handleNameChange = (event) => {
		setNewName(event.target.value);
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	}

	const handleKeywordChange = (event) => {
		setKeyword(event.target.value);
	}

	const personAlreadyExists = () => {
		return (persons.filter(person =>
			person.name.toLowerCase() == newName.toLowerCase()).length !== 0 ? true : false)
	}

	const getPersonId = (personName) => {
		return (persons.filter(person =>
			person.name.toLowerCase() == personName.toLowerCase())[0].id)
	}

	const addPerson = (event) => {
		event.preventDefault();
		if (personAlreadyExists()) {
			updatePerson();
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


	const deletePerson = (deletedPerson) => {
		if (window.confirm(`Delete ${deletedPerson.name}?`)) {
			personService
				.remove(deletedPerson.id)
			setPersons(persons.filter(person => person.id !== deletedPerson.id));
		}
	}


	const updatePerson = () => {
		if (window.confirm(`${newName} is already added to the phonebook, replace old number with a new one?`)) {
			personService
				.update(getPersonId(newName), { name: newName, number: newNumber })
				.then(getPersonList)
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
			<Persons personList={personList} deletePerson={deletePerson} />
		</div>
	)

}

export default App
