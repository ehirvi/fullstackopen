import axios from "axios"

const URL = "http://localhost:3001/persons";

const getAll = () => (
    axios
        .get(URL)
        .then(promise => promise.data)
)


const create = (newObject) => (
    axios
        .post(URL, newObject)
        .then(promise => promise.data)
)


export default { getAll, create }