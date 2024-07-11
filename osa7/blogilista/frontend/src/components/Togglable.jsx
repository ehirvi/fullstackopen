import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <div style={hideWhenVisible} className='flex justify-center'>
        <button className='place-self-center py-1 px-3 m-2 bg-green-500 text-white text-lg shadow-md hover:bg-green-700 rounded duration-150' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='flex flex-col'>
        {props.children}
        <button className='place-self-center py-1 px-3 m-2 bg-red-500 text-white text-lg shadow-md hover:bg-red-700 rounded duration-150' onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
