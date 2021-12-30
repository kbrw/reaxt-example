import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'

function useInputState(init) {
  const [value, setValue] = useState(init)

  return {
    value,
    onChange: e => setValue(e.target.value),
    reset: () => setValue(init),
  }
}

export default function TodoForm({saveTodo}) {
  const {value, onChange, reset} = useInputState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        saveTodo(value)
        reset()
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Add todo"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
  )
}
