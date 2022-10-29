import React, { useEffect, useReducer, useState } from "react";
import {Grid} from "@material-ui/core"
import "./style.css";

const reducer = (todos, action) => {
  switch (action.type) {
    case "addToDo":
      return [...todos, newTodo(action.payload.todo)];
    case 'completeTodo':
      return compl(action.payload.id,todos)
    case 'edittodo':
      return editTODO(action.payload.id, action.payload.todo, todos)
    case 'deleteToDo':
      return delToDo(action.payload.id ,action.payload.editId, todos)
    default:
      return console.log("its not a registered action");
  }
};

const compl = (id,todos) => {
  let cmltodo = todos.findIndex((todo)=>id===todo.id)
  todos[cmltodo].iscomplete = !todos[cmltodo].iscomplete
  return [...todos]
}

const newTodo = (todo) => {
    return { todo: todo, id: Date.now(), iscomplete: false };
};

const editTODO = (id, todo, todos)=>{
  if(todo === undefined){
    alert("This Todo is Deleted")
  }else{
    const elementIndex = todos.findIndex(ele=> id === ele.id)
    todos[elementIndex]['todo'] = todo
    return [...todos]
  }
}

const delToDo = (id,editId,todos) => {


    let todosAfterDelete = todos.filter((ele)=>(ele.id !== id))
    
    return [...todosAfterDelete]
 
}

function App() {
  let storedTodos = JSON.parse(localStorage.getItem('notes'))
  const [todos, dispatch] = useReducer(reducer, storedTodos || []);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(undefined)

  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(todos))
  },[todos])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editId !== undefined){
      // edit dispatch
      dispatch({type: 'edittodo', payload: {id: editId, todo: todo}})
  
      }else{
        todo !== "" ? dispatch({ type: "addToDo", payload: { todo: todo } }): alert("Todo can't be empty")
      }
      setTodo('')
      setEditId(undefined)
  };

  const handleComplete = (id) => {
    dispatch({type:"completeTodo",payload:{id:id}})
  }

  const handleEdit = (id) => {
    let editTodo = todos.find(todo=>todo.id===id)
    setTodo(editTodo.todo)
    setEditId(editTodo.id)
  }

  const handleDelete = (id,editId) => {
    if(id!==editId){
    // let deleteTodo = todos.find(todo=>todo.id===id)
    dispatch({type:"deleteToDo",payload:{id:id,editId:editId}})
  }else{
    alert("It is On Edit Mode, Can't Delted")
  }
  }

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter Your Task"
        />
        <button> {editId===undefined ? 'ADD TODO':'UPDATE'}</button>
      </form>
      <div className="todo-holder">
      {todos.length>0?todos.map((item,index) => (
        <div key={item.id} className="todo-wrapper">
          <span>{index+1}.</span>
            <span style={{color: item.iscomplete ? "red": "black"}}>{item.todo}</span>
          <button onClick={()=>handleComplete(item.id)} className="span-btn">{item.iscomplete ? "Undo" : "Completed"}</button>
          <button onClick={()=>handleEdit(item.id)} className="span-btn">{editId!==item.id ? 'Edit':'Selected for Editing'}</button> 
          <button onClick={()=>handleDelete(item.id,editId)} className="span-btn">Delete</button>
        </div>
      )):<Grid lg={12}>
        Add Todo To display Here

      </Grid>
      
      }
      </div>
    </>
  );
}

export default App;
