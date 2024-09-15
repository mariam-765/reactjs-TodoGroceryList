//in react we have functional compenents 

import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

/*
functional components are: it's got a name (in this case 'App')
we can have loads of them
the function name is always capetalized just
like the component file name (App.jsx)
# also the function name will always match the 
  component file name
*/
function App() {
  
  
  const[todos, setTodos]=useState([])
  const[todoValue, setTodoValue]=useState('')

  function handleData(newList){
    localStorage.setItem('todos', JSON.stringify({todos:
      newList
    }))
  }

  function handleAddTodos(newTodo){
    const newTodoList=[...todos,newTodo]
    handleData(newTodoList)
    setTodos(newTodoList)
    
  }

  function handleDeleteTodo(index){
    const newTodoList= todos.filter((todo, todoIndex)=> {
      return todoIndex !== index 
    })
    handleData(newTodoList)

    setTodos(newTodoList)
  }
  
  function handleEditTodo(index){
    const valueToBeEdited=todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(()=>{
    if(!localStorage){
      return
    }
   let localTodos=localStorage.getItem('todos')
  if(!localTodos){
    return
  }
  localTodos=JSON.parse(localTodos).todos
  setTodos(localTodos)
},[])
  

  //u can write the old html with the js inside of it
  //that's what jsx is
  //jsx is a javascript friendly html
  return (
    //these are called react fragments
    <> 
      
        <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
        />

        <TodoList 
        handleEditTodo= {handleEditTodo}        
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
        />
      
    </>
  )
}

export default App
