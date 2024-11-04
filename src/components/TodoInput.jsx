import React, { useState } from 'react'
import { FaCircle, FaDotCircle, FaPlus } from 'react-icons/fa';

function TodoInput(props) {

  const {handleAddTodo, todoValue, setTodoValue, tags} = props;
  const [selectedValue, setSelectedValue] = useState("Today");
  const CurrentDate = new Date()

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <header>
        <input 
          id="input"
          placeholder='Add a to-do item'
          onChange={(e) => setTodoValue({ ...todoValue, text: e.target.value })}
          value={todoValue.text || ''}
        />

        <div id='TagContainer'>
          <p>Tags</p>
          <div id="tags">
            {
              tags.map((tag, index) => (
                <button key={index}>
                  <input 
                    type='radio' 
                    id='day' 
                    value={tag} 
                    checked={selectedValue === tag} 
                    onChange={() => handleRadioChange(`${tag}`)}
                  />
                  &nbsp;{tags[index]}
                </button>
              ))
            }

            <button onClick={() => addTags()}>+ Add Tag</button>
          </div>

        </div>
        
        <button 
          id="addButton"
          onClick={() => {
            const currentDate = new Date();
            handleAddTodo({ ...todoValue, date: currentDate, tag: selectedValue })
            setTodoValue({ text: '', date: null, tag: null })
          }}
        >
          <FaPlus /> Add
        </button>
    </header>
  )
}

export default TodoInput