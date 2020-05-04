import React from 'react'
import TodoList from "./components/TodoList"
import TodoForm from './components/TodoForm'
import "./components/Todo.css"

const list = [
  {
    task: 'Organize Garage',
    id: 1528817077286,
    completed: false
  },
  {
    task: 'Bake Cookies',
    id: 1528817084358,
    completed: false
  }
];

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      todoList: list
    };
  }

  toggleItem = clickedId => {
    const newTodoList = this.state.todoList.map(item => {
      if (item.id === clickedId){
        return {
          ...item,
          completed: !item.completed
        }
      } else {
        return item
      }
    });
    this.setState({
      todoList: newTodoList
    })
  }

  addNewItem = (itemText) => {
    const newItem = {
      task: itemText,
      id: Date.now(),
      completed: false
    }
    this.setState({
      todoList: [...this.state.todoList, newItem]
    })
  }

  removeTodo = () => {
    const newToDo = this.state.todoList.filter( item => 
      item.completed < 1
    )
    this.setState({
      todoList: newToDo
    })
    localStorage.setItem("newToDo", JSON.stringify(newToDo));
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage()

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
}



  render() {
    return (

      <div className='App'> 
      <div className="header">
        <h1>To do list</h1>
        <TodoForm addNewItem={this.addNewItem} />
        </div>

        <TodoList todoList={this.state.todoList} toggleItem={this.toggleItem} removeTodo={this.removeTodo} />
      </div>
    )
  }
}

export default App