import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const styles = {
    'success': 'px-4 py-2 mb-4 flex justify-center content-center bg-green-500 text-white text-md shadow-xl ring-2 ring-slate-400 rounded',
    'error': 'px-4 py-2 mb-4 flex justify-center content-center bg-red-400 text-white text-md shadow-xl ring-2 ring-slate-400 rounded'
  }

  if (notification.text !== '') {
    return <div className={styles[notification.status]}>{notification.text}</div>
  }
}

export default Notification
