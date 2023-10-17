import { useState } from 'react'
import './App.css'


const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>


const Display = ({ text, count }) => <p>{`${text} ${count}`}</p>


const Statistics = ({ good, neutral, bad, total, average, positive }) => {

	if (total == 0)
		return (
			<>
				<h2>statistics</h2>
				<p>No feedback given</p>
			</>
		)

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
	const [total, setTotal] = useState(0);
	const [average, setAverage] = useState(0);
	const [positive, setPositive] = useState(0);

	const handleGood = () => {
		setGood(good + 1);
		setTotal(total + 1);
		setAverage(((good + 1) * 1 + bad * -1) / (total + 1));
		setPositive((good + 1) / (total + 1) * 100);
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1);
		setTotal(total + 1);
		setAverage((good * 1 + bad * -1) / (total + 1));
		setPositive(good / (total + 1) * 100);
	}

	const handleBad = () => {
		setBad(bad + 1);
		setTotal(total + 1);
		setAverage((good * 1 + (bad + 1) * -1) / (total + 1));
		setPositive(good / (total + 1) * 100);
	}


	return (
		<>
			<h2>give feedback</h2>
			<Button text={"good"} handleClick={handleGood} />
			<Button text={"neutral"} handleClick={handleNeutral} />
			<Button text={"bad"} handleClick={handleBad} />
			<Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
		</>
	)
}

export default App
