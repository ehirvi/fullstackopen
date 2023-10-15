import { useState } from 'react'
import './App.css'


const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>


const Display = ({ text, count }) => <p>{`${text} ${count}`}</p>


const Statistics = ({good, neutral, bad}) => {

	let total = good + neutral + bad;
	let average = (good * 1 + bad * -1) / total;
	let positive = (good / total) * 100;

	return (
		<>
			<h2>statistics</h2>
			<Display text={"good"} count={good} />
			<Display text={"neutral"} count={neutral} />
			<Display text={"bad"} count={bad} />
			<Display text={"all"} count={total} />
			<Display text={"average"} count={average} />
			<Display text={"positive"} count={positive + " %"} />

		</>
	)
}


function App() {

	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);


	return (
		<>
			<h2>give feedback</h2>
			<Button text={"good"} handleClick={() => setGood(good + 1)} />
			<Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
			<Button text={"bad"} handleClick={() => setBad(bad + 1)} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	)
}

export default App
