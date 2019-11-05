import React, { Fragment, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';


type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string,
  complete: boolean,
}

const App: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] =  useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue('')
  };

  const addTodo = (text:string): void => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}];
    setTodos(newTodos);
    console.log(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [ ...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos)
  };

  const deleteTodo = (index: number) => {
    const newTodos: ITodo[] = [ ...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const getYear = (): number => {
    const d = new Date();
    return d.getFullYear();
  }

  return (
    <Fragment>
      <header className="App-header">
        <h1>Todo list</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={e => setValue(e.target.value)} required />
          <button type='submit'> Add Todo </button>
        </form>
          {todos.map((todo:ITodo, index: number) => {
            return <Fragment key={index}>
              <div id="container">
                <ul>
                  <li
                    key={index}
                    style={{ textDecoration: todo.complete ? 'line-through': ''}}
                  >{todo.text}
                  <button className="todo" type='button' onClick={() => completeTodo(index)}>
                    <span>{todo.complete ? <FontAwesomeIcon icon={faUndo} /> : <FontAwesomeIcon icon={faCheck} />}</span>
                  </button>
                    <button className="todo" type='button' onClick={() => deleteTodo(index)}>
                      <span><FontAwesomeIcon icon={faTimes} /></span>
                    </button>
                  </li>
                </ul>
              </div>
            </Fragment>
          })}
      </section>
      <footer>&copy; {`JH ${getYear()}`}</footer>
    </Fragment>
  );
}

export default App;
