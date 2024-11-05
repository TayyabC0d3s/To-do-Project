import React, { useState, useEffect } from 'react'
import {FaPlus } from 'react-icons/fa'
import {CiCircleRemove} from 'react-icons/ci'

function TodoInput(props) {

  const {handleAddTodo, todoValue, setTodoValue, tags, setTags} = props
  const [selectedValue, setSelectedValue] = useState("Today")
  const [tag, setTag] = useState('')
  const CurrentDate = new Date()

  useEffect(()=>{
    if(!localStorage)
      return
    
    let localTags = localStorage.getItem('tags')

    if(!localTags)
      return

    localTags = JSON.parse(localTags).tags
    setTags(localTags)
  }, [])

  function PersistData(newTags) {
    localStorage.setItem('tags', JSON.stringify({ tags: newTags }));
  }

  function deleteTag(index)
  {
    const updatedTags = tags.filter((_, tagIndex) => tagIndex !== index)
    setTags(updatedTags)
    PersistData(updatedTags)
  }

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  function addTag(newTag)
  {
    if(newTag === '')
      return alert("enter a tag")

    const newTags = [...tags, tag];
    setTags(newTags)
    PersistData(newTags)
  }

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
                <button 
                  key={index}
                  onClick={() => handleRadioChange(`${tag}`)}
                  style={{
                    border: selectedValue === tag ? "2px solid cadetblue" : "1px solid gray",
                    backgroundColor: selectedValue === tag ? "#e0f7fa" : "transparent",
                    padding: "5px 10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px"
                  }}
                >

                  {tags[index]}

                  <button 
                    onClick={(e)=>{
                      e.stopPropagation(); 
                      deleteTag(index)
                    }} 
                    
                    style={{
                      border: 0, 
                      background: "transparent",
                      textAlign: "center",
                      cursor: "pointer"
                    }}
                  >
                    <CiCircleRemove />
                  </button>
                </button>
              ))
            }
          </div>
          <hr />
          <div className="tag-input-container">
            <input type='text' className="tagInput" onChange={(e) => setTag(e.target.value)}/>
            <button onClick={() => addTag(tag)} className="add-tag-button">+ Add Tag</button>
          </div>
        </div>
        
        <button 
          className="addButton"
          onClick={() => {
            const currentDate = new Date();
            handleAddTodo({ ...todoValue, date: currentDate, tag: selectedValue })
            setTodoValue({ text: '', date: null, tag: null })
          }}
        >
          + Add
        </button>
    </header>
  )
}

export default TodoInput