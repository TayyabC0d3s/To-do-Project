import React from 'react'
import { FaGhost } from 'react-icons/fa'

function NoTodo() {
  return (
    <div className='NoTodo'>
        <FaGhost size={148}/>
        <p>No To-Do's for now, Add a To-Do now</p>
    </div>
  )
}

export default NoTodo