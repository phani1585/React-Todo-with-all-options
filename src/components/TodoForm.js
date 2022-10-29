import React,{useState} from 'react'

const TodoForm = () => {
    const [todo,setTodo]=useState()
  return (
    <div>
      <form>
        <input type='text' value={todo} onChange={(e)=>{setTodo(e.target.value);console.log(todo)}} placeholder='Enter Your Task'/>
        <button>ADD TODO</button>
      </form>
    </div>
  )
}

export default TodoForm
