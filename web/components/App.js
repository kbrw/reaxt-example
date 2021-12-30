import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Typography from '@material-ui/core/Typography'
import '../css/app.css'

import TodoForm from './TodoForm'
import TodoList from './TodoList'

function useTodoState(init) {
  const [todos, setTodos] = useState(init)


  return {
    todos,
    addTodo: x => setTodos(xs => [...xs, x]),
    removeTodo: index => setTodos(xs => xs.filter((x, i) => i !== index)),
  }
}

function App() {
  const {todos, addTodo, removeTodo} = useTodoState([])

  const saveTodo = todoText => {
    const trimmedText = todoText.trim()

    if (trimmedText.length > 0) {
      addTodo(trimmedText)
    }
  }

  return (
    <div className="App">
      <Typography component="h1" variant="h2">
        Todos
      </Typography>

      <TodoForm saveTodo={saveTodo}/>
      <TodoList todos={todos} deleteTodo={removeTodo}/>
    </div>
  )
}

export default {
  reaxt_server_render(params, render) { // server side call, should call render(ReactComp)
    render(<App/>)
  },
  reaxt_client_render(initialProps, render) { // initial client side call, should call render(ReactComp)
    render(<App/>)
  }
}
