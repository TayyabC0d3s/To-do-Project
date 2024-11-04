import React from 'react'
import TodoCard from './TodoCard'
import TodoInput from './TodoInput'
import NoTodo from './NoTodo'

function TodoList(props) {

const {todos} = props

  return (
    <div id="TodoContainer">
      <h4>Today</h4>
        {
            todos && todos.length > 0 ? todos.map((item, index) => (
                <TodoCard {...props} key={index} index={index} item={item}>
                    <p>{item.text}</p>
                    <p>{new Date(item.date).getHours().toLocaleString()}</p>
                </TodoCard>
            )) : <NoTodo />
        }
    </div>
  )
}

export default TodoList