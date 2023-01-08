import { useState,useRef,useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos, setTodos] =useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) 
      setTodos(storedTodos)
  },[])

  useEffect(()=>{
    window.localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])

  
  const toggleTodo =(id)=>{
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  const handleAddTodo = (e) =>{
    const name =  todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodo =>{
      return [...prevTodo,{id:uuidv4(),name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  return (
    <>
    <TodoList todosProp ={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo </button>
    <button>clear Todo</button>
    <div> {todos.filter(todo=> !todo.complete).length} left todo</div>
    </>
  )
}

export default App;
