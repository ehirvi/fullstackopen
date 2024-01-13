import axios from "axios"

const URL = "http://localhost:3001/api/persons";

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

const remove = (id) => (
    axios
        .delete(`${URL}/${id}`)
        .then(promise => promise)
)

const update = (id, updatedObject) => (
    axios
        .put(`${URL}/${id}`, updatedObject)
        .then(promise => promise.data)
)

export default { getAll, create, remove, update }