import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const isEmpty = () => {
    return notification === ''
  }

  const showNotification = () => {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return (
    <>
      {isEmpty() ? null : showNotification()}
    </>
  )

}
export default Notification