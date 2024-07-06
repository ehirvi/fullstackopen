import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.text !== '') {
    return <div className={notification.status}>{notification.text}</div>
  }
}

export default Notification
