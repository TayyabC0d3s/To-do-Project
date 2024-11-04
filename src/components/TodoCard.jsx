import React, { useState, useRef, useEffect } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa"
import {HiDotsVertical} from "react-icons/hi"

function TodoCard(props) {

  const {item, handleDeleteTodo, handleEditTodo, index, todos} = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
      }
  };

  useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [todos]);

  const openMenu = () => {
      setIsMenuOpen(true);
  };

  return (
    <div className='todoCard'>
      <div>
      <div style={{display:"flex", gap: "5px"}}>
        <input type='checkbox' className='CheckOut' checked={isChecked} onChange={handleCheck}/>
        
        <span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>
          {item.text}
        </span>
      </div>
      
      </div>
      <div>
        {new Date(item.date).getHours().toString().padStart(2, '0')}:
        {new Date(item.date).getMinutes().toString().padStart(2, '0')}

        <button className='ActionButtons' onClick={openMenu}><HiDotsVertical /></button>

        {isMenuOpen && (
            <div className='contextMenu' ref={menuRef}>
              <button className="ActionButtons" onClick={() => handleEditTodo(index)}><FaEdit />&nbsp;Edit</button>
              <button className="ActionButtons" onClick={() => handleDeleteTodo(index)}><FaTrash />&nbsp;Delete</button>
              {item.tag}
            </div>)
        }
      </div>
    </div>
    
  )
}

export default TodoCard