const Total = ({ exercises }) => <li style={{ fontWeight: 'bold' }}>total of {exercises} exercises</li>


const Part = ({ name, exercises }) => <li>{name} {exercises}</li>


const Header = ({ name }) => <h2>{name}</h2>


const Content = ({ parts }) => {

	return (
		<ul>
			{parts.map(part =>
				<Part key={part.id} name={part.name} exercises={part.exercises} />)}
			<Total exercises={parts.reduce((sum, part) => sum + part.exercises, 0)} />
		</ul>
	)
}


const Course = ({ course }) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</>
	)
}


export default Course