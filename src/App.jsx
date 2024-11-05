import { useEffect, useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  const [todoValue, setTodoValue] = useState({ text: '', date: null });

  const [tags, setTags] = useState([
    'Personal',
    'Work'
  ])

  const [todos, setTodos] = useState(
    [
      {
        text: "get yo ass to gym",
        date: new Date(),
        tag: 'Personal'
      },
    ]
  )

  useEffect(()=>{
    if(!localStorage)
      return
    
    let localTodos = localStorage.getItem('todos')

    if(!localTodos)
      return

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  function handleAddTodo(newTodo){
    if(newTodo.text === '')
      return alert("Enter a to-do item")

    const new_Todo = [...todos, newTodo];
    setTodos(new_Todo)
    PersistData(new_Todo)
  }

  function PersistData(newList)
  {
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index)
    setTodos(newTodoList)
    PersistData(newTodoList)
    
  }

  function handleEditTodo(index){
    const valuetoEdit = todos[index]
    setTodoValue(valuetoEdit)
    handleDeleteTodo(index)
  }

  return (
    <>
      
      <main style={{display: "flex"}}>
        <div id="Menu">
          <h4>Add a new To-do</h4>
          <TodoInput 
            todoValue={todoValue} 
            setTodoValue={setTodoValue} 
            handleAddTodo={handleAddTodo} 
            tags={tags}
            setTags={setTags}
          />
        </div>

        <TodoList 
          todos={todos} 
          handleDeleteTodo={handleDeleteTodo} 
          handleEditTodo={handleEditTodo} 
        />

        
      </main>
    </>
  )
}

export default App
