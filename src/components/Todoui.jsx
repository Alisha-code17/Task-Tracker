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
    <div className='flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.35),_transparent_30%),linear-gradient(135deg,_#312e81_0%,_#4f46e5_45%,_#1d4ed8_100%)] px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-4xl flex-col rounded-[32px] border border-white/20 bg-white/10 p-4 shadow-2xl shadow-indigo-950/30 backdrop-blur-xl sm:p-6 lg:p-8'>
        <header className='mb-6 flex flex-col gap-4 border-b border-white/20 pb-6 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-indigo-200'>Productivity Hub</p>
            <h1 className='text-3xl font-semibold text-white sm:text-4xl'>Task Tracker</h1>
            <p className='mt-2 text-sm text-indigo-100/80'>Stay focused, one task at a time.</p>
          </div>

          <div className='flex items-center gap-3 self-start rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-indigo-50 shadow-lg shadow-indigo-950/10'>
            <span className='inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400' />
            {todos.length} total task{todos.length === 1 ? '' : 's'}
          </div>
        </header>

        <form
          onSubmit={(event) => addTodo(event)}
          className='mb-6 flex flex-col gap-3 rounded-2xl border border-white/20 bg-slate-950/20 p-4 shadow-inner shadow-indigo-950/10 sm:flex-row sm:items-center sm:justify-between'
        >
          <div className='flex flex-1 flex-col gap-3 sm:flex-row'>
            <input
              type='text'
              name='addtodo'
              placeholder='Add a new task...'
              className='w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40'
            />
            <button
              type='submit'
              className='rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.01] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-300'
            >
              Add Task
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/40'
          >
            <option value='all' className='text-slate-800'>All</option>
            <option value='completed' className='text-slate-800'>Completed</option>
            <option value='incomplete' className='text-slate-800'>Incomplete</option>
          </select>
        </form>

        <div className='max-h-[420px] overflow-y-auto pr-2'>
          {filteredTodos.length === 0 ? (
            <div className='flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-12 text-center text-indigo-100/80'>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-2xl'>✓</div>
              <h2 className='text-lg font-semibold text-white'>No tasks here yet</h2>
              <p className='mt-2 max-w-sm text-sm'>Add a task to start building momentum.</p>
            </div>
          ) : (
            <ul className='space-y-3'>
              {filteredTodos.map((todo, index) => (
                <li
                  key={index}
                  className='group flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-md shadow-slate-950/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-xl'
                >
                  <div className='flex min-w-0 flex-1 items-center gap-3'>
                    <button
                      type='button'
                      onClick={() => toggleTodo(index)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${todo.completed ? 'border-emerald-400/50 bg-emerald-400/20 text-emerald-300' : 'border-white/20 bg-white/10 text-transparent hover:border-indigo-300 hover:text-indigo-200'}`}
                    >
                      ✓
                    </button>

                    <div className='min-w-0 flex-1'>
                      <span
                        className={`block truncate text-base font-medium ${todo.completed ? 'text-slate-400 line-through' : 'text-white'}`}
                      >
                        {todo.text}
                      </span>
                      <p className='mt-1 text-xs uppercase tracking-[0.24em] text-indigo-200/70'>
                        {todo.completed ? 'Completed' : 'In progress'}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => editTodo(index)}
                      className='flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15 text-amber-300 transition hover:bg-amber-500/25'
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      type='button'
                      onClick={() => deleteTodo(index)}
                      className='flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/15 text-rose-300 transition hover:bg-rose-500/25'
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Todoui
