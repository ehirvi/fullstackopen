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


const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}

	return (
		<div className={message.status}>
			{message.text}
		</div>
	)
}


const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [keyword, setKeyword] = useState('');
	const [notificationMessage, setNotificationMessage] = useState(null);

	useEffect(() => getPersonList, []);

	const getPersonList = () => {
		personService
			.getAll()
			.then(allPersons => setPersons(allPersons))
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

	const personAlreadyExists = (name) => {
		return (persons.filter(person =>
			person.name.toLowerCase() == name.toLowerCase()).length !== 0 ? true : false)
	}

	const getPersonId = (name) => {
		return (persons.filter(person =>
			person.name === name)[0].id)
	}

	const addPerson = (event) => {
		event.preventDefault();
		if (personAlreadyExists(newName)) {
			updatePerson()
		} else {
			personService
				.create({ name: newName, number: newNumber })
				.then(newPerson => {
					setPersons(persons.concat(newPerson)),
						showNotification(`Added ${newPerson.name}`, "success"),
						setNewName(""),
						setNewNumber("")
				});
		}
	}


	const deletePerson = (deletedPerson) => {
		if (window.confirm(`Delete ${deletedPerson.name}?`)) {
			personService
				.remove(deletedPerson.id)
				.then(res => showNotification(`Removed ${deletedPerson.name}`, "success"))
				.catch(error => showNotification(`${deletedPerson.name} has already been deleted`, "error"))
			getPersonList()
		}
	}


	const updatePerson = () => {
		const updatedPerson = { name: newName, number: newNumber }
		if (window.confirm(`${updatedPerson.name} is already added to the phonebook, replace old number with a new one?`)) {
			personService
				.update(getPersonId(updatedPerson.name), updatedPerson)
				.then(res => {
					showNotification(`Updated ${updatedPerson.name}`, "success"),
						setNewName(""),
						setNewNumber("")
				})
				.catch(error => showNotification(`${updatedPerson.name} has already been deleted`, "error"))
			getPersonList()
		}
	}

	const showNotification = (text, status) => {
		setNotificationMessage({ text, status })
		setTimeout(() => setNotificationMessage(null), 5000)
	}

	const personList = persons.filter(person =>
		person.name.toLowerCase()
			.includes(keyword));


	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={notificationMessage} />
			<Filter keyword={keyword} changeKeyword={handleKeywordChange} />
			<h2>Add a new</h2>
			<PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} changeName={handleNameChange} changeNumber={handleNumberChange} />
			<h2>Numbers</h2>
			<Persons personList={personList} deletePerson={deletePerson} />
		</div>
	)

}

export default App
