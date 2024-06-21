import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter
      <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter