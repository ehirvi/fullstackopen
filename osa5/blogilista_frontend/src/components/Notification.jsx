const Notification = ({ notification }) => {
  if (notification) {
    return (
      <div className={notification.status}>
        {notification.text}
      </div>
    )
  }
}

export default Notification