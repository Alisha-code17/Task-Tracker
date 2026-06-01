import React from 'react'
import { useState } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const Todoui = () => {

  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all")

    const addTodo = (event) => {
        event.preventDefault();
        const newTodo = event.target.addtodo.value;
        if (!todos.some(todo => todo.text === newTodo)) {
          const newTodos = {
            text: newTodo,
            completed: false
          }
          let finalList = [...todos, newTodos];
          setTodos(finalList);
          console.log(todos);
          event.target.addtodo.value = '';
        }
        else{
          alert("Todo already exists!");
        }  
    }

    const deleteTodo = (deleteIndex) => {
      const updatedTodos = todos.filter((_, index) => index !== deleteIndex);
      setTodos(updatedTodos);
    };

    const editTodo = (index) => {
      const newValue = prompt("Edit todo:")
      if (!newValue) return
      const updatedTodos = todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, text: newValue }
        }
        return todo
      })

      setTodos(updatedTodos)
    }

    const toggleTodo = (index) => {
      const updated = todos.map((todo, i) => {
        if (i === index) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })

      setTodos(updated)
    }

    const filteredTodos = todos.filter((todo) => {
      if (filter === "all") return true
      if (filter === "completed") return todo.completed === true
      if (filter === "incomplete") return todo.completed === false
    })

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-800'>
      <form 
         onSubmit={(event) => addTodo(event)}
      className='flex flex-col gap-4 rounded-lg bg-gray-200 p-8 shadow-lg '>
        <h1 className=' flex text-2xl font-bold justify-center'>Todo List</h1>
        <div className='flex flex-row gap-10'>
          <div className="justify-start">
            <button
           
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Add Todo
        </button>
          </div>
        <div className="flex justify-end">
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        </div>
        </div>
        <div className='flex flex-row gap-2'>
        <input
          type='text'
          name='addtodo'
          placeholder='Add a new todo...'
          className='border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        
        </div>
        <ul className='mt-4'>
          {filteredTodos.map((todo, index) => (
            <li key={index} >
              <span onClick={() => toggleTodo(index)} 
               style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            className='border-b border-gray-300 py-2'>
              {todo.text} 
              </span>
              <div className='items-center float-right flex gap-2'>
                <span onClick={() => deleteTodo(index)}
                 className='cursor-pointer'>
                  <FontAwesomeIcon icon={faTrashCan} style={{color: "rgb(255, 0, 17)",}} />
                </span>
                <span onClick={() => editTodo(index)}
                className='cursor-pointer'>
                  <FontAwesomeIcon icon={faPenToSquare} style={{color: "rgb(20, 110, 28)",}} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default Todoui
